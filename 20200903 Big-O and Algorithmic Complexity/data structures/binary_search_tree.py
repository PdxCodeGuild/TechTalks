class Node: 
    def __init__(self, value): 
        self.left = None
        self.right = None
        self.value = value 

class BinarySearchTree:
    
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        node = Node(value)
        if self.root is None:
            self.root = node
        else:
            self.insert_recursive(self.root, node)

    def insert_recursive(self, root, node):
        if root.value < node.value: 
            if root.right is None: 
                root.right = node
            else: 
                self.insert_recursive(root.right, node) 
        else: 
            if root.left is None: 
                root.left = node 
            else: 
                self.insert_recursive(root.left, node)
    
    def print(self):
        self.print_recursive(self.root)
    
    def print_recursive(self, node): 
        if node: 
            self.print_recursive(node.left) 
            print(node.value) 
            self.print_recursive(node.right) 

    # https://stackoverflow.com/questions/34012886/print-binary-tree-level-by-level-in-python
    def display(self):
        lines, *_ = self._display_aux(self.root)
        for line in lines:
            print(line)

    def _display_aux(self, node):
        """Returns list of strings, width, height, and horizontal coordinate of the root."""
        # No child.
        if node.right is None and node.left is None:
            line = '%s' % node.value
            width = len(line)
            height = 1
            middle = width // 2
            return [line], width, height, middle

        # Only left child.
        if node.right is None:
            lines, n, p, x = self._display_aux(node.left)
            s = '%s' % node.value
            u = len(s)
            first_line = (x + 1) * ' ' + (n - x - 1) * '_' + s
            second_line = x * ' ' + '/' + (n - x - 1 + u) * ' '
            shifted_lines = [line + u * ' ' for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, n + u // 2

        # Only right child.
        if node.left is None:
            lines, n, p, x = self._display_aux(node.right)
            s = '%s' % node.value
            u = len(s)
            first_line = s + x * '_' + (n - x) * ' '
            second_line = (u + x) * ' ' + '\\' + (n - x - 1) * ' '
            shifted_lines = [u * ' ' + line for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, u // 2

        # Two children.
        left, n, p, x = self._display_aux(node.left)
        right, m, q, y = self._display_aux(node.right)
        s = '%s' % node.value
        u = len(s)
        first_line = (x + 1) * ' ' + (n - x - 1) * '_' + s + y * '_' + (m - y) * ' '
        second_line = x * ' ' + '/' + (n - x - 1 + u + y) * ' ' + '\\' + (m - y - 1) * ' '
        if p < q:
            left += [n * ' '] * (q - p)
        elif q < p:
            right += [m * ' '] * (p - q)
        zipped_lines = zip(left, right)
        lines = [first_line, second_line] + [a + u * ' ' + b for a, b in zipped_lines]
        return lines, n + m + u, max(p, q) + 2, n + u // 2




import random
nums = [random.randint(1,999) for _ in range(40)]
tree = BinarySearchTree()
for num in nums:
    tree.insert(num)
    tree.display()
    print()

