//game constants & variables
let inputDir= {x:0 ,y:0};
let lastinpDir= inputDir;
const Gameover= new Audio('gameend.mp3');
const Gamebg= new Audio('bgsnake.mp3');
const eatfood= new Audio('eatfood.wav');
let speed= 5;
let lastPaintTime= 0;
let score= 0;
let expend_amount=0;
let snakeArr= [
    {x:1, y:1}
];
//food is not arr
food={x: 10, y:5};

//game functions
function main(refresh){
window.requestAnimationFrame(main);
// console.log(refresh);
if((refresh - lastPaintTime)/1000< 1/speed){
    return;
}
lastPaintTime=refresh;
gameEngine();
Gamebg.play();
}
function iscollapse(snake){
    //colides
    for (let i = 1; i <snakeArr.length; i++) {
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
        return true;
    }
}
//check the wall
    if(snake[0].x>=25 || snake[0].x<=0 || snake[0].y>=25 || snake[0].y<=0){
        return true;
    }
}
//expand the snake
function expandSnake(){
    for(i=0; i<=expend_amount;i++){
        snakeArr.push(snakeArr[snakeArr.length-1]);
    }
}
function gameEngine(){
    document.getElementById("scorey").innerHTML="Score: "+score;
    //part 1 update the snake array and food
    if(iscollapse(snakeArr)){
        Gameover.play();
        Gamebg.pause();
        inputDir= {x:0,y:0};
        alert("Game is over! Press OK to restart.");
        snakeArr= [{x:1, y:1}];
        score=0;
        speed=5;
    }
    //clears screen and avoids duplication
    document.getElementById("gameboard").innerHTML="";
    
    //if the food is eaten inc score & food replace
    if(snakeArr[0].y=== food.y && snakeArr[0].x=== food.x){
        let a= 2;
        let b= 20;
        food= {x: Math.round(a+(b-a)* Math.random()), y:Math.round(a+(b-a)* Math.random())};
        score += 10;
        speed+= 0.2;
        expandSnake();
        eatfood.play();
    }
    //moving the snake
    for (let i = snakeArr.length-2 ; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    
    //places snake in row n col
    //part 2 display the snake
    snakeArr.forEach((e, index) => {
        SnakeElement= document.createElement('div');
        SnakeElement.style.gridRowStart=e.y;  
        SnakeElement.style.gridColumnStart=e.x;
        SnakeElement.style.transform= "rotate(0deg)";
        if(index===0){
          SnakeElement.classList.add('head');  
          if(inputDir.x==1){
            SnakeElement.style.transform= "rotate(-90deg)";
          }
          else if(inputDir.x==-1){
            SnakeElement.style.transform= "rotate(90deg)";
          }
          else if(inputDir.y==1){
            SnakeElement.style.transform= "rotate(0deg)";
          }
          else if(inputDir.y==-1){
            SnakeElement.style.transform= "rotate(180deg)";
          }
        }
        else{
        SnakeElement.classList.add('snake');
        }
        gameboard.appendChild(SnakeElement);
    });
    // display the food
    FoodElement= document.createElement('div');
    FoodElement.style.gridRowStart=food.y;  
    FoodElement.style.gridColumnStart=food.x;  
    FoodElement.classList.add('food');
    gameboard.appendChild(FoodElement);
}

//main logic of game
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=> {
    //starts the game
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            if(lastinpDir.y==1) break;
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            if(lastinpDir.y==-1) break;
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            if(lastinpDir.x==1) break;
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        
        case "ArrowRight":
            console.log("ArrowRight");
            if(lastinpDir.x==-1) break;
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
    lastinpDir= inputDir;
});

    
