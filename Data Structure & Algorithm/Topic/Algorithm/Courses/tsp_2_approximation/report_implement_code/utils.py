def read_file(filename: str) -> tuple[int, int, list[list[int, int, float]]]:
    # open file and read
    with open(filename, "r") as file:
        lines = file.readlines()

    # Read n and m 
    n = int(lines[0].strip())  # first line: n
    m = int(lines[1].strip())  # second line: m
    
    # Reads subsequent rows as a tuple array
    edges_list = []
    for line in lines[2:]:  # start from the third line
        parts = line.strip().split()

        # 1st and 2nd as int, 3rd as float
        values = [int(parts[0]), int(parts[1]), float(parts[2])]
        edges_list.append(tuple(values))
        
    return n, m, edges_list
  
def generate_file(n: int, m: int, edges: list[list[int, int, float]], filename: str):
    """
     Generate files based on n, m, edges.
    """
    with open(filename, "w") as file:
        #  write n and m
        file.write(f"{n}\n")
        file.write(f"{m}\n")
        
        for weight in edges:
            file.write(" ".join(map(str, weight)) + "\n")