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

# needs to be done before init_node
#dist_request = rospy.Publisher('distance_request', Empty, queue_size=10)

def test(data):
    a = 10

rospy.Subscriber('distance', Int32, test)



zoef = {}

class Robot():
    def __init__(self):
        self.dist_request = rospy.Publisher('distance_request', Empty, queue_size=10)
        rospy.init_node('robot_api', anonymous=True)
        rospy.Subscriber('distance', Int32, self.distanceCallback)
        #self.dist_request = rospy.Publisher('distance_request', Empty, queue_size=10)
        self.distance = 0
        self.distance_available = False

    def distanceCallback(self, data):
        self.distance = data.data
        self.distance_available = True

    def getDistance(self):
        empty = Empty()
        self.dist_request.publish(empty)
        while not self.distance_available:
           time.sleep(0.1)
        self.dist_available = False
        return self.distance

    def stop(self):
        print "stoppping robot"

def createRobot():
    global zoef
    zoef = Robot()
    return zoef

def signal_handler(sig, frame):
    print('goodbye')
    zoef.stop()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)
