from django.urls import path

from . import views

urlpatterns = [
    path('formulaires/instantane', views.instant_form, name='instant_form'),
    path('formulaires/instantane/prerempli', views.instant_form_preselect, name='instant_form_preselect'),
    path('formulaires/24h', views.single_date_form, name='single_date_form'),
    path('formulaires/24h/prerempli', views.single_date_form_preselect, name='single_date_form_preselect'),
    path('formulaires/periode', views.date_range_form, name='date_range_form'),
    path('formulaires/periode/prerempli', views.date_range_form_preselect, name='date_range_form_preselect'),
]
