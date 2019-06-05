from django.urls import path

from . import views

urlpatterns = [
    path('anemometre-a-coupelles', views.anemometer, name='anemometer'),
    path('anemometre-ultrasonique', views.ultrasonic_anemometer, name='ultrasonic_anemometer'),
    path('girouette', views.weathercock, name='weathercock'),
    path('pluviometre', views.rain_gauge, name='rain_gauge'),
    path('disdrometre', views.disdrometer, name='disdrometer'),
    path('radiometres', views.radiometers, name='radiometers'),
    path('temperature-humidite', views.temperature_humidity, name='temperature_humidity'),
    path('datalogger', views.datalogger, name='datalogger')
]
