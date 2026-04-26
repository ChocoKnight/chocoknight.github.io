export class ProjectElement extends HTMLElement {
    constructor() {
        super();
        this.shadowRootRef = this.attachShadow({ mode: 'open' });
    }

    set project(data) {
        this.render(data);
    }

    render(project) {
        this.shadowRootRef.innerHTML = `
            <link rel="stylesheet" href="/src/styles/reset.css">
            <link rel="stylesheet" href="/src/styles/text.css">
            <link rel="stylesheet" href="/src/styles/styles.css">
            <link rel="stylesheet" href="/src/styles/tokens.css">
            <li>
                <a href=${project.reference}>${project.title}</a>
                <ul> 
                    <li>${project.startMonth} ${project.startYear} - ${project.endMonth} ${project.endYear}</li>
                    <li>${project.description}</li>
                </ul>
            </li>
        `;
    }
}


customElements.define('project-component', ProjectElement);
