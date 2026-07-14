"""Search engine integration using Tavily API"""
import logging

logger = logging.getLogger(__name__)

def search_internet(query: str) -> dict:
    logger.info(f"Searching internet for {query}")
    return {"results": []}
