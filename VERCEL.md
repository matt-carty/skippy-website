# Vercel (`vercel.json`)

## `installCommand`: `npm ci`

This repo commits **`package-lock.json`** as the install source of truth. A prior vendor change set **`pnpm install`** in `vercel.json` even though **`pnpm-lock.yaml` is not in Git**, which led to flaky or broken installs on Vercel (for example pnpm **`ERR_INVALID_THIS`** / **`URLSearchParams`** when fetching the npm registry). **`npm ci`** in `vercel.json` installs from the committed lockfile and avoids that mismatch.

Same note appears in **`README.md`** near the top under **Skippy English · Vercel builds**, and again under **Deploy → Deploy to Vercel**.

