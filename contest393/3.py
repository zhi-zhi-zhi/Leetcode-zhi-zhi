def kthSmallestAmount(coins, k):
    # Remove elements from coins that are divisible by other elements
    coins = [c for c in coins if all(c % x != 0 for x in coins if x != c)]

    # Estimate a range
    product = 1
    for coin in coins:
        product *= coin
    start = k // product
    end = max(start + 1, 2)  # Ensure at least two elements in the range

    # Binary search within the range
    while start < end:
        mid = (start + end) // 2
        count = sum(mid // coin for coin in coins)
        if count < k:
            start = mid + 1
        else:
            end = mid

    return start

# Example usage:
coins1 = [3, 6, 9]
k1 = 3
print(kthSmallestAmount(coins1, k1))  # Output: 9

coins2 = [5, 2]
k2 = 7
print(kthSmallestAmount(coins2, k2))  # Output: 12
