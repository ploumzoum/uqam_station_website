from bootstrap_datepicker_plus import DatePickerInput, TimePickerInput
from django import forms


MONTHS = {
    1:'Janvier', 2:'Février', 3: 'Mars', 4: 'Avril',
    5: 'Mai ', 6: 'Juin', 7: 'Juillet', 8: 'Août',
    9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre'
}
class SingleDateForm(forms.Form):
    date = forms.DateField(
        label='Date',
        required=True,
        widget=DatePickerInput())
    data_type = forms.MultipleChoiceField(label='Type de données', choices=(('instant', 'Instantané'), ('average', 'Moyenne')))
    time = forms.TimeField(
        label='Heure et minute',
        required=True,
        widget=TimePickerInput())
