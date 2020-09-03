
class Node:
    def __init__(self, value, next):
        self.value = value
        self.next = next
    
    def __str__(self):
        return f'({self.value},{self.next})'

class LinkedList:
    def __init__(self):
        self.root = None

    def append(value):  # add the value to the end
        if self.root is None: # if there's no root
            self.root = Node(value, None) # make a root
        # loop until we get to the end
        node = self.root
        while node.next is not None:
            node = node.next
        # add our node to the end
        node.next = Node(value, None)
    
    def access(index):
        # loop through our nodes
        node = self.root
        while node is not None:
            if index == 0:
                return node.value
            index -= 1 # decrement the index
            node = node.next # advance our node
        # if we run out of nodes, return None
        return None

    def remove(value):
        # if there's no root, bail
        if self.root is None:
            return
        # if the root has the value, replace the root
        else if self.root.value == value:
            self.root = self.root.next
        # loop through the nodes looking for the value
        node = self.root
        while node.next is not None:
            if node.next.value == value:
                # replace the node
                node.next = node.next.next
                break
    
    def find(value):
        index = 0
		# loop through our nodes
        node = self.root
        while node is not None:
			# if we've found the value, return
            if node.value == value:
                return index
			# increment the index
            index += 1
        return -1
    
    def length(self): 
        # count up the nodes
        counter = 0
        node = self.root
        while node is not None:
            counter += 1
        return counter