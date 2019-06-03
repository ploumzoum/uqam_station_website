class ModelsRouter:
    def db_for_read(self, model, **hints):
        return 'weather_data'
