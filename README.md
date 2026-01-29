# OmniRetail App

**OmniRetail App** is the frontend application for the OmniRetail retail operations platform.  
Built with **React** and **Tailwind CSS**, it provides the UI for product management, inventory visibility, POS checkout workflows, order management, and reporting.

This repository contains the **single-page application (SPA)** that consumes the OmniRetail API.

---

## Purpose

This project is portfolio-grade frontend work focused on:

- Clean React architecture (feature-based structure)
- POS-friendly UI workflows
- Fast and consistent UI with Tailwind CSS
- Practical API integration patterns (querying, mutations, caching)
- Role-based navigation and screen access

---

## Architecture Overview

- **React SPA**
- Client-side routing (e.g., React Router)
- Tailwind-based component styling
- API layer that communicates with **OmniRetail API** (`/api/v1`)
- Auth-aware layouts and route guards

---

## Planned / Not Yet Implemented Features

> Unless stated otherwise, features are shared with the backend project and require UI + API support.

### Authentication & Access Control
- Login screen
- Logout flow
- Auth session handling (cookie or token)
- Role-based routing / navigation:
  - Admin / Manager / Staff / Cashier
- Account disabled handling
- Password reset UI
- Optional Google OAuth sign-in UI

### Products & Catalog
- Products list (search, filters, pagination)
- Create/edit product forms (SKU, barcode, price, status)
- Product detail view
- Bulk actions (activate/deactivate)
- CSV import/export UI (optional)

### Inventory Management
- Inventory overview dashboard (stock on hand, low stock)
- Product inventory detail (movement history)
- Stock adjustment UI (with reasons)
- Low-stock view and filters
- Multi-location inventory UI (future extension)

### POS & Checkout Workflows
- POS screen:
  - barcode/SKU quick add
  - product search add
  - cart with quantities and line totals
- Fast keyboard-friendly controls
- Payment flow (cash/manual)
- Sale confirmation and receipt preview
- Refund UI (full/partial)
- Scanner-friendly input handling

### Orders & Sales
- Orders list (filters by date/status)
- Order detail view (items, totals, payments, staff)
- Status update UI (with validation messages)
- Cancel/refund flows

### Reporting
- Daily sales dashboard
- Date-range reporting screens
- Top products and trend views
- Low stock report screen
- Export report UI (CSV)

### UI / UX
- Tailwind-based design system (buttons, forms, tables, modals)
- Responsive layouts (tablet POS support)
- Loading/error states standardization
- Toast notifications
- Empty state patterns
- Accessible form validation messages

### Audit & Operational Safety (UI)
- Audit log viewer (admin/manager)
- Inventory adjustment confirmation modal
- Role-based visibility of sensitive actions
- “Danger zone” patterns for destructive actions

---

## Tech Stack

- React
- Tailwind CSS
- JavaScript (or TypeScript if adopted)
- Vite (recommended)
- Node.js
- Git
- Docker (optional for deployment)

---

## Environment Configuration (Planned)

Create `.env` with:

- `VITE_API_BASE_URL` (e.g. `https://api.omniretail.dev/api/v1`)
- Optional feature flags (POS mode, reports toggles)

---

## Repository Notes

This repo is intended to run independently as a frontend service (static build) and can be served via Nginx behind a reverse proxy.

Backend repo: **omniretail-api**
