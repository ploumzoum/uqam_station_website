from django.shortcuts import render


# Create your views here.
def history(request):
    return render(request, 'about/history.html', {'title': 'Historique - Station UQÀM'})


def team(request):
    return render(request, 'about/team.html', {'title': 'Équipe - Station UQÀM'})


def contact(request):
    return render(request, 'about/team.html', {'title': 'Contact - Station UQÀM'})
