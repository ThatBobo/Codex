// parsers/cd-parser.js
// Loads .cd files, finds <link codex>, fetches the .codex file,
// and parses it using Codex.parseCodexFile()

const Cd = {};

/**
 * Parse a .cd HTML file and load its linked .codex file.
 * Returns:
 * {
 *   html: Document,
 *   codex: { blocks: {...} }
 * }
 */
Cd.parseCdFile = async function(cdSource) {
  // Convert .cd (HTML) text into a DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(cdSource, "text/html");
  
  // Find <link codex href="...">
  const link = doc.querySelector("link[codex]");
  if (!link) {
    throw new Error("No <link codex> tag found in .cd file");
  }
  
  const codexPath = link.getAttribute("href");
  if (!codexPath) {
    throw new Error("The <link codex> tag is missing an href attribute");
  }
  
  // Load the .codex file
  const response = await fetch(codexPath);
  if (!response.ok) {
    throw new Error(`Failed to load .codex file: ${codexPath}`);
  }
  
  const codexText = await response.text();
  
  // Parse the .codex file using the Codex parser
  const codexData = Codex.parseCodexFile(codexText);
  
  return {
    html: doc,
    codex: codexData
  };
};

// Export for browser or module environments
if (typeof window !== "undefined") window.Cd = Cd;
if (typeof module !== "undefined") module.exports = Cd;
