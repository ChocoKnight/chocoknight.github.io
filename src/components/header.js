// src/components/header.js

// Helper to fetch CSS as a string
async function loadCss(url) {
  const response = await fetch(url);
  return `<style>${await response.text()}</style>`;
}

// Template for the header
const headerTemplate = document.createElement('template');

let templateReady = false; // tracks if CSS/template is loaded
async function initHeaderTemplate() {
  const resetStyles = await loadCss('/src/styles/reset.css');
  const headerStyles = await loadCss('/src/styles/header.css');
  const pageStyles = await loadCss('/src/styles/styles.css');
  const tokens = await loadCss('/src/styles/tokens.css');

  headerTemplate.innerHTML = `
    ${tokens}
    ${resetStyles}
    ${headerStyles}
    ${pageStyles}
    <header>
      <hr>
        <div class="header">
            <div>
                <h1><a href="/">Kevin Tan</a></h1>
            </div>
            <div>
                <h4><a href="/">About Me</a></h4>
                <h4><a href="/cv/">Resume/CV</a></h4>
                <h4><a href="/projects/">Projects</a></h4>
            </div>
        </div>
      <hr>
    </header>
  `;

  templateReady = true;
}

// Start loading CSS/template at module load
const templatePromise = initHeaderTemplate();

// Custom Element
export class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.shadowRootRef = null; // store reference if needed later
  }

  async connectedCallback() {
    // Wait until template is ready
    if (!templateReady) {
      await templatePromise;
    }

    this.shadowRootRef = this.attachShadow({ mode: 'open' });
    this.shadowRootRef.appendChild(headerTemplate.content.cloneNode(true));
  }
}

// Define the custom element
customElements.define('header-component', HeaderElement);
