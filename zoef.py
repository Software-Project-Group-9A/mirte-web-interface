
import time



from numbers import Number

n = None


n = 1
for count in range(10):
  time.sleep(1)
  print(n)
  n = (n if isinstance(n, Number) else 0) + 1
