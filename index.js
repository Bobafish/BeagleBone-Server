//incorporates the packages
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cv = require('opencv4nodejs');

//connects to the video source (0 = defaultcam) 
//would need to create wCapI, wCapII, etc to create different sources of video
const wCap = new cv.VideoCapture(0);

//controls how quickly the video updates
const fps = 1;

//setting the count of the names
let count = 1;

//sets the size of the camera
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 1280);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 720);

//connects index.js and index.html
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//creates the image outputs
setInterval(() => {
    //captures the frame
    const frameI = wCap.read();
    const frameII = wCap.read();
    const frameIII = wCap.read();
    const frameIV = wCap.read();
    //converts the frame into a jpg file
    const imageI = cv.imencode('.jpg', frameI).toString('base64');
    const imageII = cv.imencode('.jpg', frameII).toString('base64');
    const imageIII = cv.imencode('.jpg', frameIII).toString('base64');
    const imageIV = cv.imencode('.jpg', frameIV).toString('base64');
    //emits the image
    io.emit('imageI', imageI);
    io.emit('imageII', imageII);
    io.emit('imageIII', imageIII);
    io.emit('imageIV', imageIV);
    //saves the image
    cv.imwrite(`C:/Users/anjon/Desktop/testytest/imageI${count}.jpg`, frameI);
    cv.imwrite(`C:/Users/anjon/Desktop/testytest/imageII${count}.jpg`, frameII);
    cv.imwrite(`C:/Users/anjon/Desktop/testytest/imageIII${count}.jpg`, frameIII);
    cv.imwrite(`C:/Users/anjon/Desktop/testytest/imageIV${count}.jpg`, frameIV);
    count++;
}, 1000/fps)

// listens to localhost:3000
server.listen(3000);

//States when the server is succesfully active
console.log("Server has started");
