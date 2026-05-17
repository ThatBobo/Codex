// runtime/validator.js
// Provides basic validation for .codex data structures.

const CodexValidator = {
  
  // Validate a parsed Codex object
  validate(parsed) {
    const errors = [];
    const blocks = parsed.blocks || {};
    
    // Check for duplicate block names
    const names = Object.keys(blocks);
    const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
    if (duplicates.length > 0) {
      errors.push({
        type: "duplicate-block",
        message: "Duplicate block names found: " + duplicates.join(", ")
      });
    }
    
    // Validate each block
    for (const name in blocks) {
      const block = blocks[name];
      
      // Check for empty blocks
      if (Object.keys(block).length === 0) {
        errors.push({
          type: "empty-block",
          block: name,
          message: "Block '" + name + "' has no fields."
        });
      }
      
      // Check for invalid keys or values
      for (const key in block) {
        const value = block[key];
        
        // Key must be a non-empty string
        if (typeof key !== "string" || key.trim() === "") {
          errors.push({
            type: "invalid-key",
            block: name,
            key: key,
            message: "Invalid key in block '" + name + "'."
          });
        }
        
        // Value must be string, number, boolean, or null
        const validTypes = ["string", "number", "boolean"];
        if (value === null) continue;
        
        if (!validTypes.includes(typeof value)) {
          errors.push({
            type: "invalid-value",
            block: name,
            key: key,
            value: value,
            message: "Invalid value type for '" + key + "' in block '" + name + "'."
          });
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
};

// Export for browser or Node
if (typeof window !== "undefined") window.CodexValidator = CodexValidator;
if (typeof module !== "undefined") module.exports = CodexValidator;
