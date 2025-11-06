import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const dataPath = path.join(__dirname, "assets", "data", "content.json");

app.get("/api/content", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).send({ error: "Cannot read content file" });
    res.send(JSON.parse(data));
  });
});

app.post("/api/save", (req, res) => {
  const content = JSON.stringify(req.body, null, 2);
  fs.writeFile(dataPath, content, (err) => {
    if (err) return res.status(500).send({ error: "Cannot save data" });
    res.send({ status: "Saved successfully" });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
