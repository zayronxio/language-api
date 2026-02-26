import express from "express";
import cors from "cors";
import { franc } from "franc";

const app = express();

app.use(cors());
app.use(express.json());

// Mapeo ISO-639-3 → ISO-639-1 (solo tus idiomas)
const allowedLanguages = {
    eng: "en",
    spa: "es",
    cmn: "zh",
    por: "pt",
    rus: "ru",
    hin: "hi",
    deu: "de",
    nld: "nl",
    jpn: "ja",
    fra: "fr",
    ita: "it",
    kor: "ko",
    ara: "ar",
    tur: "tr",
    pol: "pl",
    swe: "sv",
    dan: "da",
    nor: "no",
    fin: "fi",
    ell: "el",
    ces: "cs",
    hun: "hu",
    ron: "ro",
    bul: "bg",
    ind: "id",
    vie: "vi",
    ben: "bn",
    tha: "th",
    fas: "fa",
    ukr: "uk",
    heb: "he",
    msa: "ms"
};

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        status: "Language API running",
        supportedLanguages: Object.values(allowedLanguages)
    });
});

// Ruta principal
app.post("/detect", (req, res) => {
    try {
        const text = req.body.text;

        if (!text || text.length < 20) {
            return res.json({ language: "unknown" });
        }

        const detected = franc(text, {
            only: Object.keys(allowedLanguages)
        });

        if (detected === "und") {
            return res.json({ language: "unknown" });
        }

        res.json({
            language: allowedLanguages[detected] || "unknown"
        });

    } catch (error) {
        res.status(500).json({ error: "Detection failed" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
