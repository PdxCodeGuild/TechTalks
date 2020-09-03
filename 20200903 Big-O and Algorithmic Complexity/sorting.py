import random
import chart_complexity

# Bogo Sort is O(n*n!) ========================================

def bogosort(nums):
    while True:
        # Fisher–Yates shuffle
        for i in range(len(nums)): # iterate through the indices
            j = random.randint(0, len(nums)-1) # random index
            nums[i], nums[j] = nums[j], nums[i] # swap
            chart_complexity.counter += 1
        # check if the list is sorted
        is_sorted = True
        for i in range(len(nums)-1):
            if nums[i] > nums[i+1]: # compare each number and the next
                is_sorted = False
                break
            chart_complexity.counter += 1
        # if the list is sorted, we're done
        if is_sorted:
            break

# number_of_trials = 100
# n_min = 1
# n_max = 8
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, bogosort)

# Bubble Sort is O(n^2) ===========================================

def bubble_sort(nums): 
    for i in range(len(nums)): 
        # the last i elements are already in place 
        for j in range(len(nums)-i-1):
            # swap if the element is greater than the next
            if nums[j] > nums[j+1]:
                nums[j], nums[j+1] = nums[j+1], nums[j]

# number_of_trials = 100
# n_min = 1
# n_max = 250
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, bubble_sort)

# Selection Sort is O(n^2) =======================================
  
def selection_sort(nums):
    for i in range(len(nums)):
        # find the index of the lowest number
        # in the rest of the array
        min_index = i
        for j in range(i+1, len(nums)):
            if nums[j] < nums[min_index]:
                min_index = j
            chart_complexity.counter += 1
        # insert the lowest number at the given location
        nums[i], nums[min_index] = nums[min_index], nums[i]

# number_of_trials = 1
# n_min = 1
# n_max = 250
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, selection_sort)


# Insertion Sort is O(n^2) ================================================

def insertion_sort(nums):
    # Traverse through 1 to len(nums)
    for i in range(1, len(nums)):
        key = nums[i]
        # move elements of nums[0:i-1], that are greater than key, to one position ahead
        # of their current position
        j = i - 1
        while j >= 0 and key < nums[j]:
            nums[j+1] = nums[j]
            j -= 1
            chart_complexity.counter += 1
        nums[j+1] = key 

# number_of_trials = 1000
# n_min = 1
# n_max = 100
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, insertion_sort)

# Merge Sort is O(n*log(n))=================================================

def merge_sort(arr):
    if len(arr) <= 1:
        return
    
    # split the list into two halves
    mid = len(arr)//2
    left = arr[:mid]
    right = arr[mid:]

    # sort each half
    merge_sort(left) 
    merge_sort(right)

    i = 0
    j = 0
    k = 0
    
    # Copy data to temp arrays L[] and R[] 
    while i < len(left) and j < len(right): 
        if left[i] < right[j]: 
            arr[k] = left[i] 
            i += 1
        else: 
            arr[k] = right[j] 
            j += 1
        k += 1
        
    # Checking if any element was left 
    while i < len(left): 
        arr[k] = left[i] 
        i += 1
        k += 1
        
    while j < len(right): 
        arr[k] = right[j] 
        j += 1
        k += 1



# Quick Sort is O(n*log(n))================================================

# https://stackabuse.com/quicksort-in-python/

def partition(nums, low, high):
	i = low # index of smaller element
	pivot = nums[high] # pivot
	for j in range(low, high):
		# chart_complexity.counter += 1
		if nums[j] <= pivot: # if current element is smaller than or equal to pivot
			nums[i], nums[j] = nums[j], nums[i] # swap
			i = i + 1 # increment index of smaller element
	nums[i], nums[high] = nums[high], nums[i]
	return i

def quicksort_recursive(nums, low, high):
	if len(nums) == 1:
		return nums
	if low < high:
		# pi is partitioning index
        # nums[pi] is in the correct place
		pi = partition(nums, low, high)
		# sort both side of the partition
		quicksort_recursive(nums, low, pi-1)
		quicksort_recursive(nums, pi+1, high)

def quicksort(nums):
    quicksort_recursive(nums, 0, len(nums)-1)

nums = [random.randint(1,99) for _ in range(100)]
quicksort(nums)
print(nums)

# number_of_trials = 1000
# n_min = 1
# n_max = 100
# n_step = 1
# chart_complexity.chart_complexity(n_min, n_max, n_step, number_of_trials, quicksort)
