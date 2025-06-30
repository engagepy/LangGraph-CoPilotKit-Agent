from typing import Dict, Any

def emi_calculator(principal: float, rate: float, tenure_months: int) -> Dict[str, Any]:
    """
    Calculate EMI, total interest, and total payment for a loan.

    Args:
        principal (float): The principal loan amount.
        rate (float): Annual interest rate in percent.
        tenure_months (int): Number of months for the loan.

    Returns:
        Dict[str, Any]: Contains emi, total_interest, total_payment, or error key if failed.
    """
    r = rate / (12 * 100)
    n = tenure_months
    try:
        emi = principal * r * (1 + r) ** n / ((1 + r) ** n - 1)
        total_payment = emi * n
        total_interest = total_payment - principal
        return {
            "emi": round(emi, 2),
            "total_interest": round(total_interest, 2),
            "total_payment": round(total_payment, 2)
        }
    except Exception as e:
        return {"error": str(e)} 