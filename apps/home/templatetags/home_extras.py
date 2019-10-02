from django import template
import datetime
now = datetime.datetime.now()

register = template.Library()
@register.filter(name='get_key')
def get_key(value, arg):
    return value[arg][0]


@register.filter(name='get_datetime')
def get_datetime(value):
    hour = value.split('-')
    return f'{now.strftime("%d-%m-%Y")} {hour[0]}h {hour[1]}min'
