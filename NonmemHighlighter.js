class NonmemHighlighter {
  constructor(options = {}) {
    this.theme = options.theme || 'light';
    this.showLineNumbers = options.lineNumbers || false;
    this.styles = {
      light: `
        .nonmem-code { background: #fdfdfd; color: #000; padding: 1em; font-family: monospace; white-space: pre; display: block; overflow-x: auto; }
        .nonmem-keyword { color: #0077aa; font-weight: bold; }
        .nonmem-function { color: #9b59b6; }
        .nonmem-operator { color: #e74c3c; }
        .nonmem-comment { color: #7f8c8d; font-style: italic; }
        .nonmem-constant { color: #d35400; }
        .nonmem-number { color: #27ae60; }
        .nonmem-line-number { color: #aaa; padding-right: 10px; user-select: none; }
      `,
      dark: `
        .nonmem-code { background: #1e1e1e; color: #ccc; padding: 1em; font-family: monospace; white-space: pre; display: block; overflow-x: auto; }
        .nonmem-keyword { color: #56b6c2; font-weight: bold; }
        .nonmem-function { color: #c678dd; }
        .nonmem-operator { color: #e06c75; }
        .nonmem-comment { color: #5c6370; font-style: italic; }
        .nonmem-constant { color: #d19a66; }
        .nonmem-number { color: #98c379; }
        .nonmem-line-number { color: #555; padding-right: 10px; user-select: none; }
      `
    };
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById("nonmem-theme-style")) {
      document.getElementById("nonmem-theme-style").remove();
    }

    const styleTag = document.createElement("style");
    styleTag.id = "nonmem-theme-style";
    styleTag.innerHTML = this.styles[this.theme];
    document.head.appendChild(styleTag);
  }

  setTheme(theme) {
    if (['light', 'dark'].includes(theme)) {
      this.theme = theme;
      this.injectStyles();
    }
  }

  highlight(text) {
    // Escape HTML
    let html = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Apply regex-based transformations
    html = html.replace(/;.*$/gm, match => `<span class="nonmem-comment">${match}</span>`);
    html = html.replace(/\b(\$[A-Z]+)\b/g, match => `<span class="nonmem-keyword">${match}</span>`);
    html = html.replace(/\b(EXP|LOG|IF|THEN|ELSE|ABS|SQRT|SIN|COS|TAN)\b(?=\()/g, match => `<span class="nonmem-function">${match}</span>`);
    html = html.replace(/(ETA\(\d+\)|THETA\(\d+\)|ERR\(\d+\))/g, match => `<span class="nonmem-constant">${match}</span>`);
    html = html.replace(/([=+\-*/^])/g, match => `<span class="nonmem-operator">${match}</span>`);
    html = html.replace(/\b\d+\.\d+\b|\b\d+\b/g, match => `<span class="nonmem-number">${match}</span>`);

    if (this.showLineNumbers) {
      const lines = html.split('\n');
      html = lines.map((line, idx) => `<span class="nonmem-line-number">${String(idx + 1).padStart(3)}.</span>${line}`).join('\n');
    }

    return `<code class="nonmem-code">${html}</code>`;
  }

  highlightElement(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const raw = el.textContent;
      el.innerHTML = this.highlight(raw);
    });
  }

  observe(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    const observer = new MutationObserver(() => {
      this.highlightElement(selector + " code");
    });

    observer.observe(target, { childList: true, subtree: true });
  }
}

// Export for module use
if (typeof module !== 'undefined') {
  module.exports = NonmemHighlighter;
}
