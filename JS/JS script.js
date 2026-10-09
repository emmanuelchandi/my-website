/* =========================================
   ICT251 Activity 3 - JavaScript Features
   Includes: Form Validation, Theme Switch, 
   Gallery Viewer, and Study Hours Calculator
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // FEATURE 1 (COMPULSORY): Contact Form Validation & Preview
    // =========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const formPreview = document.getElementById('form-preview');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents page reload
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            let errorMessages = [];
            
            // Validate Name
            if (name === '') {
                isValid = false;
                errorMessages.push("Please enter your name (spaces only are not allowed).");
            }
            // Validate Message
            if (message === '') {
                isValid = false;
                errorMessages.push("Please enter a message (spaces only are not allowed).");
            }
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessages.push("Please enter a valid email address.");
            }
            
            // Display Feedback
            if (!isValid) {
                formFeedback.textContent = errorMessages.join(" ");
                formFeedback.style.color = "#dc2626"; 
                formPreview.style.display = "none"; 
            } else {
                formFeedback.textContent = "Validation successful! No message was sent.";
                formFeedback.style.color = "#16a34a"; 
                
                formPreview.style.display = "block";
                document.getElementById('preview-name').textContent = name;
                document.getElementById('preview-email').textContent = email;
                document.getElementById('preview-message').textContent = message;
                
                contactForm.reset();
            }
        });
    }

    // =========================================
    // FEATURE 2: Theme Switch (Light / Dark Mode)
    // =========================================
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.textContent = "Switch to Light Mode";
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Toggle the dark-theme class on the body
            document.body.classList.toggle('dark-theme');
            
            // Update button text and save preference to localStorage
            if (document.body.classList.contains('dark-theme')) {
                themeBtn.textContent = "Switch to Light Mode";
                localStorage.setItem('theme', 'dark');
            } else {
                themeBtn.textContent = "Switch to Dark Mode";
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // =========================================
    // FEATURE 3: Gallery Viewer (Previous / Next)
    // =========================================
    const galleryData = [
        { src: 'images/photo1.jpg', caption: 'My first portfolio photo' },
        { src: 'images/photo2.jpg', caption: 'My second portfolio photo' },
        { src: 'images/photo3.jpg', caption: 'My third portfolio photo' }
    ];
    
    let currentPhotoIndex = 0;
    const galleryImg = document.getElementById('gallery-image');
    const galleryCaption = document.getElementById('gallery-caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    function updateGallery() {
        if (galleryImg && galleryCaption) {
            galleryImg.src = galleryData[currentPhotoIndex].src;
            galleryCaption.textContent = galleryData[currentPhotoIndex].caption;
        }
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPhotoIndex === 0) {
                currentPhotoIndex = galleryData.length - 1;
            } else {
                currentPhotoIndex--;
            }
            updateGallery();
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPhotoIndex === galleryData.length - 1) {
                currentPhotoIndex = 0;
            } else {
                currentPhotoIndex++;
            }
            updateGallery();
        });
    }

    // =========================================
    // FEATURE 4: Study Hours Calculator
    // =========================================
    const calcForm = document.getElementById('calc-form');
    const calcResult = document.getElementById('calc-result');
    
    if (calcForm) {
        calcForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const hoursInput = document.getElementById('hours-per-day').value;
            const daysInput = document.getElementById('days-per-week').value;
            
            const hours = parseFloat(hoursInput);
            const days = parseInt(daysInput);
            
            if (isNaN(hours) || isNaN(days) || hours <= 0 || days < 1 || days > 7) {
                calcResult.textContent = "Error: Please enter valid positive numbers. Days must be between 1 and 7.";
                calcResult.style.color = "#dc2626";
                return;
            }
            
            const totalWeeklyHours = hours * days;
            calcResult.textContent = `You plan to study ${totalWeeklyHours} hours per week.`;
            calcResult.style.color = "#16a34a";
            calcForm.reset();
        });
    }
});