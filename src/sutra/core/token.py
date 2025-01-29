"""
SUTRA Token Core Implementation
"""
from typing import Dict, Any
from decimal import Decimal

class SUTRAToken:
    def __init__(self):
        self.total_supply = Decimal("108000000")  # 108 million
        self.initial_distribution = Decimal("21000000")  # 21 million
        self.emission_schedule = 108  # years
        self.halving_period = 4  # years
        
    def calculate_emission(self, year: int) -> Decimal:
        """Calculate token emission for a given year"""
        halvings = year // self.halving_period
        base_emission = self.initial_distribution / Decimal(str(2 ** halvings))
        return min(base_emission, self.total_supply)
        
    def get_distribution(self) -> Dict[str, Decimal]:
        """Get token distribution by pool"""
        return {
            "preservation_pool": self.total_supply * Decimal("0.40"),
            "community_development": self.total_supply * Decimal("0.20"),
            "founding_contributors": self.total_supply * Decimal("0.15"),
            "operations": self.total_supply * Decimal("0.15"),
            "emergency_reserve": self.total_supply * Decimal("0.10")
        }
