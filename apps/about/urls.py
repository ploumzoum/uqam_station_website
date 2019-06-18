from django.urls import path

from . import views

urlpatterns = [
    path('historique', views.history, name='history'),
    path('team', views.team, name='team')
]
