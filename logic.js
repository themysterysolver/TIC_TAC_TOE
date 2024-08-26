let playertext=document.getElementById('playerText');
let restartbtn=document.getElementById('restartBtn');
let boxes=Array.from(document.getElementsByClassName('box'));
 console.log(boxes);

 const o_text="O";
 const x_text="x";

 let currentplayer=x_text;
 let spaces=Array(9).fill(null);
 console.log(spaces);
 let gameover=false
 let count=0
let winnerIndicator=getComputedStyle(document.body).getPropertyValue('--winning-blocks')
 const startGame= () =>{
    boxes.forEach(box=>box.addEventListener('click',runGame))
 }
 function runGame(e){
    if (gameover) return
    const id=e.target.id;
    if(!spaces[id]){
        spaces[id]=currentplayer;
        e.target.innerText=currentplayer;
        if(playerHasWon()){
            gameover=true
            playertext.innerHTML=`${currentplayer} has won!`
            let win_block=playerHasWon()
            win_block.map(box=>boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
        count=count+1
        if(count==9){
            playertext.innerHTML=`game is draw!`
            gameover=true
            return
        }
        currentplayer=(currentplayer == x_text ? o_text:x_text);
    }
 }
 const prob=[[0,1,2],[0,3,4],[0,4,8],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[2,4,6]]
 function playerHasWon(){
    for(const condition of prob){
        let [a,b,c]=condition
        if(spaces[a] &&(spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return [a,b,c]
        }
    }
    return false
 }
 restartBtn.addEventListener('click',restart)
 function restart(){
    spaces.fill(null)
    gameover=false
    count=0
    boxes.forEach(box=> {
        box.innerText=""
        box.style.backgroundColor='' 
    })
    playertext.innerHTML='Tic Tac Toe'
    currentplayer=x_text
 }
 startGame()