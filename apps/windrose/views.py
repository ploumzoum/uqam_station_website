from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'windrose/windrose.html', {'title': 'Rose des vents - Station UQÀM'})
