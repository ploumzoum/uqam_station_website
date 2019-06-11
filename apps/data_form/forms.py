from bootstrap_datepicker_plus import DatePickerInput, TimePickerInput
from django import forms


class SingleDateForm(forms.Form):
    date = forms.DateField(
        label='Date',
        required=True,
        widget=DatePickerInput(
            options={
                'format': '%d-%m-%Y',
                'minDate': '01/01/2018'
            }
        )
    )
    data_type = forms.MultipleChoiceField(label='Type de données', choices=(('instant', 'Instantané'), ('average', 'Moyenne')))
    time = forms.TimeField(
        label='Heure et minute',
        required=True,
        widget=TimePickerInput())
