

# https://matplotlib.org/3.1.0/gallery/color/named_colors.html

from numpy import *
import math
import matplotlib.pyplot as plt
from scipy.special import gamma

t = linspace(0, 20, 400)
a = [1 for n in t]
b = log(t+1)
c = t
d = (t+1)*log(t+1)
e = t*t
f = (pow(2, t)-1)*2
g = (gamma(t+2)-1)*2

plt.xlim(-1, 20)
plt.ylim(-1, 40)
plt.axvline(x=0, ymin=-10, ymax=10, c='black')
plt.axhline(y=0, xmin=-10, xmax=10, c='black')
line0, = plt.plot(t, a, 'green', label='O(1)')
line6, = plt.plot(t, g, 'red', label='O(n!)')
line5, = plt.plot(t, f, 'orange', label='O(2ⁿ)')
line4, = plt.plot(t, e, 'gold', label='O(n²)')
line3, = plt.plot(t, d, 'yellow', label='O(nlog(n))')
line2, = plt.plot(t, c, 'lightgreen', label='O(n)')
line1, = plt.plot(t, b, 'limegreen', label='O(log(n))')

plt.xlabel("n")
plt.ylabel("g(n)")
plt.legend(handles=[line6, line5, line4, line3, line2, line1, line0], prop={'size': 10})
plt.show()