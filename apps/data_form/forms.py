from bootstrap_datepicker_plus import DatePickerInput, TimePickerInput
from django import forms

from models.weather_dataset import WeatherDataset


class SingleDateForm(forms.Form):
    date = forms.DateField(
        label='Date',
        required=True,
        widget=DatePickerInput(
            options={
                'format': 'DD-MM-YYYY',
                'minDate': WeatherDataset.objects.first().date
            }
        )
    )
    data_type = forms.MultipleChoiceField(label='Type de données', choices=(('instant', 'Instantané'), ('average', 'Moyenne')))
    time = forms.TimeField(
        label='Heure et minute',
        required=True,
        widget=TimePickerInput())
