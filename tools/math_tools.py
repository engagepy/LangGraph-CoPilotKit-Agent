def add(a: int, b: int) -> dict:
    """
     Adds two integers. Use ONLY for addition, never for subtraction or other operations.

    Args:
        a: first integer
        b: second integer

    Returns:
        A dict with fields:
            - operation: "add"
            - a: first input
            - b: second input
            - result: sum of a and b
            - expression: "a + b = result"
    """
    res = a + b
    return {
        "operation": "add",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} + {b} = {res}"
    }

def multiply(a: int, b: int) -> dict:
    """
    Multiplies two integers. Use ONLY for multiplication, never for addition or other operations.

    Args:
        a: first integer
        b: second integer

    Returns:
        A dict with fields:
            - operation: "multiply"
            - a, b: inputs
            - result: product of a and b
            - expression: "a * b = result"
    """
    res = a * b
    return {
        "operation": "multiply",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} * {b} = {res}"
    }

def divide(a: int, b: int) -> dict:
    """
    Divides a by b. Use ONLY for division, never for addition or other operations.

    Args:
        a: dividend integer
        b: divisor integer

    Returns:
        A dict with:
            - operation: "divide"
            - a, b: inputs
            - result and expression if b != 0
            - error message if b == 0
    """
    if b == 0:
        return {
            "operation": "divide",
            "a": a,
            "b": b,
            "error": "Division by zero"
        }
    res = a / b
    return {
        "operation": "divide",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} / {b} = {res}"
    }

def subtract(a: int, b: int) -> dict:
    """
    Subtracts b from a. Use ONLY for subtraction, never for addition or other operations.

    Args:
        a: first integer
        b: second integer

    Returns:
        A dict with fields:
            - operation: "subtract"
            - a: first input
            - b: second input
            - result: difference of a and b
            - expression: "a - b = result"
    """
    res = a - b
    return {
        "operation": "subtract",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} - {b} = {res}"
    }

def power(a: int, b: int) -> dict:
    """
    Raises a to the power of b. Use ONLY for power, never for addition or other operations.

    Args:
        a: base integer
        b: exponent integer

    Returns:
        A dict with fields:
            - operation: "power"
            - a: base input
            - b: exponent input
            - result: a raised to the power of b
            - expression: "a ^ b = result"
    """
    res = a ** b
    return {
        "operation": "power",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} ^ {b} = {res}"
    }

def modulo(a: int, b: int) -> dict:
    """
    Returns the remainder when a is divided by b. Use ONLY for modulo, never for addition or other operations.

    Args:
        a: dividend integer
        b: divisor integer

    Returns:
        A dict with:
            - operation: "modulo"
            - a, b: inputs
            - result and expression if b != 0
            - error message if b == 0
    """
    if b == 0:
        return {
            "operation": "modulo",
            "a": a,
            "b": b,
            "error": "Modulo by zero"
        }
    res = a % b
    return {
        "operation": "modulo",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} % {b} = {res}"
    }

def floor_divide(a: int, b: int) -> dict:
    """
    Performs floor division of a by b. Use ONLY for floor division, never for addition or other operations.

    Args:
        a: dividend integer
        b: divisor integer

    Returns:
        A dict with:
            - operation: "floor_divide"
            - a, b: inputs
            - result and expression if b != 0
            - error message if b == 0
    """
    if b == 0:
        return {
            "operation": "floor_divide",
            "a": a,
            "b": b,
            "error": "Floor division by zero"
        }
    res = a // b
    return {
        "operation": "floor_divide",
        "a": a,
        "b": b,
        "result": res,
        "expression": f"{a} // {b} = {res}"
    }