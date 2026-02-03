## Feature Contract (API ↔ UI Mapping)

This section defines the **shared contract** between the frontend (`omniretail-app`) and backend (`omniretail-api`).

Conventions:
- API base: `/api/v1`
- Auth: cookie session (same-origin) **or** bearer token (separate origin)
- All endpoints return JSON
- List endpoints support pagination via `page`, `perPage` (planned)

---

### Authentication & Access

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/login` | `POST /auth/login` | Returns session/token + user payload |
| Logout button | `POST /auth/logout` | Invalidates session/token |
| App boot (who am I?) | `GET /auth/me` | Used by route guards + role-based navigation |
| Forgot password | `POST /auth/forgot-password` | Sends reset email (optional SMTP) |
| Reset password | `POST /auth/reset-password` | Token + new password |
| Optional Google OAuth | `GET /auth/google` → `GET /auth/google/callback` | If implemented |

---

### Users & Roles (Admin / Manager)

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/settings` (profile basics) | `GET /users/me` `PUT /users/me` | Name, display info |
| User management list | `GET /users` | Admin-only |
| Create staff user | `POST /users` | Admin/Manager policy (decide) |
| Disable/enable user | `PATCH /users/{id}/status` | Prevent self-disable rule |
| Assign role | `PATCH /users/{id}/role` | Admin-only recommended |

---

### Products

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/products` list | `GET /products` | `q`, `status`, `sort`, pagination |
| Create product | `POST /products` | SKU unique validation |
| Edit product | `PUT /products/{id}` | Full update (or PATCH) |
| View product | `GET /products/{id}` | For details page |
| Deactivate product | `PATCH /products/{id}/status` | Soft disable |
| Delete product (optional) | `DELETE /products/{id}` | Prefer soft delete |

**Planned query params (examples):**
- `GET /products?q=milk&status=active&page=1&perPage=25&sort=name`

---

### Inventory (Ledger-Based)

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/inventory` overview | `GET /inventory` | Returns stock on hand + low stock flag |
| Inventory detail (per product) | `GET /inventory/products/{productId}` | Current stock + thresholds |
| Inventory movement history | `GET /inventory/products/{productId}/movements` | Ledger entries |
| Stock adjustment form | `POST /inventory/movements` | Creates ledger entry (adjustment) |
| Low stock list | `GET /inventory/low-stock` | Threshold-based |

**Inventory movement payload (planned):**
- `type`: `stock_in | stock_out | adjustment`
- `quantity`: integer
- `reason`: string enum/free text
- `reference`: order id (when applicable)

---

### POS (Checkout)

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/pos` product search | `GET /products` | Barcode/SKU/name search |
| Add item by barcode/SKU | `GET /products/lookup?code=...` | Optimized lookup endpoint (optional) |
| Create sale (checkout) | `POST /pos/checkout` | Creates completed order + payment |
| Receipt preview | `GET /orders/{id}/receipt` | Structured payload for printing later |

**POS checkout (planned) should be transactional:**
- Validates stock
- Deducts stock via ledger
- Creates order + payment record
- Returns order summary

---

### Orders

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/orders` list | `GET /orders` | Filter by status/date/staff |
| Order detail | `GET /orders/{id}` | Items, totals, payments, status |
| Update status | `PATCH /orders/{id}/status` | Enforces valid transitions |
| Cancel order | `POST /orders/{id}/cancel` | Or status patch with rules |
| Refund (full/partial) | `POST /orders/{id}/refund` | Reconciles inventory + payment record |

**Planned query params (examples):**
- `GET /orders?status=completed&from=2026-01-01&to=2026-01-31&page=1`

---

### Reporting

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| `/reports` overview | `GET /reports/summary` | KPIs: sales today, orders, low stock count |
| Sales by date range | `GET /reports/sales?from=...&to=...` | Totals + grouping |
| Top-selling products | `GET /reports/top-products?from=...&to=...` | Units + revenue |
| Low stock report | `GET /reports/low-stock` | Same as inventory view, report format |
| Export CSV (optional) | `GET /reports/sales.csv?from=...&to=...` | Or `Accept: text/csv` |

---

### Audit Logs (Admin / Manager)

| UI Screen / Flow | API Endpoint(s) | Notes |
|---|---|---|
| Audit log viewer | `GET /audit-logs` | Filter by actor, entity, date |
| Audit log detail | `GET /audit-logs/{id}` | Full metadata |

---

### Cross-Cutting UI Requirements (Contract Expectations)

Frontend should assume:
- Standard error format (planned):
  - `message`: human readable
  - `errors`: field-level errors (optional)
  - `code`: stable machine code (optional)
- Authorization errors:
  - `401` unauthenticated (send to `/login`)
  - `403` forbidden (show “no access”)
- Pagination (planned):
  - response contains `data`, `meta: { page, perPage, total }`

Backend should assume:
- Frontend will send:
  - JSON request bodies for mutations
  - `Accept: application/json`
  - Auth via cookies or `Authorization: Bearer <token>` depending on deployment

---
