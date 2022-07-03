
var song
var fft
var colorParticles = []

function preload() {
    song = loadSound("../AudioFiles/NextToMe_Mqx.mp3")

}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    angleMode(DEGREES)
    fft = new p5.FFT()
    amplitude = new p5.Amplitude()


}

function draw() {

    background("#000000")

    rotateX(60)


    noFill()

    fft.analyze()
    amp = fft.getEnergy(20, 200)
    level = amplitude.getLevel()
    var wave = fft.waveform()
    

    for (var i = 0; i < 50; i++) {
          
        var r = map(sin(frameCount / 2), -1, 1, 0, 255)
        var g = map(i, 0, 50, 0, 255)
        var b = map(cos(frameCount), -1, 1, 255, 0)
        
        stroke(r,g,b)

        rotate(frameCount / 30)

        beginShape()
        for (var j = 0; j < 360; j+=60) {
            var rad = i * 8
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount * 2 + i * 10) * 200
            
            vertex(x,y,z)
            //vertex(-x,-y,-z)


        }
        endShape(CLOSE)
        
        
    }

    var p = new Particle()
    var p2 = new Particle()
    colorParticles.push(p)
    colorParticles.push(p2)

    for (var k = colorParticles.length - 1; k >= 0; k--) {
        if (colorParticles[k].edges()) {
            colorParticles.splice(k, 1)
        } else {
            colorParticles[k].update(amp > 100)
            colorParticles[k].show()
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

    constructor() {
        this.pos = p5.Vector.random2D().mult(250)
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(3,5)

        this.color = [random(0,255), random(0, 255), random(0,255)]
    }

    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)

        if (cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    
    edges() {
        if (this.pos.x < -width || this.pos.x > width || this.pos.y < -height || this.pos.y > height) {
            return true
        } else {
            return false
        }
    }

    show() {
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.w)
    }

}

class BoomParticle {

    constructor() {
        this.pos = p5.Vector.random2D().mult(250)
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = 3

        this.color = "#FFFF00"
    }

    update(cond) {
    }
}