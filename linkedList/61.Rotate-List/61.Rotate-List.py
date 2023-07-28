# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
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
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        """
        Time complexity: O(n)
        Space complexity: O(1)
        :param head:
        :param k:
        :return:
        """
        if not head:
            return None

        p = head
        n = 0
        while p:
            p = p.next
            n += 1
        k %= n

        slow, fast = head, head
        while k > 0:
            k -= 1
            fast = fast.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next

        fast.next = head
        res = slow.next
        slow.next = None

        return res
