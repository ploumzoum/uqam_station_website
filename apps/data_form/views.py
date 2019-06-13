# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import csv

from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render

from controllers.weather_db import get_entry_with_variables
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
            print(get_entry_with_variables(form.cleaned_data['datetime']).temperature)
            return HttpResponseRedirect('/donnees/formulaire')

        # if a GET (or any other method) we'll create a blank form
    else:
        form = SingleDateForm()

    return render(request, 'data_form/data_form.html', {'form': form})


class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """
    def write(self, value):
        """Write the value by returning it, instead of storing in a buffer."""
        return value


def download_csv(data):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'

    writer = csv.writer(response)
