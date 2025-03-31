This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
dfx
├─ components.json
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ pdf.png
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ src
   ├─ app
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.js
   │  └─ page.js
   ├─ components
   │  ├─ addSource
   │  │  ├─ add-source-dialog.jsx
   │  │  ├─ add-source-dropDown.jsx
   │  │  └─ add-source.jsx
   │  ├─ header.jsx
   │  ├─ mode-toggle.jsx
   │  ├─ no-document-selected.jsx
   │  ├─ tabs
   │  │  ├─ chat-document-tab.jsx
   │  │  ├─ document-search-tab.jsx
   │  │  ├─ metadata-tab.jsx
   │  │  ├─ preview-tab.jsx
   │  │  └─ tabs-container.jsx
   │  ├─ tagsInput.jsx
   │  ├─ theme-provider.jsx
   │  ├─ ui
   │  │  ├─ avatar.jsx
   │  │  ├─ badge.jsx
   │  │  ├─ button.jsx
   │  │  ├─ card.jsx
   │  │  ├─ checkbox.jsx
   │  │  ├─ dialog.jsx
   │  │  ├─ dropdown-menu.jsx
   │  │  ├─ input.jsx
   │  │  ├─ label.jsx
   │  │  ├─ resizable.jsx
   │  │  ├─ skeleton.jsx
   │  │  ├─ sonner.jsx
   │  │  ├─ table.jsx
   │  │  ├─ tabs.jsx
   │  │  ├─ textarea.jsx
   │  │  ├─ toggle-group.jsx
   │  │  ├─ toggle.jsx
   │  │  └─ tooltip.jsx
   │  └─ uploadDocuments
   │     ├─ upload-document-dialog.jsx
   │     └─ upload-document.jsx
   ├─ lib
   │  ├─ constants.js
   │  └─ utils.js
   └─ store
      └─ useStore.js

```