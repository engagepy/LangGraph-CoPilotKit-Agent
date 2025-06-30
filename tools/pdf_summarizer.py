from typing import Dict, Any

def pdf_summarizer(text: str) -> Dict[str, Any]:
    """
    Summarize the given text (mocked summary).

    Args:
        text (str): The text to summarize.

    Returns:
        Dict[str, Any]: Contains summary or error key if text is too short.
    """
    if not text or len(text) < 20:
        return {"error": "Text too short to summarize."}
    summary = text[:100] + ("..." if len(text) > 100 else "")
    return {"summary": f"Summary: {summary}"} 