const sliderImages = document.querySelectorAll(".slide"),
      arrowLeft    = document.querySelector("#arrow-left"),
      arrowRight   = document.querySelector("#arrow-right"),
      pauseButton  = document.querySelector("#pause");

let currentSlide = 0,
    playing = true,
    slideTimer;

startSlideshow();

//Initialize slider
function startSlideshow(){
  reset();
  currentSlide++;
  if(currentSlide > sliderImages.length){ currentSlide = 1 }
  sliderImages[currentSlide-1].style.display = "block";
  slideTimer = setTimeout(startSlideshow, 2000);
 }

// Clear all images
function reset() {
  for(let i = 0; i < sliderImages.length; i++){
    sliderImages[i].style.display = "none";
  }
}

// Show previous
function previousSlide(){
  reset();
  if(playing) {currentSlide--} //There is always an increment when the slideshow starts, this line is here so when pressing the left arrow we pause and go to the previous slide at once otherwise we'll pause the slideshow at the first click and only after we can navigate backwards 
  if(currentSlide === 0){currentSlide = sliderImages.length} //We can't be at index 0 because on the next line the slide display would be index -1 which doesn't exist
  pauseSlideshow();
  sliderImages[currentSlide - 1].style.display = "block";
  currentSlide--;
}

// Show next
function nextSlide(){
  reset();
  if(playing){currentSlide--} //Same reason than above, this program is set to start a slideshow as soon as it starts running which automatically increments by one the currentSlide, if we don't have this line of code we'll jump one slide when pressing right arrow
  if (currentSlide === sliderImages.length - 1) {currentSlide = -1} //When we're at last index we need to reset to -1 so the next line of code actually display the first image [currentSlide(=5) + 1 = 6-->this won't work, reset index to -1 will display the first image] 
  pauseSlideshow();
  sliderImages[currentSlide + 1].style.display = "block";
  currentSlide++;
}

//Play
function playSlideshow(){
  pauseButton.innerHTML = "<span><b>||</b></span>";
  playing = true;
  startSlideshow();
}

//Pause
function pauseSlideshow() {
  pauseButton.innerHTML = "<span><b>&#9658</b></span>";
  playing = false;
  clearTimeout(slideTimer);
}

//CLICK EVENT
//Left arrow click
arrowLeft.addEventListener("click", function(){
  previousSlide();
});
//Right arrow click
arrowRight.addEventListener("click", function(){
  nextSlide();
});
//Pause button click
pauseButton.addEventListener("click", function(){
  if(playing){
    currentSlide--; //already explained above, does exactly the same than when pressing the left or right arrow, when we press pause we have to decrement (to compensate the previous increment from the normal slideshow display) so we can navigate the slides normally
    pauseSlideshow();
  } else {
    playSlideshow();
  }
});

//PRESS KEY EVENT
document.addEventListener("keydown", function(event){
  let key = event.keyCode
  //Left arrow key
  if(key === 37){previousSlide()}
  //Right arrow key
  if(key === 39){nextSlide()}
  //Space key
  if(key === 32) {
    if(playing){
      currentSlide--;
      pauseSlideshow();
    } else {
      playSlideshow();
    }
  }
});