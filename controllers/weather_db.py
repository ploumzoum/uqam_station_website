from datetime import timedelta, datetime

from django.db import OperationalError, connections
import wrapt
from models.weather_data import WeatherData


@wrapt.decorator
def check_connection(wrapped, instance=None, args=None, kwargs=None):
    try:
        return wrapped(*args)
    except OperationalError:
        conn = connections['weather_data']
        conn.connect()
        return wrapped(*args)


@check_connection
def get_first_entry():
    return WeatherData.objects.order_by('date').first()


@check_connection
def get_last_entry():
    return WeatherData.objects.last()


@check_connection
def get_one_entry(date, *fields):
    return WeatherData.objects.filter(date=date).values(*fields)


@check_connection
def get_entries(start_date, end_date, *fields):
    return WeatherData.objects.filter(date__range=(start_date, end_date)).values(*fields)


@check_connection
def get_all_entries():
    return WeatherData.objects.all()
