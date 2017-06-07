'use strict'

var gTags = [];
var gImgBank = [
    { url: 'https://imgflip.com/s/meme/Evil-Toddler.jpg', desc: 'evil-child', id: 0, keywords: ['child', 'rakefet', 'cool', 'image'] },
    { url: 'https://i.imgflip.com/cq63t.jpg?a415728', desc: 'drevil', id: 1, keywords: ['evil', 'celeb', 'cool', 'image'] },
    { url: 'http://cdn-02.belfasttelegraph.co.uk/incoming/article35779972.ece/3886b/AUTOCROP/w620/Donald-Trump.jpg', desc: 'trump', id: 2, keywords: ['trump', 'celeb', 'image'] },
    { url: 'http://i0.kym-cdn.com/photos/images/newsfeed/000/210/116/youdontsay.jpg', desc: 'youdontsay', id: 3, keywords: ['celeb', 'image'] },
    { url: 'https://i.imgflip.com/1hdqwp.jpg?a415632', desc: 'salt', id: 4, keywords: ['salt', 'image'] },
    { url: 'https://i.imgflip.com/1pwxa5.jpg', desc: 'golum', id: 5, keywords: ['golum', 'rakefet'] },
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
// var gElSearchByTag;
var gElTagFilter;

function init() {
    gElImgBoard = document.querySelector('.imgs-container');
    gElEditContainer = document.querySelector('.edit-container');
    gElMemeCanvas = document.querySelector('#memeCanvas');
    gElTextInput = document.querySelector('.text-input');
    // gElSearchByTag = document.querySelector('#search-by-tag');
    gElTagFilter = document.querySelector('.tag-filter-wrapper');
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
    createTagIdx();
    renderImgs(gImgBank);

}

function addTxt() {
    gState.txts.push(
        {
            txt: '',
            fontSize: 26,
            color: 'black',
            fontFamily: 'serif',
            textAlign: 'center',
            textStartPointW: gElMemeCanvas.width / 2,
            textStartPointH: 30
        }
    );
    renderTxtEditors();
}

function renderTxtEditors() {

    var strHtml = '';
    for (var i = 0; i < gState.txts.length; i++) {

        strHtml += ` 
        <div class="text-editor">
          <div class="edit-buttons">
          
            <div class="text-and-fonts">
                <input type="text" id="top-text:${i}" value="${gState.txts[i].txt}" placeholder="Enter text here" oninput="updateTxts(this, ${i})">
                <button onclick="deleteText('top-text:${i}', ${i})"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                <select oninput="changeFont(this, ${i})">
                    <option value="sans">Sans</option>
                    <option value="Arial">Arial</option>
                    <option value="AvantGarde">Avant Garde</option>
                </select>
                <button onclick="fontSizeChange(${i}, 1)"><i class="fa fa-plus-square" aria-hidden="true"></i></button>
                <button onclick="fontSizeChange(${i}, 0)"><i class="fa fa-minus-square" aria-hidden="true"></i></button>
                <input class="color-picker" oninput="changeColor(this, ${i})" type="color">
                <div class="text-align">
                    <button onclick="txtAlign(${i}, 'left')"><i class="fa fa-align-left" aria-hidden="true"></i></button>
                    <button onclick="txtAlign(${i}, 'center')"><i class="fa fa-align-center" aria-hidden="true"></i></button>
                    <button onclick="txtAlign(${i}, 'right')"><i class="fa fa-align-right" aria-hidden="true"></i></button>
                </div>
            </div>
             <div class="arrows">
                <button onclick="moveText(${i}, 'up')"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                <button onclick="moveText(${i}, 'left')"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                <button onclick="moveText(${i}, 'down')"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                <button onclick="moveText(${i}, 'right')"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>`
    }
    var elEditArea = document.querySelector('.canvas-edit-area');
    elEditArea.innerHTML = strHtml;

}


function renderImgs(imgs) {
    var strHtml = '';
    for (var i = 0; i < imgs.length; i++) {
        var x = console.log(imgs[i].desc);
        var hexId = imgs[i].id;
        strHtml += `<svg class="thumbs" viewBox="0 0 100 100"><defs>`;
        strHtml += `<pattern id="${hexId}" patternUnits="userSpaceOnUse" width="100" height="100">`;
        strHtml += `<image xlink:href="${imgs[i].url}" x="-25" width="150" height="100" />`;
        strHtml += `</pattern></defs>`;
        strHtml += `<polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#${hexId})" onclick="displayMemeEditor(${hexId})"/>`;
        strHtml += `</svg>`;
    }
    gElImgBoard.innerHTML = strHtml;
}

function displayMemeEditor(imageId) {
    var elSearchCont = document.querySelector('.search-container');
    gElImgBoard.style.display = 'none';
    elSearchCont.style.display = 'none';
    gElEditContainer.style.display = 'flex';
    gState.selectedImgId = imageId;
    drawCanvas();
    renderTxtEditors();

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

function fontSizeChange(idx, sizeChange) {
    if (sizeChange === 1) gState.txts[idx].fontSize++
    else gState.txts[idx].fontSize--
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

function txtAlign(idx, alignInput) {
    switch (alignInput) {
        case 'left':
            gState.txts[idx].textAlign = 'left';
            gState.txts[idx].textStartPointW = 5;
            break;
        case 'right':
            gState.txts[idx].textAlign = 'right';
            gState.txts[idx].textStartPointW = gElMemeCanvas.width - 5;
            break;
        case 'center':
            gState.txts[idx].textAlign = 'center';
            gState.txts[idx].textStartPointW = gElMemeCanvas.width / 2;;
            break;
    }
    drawCanvasWithText();
}

function moveText(idx, direction) {
    switch (direction) {
        case 'right':
            gState.txts[idx].textStartPointW++
            break;
        case 'left':
            gState.txts[idx].textStartPointW--
            break;
        case 'up':
            gState.txts[idx].textStartPointH--
            break;
        case 'down':
            gState.txts[idx].textStartPointH++
            break;
    }

    drawCanvasWithText();
}

function changeFont(elInput, idx) {
    gState.txts[idx].fontFamily = elInput.value;
    drawCanvasWithText();
}

function saveImage() {
    window.location.href = gElMemeCanvas.toDataURL();
}

// function createTagIdx () {
//     var tagIdx = [{keywords: '', numberOfAppearances:''}];
//     // gImgBank.forEach()
//     tagIdx = { };
//     for(var i = 0; i < gImgBank.length; i++) {
//         for(var j=0;j< gImgBank[i].keywords.length; j++) {
//             if(!tagIdx[gImgBank[i].keywords[j]]) tagIdx[gImgBank[i].keywords[j]] = tagIdx[gImgBank[i]];
//             else                                 tagIdx[gImgBank[i].keywords[j]].push(tagIdx[gImgBank[i]]);
//             }
//         }
// }

function createTagIdx() {
    var tagIdx = {};
    var tagIdxs = [];
    gImgBank.forEach(function (imgObj) {
        imgObj.keywords.forEach(function (keyword) {
            if (!tagIdx[keyword]) {
                tagIdx[keyword] = 1;
            }
            tagIdx[keyword]++;

        })
    })
    for (var keyword in tagIdx) {
        var currObj = { name: keyword, imgs: tagIdx[keyword] }
        tagIdxs.push(currObj);
    }
    createTagsCloud(tagIdxs);
}

function addTagToInput(tag) {

    if (!gTags.find(function (val) {
        return val === tag.innerHTML
    })) {
        gTags.push(tag.innerHTML);
        filterByTag();
        // gElSearchByTag.value += tag.innerHTML + ' ';
    } else console.log('already exists');
    var searchStr = '';
}

function filterByTag() {
    if (gTags.length === 0) {
        renderImgs(gImgBank);
        renderTags();
        return
    }
    var filteredImg = [];
    gImgBank.forEach(function (imgObj) {
        imgObj.keywords.forEach(function (keyword) {
            ;
            for (var x = 0; x < gTags.length; x++) {
                if (gTags[x] === keyword) {
                    if (!filteredImg.find(function (img) {
                        return img === imgObj
                    }))
                        filteredImg.push(imgObj);
                }
            }
        })
    })
    renderTags();
    renderImgs(filteredImg);
}


function renderTags() {
    var strHtml = '';
    for (var i = 0; i < gTags.length; i++) {
        // var tagId = gTags[i];
        strHtml += `<div class="tag-filter filter-${i}">`;
        strHtml += `${gTags[i]}`;
        strHtml += `<span class="close-tag filter-${i}" onclick="closeFilter('${i}')"></span></div>`;
    }
    gElTagFilter.innerHTML = strHtml;
}

function closeFilter(filterId) {
    gTags.splice(filterId, 1);
    filterByTag();
}

