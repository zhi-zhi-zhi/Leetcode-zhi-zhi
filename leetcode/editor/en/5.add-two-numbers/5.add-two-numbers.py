# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        if not l1: return l2
        if not l2: return l1

        dummy = ListNode()
        p = dummy
        num1, num2, carry = 0, 0, 0

        while l1 or l2 or carry:
            num1, num2 = 0, 0
            if l1: num1, l1 = l1.val, l1.next
            if l2: num2, l2 = l2.val, l2.next
            p.next = ListNode((num1 + num2 + carry) % 10)
            p = p.next
            carry = (num1 + num2 + carry) // 10

        return dummy.next
