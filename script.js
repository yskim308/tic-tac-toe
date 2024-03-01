const gameboard = (function(){
    let gameBoardArray = Array(9).fill(""); 


    const updateDOM = () => {
        const gameboardDOM = document.querySelector(".gameboard"); 
        gameboardDOM.replaceChildren(""); 
        for (let index = 0; index < 9; index++){
            let tile = document.createElement("button"); 
            tile.textContent = gameBoardArray[index]; 
            tile.classList.add("tile")
            gameboardDOM.appendChild(tile); 
        }
    }

    const editArray = (index, value) => {
        gameBoardArray[index] = value; 
    }
    
    return {gameBoardArray, updateDOM, editArray};
})();

gameboard.editArray(8, "bottom-right");
gameboard.updateDOM(); 

//play round  
const gameController = (function(){
    let playerTurn = 1; //1 for player1, 2 for player2
    //add event listener for each tile button
    const allTiles = document.querySelectorAll(".tile"); 

    allTiles.forEach((tile)=>{
        console.log(tile); 
        tile.addEventListener('click', ()=>{
            if (playerTurn == 1 && tile.textContent === ""){
                tile.textContent = "O"; 
                playerTurn = 2; 
            }
            else if (playerTurn ==2 && tile.textContent === ""){
                tile.textContent = "X";
                playerTurn = 1; 
            }
        })
        tileCount++; 
    })
})();

function playRound(){
    console.log("test"); 
}

