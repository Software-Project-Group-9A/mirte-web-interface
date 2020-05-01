import time

x = None
y = None

# Describe this function...
def fibbonachi(x, y):
  print(x + y)
  fibbonachi(y, x + y)


fibbonachi(0, 1)
