from django.urls import path

from . import views

urlpatterns = [
    path('formulaire', views.data_form, name='data_form'),
]
