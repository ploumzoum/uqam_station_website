from datetime import timedelta, datetime

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


class InstantForm(forms.Form):
    filename = ''
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

    def clean_datetime(self):
        datetime = self.cleaned_data['datetime']
        self.filename = f"{datetime.strftime('%Y-%m-%d_%H:%M')}.csv"
        return datetime


class SingleDateForm(forms.Form):
    filename = ''
    date = forms.DateField(
        label='Date',
        input_formats=['%d-%m-%Y'],
        required=True,
        widget=DatePickerInput(
            format='%d-%m-%Y',
            options={
                'minDate': str(get_first_entry().date),
                'maxDate': str(get_last_entry().date - timedelta(days=1))
            }
        )
    )

    def clean_date(self):
        date = self.cleaned_data['date']
        self.filename = f"{date.strftime('%Y-%m-%d')}.csv"
        return date

    variables = forms.MultipleChoiceField(
        label='Variables',
        required=True,
        widget=forms.CheckboxSelectMultiple,
        choices=VARIABLES_CHOICES,
    )


class DateRangeForm(forms.Form):
    filename = ''
    start_date = forms.DateField(
        label='Date de début',
        input_formats=['%d-%m-%Y'],
        required=True,
        widget=DatePickerInput(
            format='%d-%m-%Y',
            options={
                'minDate': str(get_first_entry().date),
                'maxDate': str(get_last_entry().date),
                'defaultDate': str(get_first_entry().date)
            }
        ).start_of('date_range')
    )

    end_date = forms.DateField(
        label='Date de fin',
        input_formats=['%d-%m-%Y'],
        required=True,
        widget=DatePickerInput(
            format='%d-%m-%Y',
            options={
                'minDate': str(get_first_entry().date),
                'maxDate': str(get_last_entry().date),
                'defaultDate': str(get_last_entry().date)

            }
        ).end_of('date_range')
    )

    variables = forms.MultipleChoiceField(
        label='Variables',
        required=True,
        widget=forms.CheckboxSelectMultiple,
        choices=VARIABLES_CHOICES,
    )

    def clean_start_date(self):
        date = self.cleaned_data['start_date']
        self.filename += f"{date.strftime('%Y-%m-%d')} "
        return date

    def clean_end_date(self):
        date = self.cleaned_data['end_date']
        start_date = self.cleaned_data['start_date']
        if (date - start_date).days > 31:
            raise forms.ValidationError('Intervalle de date trop long (>1 mois)')
        self.filename += f"{date.strftime('%Y-%m-%d')}.csv"
        return date

    # def clean_variables(self):
    #     values = self.cleaned_data['variables']
    #     if len(values) > 3:
    #         raise forms.ValidationError('Vous ne pouvez pas choisir plus de 3 variables.')
    #     return values
