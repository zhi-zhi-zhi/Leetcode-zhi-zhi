"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""
from typing import Optional


class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return head

        # A -> B -> C
        # =>
        # A -> a -> B -> b -> C ->c
        p = head
        while p:
            p.next = Node(p.val, p.next, p.random)
            p = p.next.next

        # handle random
        copy = head.next
        p = head
        q = copy
        while p:
            q.random = q.random.next if q.random else q.random
            p = p.next.next
            q = p.next if p else p

        # A -> a -> B -> b -> C ->c
        # =>
        # A -> B -> C
        # a -> b -> c
        copy = head.next
        p = head
        q = copy

        while p:
            p.next = q.next
            p = p.next
            q.next = p.next if p else p
            q = q.next

        return copy
