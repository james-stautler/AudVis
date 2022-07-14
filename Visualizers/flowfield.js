let particles = []
const num = 1000
const noiseScale = 0.001
var song
var fft

function preload() {
    song = loadSound("../AudioFiles/whipped-cream.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    for (let i = 0; i < num; i++) {
        let p = new Particle()
        particles.push(p)
    }
    fft = new p5.FFT()
}

function draw() {
    fft.analyze()
    amp = fft.getEnergy(20, 200)
    changeNoise(amp > 230)
    background(0, 5)
    for (let i = 0; i < num; i++) {
        let p = particles[i]
        p.show()
        p.update()        
    }
}

function onScreen(particle) {
    return particle.x >= 0 && particle.x <= width && particle.y >= 0 && particle.y <= height
} 

function changeNoise(cond) {
    if (cond) {
        noiseSeed(millis())
    }
}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause()
        noLoop()
    } else {
        song.play()
        loop()
    }
}

class Particle {

    constructor() {
        this.color = (random(0, 255), 125, 125)
        this.pos = createVector(random(width),random(height))
    }

    update() {
        let n = noise(this.pos.x * noiseScale, this.pos.y * noiseScale)
        let angle = TAU * n;
        this.pos.x += cos(angle)
        this.pos.y += sin(angle)
        if (!onScreen(this.pos)) {
            this.pos.x = random(width)
            this.pos.y = random(height)
        }
    }

    show() {
        point(this.pos)
        stroke(this.color)
        strokeWeight(2)
    }
}

