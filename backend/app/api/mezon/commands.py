import logging

logger = logging.getLogger(__name__)

async def handle_message(event: dict):
    content = event.get("content", "")
    user_id = event.get("user_id")
    channel_id = event.get("channel_id")

    if content.startswith("/roadmap"):
        logger.info(f"Command /roadmap from {user_id}")
    elif content.startswith("/youtube"):
        logger.info(f"Command /youtube from {user_id}")
    elif content.startswith("/digest"):
        logger.info(f"Command /digest from {user_id}")
