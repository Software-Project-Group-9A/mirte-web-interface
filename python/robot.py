#!/usr/bin/env python
import time
import rospy
import signal
import sys
import math
import atexit

sys.path.append('/usr/local/lib/python2.7/dist-packages/PyMata-2.20-py2.7.egg')  # Needed for jupyter notebooks
sys.path.append('/usr/local/lib/python2.7/dist-packages/pyserial-3.4-py2.7.egg')

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
        self.stop_controller_service()

        # Services for actuators 
        # Those are not publishers since the connection to the subsriber node can take a lot of
        # time. Therefore we use the service in the service API which translates it to a publisher

        motors = {}
        if rospy.has_param("/zoef/motor"):
            motors = rospy.get_param("/zoef/motor")
        self.motor_services = {}
        for motor in motors:
            self.motor_services[motor] = rospy.ServiceProxy('/zoef_pymata/set_' + motor + '_pwm', SetMotorPWM, persistent=True)

        self.text_publisher = rospy.Publisher('display_text', String, queue_size=10)
        self.velocity_publisher = rospy.Publisher('/mobile_base_controller/cmd_vel', Twist, queue_size=10)

        rospy.init_node('zoef_python_api', anonymous=False)

        # Services
        self.move_service = rospy.ServiceProxy('zoef_navigation/move', Move)
        self.turn_service = rospy.ServiceProxy('zoef_navigation/turn', Turn)

        # Services for sensors
        distance_sensors = {}
        if rospy.has_param("/zoef/distance"):
            distance_sensors = rospy.get_param("/zoef/distance")
        self.distance_services = {}
        for sensor in distance_sensors:
            self.distance_services[sensor] = rospy.ServiceProxy('/zoef_service_api/get_' + sensor, GetDistance, persistent=True)

        intensity_sensors = {}
        if rospy.has_param("/zoef/intensity"):
            intensity_sensors = rospy.get_param("/zoef/intensity")
        self.intensity_services = {}
        for sensor in intensity_sensors:
            self.intensity_services[sensor] = rospy.ServiceProxy('/zoef_service_api/get_' + sensor, GetIntensity, persistent=True)

        encoder_sensors = {}
        if rospy.has_param("/zoef/encoder"):
            encoder_sensors = rospy.get_param("/zoef/encoder")
        self.encoder_services = {}
        for sensor in encoder_sensors:
            self.encoder_services[sensor] = rospy.ServiceProxy('/zoef_service_api/get_' + sensor, GetEncoder, persistent=True)

        self.set_pin_mode_service = rospy.ServiceProxy('/zoef/set_pin_mode', SetPinMode, persistent=True)
        self.get_pin_value_service = rospy.ServiceProxy('/zoef/get_pin_value', GetPinValue, persistent=True)
        self.set_pin_value_service = rospy.ServiceProxy('/zoef/set_pin_value', SetPinValue, persistent=True)
        self.get_keypad_value_service = rospy.ServiceProxy('/zoef_service_api/get_keypad', GetKeypad, persistent=True)
        self.set_led_value_service = rospy.ServiceProxy('/zoef/set_led_value', SetLEDValue, persistent=True)

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
        dist = self.distance_services[sensor + "_distance"]()
        return dist.data

    def getIntensity(self, sensor):
        value = self.intensity_services[sensor + "_intensity"]()
        return value.data

    def getSpeed(self, sensor):
        value = self.encoder_services[sensor + "_encoder"](1) # Currently Encoder asks for a timedelta, not used
        return value.data

    def setPinMode(self, pin, mode, type):
        value = self.set_pin_mode_service(pin, mode, type)
        return value.status

    def getKeypadValue(self):
        value = self.get_keypad_value_service()
        return value.data

    def getAnalogPinValue(self, pin):
        print "robot.py: in get analogprint value"
        #self.setPinMode(pin, self.PULLUP, self.ANALOG)
        value = self.get_pin_value_service(pin, "analog")
        print "robot.py: returnig print value" 
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

    def setMotorPWM(self, motor, value):
        motor = self.motor_services[motor + "_motor"](value)
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
        self.setMotorPWM("left", 0)
        self.setMotorPWM("right", 0)
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
