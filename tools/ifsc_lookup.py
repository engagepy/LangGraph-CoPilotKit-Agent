import requests
from typing import Dict, Any

def ifsc_lookup(ifsc_code: str) -> Dict[str, Any]:
    """
    Look up Indian IFSC code using Razorpay API.

    Args:
        ifsc_code (str): The IFSC code to look up.

    Returns:
        Dict[str, Any]: Contains bank, branch, address, city, state, or error key if not found.
    """
    url = f"https://ifsc.razorpay.com/{ifsc_code}"
    try:
        resp = requests.get(url, timeout=5)
        if resp.status_code == 200:
            data = resp.json()
            return {
                "bank": data.get("BANK"),
                "branch": data.get("BRANCH"),
                "address": data.get("ADDRESS"),
                "city": data.get("CITY"),
                "state": data.get("STATE")
            }
        else:
            return {"error": "Invalid IFSC code."}
    except Exception as e:
        return {"error": str(e)} 