

import  chart_complexity
import random


# Average is O(n) =============================================


def average(nums):
    total = 0
    i = 0
    while i < len(nums):
        chart_complexity.counter += 1
        total += nums[i]
        i += 1
    average = total / len(nums)
    return average

# number_of_trials = 100
# n_min = 1
# n_max = 250
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, average)


# Random Element is O(1) =======================================

def random_element(nums):
    chart_complexity.counter += 1
    return nums[random.randint(0, len(nums)-1)]

# number_of_trials = 1
# n_min = 1
# n_max = 250
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, random_element)

# Linear Search is O(n) ========================================

def linear_search(nums, target):
    for i in range(len(nums)):
        chart_complexity.counter += 1
        if nums[i] == target:
            return i
    return None

# def test_linear_search(nums):
#     target = random.choice([random.choice(nums), None])
#     linear_search(nums, target)

# number_of_trials = 1000
# n_min = 1
# n_max = 250
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, test_linear_search)


# Binary Search is O(log(n)) ========================================


def binary_search(nums, target):
    low = 0 # lower bound
    high = len(nums) - 1 # upper bound
    while low <= high: # loop while our range is valid
        chart_complexity.counter += 1
        middle = (low + high)//2 # index in the middle of our search range
        if nums[middle] > target: # if the middle number is greater than our target
            high = middle # shift range to the lower half
        elif nums[middle] < target: # if the middle number is less than our target
            low = middle # shift search range to the upper half
        else: # the middle number is equal to our target
            return middle # return the middle index
    return None # we couldn't fine the target number

# def test_binary_search(nums):
#     nums.sort()
#     target_index = random.randint(0, len(nums)-1)
#     binary_search(nums, nums[target_index])

# number_of_trials = 1000
# n_min = 1
# n_max = 250
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, test_binary_search)



# Find Pair is O(n^2) ========================================

def find_pair(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            chart_complexity.counter += 1
            if nums[i] + nums[j] == target:
                return [nums[i], nums[j]]
    return None

# def test_find_pair(nums):
#     target = random.choice([random.choice(nums) + random.choice(nums), 0])
#     find_pair(nums, target)

# number_of_trials = 1000
# n_min = 1
# n_max = 100
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, test_find_pair)

# Common Elements is O(n^2) ========================================

def common_elements(nums1, nums2):
    output = []
    for num1 in nums1:
        for num2 in nums2:
            chart_complexity.counter += 1
            if num1 == num2:
                output.append(num1)
    return output

# def test_common_elements(nums):
#     common_elements(nums[:len(nums)//2], nums[len(nums)//2:])

# number_of_trials = 1000
# n_min = 1
# n_max = 100
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, test_common_elements)


# Iterative Fibonacci is O(n) ========================================

def fibonacci_iterative(n):
    a = 1
    b = 1
    for num in range(n-1):
        c = a + b
        a = b
        b = c
    return c

# n_min = 0
# n_max = 25
# n_step = 1
# number_of_trials = 1
# chart_complexity.chart_complexity_value(n_min, n_max, n_step, number_of_trials, fibonacci_iterative)

# Recursive Fibonacci is O(2^n) ========================================


def fibonacci_recursive(n):
    chart_complexity.counter += 1
    if n == 0 or n == 1:
        return 1
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# n_min = 0
# n_max = 25
# n_step = 1
# number_of_trials = 1
# chart_complexity.chart_complexity_value(n_min, n_max, n_step, number_of_trials, fibonacci_recursive)


# Towers of Hanoi is O(2^n) ========================================

def towers_of_hanoi(n , source, destination, auxiliary): 
    if n == 1: 
        print('moving disk 1 from ' + source + ' to ' + destination)
        return
    towers_of_hanoi(n-1, source, auxiliary, destination) 
    print('moving disk ' + n + ' from ' + source + ' to ' + destination)
    towers_of_hanoi(n-1, auxiliary, destination, source) 

# n = 4
# towers_of_hanoi(n, 'A', 'B', 'C') # A, C, B are the name of rods


# Traveling Salesperson is O(n!) ========================================

# https://ericphanson.com/blog/2016/the-traveling-salesman-and-10-lines-of-python/

import itertools
import math
import matplotlib.pyplot as plt

def distance(city_a, city_b):
    dx = city_b[0] - city_a[0]
    dy = city_b[1] - city_a[1]
    return math.sqrt(dx*dx + dy*dy)

def traveling_salesperson(n):
    cities = [(random.randint(0, 100), random.randint(0, 100)) for i in range(n)]
    possible_paths = list(itertools.permutations(cities, len(cities))) # generate all possible arrangements
    path_lengths = [0]*len(possible_paths) # create an array for length of each possible path
    for i in range(len(possible_paths)): # for each path
        for j in range(len(possible_paths[i])-1): # for each city in the path
            path_lengths[i] += distance(possible_paths[i][j], possible_paths[i][j+1]) # distance between cities
        path_lengths[i] += distance(possible_paths[i][0], possible_paths[i][-1]) # distance from the end to the start
    min_path_length = min(path_lengths) # find the minimum length
    min_path = possible_paths[path_lengths.index(min_path_length)] # find the path with that length
    # make a chart
    min_path_x = [min_path[i][0] for i in range(len(min_path))] + [min_path[0][0]]
    min_path_y = [min_path[i][1] for i in range(len(min_path))] + [min_path[0][1]]
    plt.plot(min_path_x, min_path_y, 'xb-')
    plt.show()

# n_min = 0
# n_max = 10
# n_step = 1
# number_of_trials = 1
# chart_complexity.chart_complexity_value(n_min, n_max, n_step, number_of_trials, traveling_salesperson)
