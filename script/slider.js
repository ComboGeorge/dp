var slides = document.getElementsByClassName('slide');
var slidesNumber = slides.length;
var currentSlide = 0;
var next = document.getElementsByClassName('next-button')[0];
var prev = document.getElementsByClassName('prev-button')[0];
var nav = document.getElementsByClassName('navigation')[0];
var prevSlide=0;

function start(){
    slides[currentSlide].className = "slide active-slide";
    nav.id = slidesNumber;
    if (currentSlide == 0){
      prev.disabled="true";
    }
    if (currentSlide == slidesNumber-1){
      next.disabled="true";
    }
}

function navigation(){
    for(var i=0; i<slidesNumber;i++){
        var num=i+1;
        if(i%14==0){
            nav.insertAdjacentHTML('beforeend', '<br>');
        }
        nav.insertAdjacentHTML('beforeend', '<button class="btn btn-secondary nav-button" id="'+num+'">'+num+'</button>');
    }
}

function goToSlide(){
    next.removeAttribute('disabled');
    prev.removeAttribute('disabled');
    if(currentSlide==0){
        prev.disabled="true";
    }
    if(currentSlide==slidesNumber-1){
        next.disabled="true";
    }
    slides[prevSlide].className = "slide";
    slides[currentSlide].className = "slide active-slide";
}

window.onload = function(){
    navigation();
    start();
} 

next.addEventListener('click', function(){
    prevSlide=currentSlide;
    currentSlide++;
    goToSlide();
});
prev.addEventListener('click', function(){
    prevSlide=currentSlide;
    currentSlide--;
    goToSlide();
});

document.querySelector('.navigation').addEventListener('click', function(e){ 
    var navID = e.target.id;
    prevSlide = currentSlide;
    currentSlide = navID-1;
    goToSlide();
    
});

var nav_num = document.querySelectorAll(".answer_div>input");
for (let elem of nav_num){
    this.addEventListener('change', function(g){ 
    var answerName = g.target.name;
        if(answerName != 'select_group'){
            document.getElementById(answerName).className = "btn btn-success nav-button";
        }
    });
}

document.querySelector('[name=load_answers]').addEventListener('submit', function(e){
    var pair = document.querySelectorAll('.answer_div>input'),
    sel = [].filter.call(pair, function(el){
        return el.checked;
    });
    if( (pair.length / 2) !== sel.length ) {
        e.preventDefault();
        alert('Не дан ответ на все вопросы!');
    }
});

$('select[name=select_group]').change(function() {
  if ($("#select_group :selected").val() == '---') {
    $('#send_answers').attr('disabled', 'disabled');
  } else {
    $('#send_answers').removeAttr('disabled');
  }
});