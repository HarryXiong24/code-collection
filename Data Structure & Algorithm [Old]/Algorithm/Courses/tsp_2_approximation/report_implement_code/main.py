import os
from generate_graph import generate_test_file, validate_triangle_inequality
from tsp_2_approximation import tsp_2_approximation
from utils import read_file
import time

def generate_tests(dir_name: str = "./tests"):
    """
    Generate test files
    """
    generate_test_file(5, 10, True, dir_name)
    generate_test_file(5, 10, False, dir_name)
    generate_test_file(50, 100, True, dir_name)
    generate_test_file(10, 500, True, dir_name)
    generate_test_file(500, 1000, True, dir_name)
    
def execute_tests(dir_name: str = "./tests"): 
    """
    Execute test
    """
    try:
        files = os.listdir(dir_name)
        file_names = [file for file in files if os.path.isfile(os.path.join(dir_name, file))]
        
        for file_name in file_names:
            print("------------------------")
            print(f"Executing test: {file_name}")    
            start_time = time.time()
            
            vertex_count, edges_count, edges  = read_file(f"{dir_name}/{file_name}")
            
            print("------")
            print("Validating triangle inequality...")
            validate_triangle_inequality(edges, vertex_count)
            
            print("------")
            tsp_2_approximation(vertex_count, edges_count, edges)
            
            end_time = time.time()  
            print("------")
            print(f"Run time: {end_time - start_time:.6f} s")
            
    except FileNotFoundError:
        print("Directory not found")

def main():
    generate_tests()
    execute_tests()

if __name__ == "__main__":
    main()
