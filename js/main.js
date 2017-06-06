'use strict'

var gImgBank = [
    { url: 'assets/img/child.jpg', desc: 'child', id: 0, keywords: [] },
    { url: 'assets/img/drevil.jpg', desc: 'drevil', id: 1, keywords: [] },
    { url: 'assets/img/trump.jpg', desc: 'trump', id: 2, keywords: [] },
    { url: 'assets/img/youdontsay.jpg', desc: 'youdontsay', id: 3, keywords: [] },
    {url: 'assets/img/salt.png' ,desc: 'salt', id: 4, keywords:[]}
    // {url: 'assets/img/rakef.png' ,desc: 'rakef', id: 5, keywords:[]}
    // {url: 'assets/img/ilan.png' ,desc: 'ilan', id: 6, keywords:[]},
    // {url: 'assets/img/dor.png' ,desc: 'dor', id: 7, keywords:[]},
    // {url: 'assets/img/yaron.png' ,desc: 'yaron', id: 8, keywords:[]},
    // {url: 'assets/img/tamir.png' ,desc: 'tamir', id: 9, keywords:[]}
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'yaron', id: 10, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 11, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 12, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 13, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 14, keywords:[]}
]

var gElImgBoard;
var gElEditContainer;
var gElMemeCanvas;
var gElTextInput;
var gState;

function init() {
    gElImgBoard = document.querySelector('.imgs-container');
    gElEditContainer = document.querySelector('.edit-container');
    gElMemeCanvas = document.querySelector('#memeCanvas');
    gElTextInput = document.querySelector('.text-input');
    gState = {};
    
    renderImgs();

}



function renderImgs() {
    var strHtml = '';
    for (var i = 0; i < gImgBank.length; i++) {
        strHtml += `<div class="single-img" >`;
        strHtml += `<img src="${gImgBank[i].url}" id="img-id:${gImgBank[i].id}" crossOrigin="Anonymous" alt="${gImgBank[i].desc}" onclick="displayMemeEditor(${gImgBank[i].id})">`;
        strHtml += `</div>`;
    }
    gElImgBoard.innerHTML = strHtml;
}

function displayMemeEditor(imageId) {
    gElImgBoard.style.display = 'none';
    gElEditContainer.style.display = 'flex';
    gState.selectedImgId = imageId;
    drawCanvas();

}

function drawCanvas () {
    var currImageObj = gImgBank.find(function(image){
        return image.id === gState.selectedImgId
    });
    var elImage = document.getElementById(`img-id:${currImageObj.id}`);
    var context = gElMemeCanvas.getContext("2d");
    context.drawImage(elImage , 0 , 0, gElMemeCanvas.width, gElMemeCanvas.height); 
}

function saveImage() {
    window.location.href = gElMemeCanvas.toDataURL();
}
