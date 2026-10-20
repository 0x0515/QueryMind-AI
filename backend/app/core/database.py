from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# إنشاء محرك الاتصال غير المتزامن (Async Engine)
engine = create_async_engine(settings.DATABASE_URL, echo=True, future=True)

# إنتاج جلسات الاتصال (Session Maker)
AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False, class_
)

# الفئة الأساسية (Base class) التي ستتورث منها جميع النماذج (Models)
class Base(DeclarativeBase):
    pass

# دالة مساعدة للحصول على جلسة قاعدة البيانات في الـ Endpoints
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session