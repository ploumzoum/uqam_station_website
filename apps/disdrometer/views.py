from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'disdrometer/disdrometer.html', {'title': 'Disdromètre - Station UQÀM'})
