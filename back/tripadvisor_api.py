# tripadvisor_api.py
import requests
from django.conf import settings

API_KEY = settings.TRIPADVISOR_API_KEY
BASE_URL = settings.TRIPADVISOR_BASE_URL

def fetch_attractions(location_id):
    """
    Récupère les attractions d'un emplacement donné via l'API TripAdvisor.
    """
    url = f"{BASE_URL}/location/{location_id}/details"
    headers = {"X-TripAdvisor-API-Key": API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()  # Retourne les données JSON
    else:
        response.raise_for_status()  # Soulève une exception pour les erreurs