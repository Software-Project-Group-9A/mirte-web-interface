#!/usr/bin/env python
#TODO: for debugging purposes we could *also* listen to keyboard events

import sys
import imp
import time
import multiprocessing
from websocket_server import WebsocketServer

# Already load rospy (whicht takes long) and robot, so zoef.py does not need to do this anymore
import rospy
import robot

# Global shared memory objects (TODO: check if we need shared memory, why is server working?)
stepper = multiprocessing.Value('b', True)
do_step = multiprocessing.Value('b', False)

def stop_zoef():
     process.terminate()

def load_zoef_module(stepper, do_step):

    def trace_lines(frame, event, arg):
       global do_step
       if event != 'line':
           return
       server.send_message_to_all(str(frame.f_lineno))
       while stepper.value and not do_step.value:
          time.sleep(.01)
       do_step.value = False

    def traceit(frame, event, arg):
       co = frame.f_code
       filename = co.co_filename
       if not filename.endswith('zoef.py'):
          return
       return trace_lines

    sys.settrace(traceit)
    # rospy.init_node() for some reason needs to be called from __main__ when importing in the regular way.
    # We thereofe need to load teh module from source instead of importing it.
    # https://answers.ros.org/question/266612/rospy-init_node-inside-imported-file
    test = imp.load_source("zoef", "/home/zoef/workdir/zoef.py")
    server.send_message_to_all("0")

process = multiprocessing.Process(target = load_zoef_module, args=(stepper, do_step))

def start_zoef():
    global process
    process = multiprocessing.Process(target = load_zoef_module, args=(stepper, do_step))
    process.start()

def message_received(client, server, message):
   global stepper, do_step
   if message == "b": #break (pause)
      stepper.value = True
   if message == "c": #continue (play)
      stepper.value = False
      if not process.is_alive():
         start_zoef()
   if message == "s": #step (step)
      do_step.value = True
   if message == "e": #exit (stop)
      stepper.value = True
      do_step.value = False
      stop_zoef()

server = WebsocketServer(host="0.0.0.0", port=8001)
server.set_fn_message_received(message_received)
server.serve_forever()
