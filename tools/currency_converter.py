import requests

def currency_converter(amount: float, from_currency: str, to_currency: str) -> dict:
    """
    Convert an amount from one currency to another using exchangerate.host API.

    Args:
        amount (float): The amount to convert.
        from_currency (str): The source currency code (e.g., 'INR').
        to_currency (str): The target currency code (e.g., 'USD').

    Returns:
        dict: Contains from, to, amount, converted, rate, date, or error key if failed.
    """
    url = f"https://api.exchangerate.host/convert?from={from_currency}&to={to_currency}&amount={amount}"
    try:
        resp = requests.get(url, timeout=5)
        data = resp.json()
        if data.get("success"):
            return {
                "from": from_currency.upper(),
                "to": to_currency.upper(),
                "amount": amount,
                "converted": round(data["result"], 2),
                "rate": data["info"]["rate"],
                "date": data["date"]
            }
        else:
            return {"error": "Conversion failed."}
    except Exception as e:
        return {"error": str(e)} 