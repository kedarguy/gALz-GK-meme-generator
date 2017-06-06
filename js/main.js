'use strict'

var gImgBank = [
    // { url: 'assets/img/', desc: 'bigwill', id: 0, keywords: [] },
    // { url: 'assets/img/', desc: 'pitBull', id: 1, keywords: [] },
    { url: 'https://c1.staticflickr.com/4/3668/10635365844_dde9dc75f2_z.jpg', desc: 'sponge', id: 2, keywords: [] },
    { url: 'http://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_ArticleControlMaarivTransformaionFaceDetect/442445', desc: 'orenhazan', id: 3, keywords: [] },
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U529YD0E9-deac2872f743-512' ,desc: 'rekeft', id: 4, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U4ZU3UTEX-e7a6aa3e72cd-512' ,desc: 'erez', id: 6, keywords:[]}
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U508P149K-bd68ecba269e-512' ,desc: 'dor', id: 7, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U50JWF5PF-g8169be4ae78-512' ,desc: 'yaron', id: 8, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U50UEPNJH-g648a8e5dcf7-512' ,desc: 'tamir', id: 9, keywords:[]}
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

