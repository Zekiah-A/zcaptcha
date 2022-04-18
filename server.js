import {WebSocketServer} from 'ws'
import im from 'imagemagick'

const PORT = 1234
let wss = new WebSocketServer({ port: PORT, perMessageDeflate: false })
let answer

wss.on('connection', async function(p, {headers, url: uri}) {
    p.on("error", _=>_)
    p.on('message', async function(data) {
        if (data.toString().split(" ")[0] == "reqImage") {
            await genWordCaptcha()
            p.send("update")
        }
        else if (data.toString().split(" ")[0] == "submit") {
            if (data.toString().split(" ")[1] == answer) {
                p.send("true")
            }
            else {
                p.send("false")
            }
        }
    })
    p.on('close', function(){
    })
})


//Math Captcha
function genMathCaptcha() {
    return new Promise((resolve, reject) => {
        let operation = ["+", "-"][Math.floor(Math.random() * 2)]
        let val = Math.floor(Math.random() * 5), val1 = Math.floor(Math.random() * 5)
        answer = eval(val.toString() + operation.toString() + val1.toString())
        im.convert(['-background', 'white', '-fill', 'black', '-font', 'Candice', '-pointsize', '72', '-wave', `10x${Math.min(Math.max(70 + Math.floor(Math.random() * 10), 70), 80)}`,`label:${val} ${operation} ${val1}`, 'captcha.png'], 
        function(err, stdout){
            if (err) {
                throw err
                reject(err)
            }
            resolve(stdout);
        });
    })
}

function genWordCaptcha() {
    return new Promise((resolve, reject) => { //Allow it to wait for the promise to return before continuing, so we are definite that we 1000% have the new image before we set.
        answer = ["rplace", "blobkat", "zekiahepic", "pixels", "game", "donate", "flag", "art", "build", "team", "create", "open"][Math.floor(Math.random() * 12)]
        im.convert(['-background', 'white', '-fill', 'black', '-font', 'Candice', '-pointsize', '72', '-wave', `10x${Math.min(Math.max(70 + Math.floor(Math.random() * 10), 70), 80)}`,`label:${answer}`, 'captcha.png'], 
        function(err, stdout){
            if (err) {
                throw err
                reject(err) //Call back and say that it failed
            }
            resolve(stdout); //Finish the async, and allow the program to go on
        });
    })
}

//Emoji captcha
function genEmojiCaptcha() {
    return new Promise((resolve, reject) => {
        answer = ["😎", "🤖", "🏠"][Math.floor(Math.random() * 3)]
        im.convert(['-background', 'white', '-set', 'colorspace', 'sRGB',`pango:${answer}`, 'captcha.png'], 
        function(err, stdout){
            if (err) {
                throw err
                reject(err)
            }
            resolve(stdout);
        });
    })
}
