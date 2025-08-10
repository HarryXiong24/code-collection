import random


def read_file(filename: str) -> tuple[int, list[int]]:
    # open file and read
    with open(filename, "r") as file:
        lines = file.readlines()

    # Read n and m 
    k = int(lines[0].strip())  # first line: n
    
    # Reads subsequent rows as a tuple array
    arr = []
    for line in lines[1:]:  # start from the third line
        parts = line.strip().split()

        values = parts[0]
        arr.append(int(values))
        
    return k, arr
  
def generate_file(k: int, arr: list[int], filename: str):
    with open(filename, "w") as file:
        #  write k
        file.write(f"{k}\n")
        
        for item in arr:
            file.write(f"{item}" + "\n")
            
def generate_test_file(size: int, k: int, dir_name: str):
    arr = [random.randint(1, 1000000) for _ in range(size)]
    
    if k > size:
        print("k is greater than size")
        return

    generate_file(k, arr, filename=f"{dir_name}/test_{size}_{k}.txt")