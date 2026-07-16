import os
import time
from median_of_n import median_of_n_sort
from quick_select import quick_select
from utils import generate_test_file, read_file
from brute_force import brute_force
import matplotlib.pyplot as plt


def generate_tests(dir_name: str = "./report_tests/thresholdsTuning"):
    """
    Generate test files
    """
    # generate_test_file(5, 3, dir_name)
    # generate_test_file(10, 8, dir_name)
    # generate_test_file(20, 8, dir_name)
    # generate_test_file(30, 8, dir_name)
    # generate_test_file(40, 8, dir_name)
    # generate_test_file(50, 8, dir_name)
    # generate_test_file(100, 80, dir_name)
    # generate_test_file(500, 300, dir_name)
    generate_test_file(1000, 800, dir_name)

def execute_tests(thresholds: list[int], dir_name: str): 
    """
    Execute test
    """
    if not os.path.exists(dir_name):
        print(f"Directory not found: {dir_name}")
        return
    
    files = os.listdir(dir_name)
    file_names = [file for file in files if os.path.isfile(os.path.join(dir_name, file))]
    # file_names_sorted = sorted(file_names, key=lambda x: int(x.split('_')[1]))

    print(file_names)
    times_brute_force = []
    times_quick_select = []
    times_median = []
    sizes=[]

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
            # sizes.append(len(arr))
            sizes.append(threshold)
            # Measure time for each method
            for method_name, method, times_list in [
                        ("Quick", quick_select, times_quick_select),
                        ("Median", median_of_n_sort, times_median)
                    ]:
            # for method_name, method, times_list in [
            #             ("Brute Force", brute_force, times_brute_force),
            #             ("Quick", quick_select, times_quick_select),
            #             ("Median", median_of_n_sort, times_median)
            #         ]:
                start = time.time()
                result = method(arr, k, threshold)
                elapsed = time.time() - start
                # print(f"result: {result}")
                times_list.append(elapsed)
                print(f"{method_name}: {elapsed:.10f}")

    plt.figure(figsize=(10, 6))
    # plt.plot(sizes, times_brute_force, label="Brute Force", marker='o')
    plt.plot(sizes, times_quick_select, label="Quick Select", marker='o')
    plt.plot(sizes, times_median, label="Median", marker='o')

    # plt.title("Method Execution Time vs Array Size")
    # plt.title("Method Execution Time vs Large Array Size")
    plt.title("Method Execution Time vs Different Thresholds")
    plt.xlabel("threshold")
    plt.ylabel("Execution Time (second)")
    plt.legend()
    plt.grid()
    plt.show()


def main():
    # generate_tests()
    # execute_tests(thresholds=[1, 5, 10, 20, 50, 100])
    # execute_tests(thresholds=[5],dir_name="./report_tests/brute")
    # execute_tests(thresholds=[10],dir_name="./report_tests/quickAndMedian")
    execute_tests(thresholds=[1,5,10,20,50,100,200,500],dir_name="./report_tests/thresholdsTuning")

if __name__ == "__main__":
    main()

