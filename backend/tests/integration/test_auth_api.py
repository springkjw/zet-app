from __future__ import annotations

async def test_social_login_returns_expected_shape(client) -> None:
    response = await client.post(
        "/api/auth/login",
        json={"provider": "kakao", "token": "provider-token"},
    )

    assert response.status_code == 200
    body = response.json()
    assert set(body.keys()) == {"user", "tokens", "onboarding", "isNewUser"}
    assert body["user"]["provider"] == "kakao"
    assert "accessToken" in body["tokens"]
    assert "refreshToken" in body["tokens"]


async def test_refresh_returns_new_tokens(client) -> None:
    login_response = await client.post(
        "/api/auth/login",
        json={"provider": "naver", "token": "refreshable-token"},
    )
    refresh_token = login_response.json()["tokens"]["refreshToken"]

    response = await client.post("/api/auth/refresh", json={"refreshToken": refresh_token})

    assert response.status_code == 200
    body = response.json()
    assert set(body["tokens"].keys()) == {"accessToken", "refreshToken"}
