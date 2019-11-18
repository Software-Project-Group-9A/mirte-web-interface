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
from zoef_msgs.msg import Encoder

from zoef_msgs.srv import *

zoef = {}

class Robot():
    def __init__(self):
        self.dist_request = rospy.Publisher('distance_request', Empty, queue_size=10)
        self.text_publisher = rospy.Publisher('display_text', String, queue_size=10)
        self.pwm_publisher_left = rospy.Publisher('left_pwm', Int32, queue_size=10)
        self.pwm_publisher_right = rospy.Publisher('right_pwm', Int32, queue_size=10)
        self.velocity_publisher = rospy.Publisher('/mobile_base_controller/cmd_vel', Twist, queue_size=10)

        rospy.init_node('robot_api', anonymous=True)

        self.left_encoder_filter = message_filters.Subscriber('left_encoder', Encoder)
        self.left_encoder_cache = message_filters.Cache(self.left_encoder_filter, 200)
        self.right_encoder_filter = message_filters.Subscriber('right_encoder', Encoder)
        self.right_encoder_cache = message_filters.Cache(self.right_encoder_filter, 200)

        #Temp fix. We should create a node that listens to service calls from this node. This node should not have any publishers.
        while self.velocity_publisher.get_num_connections() == 0:
             rospy.sleep(.1)

    def getDistance(self):
        distance_getter = rospy.ServiceProxy('get_distance', get_distance)
        dist = distance_getter()
        return dist.data

    def getPinValue(self, pin):
        pin_value_getter = rospy.ServiceProxy('get_pin_value', get_pin_value)
        value = pin_value_getter(pin)
        return value.data

    def displayText(self, text):
        rospy.loginfo(text)
        self.text_publisher.publish(text)

    def pwm(self, motor, value):
        pwm_value = Int32()
        pwm_value.data = value
	if motor == 'left':
            self.pwm_publisher_left.publish(pwm_value)
        else:
            self.pwm_publisher_right.publish(pwm_value)

    def getNumberOfEncoderTicks(self, motor, time_delta):
        now = rospy.get_rostime()
        if motor == 'left':
           return len(self.left_encoder_cache.getInterval(now - rospy.Duration(time_delta), now))
        else:
           return len(self.right_encoder_cache.getInterval(now - rospy.Duration(time_delta), now))

    def turn(self, direction, speed):
        vel_msg = Twist()

        if direction == 'right':
            vel_msg.angular.z = -speed
        else:
            vel_msg.angular.z = speed

        self.velocity_publisher.publish(vel_msg)


    def move(self, direction, speed):
        if direction == 'backward':
            speed = -speed

        vel_msg = Twist()
        vel_msg.linear.x=speed

        self.velocity_publisher.publish(vel_msg)

    def turnAngle(self, angle=90):
        vel_msg = Twist()

        # Receiveing the user's input
        speed = 90#input("Input your speed (degrees/sec):")
        angle = angle#input("Type your distance (degrees):")
        clockwise = True;#input("Clockwise?: ") #True or false

        #Converting from angles to radians
        angular_speed = speed*2*math.pi/360
        relative_angle = angle*2*math.pi/360

        # Checking if our movement is CW or CCW
        if clockwise:
            vel_msg.angular.z = -abs(angular_speed)
        else:
            vel_msg.angular.z = abs(angular_speed)
        # Setting the current time for distance calculus
        t0 = rospy.Time.now().to_sec()
        current_angle = 0

        while(current_angle < relative_angle):
            self.velocity_publisher.publish(vel_msg)
            t1 = rospy.Time.now().to_sec()
            current_angle = angular_speed*(t1-t0)


        #Forcing our robot to stop
        vel_msg.angular.z = 0
        self.velocity_publisher.publish(vel_msg)

    def stop(self):
        self.move('forward', 0)
        print "stoppping robot"
        sys.exit(0)

# We need a special functio to initiate the Robot() for two reasons:
# 1) The signal handler needs to be able to stop the robot
# 2) The main.py need to call the init_node() (see: https://answers.ros.org/question/266612/rospy-init_node-inside-imported-file/)
def createRobot():
    global zoef
    zoef = Robot()
    return zoef

def signal_handler(sig, frame):
    zoef.stop()


# TODO: temp disabled for linetracer
#signal.signal(signal.SIGINT, signal_handler)
#signal.signal(signal.SIGTERM, signal_handler)
