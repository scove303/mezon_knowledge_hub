import asyncio
import logging

from app.core.config import settings
from app.api.mezon.commands import handle_message

logger = logging.getLogger(__name__)

class MezonBotClient:
    def __init__(self, token: str):
        self.token = token
        self._running = False

    async def connect(self):
        logger.info("Connecting to Mezon Gateway (stub)")
        # TODO: Implement actual websocket connection
        pass

    async def handle_event(self, event: dict):
        event_type = event.get("event_type")
        if event_type == "CHANNEL_MESSAGE":
            await handle_message(event)
        # Handle other events...

bot_client = MezonBotClient(token=settings.MEZON_BOT_TOKEN)
