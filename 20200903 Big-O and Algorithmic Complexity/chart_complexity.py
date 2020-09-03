import random
import matplotlib.pyplot as plt

def chart_complexity(n_min, n_max, n_step, number_of_trials, algorithm):
    x_values = [] # x = list size
    y_values = [] # y = average number of steps
    for n in range(n_min, n_max, n_step): # different list sizes
        trial_sum = 0 # running sum of number of steps
        for i in range(number_of_trials): # many trials per list size
            global counter
            counter = 0 # reset our counter
            nums = [random.randint(1, 99) for _ in range(n)]
            algorithm(nums) # invoke the algorithm
            trial_sum += counter # add the number of steps to our running sum
        trial_average = trial_sum / number_of_trials # average number of steps
        x_values.append(n)
        y_values.append(trial_average)
        print(n, trial_average)
    plt.xlabel("n")
    plt.ylabel("f(n)")
    plt.plot(x_values, y_values)
    plt.show()

def chart_complexity_value(n_min, n_max, n_step, number_of_trials, algorithm):
    x_values = [] # x = list size
    y_values = [] # y = average number of steps
    for n in range(n_min, n_max, n_step): # different list sizes
        trial_sum = 0 # running sum of number of steps
        for i in range(number_of_trials): # many trials per list size
            global counter
            counter = 0 # reset our counter
            algorithm(n) # invoke the algorithm
            trial_sum += counter # add the number of steps to our running sum
        trial_average = trial_sum / number_of_trials # average number of steps
        x_values.append(n)
        y_values.append(trial_average)
        print(n, trial_average)
    plt.xlabel("n")
    plt.ylabel("f(n)")
    plt.plot(x_values, y_values)
    plt.show()

import time
def chart_complexity_time(n_min, n_max, n_step, number_of_trials, algorithm):
    x_values = []
    y_values = []
    for n in range(n_min, n_max, n_step):
        trial_sum = 0
        for i in range(number_of_trials):
            start_time = time.time()
            numbers = [random.randint(1, 99) for j in range(list_size)]
            algorithm(numbers)
            end_time = time.time()
            trial_time = end_time - start_time
            trial_sum += trial_time
        trial_average = trial_sum / number_of_trials
        print(list_size, trial_average)
    plt.xlabel("n")
    plt.ylabel("f(n)")
    plt.plot(x_values, y_values)
    plt.show()