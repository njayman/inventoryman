## **1\. 🛒 Product Management**

### **➕ Add & Manage Products**

* Add new products with:

  * Product Name

  * Unique Product ID

  * Category

  * Supplier

  * Purchase Rate

  * Sales Rate

  * Quantity

* Auto-update quantity if product already exists (based on Product ID).

### **🔄 Return & Refund Handling (Optional)**

* Support product return with reason logging.

* Returned items should be added back to inventory.  
  * 

---

### **2\. Customer Management**

* The system should allow **adding new customers** as soon as they arrive to make a purchase or transaction.

* If the customer is already in the system, it should fetch existing details (auto-complete/search).

* For new customers:

  * Capture name, contact number, and optional address.

  * Automatically assign a unique **Customer ID**.

## **3\. 💰 Sales Management**

### **🧾 Sales Entry & Stock Deduction**

* Sales transactions must:

  * Deduct sold quantity from current stock.

  * Auto-calculate profit per transaction:  
     **Profit \= (Sales Rate − Purchase Rate) × Quantity Sold**

### **💳 Credit Sales & Due Tracking**

* Allow partial payments or credit sales.

* System should:

  * Mark unpaid balance as **credit**

  * Track:

    * Customer Name

    * Date of Transaction

    * Products & Quantities

    * Amount Paid

    * Amount Due

  * Generate **Credit Reports** with:

    * Filters (date range, customer)

    * Full transaction summary for follow-up

### **📢 Customer Notification**

* Show outstanding dues and transaction history when starting a new sale.

---

## 

## **4\. 📊 Reports & Insights**

### **📦 Sales Report**

* Generate sales records including:

  * Customer Name

  * Product(s) Purchased

  * Quantity & Date

  * Filters: by Date, Customer, Product

### **🧾 Purchase Report**

* Track and display:

  * Supplier Name

  * Products Purchased

  * Quantity

  * Purchase Date

### **💸 Expense Report**

* Record operational costs under categories:

  * Utilities, Rent, Salaries, Transportation, Miscellaneous

### **📈 Profit Report**

* Show financial summary:

  * **Gross Profit** \= Total Sales − Total Purchases

  * **Net Profit** \= Gross Profit − Total Expenses

**📈  Credit Report**  
 

* Tracks all credit sales:  
  * `Customer Name`, `Products`, `Date`, `Amount Paid`, `Amount Due`

  * Filterable by **date range** for follow-up on dues.

### **📅 Date-Based Sales Categorization**

* View which customers bought what product on a specific day.

### **👀 At-a-Glance Stock Dashboard**

* Display real-time product stock levels for quick overview.

### **🚨 Low Stock Alerts (Optional)**

* Notify shopkeeper when stock falls below a defined minimum threshold.

---

## **5\. 📇 Supplier & Customer Management**

### **👤 Supplier Management**

* Add/Edit/Delete supplier details:

  * Name, Company, Phone, Email, Address, Remarks

* View full purchase history & outstanding payments.

### **🧑‍🤝‍🧑 Customer Info Management**

* Store and manage:

  * Name, Phone, Email, Address, Remarks

---

## **6\. 🛠️ Data Operations & System Utilities**

### **✏️ Transaction Modification**

* Allow authorized users to edit or delete sales/purchase transactions in case of error.

### **🔍 Advanced Search**

* Quick search by Name or ID for:

  * Products

  * Customers

  * Suppliers

### **💾 Data Backup & Export**

* Export reports or full data to Excel/CSV format for backup and analysis.

### **🛒 Customer Purchase Flow (Sales Event)**

### **🔹 Feature: Sales/Purchasing Event Handling (Customer Checkout Flow)**

#### **✅ Scenario: A customer comes, selects multiple products (of varying types, quantities, and prices), and makes a purchase.**

When a **customer enters the shop**, the following sequence happens:

1. **Customer Entry**

   * The shopkeeper records the **customer name** and a phone number. (Optionally NID Number)

   * If the customer is a **returning customer**, their previous purchase or credit history must be looked up.

