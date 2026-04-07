from __future__ import annotations

async def test_list_shops_returns_collection(client, seed_shop) -> None:
    response = await client.get("/api/shops")

    assert response.status_code == 200
    body = response.json()
    assert body["total"] >= 1
    assert body["shops"][0]["id"] == str(seed_shop.id)


async def test_get_shop_returns_detail(client, seed_shop) -> None:
    response = await client.get(f"/api/shops/{seed_shop.id}")

    assert response.status_code == 200
    assert response.json()["shop"]["id"] == str(seed_shop.id)
