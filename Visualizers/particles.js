
particles = []
var song
var fft
var bg

function preload() {
    song = loadSound("../AudioFiles/whipped-cream.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    fft = new p5.FFT()
    angleMode(DEGREES)

}

function draw() {

    background("#000000")
    //rotateX(sin(frameCount / 6) * 360)
    //rotateY(cos(frameCount / 6) * 360)

    //translate(0,0,sin(frameCount) * 100)

    fft.analyze()
    amp = fft.getEnergy(20, 200)
    var wave = fft.waveform()

    directionalLight([255], createVector(0,0,-1))

    if (amp > 230) {

        var x = random(-100, 100)
        var y = random(-100, 100)
        var z = random(-100, 100)

        var pos = createVector(x, y, z)

        for(var i = 0; i < 10; i++) {

            var r = map(sin(frameCount), -1, 1, 0, 255) + random(100, 120)
            var g = map(sin(frameCount / 2), -1, 1, 255, 0) + random(100, 120)
            var b = map(cos(frameCount / 4), -1, 1, 0, 255) + random(100, 120)

            var c = color(r, g, b)

            var p = new Particle(pos, c)
            particles.push(p)
        }
    } 

    for (var radius = 100; radius <= 300; radius += 50) {
        
        /*
        var r = map(sin(frameCount), -1, 1, 0, 255) + random(-50,50)
        var g = map(sin(frameCount / 2), -1, 1, 255, 0) + random(-50, 50)
        var b = map(cos(frameCount / 4), -1, 1, 0, 255) + random(-50, 50)

        var c = color(r, g, b)
        
        fill(c)
        */

        for (var t = -1; t <= 1; t += 2) {
            noFill()
            strokeWeight(5)
            stroke('#FFFFFF')
            beginShape() 
            for (var i = 0; i <= 180; i+= 0.5){
                var index = floor(map(i, 0, width, 0, wave.length - 1)) 
                
                var r = map(wave[index], -1, 1, radius - 100, radius + 100)

                var x = r * sin(i) * t
                var y = r * cos(i)
                vertex(x,y)
            }
            endShape()
        }
    }

    for (var i = particles.length - 1; i >= 0; i--) {
        if (dist(particles[i].pos.x, particles[i].pos.y, 
        particles[i].pos.z, 0, 0, 0) < 700) {
            particles[i].update(amp > 230)
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
    constructor(pos, color) {
        this.color = color
        this.pos = createVector(pos.x,pos.y,pos.z)
        this.vel = p5.Vector.random3D().normalize().mult(random(4,6))
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.width = random(4, 10)
    }

    update(cond) {
        this.pos.add(this.vel)
        if (cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }

    show() {
        push()

        noStroke()
        fill(this.color)

        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(this.width)

        pop()
    }
}