'use strict'

var gImgBank = [
    {url: 'http://www.dumbdrops.com/ratchet-memes/templates/Will_Smith.jpg' ,desc: 'bigwill', id: 0, keywords:[]},
    {url: 'https://s-media-cache-ak0.pinimg.com/originals/d4/ac/0b/d4ac0b96844e1d631cbf3e41227887da.jpg' ,desc: 'takemymoney', id: 1, keywords:[]},
    {url: 'https://imgflip.com/s/meme/Imagination-Spongebob.jpg' ,desc: 'sponge', id: 2, keywords:[]},
    {url: 'http://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_ArticleControlMaarivTransformaionFaceDetect/442445' ,desc: 'orenhazan', id: 3, keywords:[]}
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U529YD0E9-deac2872f743-512' ,desc: 'rekeft', id: 4, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U4ZCWULQH-5dba29cdc46d-512' ,desc: 'ilan', id: 5, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U4ZU3UTEX-e7a6aa3e72cd-512' ,desc: 'erez', id: 6, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U508P149K-bd68ecba269e-512' ,desc: 'dor', id: 7, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U50JWF5PF-g8169be4ae78-512' ,desc: 'yaron', id: 8, keywords:[]},
    // {url: 'https://ca.slack-edge.com/T4Z64K5JM-U50UEPNJH-g648a8e5dcf7-512' ,desc: 'tamir', id: 9, keywords:[]}
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'yaron', id: 10, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 11, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 12, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 13, keywords:[]},
    // {url: 'https://goo.gl/photos/WxCs2rQVs3qskH3BA' ,desc: 'oren', id: 14, keywords:[]}
]


var gImgBoard = document.querySelector('.imgs-container');
renderImgs();

function renderImgs() {
    var strHtml = `<div class="single-img" onclick="memeCreator(this)">`;
    for(var i=0; i<gImgBank.length; i++) {
        strHtml += `<img src="${gImgBank[i].url}" alt="${gImgBank[i].desc}">`;
        strHtml += `</div>`;
    }
    gImgBoard.innerHTML = strHtml;
}
