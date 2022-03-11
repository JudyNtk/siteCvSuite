const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particuleTab;
const couleurs = ["#6a040f","#a11bd2","#003049","#ffba08","#004040"];


class Particule{
    constructor(x, y, directionX, directionY, taille, couleur){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }
    dessine(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();

    }
    MAJ(){
        if(this.x + this.taille > canvas.width || this.x - this.taille < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.taille > canvas.height || this.y - this.taille < 0){
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.dessine();
    }
}
// const obj1 = new Particule(300,300,1,1,100,"black");
// console.log(obj1)
// obj1.dessine();

function init(){
    particuleTab = [];
    for(let i = 0; i < 90; i++){ // 100 à la base
        let taille = (Math.random() + 0.01) * 7; // 20 à la base
        let x = Math.random() * (window.innerWidth - taille * 2)
        let y = Math.random() * (window.innerHeight - taille * 2)
        let directionX = (Math.random() * 0.4) - 0.2;
        // -0.2 / 0.2
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = couleurs[Math.floor(Math.random() * couleurs.length)];

        particuleTab.push(new Particule(x,y,directionX,directionY,taille,couleur));

    }
}

function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    for(let i = 0; i < particuleTab.length; i++){
        particuleTab[i].MAJ();
    }
}

init();
animation();
console.log(particuleTab)


function resize(){
    init();
    animation();
}

window.addEventListener('resize', () => {
    clearTimeout(doit);
    doit = setTimeout(resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

})