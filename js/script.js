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
                "image": "https://picsum.photos/400/300?random=1",
                "link": "#"
            },
            {
                "title": "Framework Laravel",
                "description": "Un projet de développement d'une application web avec Laravel.",
                "image": "https://picsum.photos/400/300?random=2",
                "link": "#"
            },
            {
                "title": "Certification RGPD",
                "description": "Certification réalisée lors de ma première année de BTS",
                "image": "https://picsum.photos/400/300?random=3",
                "link": "#"
            }
        ],
        "contact": {
            "email": "boudet.hugo.sio@gmail.com",
            "linkedin": "https://www.linkedin.com/in/hugo-boudet-689R39Z",
            "github": "https://github.com/Hurgot"
        }
    };

    // Modal Elements
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal-close');
    const screenshotInput = document.getElementById('screenshotInput');
    const screenshotsContainer = document.getElementById('screenshotsContainer');
    const saveBtn = document.getElementById('saveBtnDescription');
    const descriptionTextarea = document.getElementById('projectDescription');
    
    // Lightbox Elements
    const lightbox = document.getElementById('screenshotLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    
    let currentProjectIndex = null;
    let currentLightboxIndex = 0;
    let lightboxImages = [];

    // Load saved data from localStorage
    function loadProjectData(index) {
        const saved = localStorage.getItem(`project_${index}`);
        if (saved) {
            return JSON.parse(saved);
        }
        return { screenshots: [], description: '' };
    }

    // Save project data to localStorage
    function saveProjectData(index, projectData) {
        localStorage.setItem(`project_${index}`, JSON.stringify(projectData));
    }

    // Display screenshots
    function displayScreenshots(index) {
        screenshotsContainer.innerHTML = '';
        const projectData = loadProjectData(index);
        
        if (projectData.screenshots && projectData.screenshots.length > 0) {
            projectData.screenshots.forEach((screenshot, screenshotIndex) => {
                const screenshotItem = document.createElement('div');
                screenshotItem.className = 'screenshot-item';
                screenshotItem.innerHTML = `
                    <img src="${screenshot}" alt="Screenshot ${screenshotIndex + 1}">
                    <button class="screenshot-delete" data-index="${screenshotIndex}">×</button>
                `;
                screenshotsContainer.appendChild(screenshotItem);
                
                // Click to open lightbox
                screenshotItem.querySelector('img').addEventListener('click', function(e) {
                    e.preventDefault();
                    openLightbox(index, screenshotIndex);
                });
                
                // Delete screenshot
                screenshotItem.querySelector('.screenshot-delete').addEventListener('click', function(e) {
                    e.preventDefault();
                    projectData.screenshots.splice(screenshotIndex, 1);
                    saveProjectData(index, projectData);
                    displayScreenshots(index);
                });
            });
        }
    }

    // Open modal
    function openModal(index) {
        currentProjectIndex = index;
        const project = data.projects[index];
        
        document.getElementById('modalTitle').textContent = project.title;
        
        const projectData = loadProjectData(index);
        descriptionTextarea.value = projectData.description || '';
        
        displayScreenshots(index);
        modal.classList.add('active');
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        currentProjectIndex = null;
    }

    // Lightbox functions
    function openLightbox(projectIndex, imageIndex) {
        const projectData = loadProjectData(projectIndex);
        lightboxImages = projectData.screenshots || [];
        currentLightboxIndex = imageIndex;
        
        if (lightboxImages.length > 0) {
            updateLightboxImage();
            lightbox.classList.add('active');
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        currentLightboxIndex = 0;
        lightboxImages = [];
    }

    function updateLightboxImage() {
        if (lightboxImages.length > 0) {
            lightboxImage.src = lightboxImages[currentLightboxIndex];
            currentSlideSpan.textContent = currentLightboxIndex + 1;
            totalSlidesSpan.textContent = lightboxImages.length;
        }
    }

    function nextSlide() {
        if (lightboxImages.length > 0) {
            currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
            updateLightboxImage();
        }
    }

    function prevSlide() {
        if (lightboxImages.length > 0) {
            currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
            updateLightboxImage();
        }
    }

    // Screenshot upload
    screenshotInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && currentProjectIndex !== null) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const projectData = loadProjectData(currentProjectIndex);
                projectData.screenshots = projectData.screenshots || [];
                projectData.screenshots.push(event.target.result);
                saveProjectData(currentProjectIndex, projectData);
                displayScreenshots(currentProjectIndex);
                screenshotInput.value = '';
            };
            reader.readAsDataURL(file);
        }
    });

    // Save description
    saveBtn.addEventListener('click', function() {
        if (currentProjectIndex !== null) {
            const projectData = loadProjectData(currentProjectIndex);
            projectData.description = descriptionTextarea.value;
            saveProjectData(currentProjectIndex, projectData);
            
            // Show feedback
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '✓ Sauvegardé';
            setTimeout(() => {
                saveBtn.textContent = originalText;
            }, 2000);
        }
    });

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevSlide);
    lightboxNext.addEventListener('click', nextSlide);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        } else if (modal.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });

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
    data.projects.forEach((project, index) => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="#" class="project-link" data-index="${index}">Voir le projet</a>
        `;
        projectsDiv.appendChild(div);

        // Open modal on button click
        div.querySelector('.project-link').addEventListener('click', function(e) {
            e.preventDefault();
            openModal(index);
        });
    });

    // Contact
    const contactDiv = document.getElementById('contact-info');
    contactDiv.innerHTML = `
        <p>Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
        <p>LinkedIn: <a href="${data.contact.linkedin}" target="_blank">Profil LinkedIn</a></p>
        <p>GitHub: <a href="${data.contact.github}" target="_blank">Profil GitHub</a></p>
    `;
});