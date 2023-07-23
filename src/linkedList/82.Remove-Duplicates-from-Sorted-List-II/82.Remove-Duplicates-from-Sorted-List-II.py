# Definition for singly-linked list.
from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        return deleteDuplicatesVersion1(head)


def deleteDuplicatesVersion1(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Iterator
    Time complexity: O(n)
    Space complexity: O(1)
    """
    dummy = ListNode(100000)
    dummy.next = head
    p = dummy

    while p:
        while p.next:
            temp_next = p.next
            q = temp_next.next
            while q and q.val == temp_next.val:
                q = q.next
            if q != temp_next.next:
                p.next = q
            else:
                break
        p = p.next

    return dummy.next


def deleteDuplicatesVersion2(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Recursion
    Time complexity: O(n)
    Space complexity: O(n)
    """
    # base case
    if not head or not head.next:
        return head

    # No duplicate in the first part
    if head.next.val != head.val:
        head.next = deleteDuplicatesVersion2(head.next)
        return head

    # Duplicate exist in the first part
    cur = head
    while cur.next and cur.next.val == cur.val:
        cur = cur.next

    return deleteDuplicatesVersion2(cur.next)


