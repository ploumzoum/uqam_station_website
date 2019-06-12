class ModelsRouter:
    @staticmethod
    def db_for_read(model, **hints):
        return 'weather_data'
