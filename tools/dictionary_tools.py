import requests
from typing import Dict

def get_word_definition(word: str) -> Dict:
    """Get definition and information about a word.
    
    Args:
        word: Word to look up
    """
    try:
        # Using Free Dictionary API (free, no API key required)
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data:
                word_data = data[0]
                definitions = []
                for meaning in word_data.get("meanings", []):
                    for definition in meaning.get("definitions", [])[:2]:  # Limit to 2 definitions per meaning
                        definitions.append({
                            "definition": definition.get("definition", ""),
                            "part_of_speech": meaning.get("partOfSpeech", ""),
                            "example": definition.get("example", "")
                        })
                
                return {
                    "word": word_data.get("word", ""),
                    "phonetic": word_data.get("phonetic", ""),
                    "definitions": definitions[:5]  # Limit to 5 definitions total
                }
            else:
                return {"error": f"No definition found for '{word}'"}
        else:
            return {"error": f"Failed to get definition: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting definition: {str(e)}"} 