"""Database interactions for storing AI results"""
import logging
from sqlmodel import Session
from app.core.database import get_session
from app.models.knowledge_file import KnowledgeFile

logger = logging.getLogger(__name__)

def save_ai_result(session: Session, folder_id: str, title: str, content: str):
    logger.info(f"Saving AI result to folder {folder_id}")
    pass
