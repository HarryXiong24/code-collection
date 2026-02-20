# Project Overview

This project is written in Python and consists of two parts:

1. The implementation of the Minimum Spanning Tree (MST) algorithm.
2. Writing the report.

The code repository is divided into two folders that correspond to these two parts:

- `programming_requirements_answer` folder for the MST algorithm implementation.
- `report_implement_code` folder for the report implementation.

These two parts are independent and do not affect each other.

---

# Quick Start

1. Navigate to the corresponding folder in the terminal.
2. Run the program using the command `python main.py`.

> **Note:** When testing the code, make sure to navigate to the appropriate folder using `cd ./xxxxx` in the terminal.

---

# 1. `programming_requirements_answer` Folder

Inside the `programming_requirements_answer` folder, there are two ways to test the program:

### a. Using Your Own .txt Test File

- Simply place your test file in the `tests` folder and run the program.

### b. Generating Test Cases Using Our Program

- Open the `main.py` file and locate the `generate_tests()` method, which is used to generate test files.
- Add your desired test cases using the following example:
  ```python
  generate_test_file(500, 1000, False, dir_name)
  ```

Parameters:

- The first parameter is the number of nodes.
- The second parameter is the number of edges.
- The third parameter indicates whether the triangle inequality rule should be satisfied.
- The fourth parameter specifies where the generated file will be stored (default is `./tests`).
  
  Once your test cases are ready, run the command `python main.py` in the terminal from the current directory to execute the program. The result will be displayed in the terminal.

# 2. `report_implement_code` Folder

The testing process in the `report_implement_code` folder is similar to the one in the previous folder:

### a. Using Your Own .txt Test File

- Simply place your test file in the `tests` folder and run the program.

### b. Generating Test Cases Using Our Program

- Open the `main.py` file and locate the `generate_tests()` method.
- Add your desired test cases using the following example:
  
  ```python
  generate_test_file(500, 1000, False, dir_name)
  ```
  
  Parameters:
- The first parameter is the number of nodes.
- The second parameter is the number of edges.
- The third parameter indicates whether the triangle inequality rule should be satisfied.
- The fourth parameter specifies where the generated file will be stored (default is `./tests`).

Once your test cases are ready, run the command `python main.py` in the terminal from the current directory to execute the program. The result will be displayed in the terminal.


