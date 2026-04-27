export class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.shadowRootRef = this.attachShadow({ mode: 'open' });

    this.shadowRootRef.innerHTML = `
      <link rel="stylesheet" href="/src/styles/reset.css">
      <link rel="stylesheet" href="/src/styles/text.css">
      <link rel="stylesheet" href="/src/styles/tokens.css">
      <link rel="stylesheet" href="/src/styles/header.css">
      <header>
        <hr>
          <div class="header">
              <div class="nav-item">
                  <h1><a href="/">KEVIN TAN</a></h1>
              </div>
              <div class="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-user-icon lucide-file-user"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M16 22a4 4 0 0 0-8 0"/><circle cx="12" cy="15" r="3"/></svg>
                  <h1><a href="/cv/">RESUME/CV</a></h1>
              </div>
              <div class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-icon lucide-list"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>
                <h1><a href="/projects/">PROJECTS</a></h1>
              </div>
          </div>
        <hr>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderElement);
