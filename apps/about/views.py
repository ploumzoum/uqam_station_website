from django.shortcuts import render


# Create your views here.
def history(request):
    return render(request, 'about/history.html', {'title': 'Historique - Station UQÀM'})
