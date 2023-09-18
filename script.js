const sliderWindow = document.querySelector('.carousel__window');
const sliderLine = document.querySelector('.slider-line');
const images = document.querySelectorAll('.completed__img');
const locationLinks = document.querySelectorAll('.locations__link');
const dots = document.querySelectorAll('.dot');
const arrows = document.querySelectorAll('.arrow');

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0;
const slideWidth = images[0].clientWidth;

function slideLeft() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

function slideRight() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

leftArrow.addEventListener('click', slideLeft);
rightArrow.addEventListener('click', slideRight);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

locationLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentIndex = index;
        updateSlider();
    });
});

function updateSlider() {
    const offset = -currentIndex * slideWidth;
    sliderLine.style.transform = `translateX(${offset}px)`;
    updateClarifyingData();
}

function updateClarifyingData() {
    const activeLink = locationLinks[currentIndex];
    const city = activeLink.getAttribute('data-city');
    const area = activeLink.getAttribute('data-area');
    const repairTime = activeLink.getAttribute('data-repair-time');

    const cityElement = document.querySelector('.clarifying-data__wrapper .city-text');
    const areaElement = document.querySelector('.clarifying-data__wrapper .area-text');
    const repairTimeElement = document.querySelector('.clarifying-data__wrapper .repair-time-text');

    cityElement.textContent = city;
    areaElement.textContent = area;
    repairTimeElement.textContent = repairTime;

    dots.forEach(dot => dot.classList.remove('active'));
    locationLinks.forEach(link => link.classList.remove('active'));

    dots[currentIndex].classList.add('active');
    locationLinks[currentIndex].classList.add('active');
}

updateSlider();