2. **Product Selection**

   * Customer chooses **multiple products**, possibly:

     * Different products

     * Different quantities

     * **Different sales prices** \-( As same product can have multiple seller with multiple price ){ Can be shown as Dropdown along with Seller name from Stock of that product}  
         
3. **System Actions During Selection**

   * The system checks the **stock availability** for each selected product.

   * The current stock levels are **decreased automatically** based on quantity sold.

   * If the product is already in the inventory (matched by `product_id`), stock is simply reduced.

4. **Billing & Payment**

   * Total is calculated: `Total = Σ (Quantity × Sales Price)`

   * The customer makes **full or partial payment**.

     * If **full payment** is made:

       * Transaction marked as “Paid”.

     * If **partial payment**:

       * Transaction marked as “Credit”.

       * System tracks:

         * Amount paid

         * Amount due

         * Marks this under the **Customer’s Credit Profile**

         * Includes this in the **Credit Report**.

5. **Sales Recording**

   * Sales info saved:

     * Customer Name

     * Date & Time

     * Product Names

     * Quantity & Price

     * Amount Paid / Due

   * Can be later viewed in:

     * **Sales Report**

     * **Credit Report** (if partial payment)

     * **Customer Purchase History**

     * **Profit Report** (based on purchase price vs sales price)

6\. **Optional Invoice/Receipt**

**All Possible Events::**

### **Event 1: Add New Product / Update Existing Stock**

**Trigger:** User enters product info and submits on "Add Product" form.

**Logic Flow:**

1. **Input Validation:**

   * Validate all product fields: Name, Product ID, Category(Not Sure Till Now), Supplier ( can Be Auto Populated from Seller Info), Purchase Rate, Sales Rate, Quantity.

2. **Check Product Existence:**

   * Query database by Product ID.

   * If product exists, fetch current stock.

3. **Update or Insert:**

   * If product exists, update quantity by adding the new quantity.

   * Else, insert new product record.

4. **Update UI:**

   * Notify user of successful add/update.

   * Clear input fields.

5. **Functions to Modify/Create:**

   * `add_product(product_id, name, category, supplier, purchase_rate, sales_rate, quantity)`

     * Modify to check existence and update stock if needed.

   * GUI handler function for product form submission.

---

### **Event 2: Add New Customer / Fetch Existing Customer**

**Trigger:** User inputs customer info at sales or customer management tab.

**Logic Flow:**

1. **Check Customer ID or Name:**

   * On customer entry, search database for existing customer by name or phone.

2. **If Existing:**

   * Auto-fill customer details in form.

   * Assign existing Customer ID.

3. **If New:**

   * Generate unique Customer ID.

   * Insert new customer details (name, phone, optional address).

4. **Update UI:**

   * Confirm customers added or selected.

   * Proceed with sales or other operations.

5. **Functions to Modify/Create:**

   * `get_customer_by_name_or_phone(name, phone)`

   * `add_customer(name, phone, address)` (enhanced with auto ID generation)

   * Sales entry UI logic to incorporate customer lookup.

---

### **Event 3: Sales Entry & Stock Deduction**

**Trigger:** User records a sale transaction.

**Logic Flow:**

1. **Input Validation:**

   * Validate customer ID, product IDs, quantities.

2. **Check Stock Availability:**

   * For each product, check if stock quantity \>= requested quantity.

3. **Deduct Stock:**

   * Decrease stock quantity by sold quantity for each product.

4. **Calculate Profit:**

   * For each product:  
      `profit = (sales_rate - purchase_rate{can be Multiple for a single product , so have to choose during this event}) * quantity_sold`

5. **Record Sale:**

   * Save transaction details including customer, products, quantities, sales rate, purchase rate, total price, profit.

6. **Update UI:**

   * Show confirmation, receipt generation.

   * Notify if stock is insufficient.

7. **Functions to Modify/Create:**

   * `make_sale(customer_id, products_quantities)` — handle multi-product sales

   * `deduct_stock(product_id, quantity)`

   * Profit calculation logic integrated in sale recording

   * Receipt generation update for multiple items if needed.

