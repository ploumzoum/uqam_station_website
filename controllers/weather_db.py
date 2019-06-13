from datetime import datetime
from django.db import OperationalError, connections
import wrapt
from models.weather_data import WeatherData


@wrapt.decorator
def check_connection(func, *args):
    try:
        return func(*args)
    except OperationalError:
        conn = connections['weather_data']
        conn.connect()
        return func(*args)


@check_connection
def get_first_entry(*args):
    return WeatherData.objects.order_by('date').first()


@check_connection
def get_last_entry(*args):
    return WeatherData.objects.last()


@check_connection
def get_entry_with_variables(date):
    return WeatherData.objects.get(date=date)


@check_connection
def get_all_entries():
    return WeatherData.objects.all()
