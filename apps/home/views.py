# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
from django.conf import settings
from django.shortcuts import render
import csv


# Create your views here.
def index(request):
    with open(os.path.join(settings.ROOT_DIR, 'static/data/UQAM_DATA_STATION_last.csv')) as last_entry:
        csv_reader = csv.DictReader(last_entry)
        dataset = next(csv_reader)
        print(dataset)
        return render(request, 'home/home.html', {'dataset': dataset})
