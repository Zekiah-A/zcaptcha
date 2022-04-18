//Math Captcha
function genMathCaptcha() {
    var im = require('imagemagick');
    let operation = ["+", "-"][Math.floor(Math.random() * 2)]
    let val = Math.floor(Math.random() * 5), val1 = Math.floor(Math.random() * 5)
    let answer = eval(val.toString() + operation.toString() + val1.toString())
    im.convert(['-background', 'white', '-fill', 'black', '-font', 'Candice', '-pointsize', '72', '-wave', `10x${Math.min(Math.max(70 + Math.floor(Math.random() * 10), 70), 80)}`,`label:${val} ${operation} ${val1}`, 'captcha.png'], 
    function(err, stdout){
        if (err) throw err;
    });
}

function genWordCaptcha() {
    var im = require('imagemagick');
    let word = ["rplace", "blobkat", "zekiahepic", "pixels", "game", "donate", "flag", "art", "build", "team", "create", "open"][Math.floor(Math.random() * 12)]
    im.convert(['-background', 'white', '-fill', 'black', '-font', 'Candice', '-pointsize', '72', '-wave', `10x${Math.min(Math.max(70 + Math.floor(Math.random() * 10), 70), 80)}`,`label:${word}`, 'captcha.png'], 
    function(err, stdout){
        if (err) throw err;
    });
}

//Emoji captcha
function genEmojiCaptcha() {
    var im = require('imagemagick');
    let emoji = ["😎", "🤖", "🏠"][Math.floor(Math.random() * 3)]
    im.convert(['-background', 'white', '-set', 'colorspace', 'sRGB',`pango:${emoji}`, 'captcha.png'], 
    function(err, stdout){
        if (err) throw err;
    });
}

genWordCaptcha();