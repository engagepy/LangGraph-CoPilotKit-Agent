from typing import List, Dict, Optional, Any

def expense_splitter(contributions: List[Dict[str, float]], weights: Optional[List[float]] = None) -> Dict[str, Any]:
    """
    Split expenses among people, optionally using custom weights.

    Args:
        contributions (List[Dict[str, float]]): List of dicts with 'name' (str) and 'amount' (float) keys.
        weights (Optional[List[float]]): List of weights for custom split. Must match number of people.

    Returns:
        Dict[str, Any]: Contains total and per-person share/owes, or error key if input is invalid.
    """
    if not contributions or not isinstance(contributions, list):
        return {"error": "You must provide a non-empty list of contributions (list of dicts with 'name' and 'amount')."}
    names = [c['name'] for c in contributions]
    amounts = [c['amount'] for c in contributions]
    n = len(contributions)
    total = sum(amounts)
    if weights:
        if len(weights) != n:
            return {"error": "Weights length must match number of people."}
        total_weight = sum(weights)
        shares = [total * w / total_weight for w in weights]
    else:
        shares = [total / n] * n
    owes = []
    for i, name in enumerate(names):
        diff = round(shares[i] - amounts[i], 2)
        owes.append({"name": name, "owes": diff})
    return {"total": round(total, 2), "shares": owes} 