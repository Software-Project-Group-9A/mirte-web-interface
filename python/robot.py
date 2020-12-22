#!/usr/bin/env python
import time
import rospy
import rosservice
import signal
import sys
import math
import atexit

# TODO: check if we need the telemetrix version of this?
#sys.path.append('/usr/local/lib/python2.7/dist-packages/PyMata-2.20-py2.7.egg')  # Needed for jupyter notebooks
#sys.path.append('/usr/local/lib/python2.7/dist-packages/pyserial-3.4-py2.7.egg')

import message_filters
from geometry_msgs.msg import Twist
from std_msgs.msg import Int32
from std_msgs.msg import String
from std_msgs.msg import Empty
from zoef_msgs.msg import *

from zoef_msgs.srv import *
from std_srvs.srv import *

zoef = {}

class Robot():
    def __init__(self):
        # Stop robot when exited
        atexit.register(self.stop)

        self.PWM = 3 #PrivateConstants.PWM when moving to Python3
        self.INPUT = 0
        self.OUTPUT = 1
        self.PULLUP = 11
        self.ANALOG = 2

        # Start timing
        self.begin_time = time.time()
        self.last_call = 0

        # Call /stop and /start service to disable/enable the ROS diff_drive_controller
        # By default this class will control the rbot though PWM (controller stopped). Only in case
        # the controller is needed, it will be enabled.
        self.stop_controller_service = rospy.ServiceProxy('stop', Empty, persistent=True)
        self.start_controller_service = rospy.ServiceProxy('start', Empty, persistent=True)
        #self.stop_controller_service()

        # Service for motor speed
        if rospy.has_param("/zoef/motor"):
            motors = rospy.get_param("/zoef/motor")
            self.motor_services = {}
            for motor in motors:
                self.motor_services[motor] = rospy.ServiceProxy('/zoef/set_' + motors[motor]["name"] + '_speed', SetMotorSpeed, persistent=True)

#        self.text_publisher = rospy.Publisher('display_text', String, queue_size=10)
#        self.velocity_publisher = rospy.Publisher('/mobile_base_controller/cmd_vel', Twist, queue_size=10)

        rospy.init_node('zoef_python_api', anonymous=False)
        # Services
