from django.db import models


class WeatherDataset(models.Model):
    date = models.DateTimeField(primary_key=True)
    temperature = models.FloatField(blank=True, null=True)
    humidite = models.FloatField(blank=True, null=True)
    pression = models.FloatField(blank=True, null=True)
    directionvent = models.FloatField(db_column='directionVent', blank=True,
                                      null=True)  # Field name made lowercase.
    vitessevent = models.FloatField(db_column='vitesseVent', blank=True, null=True)  # Field name made lowercase.
    precipitation = models.FloatField(blank=True, null=True)
    pyranometre = models.FloatField(blank=True, null=True)
    pyranometreup = models.FloatField(db_column='pyranometreUP', blank=True,
                                      null=True)  # Field name made lowercase.
    pyranometredw = models.FloatField(db_column='pyranometreDW', blank=True,
                                      null=True)  # Field name made lowercase.
    pyregeometreup = models.FloatField(db_column='pyregeometreUP', blank=True,
                                       null=True)  # Field name made lowercase.
    pyregeometredw = models.FloatField(db_column='pyregeometreDW', blank=True,
                                       null=True)  # Field name made lowercase.
    electerre = models.FloatField(db_column='elecTerre', blank=True, null=True)  # Field name made lowercase.
    prec1mm = models.FloatField(blank=True, null=True)
    prec2mm = models.FloatField(blank=True, null=True)
    prec3mm = models.FloatField(blank=True, null=True)
    prec1tot = models.FloatField(blank=True, null=True)
    prec2tot = models.FloatField(blank=True, null=True)
    prec3tot = models.FloatField(blank=True, null=True)
    precmoy = models.FloatField(blank=True, null=True)
    precmoytot = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ReleveMeteo'
