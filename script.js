document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', e => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navUl.classList.toggle('active');
        });

        document.addEventListener('click', e => {
            if (!navUl.contains(e.target) && !hamburger.contains(e.target) && navUl.classList.contains('active')) {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
            });
        });
    }

    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const phrases = ['Web Developer', 'Frontend Enthusiast', 'Creative Coder', 'Team Player'];
        let i = 0, j = 0, del = false;

        function type() {
            const phrase = phrases[i];
            typedText.textContent = phrase.substring(0, j);
            typedText.classList.add('typing');
            j = del ? j - 1 : j + 1;

            if (!del && j > phrase.length) {
                del = true;
                setTimeout(type, 1500);
            } else if (del && j < 0) {
                del = false;
                i = (i + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, del ? 50 : 100);
            }
        }
        type();
    }

    const educationBox = document.querySelector('.education-box');
    if (educationBox) {
        const items = educationBox.querySelectorAll('.education-item');
        let currentIndex = 0;

        function updateEducation() {
            items.forEach((item, index) => {
                item.classList.remove('active', 'exit');
                if (index === currentIndex) {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 50);
                } else {
                    item.classList.add('exit');
                }
            });
            currentIndex = (currentIndex + 1) % items.length;
            setTimeout(updateEducation, 4000);
        }

        updateEducation();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('skill-fill')) {
                    entry.target.style.width = entry.target.style.getPropertyValue('--skill-level');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .skill-fill').forEach(el => observer.observe(el));
});