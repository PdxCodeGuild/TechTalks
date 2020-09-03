class ArrayList:
    def __init__(self):
        self.elements = [None]*10
        self.length = 0
    
    def access(self, index):
        return self.elements[index]
    
    def append(self, value):
        # if we still have room, add the element at the end
        if self.length < len(self.elements):
            self.elements[self.length] = value
            self.length += 1
        else: # create a new array with double the length
            temp = [None]*(self.length*2)
            # copy the old array data over
            for i in range(self.length):
                temp[i] = self.elements[i]
            # put the new value at the end
            temp[self.length] = value
            # replace the old array with the new one
            self.elements = temp
            self.length += 1
    
    # def remove(self, index):
    #     for i in range(index, self.length):
    #         self.elements[i] = self.elements[i+1]
    #     self.elements[self.length-1] = None
    #     self.length -= 1
    
    def find(self, value):
        for i in range(self.length):
            if self.elements[i] == value:
                return i
        return None
    
    def len():
        return self.length
    
    def __str__(self):
        return str(self.elements[:self.length])

nums = ArrayList()
for i in range(10):
    nums.append(i)
print(nums.elements)
nums.remove(7)
print(nums.elements)