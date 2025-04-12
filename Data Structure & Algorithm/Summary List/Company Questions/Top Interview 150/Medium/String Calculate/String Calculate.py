# Given a string for a calculator eg "3x2+10x4+2"
# return the result as an int = 48
# you can assume string is valid and has only x and + operands


# O(n)
def calculator(expression: str) -> int:
    # Split the expression by '+' to get individual terms
    terms = expression.split("+")
    result = 0

    # Iterate through each term
    for term in terms:
        # Split the term by 'x' to get the factors
        factors = term.split("x")
        product = 1

        # Multiply the factors within the term
        for factor in factors:
            product *= int(factor)

        # Add the product of factors to the result
        result += product

    return result


def calculator_stack(expression: str) -> int:
    stack = []
    num = 0
    operator = "+"

    for i, char in enumerate(expression):
        if char.isdigit():
            num = num * 10 + int(char)
        if char in ("+", "x") or i == len(expression) - 1:
            if operator == "+":
                stack.append(num)
            elif operator == "x":
                stack[-1] *= num

            operator = char
            num = 0

    return sum(stack)


# Test the function with the provided example
expression = "3x2+10x4+2"
result1 = calculator(expression)
print(result1)  # 48
result2 = calculator_stack(expression)
print(result2)  # 48
