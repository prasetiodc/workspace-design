# Workspace Builder

An interactive workspace configurator for people renting office equipment in Bali.

## Short Write-Up

The builder keeps a live 2D room preview beside the product choices, with the rental estimate updating as the setup changes. Choices are stored in `localStorage` so a refresh does not erase the configuration. The rental request is a prototype: it saves the submitted details locally and does not yet send them to the team.

It uses Next.js App Router, React, and TypeScript. Builder state and calculations live outside the page component, while preview, selection, summary, and request UI are separate components. Styles are plain CSS files under `app/styles/`, imported by `app/globals.css`.

With more time, I would connect requests to a real submission endpoint, confirm prices and availability against inventory, and test the preview positions using final product photography on common phone sizes.

## Run Locally

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run format:check
npm run build
```
