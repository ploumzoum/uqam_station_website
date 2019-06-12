# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponseRedirect
from django.shortcuts import render

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
            return HttpResponseRedirect('/thanks/')

        # if a GET (or any other method) we'll create a blank form
    else:
        form = SingleDateForm()

    return render(request, 'data_form/data_form.html', {'form': form})
