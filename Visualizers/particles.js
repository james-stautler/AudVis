
particles = []
var song
var fft // need this to get the waveform data (fast fourier transformation)

function preload() {
    song = loadSound("../AudioFiles/whipped-cream.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    fft = new p5.FFT()
    angleMode(DEGREES)

}

function draw() {
    background(0, 0, 30)

    directionalLight([255], createVector(0,0,-1))

    if (random(1) >0.97) {

        var x = random(-100, 100)
        var y = random(-100, 100)
        var z = random(-100, 100)

        var pos = createVector(x, y, z)

        for(var i = 0; i < 100; i++) {
            var p = new Particle(pos)
            particles.push(p)
        }
    }

    for (var i = particles.length - 1; i >= 0; i--) {
        if (dist(particles[i].pos.x, particles[i].pos.y, 
        particles[i].pos.z, 0, 0, 0) < 500) {
            particles[i].update()
            particles[i].show()
        } else {
            particles.splice(i, 1)
        }
        
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


class Particle {
    constructor(pos) {
        this.pos = createVector(pos.x,pos.y,pos.z)
        this.vel = p5.Vector.random3D().normalize().mult(random(4,6))
    }

    update() {
        this.pos.add(this.vel)
    }

    show() {
        push()

        noStroke()
        fill(255)

        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(10)

        pop()
    }
}