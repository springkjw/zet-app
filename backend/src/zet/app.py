from __future__ import annotations

from litestar import Litestar
from litestar.di import Provide
from litestar.openapi.config import OpenAPIConfig
from litestar.plugins.pydantic import PydanticPlugin

from .config import Settings, build_sqlalchemy_plugin
from .domain.auth.controllers import AuthController
from .domain.auth.guards import create_jwt_auth
from .domain.shops.controllers import ShopController
from .lib.deps import provide_auth_service, provide_settings, provide_shop_service


def create_app(settings: Settings | None = None) -> Litestar:
    resolved_settings = settings or Settings.from_env()
    jwt_auth = create_jwt_auth(resolved_settings)

    app = Litestar(
        route_handlers=[AuthController, ShopController],
        debug=resolved_settings.app_debug,
        openapi_config=OpenAPIConfig(title=resolved_settings.app_name, version="0.1.0"),
        plugins=[build_sqlalchemy_plugin(resolved_settings), PydanticPlugin(prefer_alias=True)],
        on_app_init=[jwt_auth.on_app_init],
        dependencies={
            "auth_service": Provide(provide_auth_service, sync_to_thread=False),
            "settings": Provide(provide_settings, sync_to_thread=False),
            "shop_service": Provide(provide_shop_service, sync_to_thread=False),
        },
    )
    app.state.settings = resolved_settings
    app.state.jwt_auth = jwt_auth
    app.state.revoked_token_ids = set()
    return app
