from datetime import datetime, timedelta
from typing import Optional, Dict, Any

def date_calculator(date1: str, date2: Optional[str] = None, operation: str = "diff", value: int = 0, weekday: Optional[int] = None) -> Dict[str, Any]:
    """
    Perform date calculations: difference, add/subtract days, next/previous weekday.

    Args:
        date1 (str): The first date in YYYY-MM-DD format.
        date2 (Optional[str]): The second date for 'diff' operation.
        operation (str): One of 'diff', 'add_days', 'sub_days', 'next_weekday', 'prev_weekday'.
        value (int): Number of days to add/subtract (for add/sub_days).
        weekday (Optional[int]): Target weekday (0=Monday, 6=Sunday) for next/prev_weekday.

    Returns:
        Dict[str, Any]: Result of the date operation, or error key if invalid input.
    """
    try:
        d1 = datetime.strptime(date1, "%Y-%m-%d")
        if operation == "diff" and date2:
            d2 = datetime.strptime(date2, "%Y-%m-%d")
            days = (d2 - d1).days
            return {"days_between": days}
        elif operation == "add_days":
            new_date = d1 + timedelta(days=value)
            return {"result": new_date.strftime("%Y-%m-%d")}
        elif operation == "sub_days":
            new_date = d1 - timedelta(days=value)
            return {"result": new_date.strftime("%Y-%m-%d")}
        elif operation == "next_weekday" and weekday is not None:
            days_ahead = (weekday - d1.weekday() + 7) % 7
            if days_ahead == 0:
                days_ahead = 7
            new_date = d1 + timedelta(days=days_ahead)
            return {"result": new_date.strftime("%Y-%m-%d")}
        elif operation == "prev_weekday" and weekday is not None:
            days_behind = (d1.weekday() - weekday + 7) % 7
            if days_behind == 0:
                days_behind = 7
            new_date = d1 - timedelta(days=days_behind)
            return {"result": new_date.strftime("%Y-%m-%d")}
        else:
            return {"error": "Invalid operation or missing parameters."}
    except Exception as e:
        return {"error": str(e)} 