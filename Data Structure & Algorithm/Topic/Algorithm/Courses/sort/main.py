import os
import time
from median_of_n import median_of_n_sort
from quick_select import quick_select
from utils import generate_test_file, read_file
from brute_force import brute_force


def generate_tests(dir_name: str = "./gtest"):
    """
    Generate test files
    """
    generate_test_file(10, 8, dir_name)
    generate_test_file(20, 8, dir_name)
    generate_test_file(100, 80, dir_name)
    generate_test_file(500, 300, dir_name)
    generate_test_file(1000, 800, dir_name)

def execute_tests(thresholds: list[int], dir_name: str = "./gtest"): 
    """
    Execute test
    """
    if not os.path.exists(dir_name):
        print(f"Directory not found: {dir_name}")
        return
    
    files = os.listdir(dir_name)
    file_names = [file for file in files if os.path.isfile(os.path.join(dir_name, file))]
    
    for file_name in file_names:
        try:
            k, arr = read_file(f"{dir_name}/{file_name}")  
        except FileNotFoundError:
            print(f"File not found: {file_name}")
            continue
        
        print("------------------------")
        for threshold in thresholds:
            print("------")
            print(f"Executing test: {file_name}") 
            print(f"Size: {len(arr)}")
            print(f"k: {k}")
            print(f"Threshold: {threshold}")
            
            # Measure time for each method
            for method_name, method in [("Brute Force", brute_force), 
                                        ("Quick", quick_select), 
                                        ("Median", median_of_n_sort)]:
                start = time.time()
                result = method(arr, k, threshold)
                elapsed = time.time() - start
                print(f"result: {result}")
                print(f"{method_name}: {elapsed:.10f}")


def main():
    generate_tests()
    execute_tests(thresholds=[1, 5, 10, 20, 50, 100])

if __name__ == "__main__":
    main()