#        self.move_service = rospy.ServiceProxy('zoef_navigation/move', Move)
#        self.turn_service = rospy.ServiceProxy('zoef_navigation/turn', Turn)

        ## Sensors
        ## The sensors are now just using a blocking service call. This is intentionally
        ## since one first needs to learn to program in a synchronous way without events.
        ## Event based programming is already possible using the ROS topics for the
        ## same sensors. At a later stage we will expose this as well to this API and
        ## maybe even to blockly.

        # Services for distance sensors
        if rospy.has_param("/zoef/distance"):
            distance_sensors = rospy.get_param("/zoef/distance")
            self.distance_services = {}
            for sensor in distance_sensors:
               self.distance_services[sensor] = rospy.ServiceProxy('/zoef/get_distance_' + distance_sensors[sensor]["name"], GetDistance, persistent=True)

        # Services for intensity sensors (TODO: how to expose the digital version?)
        if rospy.has_param("/zoef/intensity"):
            intensity_sensors = rospy.get_param("/zoef/intensity")
            self.intensity_services = {}

            # We can not get the types (analog and/or digital) of the intensity sensor
            # straight from the parameter server (it might be just set as the PCB without
            # explicit values. We can however deduct what is there by checking the
            # services.
            service_list = rosservice.get_service_list()
            for sensor in intensity_sensors:
                if "/zoef/get_intensity_" + intensity_sensors[sensor]["name"] in service_list:
                    self.intensity_services[sensor] = rospy.ServiceProxy('/zoef/get_intensity_' + intensity_sensors[sensor]["name"], GetIntensity, persistent=True)
                if "/zoef/get_intensity_" + intensity_sensors[sensor]["name"] + "_digital" in service_list:
                    self.intensity_services[sensor + "_digital"] = rospy.ServiceProxy('/zoef/get_intensity_' + intensity_sensors[sensor]["name"] + "_digital", GetIntensityDigital, persistent=True)


        # Services for encoder sensors
        if rospy.has_param("/zoef/encoder"):
            encoder_sensors = rospy.get_param("/zoef/encoder")
            self.encoder_services = {}
            for sensor in encoder_sensors:
                self.encoder_services[sensor] = rospy.ServiceProxy('/zoef/get_encoder_' + encoder_sensors[sensor]["name"], GetEncoder, persistent=True)

        # Services for keypad sensores
        if rospy.has_param("/zoef/keypad"):
            keypad_sensors = rospy.get_param("/zoef/keypad")
            self.keypad_services = {}
            for sensor in keypad_sensors:
                self.keypad_services[sensor] = rospy.ServiceProxy('/zoef/get_keypad_' + keypad_sensors[sensor]["name"], GetKeypad, persistent=True)



        self.get_pin_value_service = rospy.ServiceProxy('/zoef/get_pin_value', GetPinValue, persistent=True)
        self.set_pin_value_service = rospy.ServiceProxy('/zoef/set_pin_value', SetPinValue, persistent=True)
        self.set_led_value_service = rospy.ServiceProxy('/zoef/set_led_value', SetLEDValue, persistent=True)
        self.set_servo_angle_service = rospy.ServiceProxy('/zoef/set_servo_angle', SetServoAngle, persistent=True)


        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)

    def getTimestamp(self):
        return time.time() - self.begin_time

    def getTimeSinceLastCall(self):
        last_call = self.last_call
        self.last_call = time.time()
        if last_call == 0:
           return 0
        else:
           return time.time() - last_call

    def getDistance(self, sensor):
        dist = self.distance_services[sensor]()
        return dist.data

    def getIntensity(self, sensor, type="analog"):
        if type == "analog":
           value = self.intensity_services[sensor]()
        if type == "digital":
           value = self.intensity_services[sensor + "_digital"]()
        return value.data

    def getEncoder(self, sensor):
        value = self.encoder_services[sensor]()
        return value.data

    def setPinMode(self, pin, mode, type):
        value = self.set_pin_mode_service(pin, mode, type)
        return value.status

    def getKeypad(self, keypad):
        value = self.keypad_services[keypad]()
        return value.data

    def getAnalogPinValue(self, pin):
        value = self.get_pin_value_service(pin, "analog")
        return value.data

    def setAnalogPinValue(self, pin, value):
        value = self.set_pin_value_service(pin, "analog", value)
        return value.status

    def getDigitalPinValue(self, pin):
        value = self.get_pin_value_service(pin, "digital")
        return value.data

    def setLED(self, value):
        value = self.set_led_value_service(value)
        return value.status

    def setServoAngle(self, angle):
        value = self.set_servo_angle_service(angle)
        return value.status

    def setDigitalPinValue(self, pin, value):
        value = self.set_pin_value_service(pin, "digital", value)
        return value.status

    def getVirtualColor(self, direction):
        virtual_color_getter = rospy.ServiceProxy('get_virtual_color', get_virtual_color)
        value = virtual_color_getter(direction)
        return value.data

    def getBarcode(self):
        barcode_getter = rospy.ServiceProxy('get_barcode', get_barcode)
        value = barcode_getter()
        return value.data

    def displayText(self, text):
        rospy.loginfo(text)
        self.text_publisher.publish(text)

    def setMotorSpeed(self, motor, value):
        motor = self.motor_services[motor](value)
        return motor.status

    def getEncoderTicks(self, sensor, time_delta):
        encoder = self.motor_services[sensor](time_delta)
        return ecnoder.ticks

    def turn(self, angle = (math.pi / 2), speed = (math.pi / 10)):
        turn = self.turn_service(angle, speed)
        return turn.finished

    def move(self, distance = 0.1, speed = 0.5):
        move = self.move_service(distance, speed)
        return move.finished

    def stop(self):
        self.setMotorSpeed("left", 0)
        self.setMotorSpeed("right", 0)
        #self.start_controller_service() # this cen be replaced as soon as the controller is working properly
        #self.move(0, 0)

    def signal_handler(self, sig, frame):
        self.stop()
        sys.exit()

# We need a special function to initiate the Robot() because the main.py need to call the 
# init_node() (see: https://answers.ros.org/question/266612/rospy-init_node-inside-imported-file/)
def createRobot():
    global zoef
    zoef = Robot()
    return zoef
