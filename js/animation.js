var gShouldAnimate = true;

function animateOut() {
    var elDivSvgs = document.querySelectorAll('.thumbs');
    elDivSvgs.forEach(function(elDivSvg) {
        // elDivImg.classList.add('animated');
        var direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0:
               elDivSvg.classList.add('animated','zoomOutUp');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomOutUp');
               },1500);
               break;
            case 1:
               elDivSvg.classList.add('animated','zoomOutRight');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomOutRight');
               },1500);
               break;
            case 2:
               elDivSvg.classList.add('animated','zoomOutDown');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomOutDown');
               },1500);
               break;
            case 3:
               elDivSvg.classList.add('animated','zoomOutLeft');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomOutLeft');
               },1500);
               break;
        }
    })
}

function animateIn() {
    var elDivSvgs = document.querySelectorAll('.thumbs');
    elDivSvgs.forEach(function(elDivSvg) {
        // elDivImg.classList.add('animated');
        var direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0:
               elDivSvg.classList.add('animated','zoomInUp');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomInUp');
               },1500);
               break;
            case 1:
               elDivSvg.classList.add('animated','zoomInRight');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomInRight');
               },1500);
               break;
            case 2:
               elDivSvg.classList.add('animated','zoomInDown');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomInDown');
               },1500);
               break;
            case 3:
               elDivSvg.classList.add('animated','zoomInLeft');
               setTimeout(function() {
                   elDivSvg.classList.remove('animated','zoomInLeft');
               },1500);
               break;
        }
    })
}

function animateCanvas() {
    elGenSection = document.querySelector('.edit-container');
    elGenSection.classList.add('animated','flipInX');
    setTimeout(function() {
        elGenSection.classList.remove('animated','flipInX');
    },1000);
}

        // var elGenSection = document.querySelector('.meme-generator');
