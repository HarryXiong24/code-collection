# Project Overview

# Quick Start

1. Make sure to navigate to the appropriate directory in the terminal.
2. Run the program using the command `python main.py`.

---

There are two ways to test the program:

### a. Using Your Own .txt Test File

- Simply place your test file in the `tests` folder and run the program.

### b. Generating Test Cases Using Our Program

- Open the `main.py` file and locate the `generate_tests()` method, which is used to generate test files.
- Add your desired test cases using the following example:
  ```python
  generate_test_file(10, 8, dir_name)
  ```

Parameters:

- The first parameter is the size of arr.
- The second parameter is the number of k.
- The third parameter specifies where the generated file will be stored (default is `./tests`).

### c. Setting your thresholds

- We can set thresholds in the Quick Select and Median-of-five Functions. Just setting an array in the `execute_tests(thresholds=[5, 10, 20, 50, 100])` function in the `main.py` file.
- The default thresholds is 10.

Once your test cases are ready, run the command `python main.py` in the terminal from the current directory to execute the program. The result will be displayed in the terminal.

---
### Reporting and Cross-Validation

In addition to executing tests, this project also supports generating reports and performing cross-validation:

- **`main_for_report`**: This method is specifically designed for generating reports. It includes additional functionality for plotting graphs, making it easy to visualize the results of the tests. You can use this method to produce detailed reports with graphical insights.
  
- **`report_tests`**: This function is used for cross-validation purposes. It allows you to test and validate the performance of different methods across multiple test cases, ensuring that the results are robust and reliable.

By using both of these components, you can generate comprehensive reports while also performing thorough validation of your methods.
