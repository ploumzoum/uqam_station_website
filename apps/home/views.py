# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.shortcuts import render
from utils.urls import RESOURCES_FILES_URL
import pandas as pd
import csv


# Create your views here.
def index(request):
    df = pd.read_csv('http://resources.station.escer.uqam.ca/data/UQAM_DATA_STATION_last.csv')
    return render(request, 'home/home.html', {'title': 'Accueil - Station UQÀM',
                                              'dataset': df.to_dict()})
