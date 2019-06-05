from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'weather_radar/weather_radar.html', {'title': 'Radar météo - Station UQÀM'})
