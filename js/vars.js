'use strict'

var gTags = [];
var gImgBank = [
    { url: 'assets/img/ilan.png', desc: 'ilan', id: 0, keywords: ['class', 'code', 'coding_academy'] },
    { url: 'assets/img/rakef.png', desc: 'rakefet', id: 1, keywords: ['class', 'code', 'coding_academy'] },
    { url: 'assets/img/tamir.png', desc: 'tamir', id: 2, keywords: ['class', 'code', 'coding_academy'] },
    { url: 'assets/img/yaron.png', desc: 'yaron', id: 3, keywords: ['famous', 'coding_academy'] },
    { url: 'assets/img/erez.png', desc: 'erez', id: 4, keywords: ['animals', 'coding_academy'] },
    { url: 'assets/img/dor.jpg', desc: 'dor', id: 5, keywords: ['baby', 'cute', 'coding_academy'] },
    { url: 'assets/img/BrianGriffin.jpg', desc: 'Brian', id: 6, keywords: ['familyguy', 'brian'] },
    { url: 'assets/img/baby.jpg', desc: 'baby1', id: 7, keywords: ['baby', 'cute'] },
    { url: 'assets/img/baby2.jpg', desc: 'baby2', id: 8, keywords: ['baby'] },
    { url: 'assets/img/baby3.jpg', desc: 'baby3', id: 9, keywords: ['baby', 'cute'] },
    { url: 'assets/img/cat.png', desc: 'cat', id: 10, keywords: ['cut'] },
    { url: 'assets/img/ChuckNorris.jpg', desc: 'ChuckNorris', id: 11, keywords: ['norrris', 'guns', 'movies'] },
    { url: 'assets/img/Cute-Cat.jpg', desc: 'cat', id: 12, keywords: ['cute', 'cat', 'animals'] },
    { url: 'assets/img/Deadpool.jpg', desc: 'Deadpool', id: 13, keywords: ['deadpool'] },
    { url: 'assets/img/Dexter.jpg', desc: 'Dexter', id: 14, keywords: ['dexter'] },
    { url: 'assets/img/dog.png', desc: 'oredogn', id: 15, keywords: ['dog', 'animals'] },
    { url: 'assets/img/evil.png', desc: 'drevil', id: 16, keywords: ['evil', 'movies'] },
    { url: 'assets/img/Jammin-Baby.jpg', desc: 'Jammin-Baby', id: 17, keywords: ['baby'] },
    { url: 'assets/img/oren.jpg', desc: 'oren', id: 18, keywords: ['oren', 'hazan'] },
    { url: 'assets/img/orenHazan.jpg', desc: 'orenHazan', id: 19, keywords: ['oren', 'hazan'] },
    { url: 'assets/img/pikachu-pokemon-nintendo.jpg', desc: 'pikachu', id: 20, keywords: ['pokemon'] },
    { url: 'assets/img/Sad-Baby.jpg', desc: 'baby4', id: 21, keywords: ['baby', 'sad'] },
    { url: 'assets/img/salt.png', desc: 'salt', id: 22, keywords: ['salt'] },
    { url: 'assets/img/shauli.jpg', desc: 'shauli', id: 23, keywords: ['shauli'] },
    { url: 'assets/img/Skeptical-Baby.jpg', desc: 'Skeptical', id: 24, keywords: ['baby'] },
    { url: 'assets/img/sparta.png', desc: 'sparta', id: 25, keywords: ['sparta', 'movies'] },
    { url: 'assets/img/Spiderman-Camera.jpg', desc: 'Spiderman1', id: 26, keywords: ['spiderman', 'animals'] },
    { url: 'assets/img/Spiderman-Hospital.jpg', desc: 'Spiderman2', id: 27, keywords: ['spiderman', 'animals'] },
    { url: 'assets/img/Surprised-Koala.jpg', desc: 'Koala', id: 28, keywords: ['koala', 'animals'] },
    { url: 'assets/img/trump.jpg', desc: 'trump', id: 29, keywords: ['trump', 'president', 'famous'] },
    { url: 'assets/img/yoda.png', desc: 'yoda', id: 30, keywords: ['yoda', 'movies'] },
    { url: 'assets/img/youdontsay.jpg', desc: 'youdontsay', id: 31, keywords: ['movies'] }
]

var gElImgBoard;
var gElEditContainer;
var gElMemeCanvas;
var gElTextInput;
var gState;
var gElTagFilter;
var gElArrowBtn;
var gElSearchCont;
