from __future__ import annotations

import os
from pathlib import Path

from advanced_alchemy.config import AlembicAsyncConfig
from advanced_alchemy.extensions.litestar import AsyncSessionConfig, SQLAlchemyAsyncConfig, SQLAlchemyPlugin
from dotenv import load_dotenv
from pydantic import BaseModel, ConfigDict


def _get_bool(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


class Settings(BaseModel):
    model_config = ConfigDict(frozen=True)

    app_name: str
    app_debug: bool
    app_host: str
    app_port: int
    api_prefix: str
    database_url: str
    db_create_all: bool
    jwt_secret: str
    jwt_algorithm: str
    jwt_access_token_ttl_minutes: int
    jwt_refresh_token_ttl_days: int
    default_shop_image_url: str

    @property
    def backend_root(self) -> Path:
        return Path(__file__).resolve().parents[2]

    @property
    def migrations_path(self) -> Path:
        return self.backend_root / "src" / "zet" / "db" / "migrations"

    @classmethod
    def from_env(cls) -> "Settings":
        _ = load_dotenv()
        postgres_user = os.getenv("POSTGRES_USER", "zet")
        postgres_password = os.getenv("POSTGRES_PASSWORD", "zet")
        postgres_host = os.getenv("POSTGRES_HOST", "localhost")
        postgres_port = os.getenv("POSTGRES_PORT", "5432")
        postgres_db = os.getenv("POSTGRES_DB", "zet")
        default_database_url = (
            f"postgresql+psycopg://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}"
        )
        return cls(
            app_name=os.getenv("APP_NAME", "zet-backend"),
            app_debug=_get_bool("APP_DEBUG", True),
            app_host=os.getenv("APP_HOST", "0.0.0.0"),
            app_port=int(os.getenv("APP_PORT", "8000")),
            api_prefix=os.getenv("API_PREFIX", "/api"),
            database_url=os.getenv("DATABASE_URL", default_database_url),
            db_create_all=_get_bool("DB_CREATE_ALL", False),
            jwt_secret=os.getenv("JWT_SECRET", "development-secret"),
            jwt_algorithm=os.getenv("JWT_ALGORITHM", "HS256"),
            jwt_access_token_ttl_minutes=int(os.getenv("JWT_ACCESS_TOKEN_TTL_MINUTES", "60")),
            jwt_refresh_token_ttl_days=int(os.getenv("JWT_REFRESH_TOKEN_TTL_DAYS", "30")),
            default_shop_image_url=os.getenv(
                "DEFAULT_SHOP_IMAGE_URL", "https://via.placeholder.com/300"
            ),
        )


def build_sqlalchemy_plugin(settings: Settings) -> SQLAlchemyPlugin:
    config = SQLAlchemyAsyncConfig(
        connection_string=settings.database_url,
        create_all=settings.db_create_all,
        before_send_handler="autocommit",
        session_config=AsyncSessionConfig(expire_on_commit=False),
        alembic_config=AlembicAsyncConfig(
            script_config=str(settings.backend_root / "alembic.ini"),
            script_location=str(settings.migrations_path),
            compare_type=True,
        ),
    )
    return SQLAlchemyPlugin(config=config)
