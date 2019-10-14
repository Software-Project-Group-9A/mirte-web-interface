#!/usr/bin/env python
import time
import rospy

from geometry_msgs.msg import Twist 
from std_msgs.msg import Int32
from std_msgs.msg import String
from std_msgs.msg import Empty

PI = 3.1415926535897

import signal
import sys
def signal_handler(sig, frame):
    print('goodbye')
    move('forward', 0)
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

# Define a function
my_name = ""

distance = 0
distance_available = False

# This needs to be assigned at the beginning. TODO: mae this whole thin one node instead of initializing a new node on each call
velocity_publisher = rospy.Publisher('/mobile_base_controller/cmd_vel', Twist, queue_size=10)

def distanceCallback(data):
    global distance
    global distance_available
    distance = data.data
    distance_available = True

rospy.Subscriber("distance", Int32, distanceCallback)

def getDistance():
    dist_request = rospy.Publisher('distance_request', Empty, queue_size=10)
    rospy.init_node('robot_api', anonymous=True)
    empty = Empty()
    dist_request.publish(empty)

    global distance
    global distance_available
    while not distance_available:
        # small wait time as to not overload the arduino with requests when 
        # continuously requesting the distance
        time.sleep(0.1) 
        
    
    distance_available = False
    return distance

def display_text(text):
    text_publisher = rospy.Publisher('display_text', String, queue_size=10)
    rospy.init_node('robot_api', anonymous=True)
    time.sleep(1)
    rospy.loginfo(text)
    text_publisher.publish(text)

def set_name(name):
    global my_name
    my_name=name

def get_name():
    return my_name

def turn(direction, speed):
    #Starts a new node
    rospy.init_node('robot_api', anonymous=True)
    time.sleep(1)
    vel_msg = Twist()

    #We wont use linear components
    vel_msg.linear.x=0
    vel_msg.linear.y=0
    vel_msg.linear.z=0
    vel_msg.angular.x = 0
    vel_msg.angular.y = 0

    if direction == 'right':
        vel_msg.angular.z = -speed
    else:
        vel_msg.angular.z = speed

    velocity_publisher.publish(vel_msg)

def move(direction, speed):
    if direction == 'backward':
        speed = -speed

    #Starts a new node
    rospy.init_node('robot_api', anonymous=True)
    time.sleep(1)
    vel_msg = Twist()

    vel_msg.linear.x=speed
    vel_msg.linear.y=0
    vel_msg.linear.z=0
    vel_msg.angular.x = 0
    vel_msg.angular.y = 0
    vel_msg.angular.z = 0

    velocity_publisher.publish(vel_msg)

def turnAngle(angle=90):
    #Starts a new node
    rospy.init_node('robot_api', anonymous=True)
    time.sleep(1) 
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
