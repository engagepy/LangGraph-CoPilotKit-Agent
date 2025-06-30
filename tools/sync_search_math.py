from typing import Dict, Any

def sync_search_math(search_query: str, operation: str, operand: float) -> Dict[str, Any]:
    """
    Search for a value (mocked), then apply a math operation to it.

    Args:
        search_query (str): The search query to find a value.
        operation (str): Math operation to apply ('add', 'subtract', 'multiply', 'divide').
        operand (float): The number to use in the operation.

    Returns:
        Dict[str, Any]: Contains search_query, found_value, operation, operand, result, or error key.
    """
    # Mock search result
    found_value = 100  # In real use, call a search API
    if operation == "add":
        result = found_value + operand
    elif operation == "subtract":
        result = found_value - operand
    elif operation == "multiply":
        result = found_value * operand
    elif operation == "divide":
        result = found_value / operand if operand != 0 else None
    else:
        return {"error": "Invalid operation."}
    return {
        "search_query": search_query,
        "found_value": found_value,
        "operation": operation,
        "operand": operand,
        "result": result
    } 