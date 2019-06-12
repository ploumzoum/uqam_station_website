from django.db import OperationalError, connections

from models.weather_data import WeatherData


def check_connection(func):
    def wrapper():
        try:
            return func()
        except OperationalError:
            conn = connections['weather_data']
            conn.connect()
            return func()

    return wrapper()


@check_connection
def get_first_record():
    return WeatherData.objects.order_by('date').first()


@check_connection
def get_last_record():
    return WeatherData.objects.last()


@check_connection
def get_all_records():
    return WeatherData.objects.all()
