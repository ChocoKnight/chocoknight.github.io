export class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.shadowRootRef = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    
    const headerEl = this.shadowRootRef.querySelector('header');
    
    // Check if the user hit the Refresh button
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      sessionStorage.removeItem('header-animated');
    }

    const hasAnimated = sessionStorage.getItem('header-animated');

    if (hasAnimated) {
      // Immediate state for tab swapping
      headerEl.classList.add('reveal-left', 'is-visible');
      headerEl.style.transition = 'none'; 
      headerEl.style.opacity = "1";
      headerEl.style.transform = "translateX(0)";
    } else {
    // Animation state for first load or refresh
    headerEl.classList.add('reveal-left');
    
      requestAnimationFrame(() => {
        setTimeout(() => {
          headerEl.classList.add('is-visible');
          sessionStorage.setItem('header-animated', 'true');
        }, 100);
      });
    }
  }

  render() {
    this.shadowRootRef.innerHTML = `
      <link rel="stylesheet" href="/src/styles/reset.css">
      <link rel="stylesheet" href="/src/styles/text.css">
      <link rel="stylesheet" href="/src/styles/tokens.css">
      <link rel="stylesheet" href="/src/styles/header.css">
      <link rel="stylesheet" href="/src/styles/animations.css">

      <header class="reveal-left">
        <hr>
        <div class="header">
          <div class="nav-item">
            <h1><a href="/">KEVIN TAN</a></h1>
          </div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-user"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M16 22a4 4 0 0 0-8 0"/><circle cx="12" cy="15" r="3"/></svg>
            <h1><a href="/cv/">RESUME/CV</a></h1>
          </div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>
            <h1><a href="/projects/">PROJECTS</a></h1>
          </div>
        </div>
        <hr>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderElement);