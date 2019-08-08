#!/usr/bin/env python

import rospy
from geometry_msgs.msg import Twist 
from std_msgs.msg import Int32

PI = 3.1415926535897

import signal
import sys
def signal_handler(sig, frame):
        sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)


# Define a function
my_name = ""


distance = 0

def getDistance():
    return distance;

def callback(data):
    global distance
    rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
    distance = data.data

rospy.Subscriber("distance", Int32, callback)

def set_name(name):
    global my_name
    my_name=name

def get_name():
    return my_name

def move_with_speed(distance=1, speed=1):
    move(distance, speed)


def move(distance=1, speed=1):
    #Starts a new node
    velocity_publisher = rospy.Publisher('/turtle1/cmd_vel', Twist, queue_size=10)
    rospy.init_node('robot_api', anonymous=True)
    vel_msg = Twist()

    direction = distance / abs(distance)
    speed = speed * direction

    vel_msg.linear.x=speed
    vel_msg.linear.y=0
    vel_msg.linear.z=0
    vel_msg.angular.x = 0
    vel_msg.angular.y = 0
    vel_msg.angular.z = 0

    t0 = rospy.Time.now().to_sec()
    current_dist = 0.0

    while(current_dist < distance * direction):
        velocity_publisher.publish(vel_msg)
        t1 = rospy.Time.now().to_sec()
        current_dist = speed*(t1-t0) * direction

    vel_msg.linear.x=0
    velocity_publisher.publish(vel_msg)

def turn(angle=90):
    #Starts a new node
    rospy.init_node('robot_api', anonymous=True)
    velocity_publisher = rospy.Publisher('/turtle1/cmd_vel', Twist, queue_size=10)
    vel_msg = Twist()

    # Receiveing the user's input
    #print("Let's rotate your robot")
    speed = 90#input("Input your speed (degrees/sec):")
    angle = angle#input("Type your distance (degrees):")
    clockwise = True;#input("Clockwise?: ") #True or false

    #Converting from angles to radians
    angular_speed = speed*2*PI/360
    relative_angle = angle*2*PI/360

    #We wont use linear components
    vel_msg.linear.x=0
    vel_msg.linear.y=0
    vel_msg.linear.z=0
    vel_msg.angular.x = 0
    vel_msg.angular.y = 0

    # Checking if our movement is CW or CCW
    if clockwise:
        vel_msg.angular.z = -abs(angular_speed)
    else:
        vel_msg.angular.z = abs(angular_speed)
    # Setting the current time for distance calculus
    t0 = rospy.Time.now().to_sec()
    current_angle = 0

    while(current_angle < relative_angle):
        velocity_publisher.publish(vel_msg)
        t1 = rospy.Time.now().to_sec()
        current_angle = angular_speed*(t1-t0)


    #Forcing our robot to stop
    vel_msg.angular.z = 0
    velocity_publisher.publish(vel_msg)
