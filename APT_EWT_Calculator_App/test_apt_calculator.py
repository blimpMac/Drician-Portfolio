import unittest
from decimal import Decimal

from apt_calculator import build_result_summary


class BuildResultSummaryTests(unittest.TestCase):
    def test_summary_includes_input_vat_and_selected_inventory_amount(self):
        result = build_result_summary(
            Decimal('1000'),
            '1%',
            'Check Amount to APT',
            'Raw Materials Inventory',
        )

        self.assertEqual(result['apt'], Decimal('1010.10'))
        self.assertEqual(result['selected_inventory'], 'Raw Materials Inventory')
        self.assertEqual(result['selected_inventory_amount'], Decimal('901.88'))
        self.assertEqual(result['input_vat'], Decimal('108.23'))


if __name__ == '__main__':
    unittest.main()
