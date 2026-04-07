from __future__ import annotations

from zet.app import create_app


def main() -> None:
    app = create_app()
    command = (
        "litestar run --app zet.app:create_app "
        f"--host {app.state.settings.app_host} --port {app.state.settings.app_port}"
    )
    print(f"Run with: {command}")


if __name__ == "__main__":
    main()
