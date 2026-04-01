import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route to fetch data from Google Apps Script
  app.get("/api/data", async (req, res) => {
    const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!gasUrl) {
      return res.status(400).json({ error: "GOOGLE_APPS_SCRIPT_URL is not configured." });
    }

    try {
      const response = await fetch(gasUrl);
      if (!response.ok) {
        throw new Error(`GAS returned status ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Error fetching from Google Apps Script:", error);
      res.status(500).json({ error: "Failed to fetch data from Google Apps Script", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
