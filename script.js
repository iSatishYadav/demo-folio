// Function to toggle the navigation menu's visibility
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('visible');
}

// Add event listener to the hamburger icon
document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Implement smooth scrolling behavior for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        filterProjects(category);
    });
});

// Function to display image in a modal view (lightbox effect)
function showLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Project Image">
            <span class="close-lightbox">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Close lightbox when clicking on the close button or outside the image
    lightbox.addEventListener('click', function (e) {
        if (e.target.classList.contains('close-lightbox') || e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// Add event listeners to project images
document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', function () {
        showLightbox(this.src);
    });
});

// Function to validate the contact form
function validateContactForm() {
    const form = document.querySelector('#contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    let isValid = true;

    // Clear previous error messages
    form.querySelectorAll('.error').forEach(error => error.remove());

    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Name is required.');
        isValid = false;
    }

    // Validate email
    if (email.value.trim() === '') {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email is not valid.');
        isValid = false;
    }

    // Validate message
    if (message.value.trim() === '') {
        showError(message, 'Message is required.');
        isValid = false;
    }

    return isValid;
}

// Function to show error message
function showError(input, message) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerText = message;
    input.parentElement.appendChild(error);
}

// Function to check if email is valid
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add event listener to the contact form
document.querySelector('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateContactForm()) {
        // Form is valid, proceed with form submission or further processing
        alert('Form submitted successfully!');
    }
});

// Add real-time validation feedback
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('input', function () {
        validateContactForm();
    });
});
