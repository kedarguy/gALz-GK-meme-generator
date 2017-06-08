function reRenderImgs() {
    var elSvgs = document.querySelectorAll('.thumbs');
    
    setTimeout(function () {
        var svgWidth = elSvgs[0].width.baseVal.value;
        var currWidthUsed;
        var numOfRows = 0;
        createNewImgRow(numOfRows, svgWidth);
        elSvgs.forEach(function (svg) {
            console.log(svg);
        });

    });
}

function createNewImgRow(currNumofRows, elWidth,) {
    var rowIdx = currNumofRows +1 ;
    var htmlStr = '';
    htmlStr += `<div id="rowId:${rowIdx}" class="img-row"> `;
    if (rowIdx % 2 !== 0) htmlStr += `<div class="empty-div" style="width:${elWidth/2}px;">test</div>`;
    htmlStr += `</div>`;
    gElImgBoard.innerHTML+= htmlStr;
}