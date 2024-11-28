from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from mongo_utils import db
from bson import ObjectId
from tripadvisor_service import fetch_attraction, fetch_photos


@api_view(['GET'])
def save_attraction_and_photos(request):
    """
    Endpoint pour récupérer et sauvegarder une attraction et ses images depuis TripAdvisor.
    """
    location_id = request.query_params.get("location_id")  # Récupération de l'ID depuis les paramètres GET

    if not location_id:
        return Response({"error": "Le paramètre 'location_id' est requis."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Étape 1 : Récupérer les données de l'attraction depuis TripAdvisor
        attraction_data = fetch_attraction(location_id)

        # Étape 2 : Récupérer les photos associées
        photos_data = fetch_photos(location_id)

        # Étape 3 : Préparer les données pour l'insertion
        images = [{"raw_data": photo, "created_at": photo.get("published_date", None)} for photo in photos_data]

        # Étape 4 : Sauvegarder l'attraction et ses images dans MongoDB
        attraction = {
            "raw_data": attraction_data,
            "images": images,
        }
        result = db.attractions.insert_one(attraction)  # Insère dans MongoDB et obtient l'ID généré

        return Response(
            {"id": str(result.inserted_id), "message": "Attraction et images sauvegardées avec succès."},
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def list_attractions(request):
    """
    Liste toutes les attractions avec leur ID MongoDB.
    """
    try:
        attractions = db.attractions.find()
        result = [
            {"id": str(attraction["_id"]), "name": attraction["raw_data"].get("name", "Sans nom")}
            for attraction in attractions
        ]
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_attraction_details(request, attraction_id):
    """
    Obtenir les détails d'une attraction spécifique par son ID MongoDB.
    """
    try:
        # Vérifie si l'attraction existe
        attraction = db.attractions.find_one({"_id": ObjectId(attraction_id)})
        if not attraction:
            return Response({"error": "Attraction introuvable"}, status=status.HTTP_404_NOT_FOUND)

        # Formate les données pour la réponse
        data = {
            "id": str(attraction["_id"]),
            "raw_data": attraction["raw_data"],
            "images": attraction.get("images", []),
        }
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_attraction(request, attraction_id):
    """
    Supprimer une attraction par son ID MongoDB.
    """
    try:
        # Supprime l'attraction par son ID
        result = db.attractions.delete_one({"_id": ObjectId(attraction_id)})
        if result.deleted_count == 0:
            return Response({"error": "Attraction introuvable"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Attraction supprimée avec succès."}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
