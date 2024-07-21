import logging
from opencensus.ext.azure.log_exporter import AzureLogHandler
from opentelemetry.instrumentation.aiohttp_client import AioHttpClientInstrumentor

class Logger:

    def __init__(self, debug_mode=False):
        self.general_logger = logging.getLogger(__name__)
        self.general_logger.addHandler(AzureLogHandler())

        if debug_mode:
            self.general_logger.setLevel(logging.DEBUG)
        else:
            self.general_logger.setLevel(logging.WARNING)

    def debug(self,message):
        self.general_logger.debug(message)
        
    def info(self,message):
        self.general_logger.info(message)

    def warning(self,message):
        self.general_logger.warning(message)

    def error(self,message):
        self.general_logger.error(message)

    def critical(self,message):
        self.general_logger.critical(message)

    def exception(self,message):
        self.general_logger.exception(message)

