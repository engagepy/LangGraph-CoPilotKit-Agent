"""
GST Calculator Tool for India
"""

def gst_calculator(amount: float, bracket: float) -> dict:
    """
    Calculate GST for a given amount and GST bracket (0, 5, 12, 18, 28).

    Args:
        amount (float): The base amount before GST.
        bracket (float): GST percentage bracket (must be one of 0, 5, 12, 18, 28).

    Returns:
        dict: Contains base, gst, total, and bracket info. If invalid bracket, returns error key.
    """
    if bracket not in [0, 5, 12, 18, 28]:
        return {"error": "Invalid GST bracket. Choose from 0, 5, 12, 18, 28."}
    gst = amount * bracket / 100
    total = amount + gst
    return {
        "base": round(amount, 2),
        "gst": round(gst, 2),
        "total": round(total, 2),
        "bracket": f"{bracket}%"
    } 