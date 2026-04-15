from __future__ import annotations

from ....config import Settings
from .apple import AppleVerifier, AppleVerifierConfig
from .base import (
    NormalizedSocialIdentity,
    SocialVerificationError,
    SocialVerifier,
    SocialVerifierRegistry,
)
from .kakao import KakaoVerifier, KakaoVerifierConfig
from .naver import NaverVerifier, NaverVerifierConfig


def build_social_verifier_registry(settings: Settings) -> SocialVerifierRegistry:
    return SocialVerifierRegistry(
        [
            KakaoVerifier(KakaoVerifierConfig.from_settings(settings)),
            NaverVerifier(NaverVerifierConfig.from_settings(settings)),
            AppleVerifier(AppleVerifierConfig.from_settings(settings)),
        ]
    )


__all__ = [
    "AppleVerifier",
    "AppleVerifierConfig",
    "KakaoVerifier",
    "KakaoVerifierConfig",
    "NaverVerifier",
    "NaverVerifierConfig",
    "NormalizedSocialIdentity",
    "SocialVerificationError",
    "SocialVerifier",
    "SocialVerifierRegistry",
    "build_social_verifier_registry",
]
