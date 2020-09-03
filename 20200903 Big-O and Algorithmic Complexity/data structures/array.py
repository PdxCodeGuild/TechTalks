class Array:
    def __init__(self):
        self.elements = []
    
    def access(self, index):
        return self.elements[index]
    
    def append(self, value):
        # allocate a new array with a blank spot at the end
        temp = [None]*(len(self.elements)+1)
        # copy the old array data over
        for i in range(len(self.elements)):
            temp[i] = self.elements[i]
        # put the new value at the end
        temp[len(temp)-1] = value
        # replace the old array with the new one
        self.elements = temp
    
    def remove(self, index):
        # allocate a new array with one less spot
        temp = [None]*(len(self.elements)-1)
        # copy the old array data over
        # skipping over the index to remove
        for i in range(len(self.elements)):
            if i < index:
                temp[i] = self.elements[i]
            elif i > index:
                temp[i-1] = self.elements[i]
        # replace the old array with the new one
        self.elements = temp
    
    def find(self, value):
        for i in range(len(self.elements)):
            if self.elements[i] == value:
                return i
        return None
    
    def __str__(self):
        return str(self.elements)

nums = Array()
nums.append(1)
nums.append(2)
nums.append(3)
print(nums)
print(nums.access(2))
print(nums.search(3))