from django.urls import path

from . import views

urlpatterns = [
    path('quotidiennes', views.daily, name='daily_meteograms'),
    path('historique', views.historic, name='historic_meteograms')
]
