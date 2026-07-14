"""
Mezon Bot WebSocket Gateway Client
Connects to Mezon's real-time gateway and dispatches events to handlers.

Supported event types (from API_CONTRACT.md):
  - CHANNEL_MESSAGE     : New message in a channel
  - BUTTON_INTERACTION  : User clicked an embedded button
  - DOCUMENT_ATTACHMENT : File was attached to a message
"""
import asyncio
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class MezonBotClient:
    def __init__(self, token: str):
        self.token = token
        self.ws = None
        self._running = False

    async def connect(self) -> None:
        """Establish WebSocket connection to Mezon Gateway."""
        # TODO: Connect to the actual Mezon Gateway WebSocket endpoint
        # ws_url = "wss://gateway.mezon.vn/ws"
        # async with websockets.connect(ws_url, extra_headers={"Authorization": self.token}) as ws:
        #     self.ws = ws
        #     self._running = True
        #     async for raw_message in ws:
        #         await self.handle_message(json.loads(raw_message))
        logger.info("MezonBotClient: connect() called (stub — not yet implemented)")

    async def handle_message(self, event: dict) -> None:
        """Route incoming gateway events to the appropriate handler."""
        event_type = event.get("event_type")
        handlers = {
            "CHANNEL_MESSAGE": self.on_channel_message,
            "BUTTON_INTERACTION": self.on_button_interaction,
            "DOCUMENT_ATTACHMENT": self.on_document_attachment,
        }
        handler = handlers.get(event_type)
        if handler:
            await handler(event)
        else:
            logger.debug(f"Unhandled event type: {event_type}")

    async def on_channel_message(self, event: dict) -> None:
        """Handle incoming channel messages and route slash commands."""
        content: str = event.get("content", "")
        channel_id = event.get("channel_id", "")
        user_id = event.get("user_id", "")

        command_map = {
            "/roadmap": self._handle_roadmap,
            "/youtube": self._handle_youtube,
            "/digest": self._handle_digest,
            "/dashboard": self._handle_dashboard,
            "/help": self._handle_help,
        }

        for prefix, handler in command_map.items():
            if content.startswith(prefix):
                args = content[len(prefix):].strip()
                await handler(channel_id=channel_id, user_id=user_id, args=args)
                return

    async def on_button_interaction(self, event: dict) -> None:
        logger.info(f"Button interaction: button_id={event.get('button_id')}")
        # TODO: Handle button callbacks (e.g., "Xem tài liệu", "Mở dashboard")

    async def on_document_attachment(self, event: dict) -> None:
        logger.info(f"Document attachment: {event.get('attachments')}")
        # TODO: Download attachment → trigger /ai/digest endpoint

    # --- Command handlers ---

    async def _handle_roadmap(self, channel_id: str, user_id: str, args: str) -> None:
        logger.info(f"/roadmap command from {user_id}: topic='{args}'")
        # TODO: Call /api/v1/ai/roadmap and reply in channel

    async def _handle_youtube(self, channel_id: str, user_id: str, args: str) -> None:
        logger.info(f"/youtube command from {user_id}: url='{args}'")
        # TODO: Call /api/v1/ai/youtube and reply in channel

    async def _handle_digest(self, channel_id: str, user_id: str, args: str) -> None:
        logger.info(f"/digest command from {user_id}")
        # TODO: Prompt user to attach file, then call /api/v1/ai/digest

    async def _handle_dashboard(self, channel_id: str, user_id: str, args: str) -> None:
        logger.info(f"/dashboard command from {user_id}")
        # TODO: Reply with a dashboard link button

    async def _handle_help(self, channel_id: str, user_id: str, args: str) -> None:
        logger.info(f"/help command from {user_id}")
        # TODO: Reply with a help message listing all available commands


bot_client = MezonBotClient(token=settings.MEZON_BOT_TOKEN)
