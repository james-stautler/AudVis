
var song
var fft // need this to get the waveform data (fast fourier transformation)

function preload() {
    song = loadSound("NextToMe_Mqx.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    fft = new p5.FFT()

}

function draw() {
    background(0)
    stroke(255)
    noFill()

    var wave = fft.waveform() // gets waveform data

    beginShape() // begin and end shape used to connect lines here
    for (var i = 0; i < width; i++){
        var index = floor(map(i, 0, width, 0, wave.length)) // maps for loop var to index of wave that we want
        
        var x = i
        var y = wave[index] * 200 + height / 2
        // point(x, y) just mapping out all the wave point data to appear
        vertex(x,y)
    }
    endShape()
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