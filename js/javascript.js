const letters_shadow = {
    't1': '0 0 100px rgba(30, 150, 255, 0.75)',
    'i1': '0 0 100px rgba(200, 105, 180, 0.75)',
    'e1': '0 0 100px rgba(30, 50, 255, 0.75)',
    'a': '0 0 100px rgba(255, 69, 0, 0.75)',
    't2': '0 0 100px rgba(30, 122, 255, 0.75)',
    'i2': '0 0 100px rgba(0, 0, 0, 0.75)',
};

// logos_links = {
//     't1': 'https://static.vecteezy.com/system/resources/previews/018/930/484/non_2x/telegram-logo-telegram-icon-transparent-free-png.png',
//     'i1': 'https://static.vecteezy.com/system/resources/previews/018/930/415/non_2x/instagram-logo-instagram-icon-transparent-free-png.png',
//     'a': 'https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png',
//     'e1': 'https://static.vecteezy.com/system/resources/previews/016/716/470/non_2x/linkedin-icon-free-png.png',
// }
//
// logos_offset = {
//     't1': [20, 9],
//     'i1': [20, -8],
//     'a': [20, 35],
//     'e1': [20, 35,]
//
// }

function addlogos() {
    for (const key in logos_links) {
        const img_url = logos_links[key];
        const img = new Image();
        img.src = img_url;
        img.onload = (function (key) {
            return function () {
                const logo = document.createElement('img');
                logo.src = img.src;
                logo.style.width = '100px';
                logo.style.height = '100px';
                logo.style.position = 'absolute';
                logo.style.top = '1px'
                logo.style.left = '1px'
                logo.classList.add('logo');
                logo.className = `img_${key}`;
                document.body.appendChild(logo);
            };
        })(key);
    }
}



function showLogo(letter) {
    if (letter.style.fontSize === '250px'){
        const id = letter.id;
        const logo = document.getElementsByClassName(`img_${id}`)[0]
        console.log(logo.style);
        console.log(letter.offsetTop - logos_offset[id][0]);
        const topPosition =  letter.offsetTop - logos_offset[id][0];
        const leftPosition = letter.offsetLeft + logos_offset[id][1];
        logo.style.top = `${topPosition}px`;
        logo.style.left = `${leftPosition}px`;
    }
}


function removeAllImages() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.style.top = `${1}px`;
        img.style.left = `${1}px`;
    });
}
function onLetter(letter, letters) {
    letter.style.fontSize = '250px';
    letter.style.textShadow = letters_shadow[letter.id];
    letter.style.cursor = 'pointer';
    letter.style.transition = 'font-size 0.35s, text-shadow 0.35s';

    letter.addEventListener('transitionend', function transitionEndHandler() {
        letter.removeEventListener('transitionend', transitionEndHandler);
        showLogo(letter);
        letter.style.transition = '';
    });

    letters.forEach(otherLetter => {
        if (otherLetter !== letter) {
            otherLetter.classList.add('blur');
        }
    });
}

function outLetter(letter, otherLetter) {
    letter.style.fontSize = '150px';
    letter.style.textShadow = '';
    letter.style.cursor = 'default';
    if (otherLetter !== letter) {
        otherLetter.classList.remove('blur');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.addEventListener('mouseover', removeAllImages.bind())
        if (letter !== document.getElementById('e') && letter !== document.getElementById('2')){
            letter.addEventListener('mouseover', onLetter.bind(null, letter, letters));

            letter.addEventListener('mouseout', function () {
                letters.forEach(otherLetter => {
                    outLetter(letter, otherLetter)
                });
            });
        }
    });
});

window.addEventListener('load', function () {
    addlogos();
});

