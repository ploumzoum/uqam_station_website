# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


# Create your views here.
def anemometer(request):
    return render(request, 'instrumentation/anemometer.html', {'title': 'Anémomètre à coupelles - Station UQÀM'})


def ultrasonic_anemometer(request):
    return render(request, 'instrumentation/ultrasonic_anemometer.html',
                  {'title': 'Anémomètre ultrasonique - Station UQÀM'})


def weathercock(request):
    return render(request, 'instrumentation/weathercock.html', {'title': 'Girouette - Station UQÀM'})


def rain_gauge(request):
    return render(request, 'instrumentation/rain_gauge.html', {'title': 'Pluviomètre - Station UQÀM'})


def disdrometer(request):
    return render(request, 'instrumentation/disdrometer.html', {'title': 'Disdromètre - Station UQÀM'})


def radiometers(request):
    return render(request, 'instrumentation/radiometers.html', {'title': 'Radiomètres - Station UQÀM'})


def temperature_humidity(request):
    return render(request, 'instrumentation/temperature_humidity.html',
                  {'title': 'Température Humidité - Station UQÀM'})


def datalogger(request):
    return render(request, 'instrumentation/datalogger.html', {'title': 'Datalogger - Station UQÀM'})
