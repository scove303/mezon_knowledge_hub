"""Web scrapers and content extractors (YouTube, PDF, Docx)"""
import logging

logger = logging.getLogger(__name__)

def extract_youtube_subtitles(video_id: str) -> list:
    logger.info(f"Extracting subtitles for {video_id}")
    return []

def extract_pdf_text(file_path: str) -> str:
    logger.info(f"Extracting text from PDF {file_path}")
    return ""
