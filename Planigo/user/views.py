from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from mongo_utils import db
from bson import ObjectId
from pymongo import MongoClient


users_collection = db['users']
attractions_collection = db['attractions']

@api_view(['GET'])
def list_users_with_attractions(request):
    """Lister tous les utilisateurs avec leurs attractions associées"""
    users = list(users_collection.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return Response(users, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_user_details(request, user_id):
    """Obtenir les détails d'un utilisateur spécifique avec ses attractions associées"""
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)

    user['_id'] = str(user['_id'])
    attraction_ids = user.get('attractions', [])
    attractions = list(attractions_collection.find({"_id": {"$in": [ObjectId(aid) for aid in attraction_ids]}}))
    for attraction in attractions:
        attraction['_id'] = str(attraction['_id'])
    user['attractions'] = attractions

    return Response(user, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_user(request):
    """Créer un nouvel utilisateur"""
    user_data = request.data
    user_id = users_collection.insert_one(user_data).inserted_id
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    user['_id'] = str(user['_id'])
    return Response(user, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def update_user(request, user_id):
    """Mettre à jour un utilisateur existant"""
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)

    user_data = request.data
    users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": user_data})
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    user['_id'] = str(user['_id'])
    return Response(user, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_user(request, user_id):
    """Supprimer un utilisateur existant"""
    try:
        result = users_collection.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)