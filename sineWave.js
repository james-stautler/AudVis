
var song
var fft
var background

function preload() {
    song = loadSound("../AudioFiles/NextToMe_Mqx.mp3")
    img = loadImage("../Backgrounds/space.jpg")
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    angleMode(DEGREES)
    fft = new p5.FFT()
    imageMode(CENTER)


}

function draw() {

    image(img, 0, 0, width, height)

    rotateX(60)

    noFill()

    stroke(255)

    var wave = fft.waveform()

    for (var i = 0; i < 50; i++) {
        /*    
        var r = map(sin(frameCount / 2), -1, 1, 100, 200)
        var g = map(i, 0, 50, 100, 200)
        var b = map(cos(frameCount), -1, 1, 200, 100)
        */
        stroke(255)

        rotate(frameCount / 30)

        beginShape()
        for (var j = 0; j < 360; j+=60) {
            var rad = i * 8
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount * 2 + i * 10) * 200
            
            vertex(x,y,z)
        }
        endShape(CLOSE)
    }

    
}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause()
        noLoop() // do not want waves to reset
    } else {
        song.play()
        loop()
    }
}