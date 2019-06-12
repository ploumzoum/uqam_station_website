from bootstrap_datepicker_plus import DatePickerInput, TimePickerInput
from django import forms
import json

from controllers.weather_db import *
from utils.datetime_encoder import DateTimeEncoder


class SingleDateForm(forms.Form):
    date = forms.DateField(
        label='Date',
        required=True,
        widget=DatePickerInput(
            options={
                'format': 'DD-MM-YYYY',
                'minDate': str(get_first_record.date),
                'maxDate': str(get_last_record.date)
            }
        )
    )
    data_type = forms.MultipleChoiceField(label='Type de données', choices=(('instant', 'Instantané'), ('average', 'Moyenne')))
    time = forms.TimeField(
        label='Heure et minute',
        required=True,
        widget=TimePickerInput())
    print(get_first_record)