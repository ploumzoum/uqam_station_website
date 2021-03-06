"""uqam_station_website.nginx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.urls import path, include

from django.conf import settings

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('visualisation/meteogrammes/', include('meteograms.urls')),
    path('visualisation/diagramme-radial', include('radial_chart.urls')),
    path('visualisation/rose-des-vent', include('windrose.urls')),
    path('visualisation/disdrometre', include('disdrometer.urls')),
    path('visualisation/radar-meteo', include('weather_radar.urls')),
    path('instrumentation/', include('instrumentation.urls')),
    path('donnees/', include('data_maps.urls')),
    path('donnees/', include('data_form.urls')),
    path('a-propos/', include('about.urls'))
]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