---

### **Event 4: Credit Sales & Due Tracking**

**Trigger:** Partial payment or credit sale during sales entry.

**Logic Flow:**

1. **Input Payment Amount:**

   * Allow user to enter amount paid and calculate amount due.

2. **Mark Transaction:**

   * Flag transaction as credit if amount due \> 0\.

3. **Store Credit Info:**

   * Save customer, date, products, amount paid, amount due in credit ledger.

4. **Notification:**

   * During future sales, notify if a customer has outstanding dues.

5. **Report Generation:**

   * Enable filtering credit transactions by date/customer for reports.

6. **Functions to Modify/Create:**

   * Modify `make_sale()` to accept partial payment and track credit.

   * Create `record_credit_transaction(customer_id, products, amount_paid, amount_due, date)`

   * Credit report function with filters.

---

### **Event 5: Customer Transaction Notification**

**Trigger:** Starting a new sale for a customer.

**Logic Flow:**

1. **Fetch Customer Credit Info:**

   * Query credit ledger for outstanding dues for the customer.

2. **Show Notification:**

   * If it happens to be an existing customer, then show all of their prev / recent 5 transactions  
   * If dues exist, alert user with a summary (amount due, last transaction date).  
     

3. **Proceed with Sale:**

   * User can decide to continue or request payment.

4. **Functions to Modify/Create:**

   * `get_customer_credit_info(customer_id)`

   * UI popup or label showing outstanding dues on sales form load.

---

### **Event 6: Generate Sales Report**

**Trigger:** User requests sales report.

**Logic Flow:**

1. **Accept Filters:**

   * Date range, Customer, Product.

2. **Query Sales Data:**

   * Retrieve transactions matching filters.

3. **Display Report:**

   * Show in scrollable table with relevant fields.

4. **Export Option (Optional):**

   * Allow export to Excel/CSV.

5. **Functions to Modify/Create:**

   * `get_sales_by_filters(date_range, customer_id, product_id)`

   * Report display function (reuse your existing scrollable list code).

---

### **Event 7: Generate Purchase Report**

**Trigger:** User requests purchase report.

**Logic Flow:**

1. **Accept Filters:**

   * Date range, Supplier.

2. **Query Purchase Data:**

   * Retrieve purchases based on filters.

3. **Display & Export:**

   * Show data and enable export.

4. **Functions to Modify/Create:**

   * `get_purchases_by_filters(date_range, supplier_id)`

   * Report UI functions.

---

### **Event 8: Generate Expense Report**

**Trigger:** User logs expenses and requests expense report.

**Logic Flow:**

1. **Input Expense Details:**

   * Category, amount, date, remarks.

2. **Store Expenses:**

   * Save to expense ledger.

3. **Generate Report:**

   * Summarize expenses by category over time.

4. **Functions to Modify/Create:**

   * `add_expense(category, amount, date, remarks)`

   * `get_expenses_by_date_range(date_range)`

   * Expense report UI.

---

### **Event 9: Generate Profit Report**

**Trigger:** User requests profit summary.

**Logic Flow:**

1. **Fetch Total Sales, Purchases, Expenses:**

   * Aggregate sums over specified period.

2. **Calculate:**

   * `Gross Profit = Total Sales − Total Purchases`

   * `Net Profit = Gross Profit − Total Expenses`

3. **Display Report:**

   * Show values and optionally graphical summaries.

4. **Functions to Modify/Create:**

   * Aggregate query functions: sales, purchases, expenses.

   * Profit calculation function.

   * UI display.

---

### **Event 10: At-a-Glance Stock Checking & Low Stock Alerts**

**Trigger:** User views dashboard or adds/modifies product stock.

**Logic Flow:**

1. **Fetch Current Stock Levels:**

   * Query all products and quantities.

2. **Display Dashboard:**

   * Show real-time stock levels, highlighting low stock if below threshold.

3. **Low Stock Notification:**

   * Trigger alert or highlight for low stock items.

4. **Functions to Modify/Create:**

   * `get_all_product_stock()`

   * Threshold config per product.

   * UI dashboard widget code.

