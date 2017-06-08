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

// @media (min-width: 670px) {
//         nav {
//         width: 100%;
//         background-color: #323232;
//         color: #ffffff;
//         font-family: var(--primary-font);
//         font-size: 16px;
//         font-weight: 700;
//         text-transform: uppercase;
//         vertical-align: center;
//         display: flex;
//         justify-content: center;
//         align-items: center;

//         ul {
//             height: 100%;
//         }
//         .menu {
//             display: flex;
//             text-align: center;
//             height: 100%;
//             list-style-type:none;
//             a {
//                 height: 100%;
//                 letter-spacing: 0.1em;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 font-size: rem(16px);
//                 transition: color 0.5s;
//                 width: rem(130px);
//             } 
        
//             li {
//                 text-align: center;
//                 width: rem(130px);
//                 }
                
//             li:hover {
//                 color: yellow;
//             }
//         }
//     }


// }
// 

nav {
        width: 98%;
        background-color: #323232;
        color: #ffffff;
        font-family: var(--primary-font);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        vertical-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0 50px 0 50px;
        overflow: hidden;
 ul {
     height: 100%;
     width:100%;
     display: flex;
     flex-direction: row;
     justify-content: space-around;
     align-items: center;
 }

 li {
     list-style: none;
     width: 15%;

 }

     img {
                position: relative;
                top: 22px;
                width: 80%;
                height: 80%;
                margin:auto;
            }

 a {
   height: 100%;
   letter-spacing: 0.1em;
   display: block;
   justify-content: center;
   align-items: center;
   font-size: rem(16px);
   transition: color 0.5s;
   width: 100%;
   text-align: left;
              
            } 
}