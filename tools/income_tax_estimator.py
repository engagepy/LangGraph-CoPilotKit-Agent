def income_tax_estimator(salary: float, deductions: float = 0, regime: str = "new") -> dict:
    """
    Estimate Indian income tax for salaried individuals (mocked, not legal advice).
    
    Parameters:
    - salary (float): Annual salary/income in INR
    - deductions (float, optional): Total deductions under section 80C, 80D, etc. Default is 0
    - regime (str, optional): Tax regime - "new" for new regime (2020+), "old" for old regime. Default is "new"
    
    Returns:
    - dict: Contains taxable_income, tax amount, and regime used. If input is invalid, returns error key.
    
    Note: This is a simplified estimation and should not be used for official tax filing.
    """
    taxable = max(0, salary - deductions)
    if regime == "new":
        # New regime slabs (mocked)
        if taxable <= 250000:
            tax = 0
        elif taxable <= 500000:
            tax = (taxable - 250000) * 0.05
        elif taxable <= 750000:
            tax = 12500 + (taxable - 500000) * 0.1
        elif taxable <= 1000000:
            tax = 37500 + (taxable - 750000) * 0.15
        elif taxable <= 1250000:
            tax = 75000 + (taxable - 1000000) * 0.2
        elif taxable <= 1500000:
            tax = 125000 + (taxable - 1250000) * 0.25
        else:
            tax = 187500 + (taxable - 1500000) * 0.3
    else:
        # Old regime slabs (mocked)
        if taxable <= 250000:
            tax = 0
        elif taxable <= 500000:
            tax = (taxable - 250000) * 0.05
        elif taxable <= 1000000:
            tax = 12500 + (taxable - 500000) * 0.2
        else:
            tax = 112500 + (taxable - 1000000) * 0.3
    return {
        "taxable_income": taxable,
        "tax": round(tax, 2),
        "regime": regime
    } 