


# Exploratory Testing Charters for Money Management App (unpaid version)

## 1. Expense Recording & Categorization
- Test adding expenses with different categories (e.g., Sports, Gifts, Car).
- Verify if the correct category is assigned and saved properly.
- Check edge cases (e.g., negative amounts, large amounts, special characters).

## 2. Income Recording & Categorization
- Add income entries under different types (Salary, Deposit, Savings).
- Verify if the correct category is assigned and saved properly.

## 3. Transfers Between Cash & Card
- Record transfers between different payment methods (cash, card).
- Verify if balances update correctly in both accounts.
- Check for incorrect inputs (e.g., negative amounts, large amounts, special characters).

## 4. Viewing & Filtering Transactions
- Test filters for viewing transactions by:
  - **Payment method** (Cash, Card, Both).
  - **Time intervals** (Day, Week, Monthly, All etc).
- Verify correct calculations of total amounts under each category.

## 5. Search Functionality
- Search transactions using:
  - **Keywords** (e.g., "Health," "Salary").
  - **Notes** (e.g., "bday").
  - **Amount ** (e.g., transactions less than or greater than amount, amount).
- Ensure accurate results and response times.

## 6. Deleting Transactions
- Delete an expense, income, and transfer entry.
- Ensure the correct entry is removed, and balances update accordingly.

## 7. Managing Categories, Accounts and Settings
- Delete an existing category and check the impact on past transactions.
- Verify error handling if deleting a category linked to transactions.
- Verify Cash and Payment Card accounts for Payment transfers
- Verify Settings (Data Backup, Balance, Language)

## 8. Session Persistence & Data Integrity
- Close and reopen the app to ensure saved transactions remain intact.
- Check if data loss or corruption occurs after multiple updates.

## 9. Performance & Error Handling
- Test how the app handles large amounts of transactions.
- Check if any UI/functional crashes occur when adding/deleting entries quickly.

---

# Bug Findings Report

## 1. UI Bug: Long Expense Note Overlaps Date Field
- **Description:** When a long note is added to an expense entry, it overlaps with the date field in the search results.
- **Steps to Reproduce:**
  1. Add an expense with a long note.
  2. Search for the expense using the search bar.
  3. Observe that the note overlaps with the date field.
- **Expected Result:**
  - The note should be truncated or wrapped properly.
  - The date should remain visible and unaffected.
- **Actual Result:**
  - The note overlaps the date, making it unreadable.
- **Priority:** P3 (Medium)
- **Severity:** UI Issue
- **Suggested Fix:**
  - Implement text wrapping or truncation for long notes.
  - Ensure layout adjustments maintain readability.

## 2. Major Bug: Deleting an Expense Category Causes Data Loss
- **Description:** When a user deletes a specific expense category (e.g., Shopping) from Settings, all expenses recorded under that category disappear from the balance instead of being reassigned to a default category.
- **Steps to Reproduce:**
  1. Add an expense under a specific category (e.g., €50 under "Gifts").
  2. Ensure the balance reflects the deduction.
  3. Delete the "Gifts" category from Settings.
  4. Check the balance.
- **Expected Result:**
  - The expenses should remain in the balance.
  - Transactions under the deleted category should move to a default category (e.g., "Others").
  - A warning should inform users before deletion.
- **Actual Result:**
  - Expenses under the deleted category vanish from the balance.
  - The total balance increases incorrectly.
  - No warning is given before deletion.
- **Priority:** P1 (High)
- **Severity:** Major
- **Reason:**
  - Financial inconsistency: The total balance changes unexpectedly.
  - Data loss risk: Expenses effectively get erased.
  - Usability issue: Users are not informed of this consequence.
- **Suggested Fix:**
  1. Reassign deleted category expenses to a default category like "Others".
  2. Display a warning message before category deletion.
  3. Ensure expense calculations remain consistent.

## 3. Major Bug: Budget Feature Incorrectly Modifies Income
- **Description:** When a user sets a budget amount, the income calculation in the app changes incorrectly. This results in inflated income values, making the financial summary inaccurate.
- **Steps to Reproduce:**
  1. Ensure the app has an income of €100.
  2. Set a budget amount of €50.
  3. Observe the income value.
- **Expected Result:**
  - The budget should not affect the income total.
  - The budget should be a separate reference value for spending control.
- **Actual Result:**
  - The income suddenly increases to €600 after setting the budget.
  - The app displays incorrect financial summaries.
- **Priority:** P1 (High)
- **Severity:** Major
- **Suggested Fix:**
  1. Ensure budget calculations do not interfere with the recorded income.
  2. Keep budget values independent from actual financial totals.
  3. Provide a clear description of how the budget feature is intended to work.

# Prioritization of Charters (Reasons)
1) **Expense Recording & Categorization** – High priority because it’s the core function of the app.  
2) **Income Recording & Categorization** – Essential for tracking finances accurately.  
3) **Transfers Between Cash & Card** – Important to maintain accurate financial records.  
4) **Viewing & Filtering Transactions** – Essential for users to analyze spending and manage finances effectively.  
5) **Search Functionality** – High priority for ease of use and quick data retrieval.  
6) **Deleting Transactions** – Needed for correcting mistakes.  
7) **Managing Categories, Accounts and Settings** – Medium priority, as users may need to manage and view Accounts info specific to transfers and make changes to app behavior.  
8) **Session Persistence & Data Integrity** – Critical for ensuring financial records are not lost.  
9) **Performance & Error Handling** – Important for stability, but lower priority than core features.  

---

# Risks to Mitigate
- **Incorrect financial calculations** leading to misleading balances.  
- **Data loss or corruption** after app crashes or updates.  
- **Security risks** if transactions or user data are stored insecurely.  
- **Poor performance** when handling a large number of transactions.  
- **Incorrect filtering or search results** leading to inaccurate financial insights.  
- **Usability issues** if filtering/search functionality is not intuitive.  

