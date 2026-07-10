import tkinter as tk
from tkinter import ttk, messagebox
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation

APP_WIDTH = 360
APP_HEIGHT = 560


def money(value: Decimal) -> str:
    return f"{value:,.2f}"


def parse_amount(text: str) -> Decimal:
    cleaned = text.replace(',', '').strip()
    if cleaned in ('', '-', '.', '-.'):
        raise InvalidOperation
    return Decimal(cleaned)


def get_ewt_rate(rate_label: str) -> Decimal:
    return Decimal('0.01') if rate_label == '1%' else Decimal('0.02')


def build_result_summary(amount: Decimal, ewt_rate: str, mode: str, inventory_type: str) -> dict:
    rate = get_ewt_rate(ewt_rate)
    q = Decimal('0.01')

    if mode == 'Check Amount to APT':
        apt = amount / (Decimal('1') - rate)
        ewt = apt * rate
        net_check = amount
    else:
        apt = amount
        ewt = apt * rate
        net_check = apt - ewt

    apt = apt.quantize(q, rounding=ROUND_HALF_UP)
    ewt = ewt.quantize(q, rounding=ROUND_HALF_UP)
    net_check = net_check.quantize(q, rounding=ROUND_HALF_UP)
    input_vat = (apt * Decimal('12') / Decimal('112')).quantize(q, rounding=ROUND_HALF_UP)
    selected_inventory_amount = (apt / Decimal('1.12')).quantize(q, rounding=ROUND_HALF_UP)

    return {
        'apt': apt,
        'ewt': ewt,
        'input_vat': input_vat,
        'gross_before_vat': selected_inventory_amount,
        'net_check': net_check,
        'selected_inventory': inventory_type,
        'selected_inventory_amount': selected_inventory_amount,
    }


class APTCalculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('APT / EWT Calculator')
        self.geometry(f'{APP_WIDTH}x{APP_HEIGHT}')
        self.resizable(False, False)
        self.configure(bg='#f3f3f3')
        self.attributes('-topmost', True)

        self.ewt_rate = tk.StringVar(value='1%')
        self.inventory_type = tk.StringVar(value='Raw Materials Inventory')
        self.amount_var = tk.StringVar()
        self.mode_var = tk.StringVar(value='Check Amount to APT')

        self.apt_value = tk.StringVar(value='0.00')
        self.ewt_value = tk.StringVar(value='0.00')
        self.input_vat_value = tk.StringVar(value='0.00')
        self.net_check_value = tk.StringVar(value='0.00')
        self.gross_before_vat_value = tk.StringVar(value='0.00')
        self.selected_inventory_label = tk.StringVar(value=self.inventory_type.get())
        self.selected_inventory_value = tk.StringVar(value='0.00')
        self.inventory_type.trace_add('write', lambda *_args: self.selected_inventory_label.set(self.inventory_type.get()))

        self._build_ui()

    def _build_ui(self):
        root = ttk.Frame(self, padding=14)
        root.pack(fill='both', expand=True)

        title = ttk.Label(root, text='APT / EWT Calculator', font=('Segoe UI', 15, 'bold'))
        title.pack(anchor='w', pady=(0, 10))

        amount_frame = ttk.LabelFrame(root, text='Amount')
        amount_frame.pack(fill='x', pady=(0, 10))

        self.amount_entry = ttk.Entry(amount_frame, textvariable=self.amount_var, font=('Segoe UI', 18), justify='right')
        self.amount_entry.pack(fill='x', padx=10, pady=10)
        self.amount_entry.focus()

        mode_frame = ttk.Frame(amount_frame)
        mode_frame.pack(fill='x', padx=10, pady=(0, 10))
        ttk.Label(mode_frame, text='Compute:').pack(side='left')
        mode = ttk.Combobox(mode_frame, textvariable=self.mode_var, state='readonly', width=22,
                            values=['Check Amount to APT', 'APT to Check Amount'])
        mode.pack(side='right')

        options = ttk.LabelFrame(root, text='Options')
        options.pack(fill='x', pady=(0, 10))

        ewt_row = ttk.Frame(options)
        ewt_row.pack(fill='x', padx=10, pady=(10, 6))
        ttk.Label(ewt_row, text='EWT Rate').pack(side='left')
        ewt = ttk.Combobox(ewt_row, textvariable=self.ewt_rate, state='readonly', width=12,
                           values=['1%', '2%'])
        ewt.pack(side='right')

        inv_row = ttk.Frame(options)
        inv_row.pack(fill='x', padx=10, pady=(0, 10))
        ttk.Label(inv_row, text='Input VAT For').pack(side='left')
        inv = ttk.Combobox(inv_row, textvariable=self.inventory_type, state='readonly', width=24,
                           values=['Raw Materials Inventory', 'Merchandise Inventory'])
        inv.pack(side='right')

        keypad = ttk.Frame(root)
        keypad.pack(fill='x', pady=(0, 10))

        buttons = [
            ('7', '8', '9'),
            ('4', '5', '6'),
            ('1', '2', '3'),
            ('-', '0', '.'),
        ]
        for row in buttons:
            line = ttk.Frame(keypad)
            line.pack(fill='x', pady=2)
            for label in row:
                ttk.Button(line, text=label, command=lambda x=label: self.add_char(x)).pack(side='left', expand=True, fill='x', padx=2)

        action_line = ttk.Frame(keypad)
        action_line.pack(fill='x', pady=2)
        ttk.Button(action_line, text='Clear', command=self.clear).pack(side='left', expand=True, fill='x', padx=2)
        ttk.Button(action_line, text='Compute', command=self.compute).pack(side='left', expand=True, fill='x', padx=2)

        results = ttk.LabelFrame(root, text='Results')
        results.pack(fill='both', expand=True)

        self._result_row(results, 'APT / AP Trade', self.apt_value)
        self._result_row(results, 'EWT', self.ewt_value)
        self._result_row(results, 'Input VAT', self.input_vat_value)
        self._result_row(results, self.selected_inventory_label, self.selected_inventory_value)
        self._result_row(results, 'Gross Before VAT', self.gross_before_vat_value)
        self._result_row(results, 'Net Check', self.net_check_value)

        note = ttk.Label(root, text='Formula: Check = APT - EWT. Inventory = APT / 1.12.', font=('Segoe UI', 8))
        note.pack(anchor='w', pady=(8, 0))

        self.bind('<Return>', lambda _event: self.compute())
        self.bind('<Escape>', lambda _event: self.clear())

    def _result_row(self, parent, label, variable):
        row = ttk.Frame(parent)
        row.pack(fill='x', padx=10, pady=4)
        ttk.Label(row, text=label).pack(side='left')
        ttk.Label(row, textvariable=variable, font=('Segoe UI', 10, 'bold')).pack(side='right')

    def add_char(self, char):
        current = self.amount_var.get()
        if char == '-' and current:
            return
        if char == '.' and '.' in current:
            return
        self.amount_var.set(current + char)

    def clear(self):
        self.amount_var.set('')
        self.apt_value.set('0.00')
        self.ewt_value.set('0.00')
        self.input_vat_value.set('0.00')
        self.selected_inventory_label.set(self.inventory_type.get())
        self.selected_inventory_value.set('0.00')
        self.net_check_value.set('0.00')
        self.gross_before_vat_value.set('0.00')
        self.amount_entry.focus()

    def compute(self):
        try:
            amount = parse_amount(self.amount_var.get())
        except InvalidOperation:
            messagebox.showerror('Invalid Amount', 'Please enter a valid amount.')
            return

        result = build_result_summary(
            amount,
            self.ewt_rate.get(),
            self.mode_var.get(),
            self.inventory_type.get(),
        )

        self.apt_value.set(money(result['apt']))
        self.ewt_value.set(money(result['ewt']))
        self.input_vat_value.set(money(result['input_vat']))
        self.selected_inventory_label.set(result['selected_inventory'])
        self.selected_inventory_value.set(money(result['selected_inventory_amount']))
        self.gross_before_vat_value.set(money(result['gross_before_vat']))
        self.net_check_value.set(money(result['net_check']))


if __name__ == '__main__':
    app = APTCalculator()
    app.mainloop()
