// runtime/codex.js
// Exposes the Codex and Cd parsers as a unified API.

// Import parsers (browser environments will already have them on window)
let CodexParser = typeof Codex !== "undefined" ? Codex : require("../parsers/codex-parser.js");
let CdParser = typeof Cd !== "undefined" ? Cd : require("../parsers/cd-parser.js");

// Public API
const CodexRuntime = {
  Codex: CodexParser,
  Cd: CdParser,
  
  // Convenience method: load a .cd file by URL
  async load(url) {
    const response = await fetch(url);
    const text = await response.text();
    return await CdParser.parseCdFile(text);
  }
};

// Export for browser or Node
if (typeof window !== "undefined") window.CodexRuntime = CodexRuntime;
if (typeof module !== "undefined") module.exports = CodexRuntime;
