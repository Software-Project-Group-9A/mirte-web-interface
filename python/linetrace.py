#!/usr/bin/env python

import time
import sys
import inspect
import signal
import imp
import os


dirname, filename = os.path.split(os.path.abspath(sys.argv[0]))
stepper = False

def debug_signal_handler(signal, frame):
     global stepper
     stepper = True

signal.signal(signal.SIGINT, debug_signal_handler)

#TODO: use semotehing else than files. for stepping it is fine, but too slow for running
def trace_lines(frame, event, arg):
    global stepper, myPrint
    if event != 'line':
        return
    line_no = frame.f_lineno
    print line_no #TODO: to file
    f = open(dirname + "/linenr.log", "w")
    f.write(str(line_no) + "\n")
    f.flush()
    f.close()
    if stepper:
       inp = raw_input()
       if inp == "c":
           stepper = False

def traceit(frame, event, arg):
    global stepper
    co = frame.f_code
    filename = co.co_filename
    if not filename.endswith('zoef.py'):
        return
    return trace_lines

sys.settrace(traceit)

# rospy.init_node() for some reason needs to be called from __main__ when importing in the regular way.
# https://answers.ros.org/question/266612/rospy-init_node-inside-imported-file
test = imp.load_source("zoef", "python/zoef.py")

f = open(dirname + "/linenr.log", "w")
f.write("0")
f.flush()
f.close()

