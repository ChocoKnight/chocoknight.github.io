export class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.shadowRootRef = this.attachShadow({ mode: 'open' });

    this.shadowRootRef.innerHTML = `
      <link rel="stylesheet" href="/src/styles/reset.css">
      <link rel="stylesheet" href="/src/styles/header.css">
      <link rel="stylesheet" href="/src/styles/styles.css">
      <link rel="stylesheet" href="/src/styles/tokens.css">
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
  }
}

customElements.define('header-component', HeaderElement);
