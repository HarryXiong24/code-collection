from sort_and_return import in_built_sort


def median_of_n_sort(arr: list[int], k: int, threshold: int = 10) -> int:
    if len(arr) <= threshold:
        return in_built_sort(arr, k)
      
    # Divide the array into chunks of 5
    chunks = []
    for i in range(0, len(arr), 5):
        chunk = arr[i:i + 5] 
        chunks.append(chunk)
      
    # Find the median of each chunk
    medians = []
    for chunk in chunks:
        chunk_sorted = sorted(chunk) 
        median = chunk_sorted[len(chunk_sorted) // 2] 
        medians.append(median)

    # Find the median of the medians
    pivot = median_of_n_sort(medians, len(medians) // 2 + 1, threshold)

    left = []
    right = []
    mid = []
    for num in arr:
        if num < pivot:
            left.append(num) 
        elif num > pivot:
            right.append(num)  
        else:
            mid.append(num) 

    if k <= len(left): 
        return median_of_n_sort(left, k, threshold)
    elif len(left) < k <= len(left) + len(mid): 
        return pivot
    else: 
        return median_of_n_sort(right, k - len(left) - len(mid), threshold)