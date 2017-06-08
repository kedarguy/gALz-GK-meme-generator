'use strict'


function init() {
    gElImgBoard = document.querySelector('.inner-imgs-container');
    gElEditContainer = document.querySelector('.edit-container');
    gElMemeCanvas = document.querySelector('#memeCanvas');
    gElTextInput = document.querySelector('.text-input');
    // gElSearchByTag = document.querySelector('#search-by-tag');
    gElTagFilter = document.querySelector('.tag-filter-wrapper');
    gState = {
        txts: [
            {
                txt: '',
                fontSize: 46,
                color: 'blue',
                fontFamily: 'serif',
                textAlign: 'center',
                textStartPointW: gElMemeCanvas.width / 2,
                textStartPointH: 30
            }
        ]
    };
    createTagIdx();
    renderImgs(gImgBank);
    window.addEventListener('resize', filterByTag);

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
    var numOfEls = imgs.length;
    //if we want to change size of imgs we need to connect widthOfEl to the new size
    var widthOfEl = 180;
    var emptyDivHtmlStr = `<div class="empty-div" style="width: ${widthOfEl / 2}px;"></div>`
    var maxElPerRow = getMaxElPerRow(widthOfEl);
    console.log('max num of els:' + maxElPerRow);
    var numOfRows = getNumOfRows(numOfEls, maxElPerRow);
    console.log('num of rows:' + numOfRows);
    var rows = [];
    for (var i = 0; i < numOfRows; i++) {
        var row = { rowStrHtml: `<div id="row-id-${i}" class="img-row" style="position: relative; top: ${-34 * i}px;">`, rowIdx: i, imgsInRow: 0 };
        rows.push(row);
    }
    var currRowIdx = 0;
    var currRow = rows[currRowIdx];
    imgs.forEach(function (img, idx) {
        if (isRowFull(currRow, maxElPerRow)) {
            //close prev row div
            currRow.rowStrHtml += '</div>'
            currRowIdx++
            currRow = rows[currRowIdx];
            //if row is even add a empty div that will shift other divs right
            if (currRow.rowIdx % 2 === 0 && currRow.rowIdx !== 1) currRow.rowStrHtml += emptyDivHtmlStr;
        }

        if (idx === 0) currRow.rowStrHtml += emptyDivHtmlStr;
        var strHtml = '';
        var hexId = imgs[idx].id;
        strHtml += `<svg class="thumbs" viewBox="0 0 100 100"><defs>`;
        strHtml += `<pattern id="${hexId}" patternUnits="userSpaceOnUse" width="100" height="100">`;
        strHtml += `<image xlink:href="${imgs[idx].url}" x="-25" width="150" height="100" />`;
        strHtml += `</pattern></defs>`;
        strHtml += `<polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#${hexId})" onclick="displayMemeEditor(${hexId})"/>`;
        strHtml += `</svg>`;
        currRow.rowStrHtml += strHtml;
        currRow.imgsInRow++
        //close last row div when after the last img
        if (idx === imgs.length - 1) currRow.rowStrHtml += '</div>'
    });

    var innerContHtmlStr = '';
    rows.forEach(function (row) {
        innerContHtmlStr += row.rowStrHtml;
    });
    gElImgBoard.innerHTML = innerContHtmlStr;
}


function isRowFull(row, maxElPerRow) {
    if (row.imgsInRow === 1 && maxElPerRow === 0) return true;
    else if (row.rowIdx % 2 === 0 && row.imgsInRow === maxElPerRow - 1) return true;
    else if ((row.rowIdx % 2 !== 0) && (row.imgsInRow === maxElPerRow)) return true;
    else return false;
}

function getMaxElPerRow(widthOfEl) {
    var rowWidth = gElImgBoard.offsetWidth;

    var maxElPerRow = Math.floor(rowWidth / widthOfEl);

    if (maxElPerRow > 1) return maxElPerRow;
    else return 0;
}

function getNumOfRows(numOfEls, maxElPerRow) {
    if (maxElPerRow > 1) return Math.ceil(numOfEls / (maxElPerRow - 0.5));
    else return numOfEls;
}




function displayMemeEditor(imageId) {
    var elNavContAndPointer = document.querySelector('.nav-and-pointer');
    var elSearchCont = document.querySelector('.search-container');
    var elImgsCont = document.querySelector('.imgs-container');
    elNavContAndPointer.classList.add("hide-nav-and-pointer");
    elImgsCont.style.display = 'none';
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
    var size;
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
    var moveSize = 5;
    switch (direction) {
        case 'right':
            gState.txts[idx].textStartPointW += moveSize
            break;
        case 'left':
            gState.txts[idx].textStartPointW -= moveSize
            break;
        case 'up':
            gState.txts[idx].textStartPointH -= moveSize
            break;
        case 'down':
            gState.txts[idx].textStartPointH += moveSize
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
    // window.scrollTo(0, document.querySelector('.inner-imgs-container').offsetTop);
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
        strHtml += `<div class="tag-text">${gTags[i]}</div>`;
        strHtml += `<span class="close-tag filter-${i}" onclick="closeFilter('${i}')"></span></div>`;
    }
    gElTagFilter.innerHTML = strHtml;
}

function closeFilter(filterId) {
    gTags.splice(filterId, 1);
    filterByTag();
}

