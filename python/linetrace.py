#!/usr/bin/env python

import time
import sys
import inspect
import signal
import imp

stepper = False

class CustomPrint():
    def __init__(self):
        self.old_stdout=sys.stdout
        self.line = False

    def write(self, text):
        text = text.rstrip()
        if len(text) == 0: return
        if self.line:
           self.old_stdout.write('line: ' + text + '\n')
        else:
           self.old_stdout.write('out: ' + text + '\n')

    def setLine(self, line):
        self.line = line

myPrint = CustomPrint()
sys.stdout = myPrint

def debug_signal_handler(signal, frame):
     global stepper
     stepper = True

signal.signal(signal.SIGINT, debug_signal_handler)

def trace_lines(frame, event, arg):
    global stepper, myPrint
    if event != 'line':
        return
    line_no = frame.f_lineno
    myPrint.setLine(True)
    print line_no
    myPrint.setLine(False)
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
test = imp.load_source("zoef", "zoef.py")
