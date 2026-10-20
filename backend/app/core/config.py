from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "QueryMind AI"
    API_V1_STR: str = "/api/v1"
    
    # رابط قاعدة البيانات PostgreSQL (سنقوم بتعديله لاحقاً عند إضافة PostgreSQL)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/querymind_db"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()