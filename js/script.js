// Lightning effect system
class LightningStrike {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'lightning-container';
        document.body.appendChild(this.container);
        this.initLightning();
    }

    initLightning() {
        // Random lightning strikes every 2-5 seconds
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createLightning();
            }
        }, 1000);
    }

    createLightning() {
        const strike = document.createElement('div');
        strike.className = 'lightning';
        
        // Random horizontal position
        const startX = Math.random() * window.innerWidth;
        const startY = 0;
        
        strike.style.left = startX + 'px';
        strike.style.top = startY + 'px';
        
        // Create zigzag path
        let html = '<svg style="position:absolute;width:100%;height:100%;overflow:visible;" viewBox="0 0 4 ' + window.innerHeight + '">';
        let currentX = 2;
        let currentY = 0;
        let path = 'M 2 0';
        
        while (currentY < window.innerHeight) {
            currentX += (Math.random() - 0.5) * 8;
            currentX = Math.max(0, Math.min(4, currentX));
            currentY += Math.random() * 60 + 30;
            path += ` L ${currentX} ${currentY}`;
        }
        
        html += `<path d="${path}" stroke="url(#lightningGradient)" stroke-width="0.4" fill="none" stroke-linecap="round"/><defs><linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#e0b0ff;stop-opacity:1" /><stop offset="50%" style="stop-color:#b366ff;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#6b46c1;stop-opacity:0" /></linearGradient></defs></svg>`;
        
        strike.innerHTML = html;
        this.container.appendChild(strike);
        
        // Trigger flash effect
        this.flashScreen();
        
        // Remove after animation
        setTimeout(() => strike.remove(), 200);
    }

    flashScreen() {
        const flash = document.createElement('div');
        flash.className = 'lightning-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => flash.remove(), 150);
    }
}

// Initialize lightning when page loads
window.addEventListener('load', () => {
    new LightningStrike();
});

document.addEventListener('DOMContentLoaded', function() {
    const data = {
        "about": "Bonjour ! Je suis étudiant en BTS Services Informatiques aux Organisations (SIO). Passionné par le développement web et les technologies, j'aime créer des applications utiles et innovantes. Ce portfolio présente mes projets et compétences acquises durant ma formation.",
        "skills": [
            "HTML",
            "CSS",
            "C#",
            "Python",
            "SQL",
        ],
        "projects": [
            {
                "title": "Site Web Personnel",
                "description": "Un portfolio simple en HTML/CSS/JS pour présenter mes travaux.",
                "image": "images/portfolio.jpg",
                "link": "#"
            },
            {
                "title": "Application de Gestion",
                "description": "Une app web pour gérer des tâches avec une base de données.",
                "image": "images/gestion.jpg",
                "link": "#"
            },
            {
                "title": "Framework Laravel",
                "description": "Un projet de développement d'une application web avec Laravel.",
                "image": "images/laravel.jpg",
                "link": "#"
            }
        ],
        "contact": {
            "email": "boudet.hugo.sio@gmail.com",
            "linkedin": "https://www.linkedin.com/in/hugo-boudet-689R39Z",
            "github": "https://github.com/Hurgot"
        }
    };

    // About
    document.getElementById('about-text').textContent = data.about;

    // Skills
    const skillsDiv = document.getElementById('skills-list');
    data.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill';
        div.textContent = skill;
        skillsDiv.appendChild(div);
    });

    // Projects
    const projectsDiv = document.getElementById('projects-list');
    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">Voir le projet</a>
        `;
        projectsDiv.appendChild(div);
    });

    // Contact
    const contactDiv = document.getElementById('contact-info');
    contactDiv.innerHTML = `
        <p>Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
        <p>LinkedIn: <a href="${data.contact.linkedin}" target="_blank">Profil LinkedIn</a></p>
        <p>GitHub: <a href="${data.contact.github}" target="_blank">Profil GitHub</a></p>
    `;
});