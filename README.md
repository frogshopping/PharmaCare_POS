# pharma_care

A minimal Next.js scaffold for the `pharma_care` project.

Setup & run (PowerShell):

```powershell
cd "c:\Users\ASUS\OneDrive\Desktop\project\pharma_care"
npm install
npm run dev
```

This repository contains a minimal `app/` directory for Next.js.

Hot-reload notes
----------------

- **If changes don't appear during `npm run dev`**: files stored on OneDrive or network drives can sometimes miss native file-change events. A polling watcher is provided in development by the `.env.development` file which sets `CHOKIDAR_USEPOLLING=true`.

- Quick PowerShell alternative (temporary):

```powershell
$env:CHOKIDAR_USEPOLLING = 'true'
npm run dev
```

This forces the dev server to use polling which is more reliable on some Windows setups.