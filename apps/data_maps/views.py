# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


# Create your views here.
def metar(request):
    return render(request, 'data_maps/metar.html', {'title': 'Données METARS - Station UQÀM'})


def sounding(request):
    return render(request, 'data_maps/sounding.html', {'title': 'Données UPPER et METARS - Station UQÀM'})


def sounding_form(request):
    print('TO DO ')
