const carrosselContent = document.querySelectorAll('.carrossel-content');
const backButton = document.querySelector('.back-btn');
const nextButton = document.querySelector('.next-btn');

const body = document.body;
const checkBox = document.querySelector("#themeSwitch");

const navbar = document.querySelector("#navbar");

let currentIndex = 0;

const showSlide = (index) => {
    carrosselContent.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % carrosselContent.length;
    localStorage.setItem('currentIndex', currentIndex)
    showSlide(currentIndex);
}

const backSlide = () => {
    currentIndex = (currentIndex - 1 + carrosselContent.length) % carrosselContent.length;
    localStorage.setItem('currentIndex', currentIndex)
    showSlide(currentIndex);
}


nextButton.addEventListener('click', nextSlide)
backButton.addEventListener('click', backSlide)

showSlide(currentIndex)

// save theme in the local storage

const savedTheme = localStorage.getItem("theme")

if (savedTheme) {
    body.classList.add(savedTheme);
    checkBox.checked = savedTheme === "light-theme"
} else {
    localStorage.setItem('theme', 'dark-theme')
    body.classList.add('dark-theme')
};

checkBox.addEventListener('click', function () {
    if (this.checked) {
        localStorage.setItem('theme', 'light-theme');
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
    } else {
        localStorage.setItem('theme', 'dark-theme');
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
    };
});

function openNav() {
    navbar.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function () {
    const skills = document.querySelectorAll(".skill-stats");
    const imgs = document.querySelectorAll('.quadro');

    const observerSkills = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target

                if (skill.classList.contains('js')) {
                    skill.querySelector('circle:nth-child(2)').style.strokeDashoffset = calcStrokeOffSet(75);
                } else if (skill.classList.contains('css')) {
                    skill.querySelector('circle:nth-child(2)').style.strokeDashoffset = calcStrokeOffSet(85);
                } else if (skill.classList.contains('html')) {
                    skill.querySelector('circle:nth-child(2)').style.strokeDashoffset = calcStrokeOffSet(90);
                } else if (skill.classList.contains('react')) {
                    skill.querySelector('circle:nth-child(2)').style.strokeDashoffset = calcStrokeOffSet(5);
                } else if (skill.classList.contains('python')) {
                    skill.querySelector('circle:nth-child(2)').style.strokeDashoffset = calcStrokeOffSet(45);
                };
            };
        }, {
            threshold: 1
        });
    });

    const observerImages = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add("visible")
            }
        }, {
            threshold: 0.5
        });
    });

    imgs.forEach(img => {
        observerImages.observe(img);
    });

    skills.forEach(skill => {
        observerSkills.observe(skill);
    });

    function calcStrokeOffSet(percent) {
        const circumreference = 380;
        return circumreference - (percent * circumreference / 100);
    };
});

