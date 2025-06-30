import random
from typing import Optional, Dict, Any

def what_should_i(category: str, mood: Optional[str] = None) -> Dict[str, Any]:
    """
    Suggest a random meal, movie, or book based on category and optional mood/genre.

    Args:
        category (str): One of 'meal', 'movie', or 'book'.
        mood (Optional[str]): Optional mood or genre (not used in this mock).

    Returns:
        Dict[str, Any]: Contains suggestion or error key if invalid category.
    """
    meals = ["Pizza", "Sushi", "Biryani", "Salad", "Pasta", "Tacos"]
    movies = ["Inception", "The Matrix", "3 Idiots", "Parasite", "The Godfather"]
    books = ["1984", "To Kill a Mockingbird", "Sapiens", "The Alchemist", "Atomic Habits"]
    if category == "meal":
        return {"suggestion": random.choice(meals)}
    elif category == "movie":
        return {"suggestion": random.choice(movies)}
    elif category == "book":
        return {"suggestion": random.choice(books)}
    else:
        return {"error": "Category must be meal, movie, or book."} 