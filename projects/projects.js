import './../src/components/project.js'; // Make sure the path is correct

async function loadProjects() {
    const res = await fetch("./projects.json");
    const projects = await res.json();

    const ul = document.querySelector("#projects-list");

    projects.forEach(project => {
        const projectEl = document.createElement("project-component");
        projectEl.project = project;
        ul.appendChild(projectEl); // Each custom element contains a <li> internally
    });
}

loadProjects();