---

### **Event 11: Supplier Management**

**Trigger:** User adds/edits/deletes supplier, or views purchase history.

**Logic Flow:**

1. **Manage Supplier Info:**

   * CRUD operations on supplier data.

2. **View Purchases & Payments:**

   * Show linked purchase transactions per supplier.

   * Track outstanding payments.

3. **Functions to Modify/Create:**

   * Supplier CRUD functions.

   * Query purchases/payments by supplier.

---

### **Event 12: Transaction Modification**

**Trigger:** Authorized user wants to edit or delete sales/purchase.

**Logic Flow:**

1. **Select Transaction:**

   * Search and select transactions.

2. **Edit or Delete:**

   * Update or remove transaction record.

3. **Adjust Stock/Profit:**

   * Recalculate stock and profits accordingly.

4. **Functions to Modify/Create:**

   * Transaction edit/delete functions with stock adjustment.

---

### **Event 13: Search & Data Export**

**Trigger:** User performs search or requests data export.

**Logic Flow:**

1. **Search by Name or ID:**

   * For products, customers, suppliers.

2. **Display Filtered Results:**

   * Update UI with matching entries.

3. **Export Data:**

   * Export selected reports or full data to Excel/CSV.

4. **Functions to Modify/Create:**

   * Search functions on DB queries.

   * Export utilities.  
   * 

### ***✅ Event 14: Date-Based Sales Categorization***

## ***Trigger:***  *User selects a specific date to view which customers bought which products on that day**.***

## ---

### ***🔄 Logic Flow:***

#### 📅 Date Input:

* ## Prompt the user to enter or select a date. 

* ## Validate date format (`YYYY-MM-DD`). 

#### 🧾 Fetch Data:

* ## Query the database to get all sales made on the selected date. 

* ## Join tables: `sales`, `customers`, and `products` to retrieve: 

  * ## Customer Name 

  * ## Product Name 

  * ## Quantity Sold 

#### 📊 Display Filtered Results:

* ## Show data in a new table view (TreeView) with: 

  * ## Customer Name 

  * ## Product Name 

  * ## Quantity 

#### 📤 Export Option (Optional Enhancement):

* ## Allow the user to export the filtered result into Excel or CSV. 

### 🛠️ Functions to Modify/Create:

#### ✅ New Functions:

* ## `get_sales_by_date(date)`    → Query to join `sales`, `customers`, and `products` based on `sale_date`. 

* ## `view_sales_by_date()`    → GUI function to prompt date input, fetch data, and display results. 

#### ✅ Modified Tables:

* ## Ensure `sales` table includes: 

  * ## `sale_date` (DATETIME) 

  * ## `customer_id`, `product_id`, `quantity`

---

# 

# 

# 

# 

# **Summary Table (Event vs Affected Functions)**

| Event | Key Functions to Modify/Create |
| ----- | ----- |
| Add / Update Product | add\_product(), product\_exists\_check() |
| Add / Fetch Customer | add\_customer(), get\_customer\_by\_name\_or\_phone() |
| Sales & Stock Deduction | make\_sale(), deduct\_stock(), calculate\_profit() |
| Credit Sales & Reporting | make\_sale() (partial payment), record\_credit\_transaction() |
| Customer Notification | get\_customer\_credit\_info() |
| Generate Sales Report | get\_sales\_by\_filters(), report\_display() |
| Generate Purchase Report | get\_purchases\_by\_filters(), report\_display() |
| Expense Report | add\_expense(), get\_expenses\_by\_date\_range() |
| Profit Report | aggregate\_sales(), aggregate\_purchases(), aggregate\_expenses() |
| Stock Dashboard | get\_all\_product\_stock(), low\_stock\_alert() |
| Supplier Management | supplier\_CRUD(), get\_supplier\_purchases() |
| Transaction Modification | edit\_transaction(), delete\_transaction(), adjust\_stock() |
| Search & Export | search\_entities(), export\_to\_excel() |

***Queries::***

1. Can Quantity be float or always integer? \- Saom  
2. 