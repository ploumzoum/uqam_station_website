# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


# Create your views here.
def daily(request):
    return render(request, 'meteograms/daily_meteograms.html')


def historic(request):
    return render(request, 'meteograms/historic_meteograms.html')

