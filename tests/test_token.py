import pytest
from decimal import Decimal
from sutra.core.token import SUTRAToken

def test_token_initialization():
    token = SUTRAToken()
    assert token.total_supply == Decimal("108000000")
    assert token.initial_distribution == Decimal("21000000")

def test_emission_calculation():
    token = SUTRAToken()
    # First year emission
    assert token.calculate_emission(0) == Decimal("21000000")
    # After first halving
    assert token.calculate_emission(4) == Decimal("10500000")

def test_distribution():
    token = SUTRAToken()
    distribution = token.get_distribution()
    
    # Check pool percentages
    assert distribution["preservation_pool"] == Decimal("43200000")
    assert distribution["community_development"] == Decimal("21600000")
    assert distribution["founding_contributors"] == Decimal("16200000")
    assert distribution["operations"] == Decimal("16200000")
    assert distribution["emergency_reserve"] == Decimal("10800000")
    
    # Total should equal total supply
    total = sum(distribution.values())
    assert total == token.total_supply
