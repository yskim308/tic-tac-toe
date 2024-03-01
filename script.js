const gameboard = (function(){
    let gameBoardArray = [ //0 to indicate empty 
        ["","",""],
        ["","",""],
        ["","",""],
    ]
    const printGameboard = () => console.log(gameBoardArray);


    const updateDOM = () => {
        const gameboardDOM = document.querySelector(".gameboard"); 
        gameboardDOM.replaceChildren(); //remove children before adding 
        for (let rows = 0; rows < 3; rows++ ){
            for (let col = 0; col < 3; col++){
                let tile = document.createElement("button"); 
                tile.textContent = gameBoardArray[rows][col]; 
                tile.classList.add("tile")
                gameboardDOM.appendChild(tile); 
            }
        }
    }

    const editArray = (index1, index2, value) => {
        gameBoardArray[index1][index2] = value; 
    }
    
    return {gameBoardArray, printGameboard, updateDOM, editArray}
})()

gameboard.updateDOM(); 

//play round  
const gameController = (function(){
    let playerTurn = 1; //1 for player1, 2 for player2

    //add event listener for each tile button
    const allTiles = document.querySelectorAll(".tile"); 
    allTiles.forEach((tile)=>{
        tile.addEventListener('click', ()=>{
            if (playerTurn == 1){
                tile.textContent = "O"; 
                playerTurn = 2; 
            }
            else{
                tile.textContent = "X";
                playerTurn = 1; 
            }
        })
    })
})
