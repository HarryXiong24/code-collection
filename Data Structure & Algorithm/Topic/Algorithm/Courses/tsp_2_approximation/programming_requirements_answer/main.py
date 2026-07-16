import os
from prim import prim
from generate_graph import generate_test_file
from utils import read_file

def generate_tests(dir_name: str = "./tests"):
    """
    Generate test files
    """
    generate_test_file(5, 10, False, dir_name)
    generate_test_file(50, 100, False, dir_name)
    generate_test_file(10, 500, False, dir_name)
    generate_test_file(500, 1000, False, dir_name)
    
def execute_tests(dir_name: str = "./tests"): 
    """
    Execute test
    """
    try:
        files = os.listdir(dir_name)
        file_names = [file for file in files if os.path.isfile(os.path.join(dir_name, file))]
        
        for file_name in file_names:
            print(f"Executing test: {file_name}")
            vertex_count, edges_count, edges  = read_file(f"{dir_name}/{file_name}")
            cost = prim(vertex_count, edges_count, edges)
            print(f"Cost: {cost}")
            print("------------------------")
    except FileNotFoundError:
        print("Directory not found")
           

def main():
    generate_tests()
    execute_tests()

if __name__ == "__main__":
    main()
