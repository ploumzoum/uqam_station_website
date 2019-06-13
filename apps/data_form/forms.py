from bootstrap_datepicker_plus import DatePickerInput, TimePickerInput, DateTimePickerInput
from django import forms

from controllers.weather_db import get_last_entry, get_first_entry

VARIABLES_CHOICES = [
    ('date', 'Date'),
    ('temperature', 'Température (°C)'),
    ('humidite', 'Humidité (%)'),
    ('pression', 'Pression (hpa)'),
    ('directionvent', 'Direction du vent (°)'),
    ('vitessevent', 'Vitesse du vent (m.s⁻¹)'),
    ('precipitation', 'Précipitation (mm)'),
    ('pyranometre', 'Pyranomètre'),
    ('pyranometreup', 'Rayonnement solaire réfléchi (W.m⁻²)'),
    ('pyranometredw', 'Rayonnement solaire incident (W.m⁻²)'),
    ('pyregeometreup', 'Rayonnement infrarouge émis par la surface (W.m⁻²)'),
    ('pyregeometredw', 'Rayonnement infrarouge atmosphérique (W.m⁻²)'),
    ('electerre', 'electerre'),
    ('prec1mm', 'prec1mm'),
    ('prec2mm', 'prec2mm'),
    ('prec3mm', 'prec3mm'),
    ('prec1tot', 'prec1tot'),
    ('prec2tot', 'prec2tot'),
    ('prec3tot', 'prec3tot'),
    ('precmoy', 'Précipitation (mm)'),
    ('precmoytot', 'Intensité de précipitation (mm.h⁻¹)'),

]


class SingleDateForm(forms.Form):
    datetime = forms.DateTimeField(
        label='Date et heure',
        input_formats=['%d-%m-%Y %H:%M'],
        required=True,
        widget=DateTimePickerInput(
            format='%d-%m-%Y %H:%M',
            options={
                'minDate': str(get_first_entry().date),
                'maxDate': str(get_last_entry().date)
            }
        )
    )

    variables = forms.MultipleChoiceField(
        label='Variables',
        required=True,
        widget=forms.CheckboxSelectMultiple,
        choices=VARIABLES_CHOICES,
    )

    def clean_variables(self):
        data = self.cleaned_data['variables']
        return data

    def clean_datetime(self):
        data = self.cleaned_data['datetime']
        return data
