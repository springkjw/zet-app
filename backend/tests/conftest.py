from __future__ import annotations

from collections.abc import AsyncIterator

import pytest
import pytest_asyncio
from litestar.testing import AsyncTestClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from zet.app import create_app
from zet.config import Settings
from zet.db.models import Shop
from zet.db.models.user import SocialProvider, User


@pytest.fixture
def test_settings(tmp_path) -> Settings:
    return Settings(
        app_name="zet-backend-test",
        app_debug=True,
        app_host="127.0.0.1",
        app_port=8001,
        api_prefix="/api",
        database_url=f"sqlite+aiosqlite:///{tmp_path / 'test.db'}",
        db_create_all=True,
        jwt_secret="test-secret-long-enough-32chars!!",
        jwt_algorithm="HS256",
        jwt_access_token_ttl_minutes=60,
        jwt_refresh_token_ttl_days=30,
        auth_kakao_app_key="kakao-app-key",
        auth_kakao_rest_api_key="kakao-rest-api-key",
        auth_kakao_jwks_url="https://kauth.kakao.com/.well-known/jwks.json",
        auth_naver_client_id="naver-client-id",
        auth_naver_client_secret="naver-client-secret",
        auth_naver_userinfo_url="https://openapi.naver.com/v1/nid/me",
        auth_apple_bundle_id="com.geniusproject.zet",
        auth_apple_service_id="com.geniusproject.zet",
        auth_apple_issuer="https://appleid.apple.com",
        auth_apple_jwks_url="https://appleid.apple.com/auth/keys",
        default_shop_image_url="https://example.com/default-shop.png",
    )


@pytest_asyncio.fixture
async def client(test_settings: Settings) -> AsyncIterator[AsyncTestClient]:
    app = create_app(settings=test_settings)
    async with AsyncTestClient(app=app) as test_client:
        yield test_client


@pytest_asyncio.fixture
async def seed_shop(test_settings: Settings) -> AsyncIterator[Shop]:
    engine = create_async_engine(test_settings.database_url)
    async with engine.begin() as conn:
        await conn.run_sync(Shop.metadata.create_all)
    session_maker = async_sessionmaker(engine, expire_on_commit=False)
    async with session_maker() as session:
        shop = Shop(name="Seed Shop", image="https://example.com/shop.png")
        session.add(shop)
        await session.commit()
        await session.refresh(shop)
        yield shop
    await engine.dispose()
