# user/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_users_with_attractions, name='list_users_with_attractions'),  # /api/users/
    path('<str:user_id>/', views.get_user_details, name='get_user_details'),  # /api/users/<user_id>/
    path('create', views.create_user, name='create_user'),  # /api/users/create/
    path('update/<str:user_id>/', views.update_user, name='update_user'),  # /api/users/update/<user_id>/
    path('delete/<str:user_id>/', views.delete_user, name='delete_user'),  # /api/users/delete/<user_id>/
]