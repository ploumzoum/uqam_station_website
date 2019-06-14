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
def get_entry_with_variables(date):
    return WeatherData.objects.filter(date=date)


@check_connection
def get_all_entries():
    return WeatherData.objects.all()
