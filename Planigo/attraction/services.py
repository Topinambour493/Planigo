import requests
from .models import Attraction, AttractionImage

TRIPADVISOR_API_URL = "https://tripadvisor-content-api.example.com/v1/attractions"
API_KEY = "votre_cle_api_tripadvisor"  # Remplacez par votre clé API TripAdvisor


def fetch_and_store_attraction(data):
    """Sauvegarder une attraction et ses images à partir du JSON brut"""
    tripadvisor_id = data.get("location_id")
    if not tripadvisor_id:
        return

    # Créer ou mettre à jour l'attraction
    attraction, created = Attraction.objects.update_or_create(
        tripadvisor_id=tripadvisor_id,
        defaults={
            "raw_data": data,
        },
    )

    # Sauvegarder les images associées
    images_data = data.get("data", [])  # Assurez-vous que les images sont dans le champ approprié
    for image_data in images_data:
        AttractionImage.objects.update_or_create(
            attraction=attraction,
            raw_data=image_data,
        )
