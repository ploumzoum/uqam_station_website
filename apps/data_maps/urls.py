from django.urls import path

from . import views

urlpatterns = [
    path('metar', views.metar, name='metar'),
    path('sounding', views.sounding, name='sounding'),
    path('sounding/formulaire', views.sounding_form, name='sounding_form')
]
