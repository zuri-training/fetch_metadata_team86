// Select all slides
const slides = document.querySelectorAll("#carousel > .slide");
// select next slide button
const nextSlide = document.querySelector("#nxt-btn");
// select previous slide button
const prevSlide = document.querySelector("#prev-btn");
// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// loop through slides and set each slides translateX property to index * 100% 
(()=> {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });
})();

const moveSlide = (curSlide) => {
    //   move slide by -100%
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
}


// add event listener and navigation functionality
nextSlide.onclick = ()=> {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    moveSlide(curSlide);
}

// add event listener and navigation functionality
prevSlide.onclick = ()=> {
    // check if current slide is the last and reset current slide
    if (curSlide === 0) {
        curSlide = maxSlide;
    } else {
      curSlide--;
    }
    moveSlide(curSlide);
}