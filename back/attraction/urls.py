# attraction/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('save/', views.save_attraction_and_photos, name='save_attraction_and_photos'),
    path('', views.list_attractions, name='list_attractions'),
    path('<str:attraction_id>/', views.get_attraction_details, name='get_attraction_details'),
    path('<str:attraction_id>/delete/', views.delete_attraction, name='delete_attraction'),
]
