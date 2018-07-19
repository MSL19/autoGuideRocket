var rocket;
var population;
var lifespan = 200;
var count = 0;
var target;


function setup() {
    var canvas = createCanvas(400, 300);
    rocket = new Rocket();
    population = new Population();
    target = createVector(width/2,50);

}
function draw() {
    background(0);
    population.run();
    if(count == lifespan){
        count = 0;
    }
    count++;
    ellipse(target.x,target.y,16,16);
}


function Population(){
    this.rockets = [];
    this.popsize = 25;
    this.matingpool = [];

    for ( var i  = 0; i<this.popsize; i++){
        this.rockets[i] = new Rocket();
    }

    this.evaluate(){

        var maxfit = 0;
        for(var i = 0; i<this.popsize; i++){
            this.rockets[i].calculateFitness();
            if(this.rocckets[i].fitness > maxfit){
                maxfit = this.rockets[i].fitness;
            }
        }
        for(var i = 0; i< this.popsize; i++){
            this.rockets[i].fitness /= maxfit;
        }
        this.matingpool = [];
    }

    this.run = function(){
        for ( var i  = 0; i<this.popsize; i++){
            this.rockets[i].update();
            this.rockets[i].show();   
        }
    }

  
}



function DNA(){
    this.genes = [];
    for(var i = 0; i < lifespan; i++){
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.1);
    }

}

function Rocket() {
    this.pos = createVector(width/2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = new DNA();
    this.fitness = 0;
    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.calcFitness = function(){
            var d = dist(this.pos.x, this.pos.y, target.x, target.y);

            this.fitness = map(d,0,width, width,0);


    }

    //21:56 i'm tired
    this.update = function(){
        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.applyForce()
    }

    this.show = function () {
        push();
        noStroke();
        fill(255,150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
    
    }