![Codex Logo](Codex_logo.png)

# ✨ Codex

Codex is a lightweight system that pairs HTML pages with structured data files.  
It’s designed for small apps, prototypes, dashboards, and educational projects where simplicity matters.

> [!NOTE]
> Codex focuses on clarity and minimalism. It is intentionally simple.

---

## 📦 Features

- [x] Connect HTML pages to external data files  
- [x] Human‑readable data format  
- [x] Lightweight JavaScript runtime  
- [x] Zero dependencies  
- [ ] CLI tool (planned)  
- [ ] Nested data blocks (planned)  
- [ ] Playground UI (planned)  

> [!TIP]
> Codex works best when each `.codex` file represents a single concept (user, settings, config, etc.).

---

## 🚀 Quick Example

A `.cd` page can link to a `.codex` data file:

~~~~
<link codex href="auth.codex"></link>
~~~~

The runtime loads both and returns:

- the HTML  
- the parsed data  

---

## 📁 Project Structure

~~~~
Codex/
│
├── README.md
├── LICENSE
│
├── parsers/
│   ├── codex-parser.js
│   └── cd-parser.js
│
├── runtime/
│   ├── codex.js
│   └── validator.js
│
├── examples/
│   ├── login.cd
│   └── auth.codex
│
└── spec/
    └── codex-spec-v0.5.txt
~~~~

---

## 🧠 How It Works

Codex uses a simple two‑parser system:

| File | Purpose |
|------|---------|
| `codex-parser.js` | Parses `.codex` data files |
| `cd-parser.js` | Loads `.cd` HTML files and finds the linked data |
| `runtime/codex.js` | Public API for loading and parsing |
| `runtime/validator.js` | Basic validation for `.codex` files |

> [!IMPORTANT]
> The `<link codex>` tag must be inside the `<head>` of your `.cd` file.

---

## 🛠️ Using the Runtime

Load a `.cd` file:

~~~~
CodexRuntime.load("login.cd").then(result => {
    console.log(result.html)
    console.log(result.codex)
})
~~~~

Parse files manually:

~~~~
CodexRuntime.Codex.parseCodexFile(text)
CodexRuntime.Cd.parseCdFile(text)
~~~~

---

## 🔍 Troubleshooting

| Issue | Cause | Fix |
|-------|--------|------|
| Data not loading | Missing `<link codex>` tag | Add the tag inside `<head>` |
| Parser error | Invalid `.codex` syntax | Run through `validator.js` |
| HTML missing | Incorrect `.cd` wrapper | Ensure `<cd>` tags are present |

> [!WARNING]
> Codex does not sanitize HTML or user input. Always validate user‑provided data.

> [!CAUTION]
> Incorrect `.cd` structure (missing `<cd>` tags) will break parsing.

---

## Files

- [x] README.md  
- [x] LICENSE  
- [x] parsers/codex-parser.js  
- [x] parsers/cd-parser.js  
- [x] runtime/codex.js  
- [x] runtime/validator.js  
- [x] examples/login.cd  
- [x] examples/auth.codex  
- [x] spec/codex-spec-v0.5.txt  

---

## 👤 Author

Created by **Abdulsamad**  
Licensed under the **MIT License**.
