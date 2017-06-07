'use strict'

var gImgBank = [
    { url: 'https://imgflip.com/s/meme/Evil-Toddler.jpg', desc: 'evil-child', id: 0, keywords: ['child'] },
    { url: 'https://i.imgflip.com/cq63t.jpg?a415728', desc: 'drevil', id: 1, keywords: ['evil','celeb'] },
    { url: 'http://cdn-02.belfasttelegraph.co.uk/incoming/article35779972.ece/3886b/AUTOCROP/w620/Donald-Trump.jpg', desc: 'trump', id: 2, keywords: ['trump','celeb'] },
    { url: 'http://i0.kym-cdn.com/photos/images/newsfeed/000/210/116/youdontsay.jpg', desc: 'youdontsay', id: 3, keywords: ['celeb'] },
    { url: 'https://i.imgflip.com/1hdqwp.jpg?a415632', desc: 'salt', id: 4, keywords: ['salt'] },
    { url: 'https://i.imgflip.com/1pwxa5.jpg' ,desc: 'golum', id: 5, keywords:['golum']},
    // { url: 'https://ca.slack-edge.com/T4Z64K5JM-U529YD0E9-deac2872f743-512' ,desc: 'rakef', id: 10, keywords:[]},
    // { url: 'https://ca.slack-edge.com/T4Z64K5JM-U4ZCWULQH-5dba29cdc46d-512' ,desc: 'ilan', id: 6, keywords:[]},
    // { url: 'https://ca.slack-edge.com/T4Z64K5JM-U508P149K-bd68ecba269e-512' ,desc: 'dor', id: 7, keywords:[]},
    // { url: 'https://ca.slack-edge.com/T4Z64K5JM-U50JWF5PF-g8169be4ae78-512' ,desc: 'yaron', id: 8, keywords:[]},
    // { url: 'https://ca.slack-edge.com/T4Z64K5JM-U50UEPNJH-g648a8e5dcf7-512' ,desc: 'tamir', id: 9, keywords:[]}
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
    gState = {
        txts: [
            {
                txt: '',
                fontSize: 26,
                color: 'black',
                fontFamily: 'serif',
                textAlign: 'center',
                textStartPointW: gElMemeCanvas.width / 2,
                textStartPointH: 30
            }

        ]
    };

    renderImgs();

}


function renderImgs() {
    var strHtml = '';
    for (var i = 0; i < gImgBank.length; i++) {
        var x = console.log(gImgBank[i].desc);
        var hexId = gImgBank[i].id;
        strHtml += `<svg class="thumbs" viewBox="0 0 100 100"><defs>`;
        strHtml += `<pattern id="${hexId}" patternUnits="userSpaceOnUse" width="100" height="100">`;
        strHtml += `<image xlink:href="${gImgBank[i].url}" x="-25" width="150" height="100" />`;
        strHtml += `</pattern></defs>`;
        strHtml += `<polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#${hexId})" onclick="displayMemeEditor(${hexId})"/>`;
        strHtml += `</svg>`;
    }
    gElImgBoard.innerHTML = strHtml;
}

function displayMemeEditor(imageId) {
    console.log(imageId);
    gElImgBoard.style.display = 'none';
    gElEditContainer.style.display = 'flex';
    gState.selectedImgId = imageId;
    drawCanvas();

}

function drawCanvas() {
    var currImageObj = gImgBank.find(function (image) {
        return image.id === gState.selectedImgId
    });
    var elImage = new Image();
    elImage.src = gImgBank[gState.selectedImgId].url;
    var ctx = gElMemeCanvas.getContext("2d");
    ctx.drawImage(elImage, 0, 0, gElMemeCanvas.width, gElMemeCanvas.height);
}

function updateTxts(elInput, idx) {
    gState.txts[idx].txt = elInput.value;
    drawCanvasWithText();
}

function drawCanvasWithText() {
    drawCanvas();
    var ctx = gElMemeCanvas.getContext("2d");
    for (var i = 0; i < gState.txts.length; i++) {
        var currTxt = gState.txts[i];
        ctx.font = `${currTxt.fontSize}px ${currTxt.fontFamily}`;
        ctx.fillStyle = currTxt.color;
        ctx.textAlign = currTxt.textAlign;
        ctx.fillText(currTxt.txt, currTxt.textStartPointW, currTxt.textStartPointH);
    }
}

function increaseFont(idx) {
    gState.txts[idx].fontSize++
    drawCanvasWithText();
}
function decreaseFont(idx) {
    gState.txts[idx].fontSize--
    drawCanvasWithText();
}

function deleteText(inputId, idx) {
    document.getElementById(`${inputId}`).value = '';
    gState.txts[idx].txt = '';
    drawCanvasWithText();
}

function changeColor(elColorPicker, idx) {
    gState.txts[idx].color = elColorPicker.value;
    drawCanvasWithText();
}

function txtAlignleft(idx) {
    gState.txts[idx].textAlign = 'left';
    gState.txts[idx].textStartPointW = 5;
    drawCanvasWithText();
}

function txtAlignRight(idx) {
    gState.txts[idx].textAlign = 'right';
    gState.txts[idx].textStartPointW = gElMemeCanvas.width - 5;
    drawCanvasWithText();
}

function txtAlignCenter(idx) {
    gState.txts[idx].textAlign = 'center';
    gState.txts[idx].textStartPointW = gElMemeCanvas.width / 2;
    drawCanvasWithText();
}

function moveRight(idx) {
    gState.txts[idx].textStartPointW++
    drawCanvasWithText();
}

function moveLeft(idx) {
    gState.txts[idx].textStartPointW--
    drawCanvasWithText();
}
function moveUp(idx) {
    gState.txts[idx].textStartPointH--
    drawCanvasWithText();
}
function moveDown(idx) {
    gState.txts[idx].textStartPointH++
    drawCanvasWithText();
}

function changeFont(elInput, idx) {
    gState.txts[idx].fontFamily = elInput.value;
    drawCanvasWithText();
}

function saveImage() {
    window.location.href = gElMemeCanvas.toDataURL();
}
