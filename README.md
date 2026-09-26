# Smart Merma (a.k.a. "Merma AI") — Inventory & Shrinkage Control for Food Retail

**Live demo:** https://joseluismontezamilian12-rgb.github.io/merma-ai/

React SPA that turns paper-and-memory store ordering into data. I built it as a store manager to solve my own problem: inaccurate orders that ended up as shrinkage (*merma*) — expired product thrown away, money lost.

> **Field-tested:** I piloted this at the fast-casual store I managed in Lima, loaded with the store's real catalog (78 SKUs with official portioning and shelf life), three real weekly orders and a real stock-exit record, to cross-check warehouse stock, orders and shrinkage before every order day. **This public repo ships a sanitized demo dataset** — the original store data is confidential and stays out of version control.

## What it does

- **Order-cycle aware.** The store orders on a fixed Tue/Thu/Fri calendar, and each order day covers specific consumption days (Tue → Thu+Fri · Thu → Sat+Sun+Mon · Fri → Tue+Wed). The app knows the calendar and always shows the next order day.
- **Next-order recommendation, explained.** For each product it computes real consumption per past order (*ordered − shrinkage*), averages it across the order history, subtracts the current stock you enter, and justifies the number with the per-order breakdown ("ordered 12, shrinkage 2 → consumed 10").
- **Shrinkage ledger.** Stock-exit records with reason, code and cost per item; total loss tracked in S/.
- **Catalog with shelf-life alerts.** Products with short shelf life (≤ 3–5 days) are surfaced on the dashboard — those are the ones that become shrinkage.
- **Zero backend.** Everything persists in `localStorage`. The operation needed "an Excel, but as a web page" — deliberately no servers, no accounts, no setup.

## Why "AI" in the name?

The project started as an AI-assisted prototype and the name stuck at the store. The version I actually ran the pilot with — this one — is **deliberately rule-based**: the operation needed explainable numbers a store team could trust and argue with, not a black box. (An LLM layer for parsing unstructured inventory logs is the natural next iteration.)

## Stack

React 19 · Vite · Inline-styled single-component UI · `localStorage` · GitHub Pages

## Run locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build (dist/)
```

## Origin

Designed and iterated with AI assistance (Claude) from real store artifacts: delivery guides, SAP stock-exit records and the store's product spec sheet. Ported from the original prototype's storage API to `localStorage` for standalone deployment.

---

## Author

**José Luis Monteza Milian** — Backend / Full-Stack Developer (.NET · React · TypeScript), Lima, Peru.  
[Portfolio](https://joseluismontezamilian12-rgb.github.io/portafolio-frontend/) · [LinkedIn](https://www.linkedin.com/in/joseluismonteza) · [GitHub](https://github.com/joseluismontezamilian12-rgb)

---

## License

MIT — see [LICENSE](LICENSE).
