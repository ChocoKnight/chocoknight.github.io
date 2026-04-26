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
                  <h1><a href="/cv/">RESUME/CV</a></h4>
              </div>
              <div class="nav-item">
                <h1><a href="/projects/">PROJECTS</a></h4>
              </div>
          </div>
        <hr>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderElement);
