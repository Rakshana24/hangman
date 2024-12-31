const hangmanImage  =document.querySelector(".hangmanBox img");
const wordDisplay=document.querySelector(".wordDisplay");
const gussestext=document.querySelector(".gusses b");
const keyboard=document.querySelector(".keyboard");
const gameModel =document.querySelector(".gameModel");
const playagain =document.querySelector(".playAgain");
let currentword,correctletters=[],wrongcount=0;
const maxgusses =6;

const resetGame=() =>
{
    correctletters=[];
    wrongcount=0;
    hangmanImage.src=`hangman-${wrongcount}.svg`;
    gussestext.innerHTML=`${wrongcount}/ ${maxgusses}`;
    wordDisplay.innerHTML=currentword.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled=false);

    

}
const getRandomWord=()=>{
    
    const {word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    console.log(word);
    currentword=word;
    document.querySelector(".hintText b").innerHTML=hint;
    resetGame();
    wordDisplay.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("");
}
const gameover=(isvictory)=>
{
    
    setTimeout(()=>{
        const modeltext=isvictory?`You found the word`:`The correct word was`;
        gameModel.querySelector("img").src=`${isvictory ? 'win':'fail'}.png`;
        gameModel.querySelector("h2").innerText=`${isvictory?'Congrats!':'GameOver!'}`;
        gameModel.querySelector("p").innerHTML=`${modeltext} <b>${currentword}</b>`;
        gameModel.classList.add("show");
    },300);
}
const initGame=(button,clickedletter)=>{
    if(currentword.includes(clickedletter))
    {
        [...currentword].forEach((letter,index)=>{
            if(letter === clickedletter){
            correctletters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText=letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else
    {
        wrongcount++;
        hangmanImage.src=`hangman-${wrongcount}.svg`;
        
    }
    button.disabled=true; 
   gussestext.innerHTML=`${wrongcount}/ ${maxgusses}`;

   if(wrongcount === maxgusses)
   {
    
    return gameover(false);
   }
   if(correctletters.length === currentword.length)
   {
    return gameover(true);
   }
}
for(let i=97;i<=122;i++)
{
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click",e => initGame(e.target,String.fromCharCode(i)));
}
getRandomWord();
playagain.addEventListener("click",getRandomWord);