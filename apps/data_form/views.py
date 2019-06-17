# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import csv
from datetime import timedelta

from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect

from controllers.weather_db import get_one_entry, get_all_entries, get_entries
from utils.utils import download_csv
from .forms import InstantForm, SingleDateForm, DateRangeForm

form_type = 'instant'
PRESELECTED_VARIABLES = {'variables': ['date', 'temperature', 'humidite', 'pression', 'directionvent', 'vitessevent',
                                       'precipitation', 'pyranometre', 'pyranometreup', 'pyranometredw',
                                       'pyregeometreup',
                                       'pyregeometredw', 'electerre', 'prec1mm', 'prec2mm', 'prec3mm', 'prec1tot',
                                       'prec2tot', 'prec3tot', 'precmoy', 'precmoytot']}


# Create your views here.
def instant_form(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = InstantForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return download_csv(
                get_one_entry(form.cleaned_data['datetime'], *form.cleaned_data['variables']),
                form.filename,
                form.cleaned_data['variables']
            )

        # if a GET (or any other method) we'll create a blank form
    else:
        form = InstantForm()

    return render(request, 'data_form/instant_form.html', {'form': form})


def instant_form_preselect(request):
    form = InstantForm(PRESELECTED_VARIABLES)
    return render(request, 'data_form/instant_form.html', {'form': form})


def single_date_form(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = SingleDateForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            download_csv(
                get_entries(form.cleaned_data['date'], form.cleaned_data['date'] + timedelta(days=1),
                            *form.cleaned_data['variables']),
                form.filename,
                form.cleaned_data['variables']
            )
            return redirect('loading_data')

        # if a GET (or any other method) we'll create a blank form
    else:
        form = SingleDateForm()

    return render(request, 'data_form/single_date_form.html', {'form': form})


def single_date_form_preselect(request):
    form = SingleDateForm(PRESELECTED_VARIABLES)
    return render(request, 'data_form/single_date_form.html', {'form': form})


def date_range_form(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = DateRangeForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return download_csv(
                get_entries(form.cleaned_data['start_date'],
                            form.cleaned_data['end_date'] + timedelta(days=1),
                            *form.cleaned_data['variables']),
                form.filename,
                form.cleaned_data['variables']
            )

        # if a GET (or any other method) we'll create a blank form
    else:
        form = DateRangeForm()

    return render(request, 'data_form/date_range_form.html', {'form': form})


def date_range_form_preselect(request):
    form = DateRangeForm(PRESELECTED_VARIABLES)
    return render(request, 'data_form/date_range_form.html', {'form': form})


def loading_data(request):
    return render(request, 'data_form/loading_data.html')
