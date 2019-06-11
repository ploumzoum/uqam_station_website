from django import forms

class TimeInput(forms.TimeInput):
    def render(self):
        html = '<'
