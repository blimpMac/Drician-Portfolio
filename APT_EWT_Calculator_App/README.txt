APT / EWT Calculator App

Features:
- Fixed-size window similar to a small Windows Calculator.
- Not resizable.
- Stays on top of other app windows until minimized or closed.
- Computes APT / AP Trade from check amount.
- Supports 1% and 2% EWT.
- Computes Input VAT using VAT-inclusive AP Trade formula: APT x 12 / 112.
- Inventory category dropdown: Raw Materials Inventory or Merchandise Inventory.
- Shows the selected inventory amount below Input VAT.
- Also supports reverse mode: APT to Check Amount.

How to run:
1. Double-click the EXE in the dist folder after building.
2. For development, install Python 3 and run:
   python apt_calculator.py

EXE build:
1. Install PyInstaller:
   pip install pyinstaller
2. Build:
   pyinstaller --onefile --windowed apt_calculator.py
3. The EXE will be inside the dist folder.
