

# https://stackoverflow.com/questions/22276066/how-to-plot-multiple-functions-on-the-same-figure-in-matplotlib
# https://likegeeks.com/matplotlib-tutorial/
# https://matplotlib.org/tutorials/intermediate/legend_guide.html
# https://stackoverflow.com/questions/7125009/how-to-change-legend-size-with-matplotlib-pyplot
# https://subscription.packtpub.com/book/big_data_and_business_intelligence/9781849513265/4/ch04lvl1sec53/setting-an-axis-range
# https://matplotlib.org/api/_as_gen/matplotlib.pyplot.yscale.html

from numpy import *
import math
import matplotlib.pyplot as plt

t = linspace(-4, 10, 400)
a = 6*t*t + 3*t + 4
b = 7*t*t

plt.xlim(-1, 6)
plt.ylim(-50, 250)
plt.axvline(x=4, ymin=-10, ymax=10, c='lightblue')
plt.axhline(y=113, xmin=-10, xmax=10, c='lightblue')
line0, = plt.plot(t, a, 'b', label='6n² + 3*n + 4')
line1, = plt.plot(t, b, 'g', label='7n²')

plt.legend(handles=[line0, line1], prop={'size': 20})
plt.show()