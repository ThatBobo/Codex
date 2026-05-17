// parsers/codex-parser.js
// Parses .codex files into structured JavaScript objects

const Codex = {};

/**
 * Parse a .codex file into a JS object.
 * Structure returned:
 * {
 *   blocks: {
 *      BlockName: { key: value, ... }
 *   }
 * }
 */
Codex.parseCodexFile = function(source) {
  const result = { blocks: {} };
  
  // Remove whitespace
  const text = source.trim();
  
  // Match blocks like: {BlockName ... }
  const blockRegex = /\{([A-Za-z_][A-Za-z0-9_]*)\s*([\s\S]*?)\}/g;
  let match;
  
  while ((match = blockRegex.exec(text)) !== null) {
    const blockName = match[1];
    const blockBody = match[2].trim();
    
    if (result.blocks[blockName]) {
      throw new Error(`Duplicate block name: ${blockName}`);
    }
    
    const blockObj = {};
    const lines = blockBody.split('\n');
    
    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      
      // key: value
      const kvMatch = /^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.+)$/.exec(line);
      if (!kvMatch) {
        throw new Error(`Invalid line in block "${blockName}": ${line}`);
      }
      
      const key = kvMatch[1];
      let valueRaw = kvMatch[2].trim();
      
      // Remove trailing comma if present
      if (valueRaw.endsWith(',')) {
        valueRaw = valueRaw.slice(0, -1).trim();
      }
      
      // Parse value types
      let value;
      if (/^".*"$/.test(valueRaw)) {
        value = valueRaw.slice(1, -1); // string
      } else if (valueRaw === 'true') {
        value = true;
      } else if (valueRaw === 'false') {
        value = false;
      } else if (!isNaN(Number(valueRaw))) {
        value = Number(valueRaw);
      } else {
        value = valueRaw; // fallback raw
      }
      
      blockObj[key] = value;
    }
    
    result.blocks[blockName] = blockObj;
  }
  
  return result;
};

// Export for browser or module environments
if (typeof window !== "undefined") window.Codex = Codex;
if (typeof module !== "undefined") module.exports = Codex;
