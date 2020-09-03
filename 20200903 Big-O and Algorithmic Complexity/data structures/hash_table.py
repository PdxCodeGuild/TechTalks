class HashTable:
    def __init__(self):
        self.slots = [None for _ in range(100)]
    
    def insert(self, key, value):
        key_hash = self.hash(key)
        self.slots[key_hash] = value
    
    def access(self, key):
        key_hash = self.hash(key)
        return self.slots[key_hash]
    
    def remove(self, key):
        key_hash = self.hash(key)
        self.slots[key_hash] = None
    
    def hash(self, key):
        output = 0
        multiplier = 1
        for char in key:
            output += ord(char)*multiplier
            multiplier *= 10
        output %= len(self.slots)
        return output

hash_table = HashTable()
hash_table.insert('apples', 1.0)
print(hash_table.access('apples'))
hash_table.insert('bananas', 1.5)
print(hash_table.access('bananas'))