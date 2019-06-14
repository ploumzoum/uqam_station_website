# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import csv

from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render

from controllers.weather_db import get_entry_with_variables, get_all_entries
from utils.utils import download_csv
from .forms import SingleDateForm


# Create your views here.
def data_form(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = SingleDateForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            all_entries = get_all_entries()
            count = all_entries.count()
            some_entries = get_all_entries()[count-100:]
            print(get_entry_with_variables(form.cleaned_data['datetime']).temperature)
            return download_csv(some_entries)

        # if a GET (or any other method) we'll create a blank form
    else:
        form = SingleDateForm()

    return render(request, 'data_form/data_form.html', {'form': form})

