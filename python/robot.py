#!/usr/bin/env python
import time
import rospy
import signal
import sys
import math

import message_filters
from geometry_msgs.msg import Twist
from std_msgs.msg import Int32
from std_msgs.msg import String
from std_msgs.msg import Empty
from zoef_msgs.msg import Encoder, Intensity

from zoef_msgs.srv import *

zoef = {}

class Robot():
    def __init__(self):
        self.original_sigint_handler = signal.getsignal(signal.SIGINT)

        # Services for actuators 
        # Those are not publishers since the connection to the subsriber node can take a lot of
        # time. Therefore we use the service in the service API which translates it to a publisher

        motors = {}
        if rospy.has_param("/zoef/motor"):
            motors = rospy.get_param("/zoef/motor")
        self.motor_services = {}
        for motor in motors:
            self.motor_services[motor] = rospy.ServiceProxy('/zoef_pymata/set_' + motor + '_pwm', SetMotorPWM)

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
            self.distance_services[sensor] = rospy.ServiceProxy('/zoef_service_api/get_' + sensor, GetDistance)

        intensity_sensors = {}
        if rospy.has_param("/zoef/intensity"):
            intensity_sensors = rospy.get_param("/zoef/intensity")
        self.intensity_services = {}
        for sensor in intensity_sensors:
            self.intensity_services[sensor] = rospy.ServiceProxy('/zoef_service_api/get_' + sensor, GetIntensity)

        encoder_sensors = {}
        if rospy.has_param("/zoef/encoder"):
            encoder_sensors = rospy.get_param("/zoef/encoder")
        self.encoder_services = {}
        for sensor in encoder_sensors:
            self.encoder_services[sensor] = rospy.ServiceProxy('/zoef_service_api/get_' + sensor, GetEncoder)

        self.pin_value_service = rospy.ServiceProxy('get_pin_value', get_pin_value)

        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)


    def getDistance(self, sensor):
        dist = self.distance_services[sensor]()
        return dist.data

    def getIntensity(self, sensor):
        value = self.intensity_services[sensor]()
        return value.data

    def getSpeed(self, sensor):
        value = self.encoder_services[sensor](1) # Currently Encoder asks for a timedelta, not used
        return value.data

    def getPinValue(self, pin):
        value = self.pin_value_service(pin)
        return value.data

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
        self.move(0, 0)

    def signal_handler(self, sig, frame):
       if self.original_sigint_handler == signal.default_int_handler:
          self.stop()
          sys.exit()
       else:
          self.original_sigint_handler(sig, frame)


# We need a special function to initiate the Robot() because the main.py need to call the 
# init_node() (see: https://answers.ros.org/question/266612/rospy-init_node-inside-imported-file/)
def createRobot():
    global zoef
    zoef = Robot()
    return zoef
