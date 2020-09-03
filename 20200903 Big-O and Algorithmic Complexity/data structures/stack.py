class Node:
    def __init__(self, value, next):
        self.value = value
        self.next = next

class Stack:
    def __init__(self):
        self.root = None
    
    def push(self, value):
        self.root = Node(value, self.root)
    
    def pop(self):
        if self.root is None:
            return None
        value = self.root.value
        self.root = self.root.next
        return value
    
    def peek(self):
        if self.root is None:
            return None
        return self.root.value

# class Stack:
#     def __init__(self):
#         self.elements = []
    
#     def push(self, value):
#         self.elements.append(value)
    
#     def pop(self):
#         if len(self.elements) == 0:
#             return None
#         element = self.elements.pop(len(self.elements)-1)
#         return element
    
#     def peek(self):
#         return self.elements[len(self.elements)-1]