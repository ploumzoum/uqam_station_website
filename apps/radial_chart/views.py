from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'radial_chart/radial_chart.html', {'title': 'Diagramme radial - Station UQÀM'})
