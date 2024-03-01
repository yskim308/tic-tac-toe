const gameboard = (function(){
    let gameBoardArray = Array(9).fill(""); 

    function createChildren(){
        const gameboardDOM = document.querySelector(".gameboard"); 
        gameBoardArray.forEach((tileElement, index)=>{
            let tileContainer = document.createElement("button");
            tileContainer.textContent = tileElement; 
            tileContainer.classList.add("tile"); 
            tileContainer.value = index; 
            gameboardDOM.appendChild(tileContainer); 
        })
    }

    function removeChildren(){
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile)=>tile.remove())
    }

    const updateDOM = () => {
        removeChildren(); 
        createChildren(); 
    }

    const editArray = (index, value) => {
        gameBoardArray[index] = value; 
    }

    //return winner if there is a winner in rows 
    const checkRows = () =>{
        let xCount = 0; 
        let oCount = 0; 
        let colCount = 0; 
        for (index = 0; index < 9; index++){
            if (gameBoardArray[index] == 'X'){
                xCount += 1; 
            }
            else if (gameBoardArray[index] == 'O'){
                oCount += 1; 
            }
            colCount += 1; 
            if (colCount == 2){
                colCount = 0; 
            }
            if (xCount == 3 || oCount == 3){
                console.log("someone wins in row"); 
            }
        }
    }

    const checkColumns = () => {
        console.log("placeholder");
    }

    const checkDiagonals = () =>{
        console.log("placeholder"); 
    }
    
    return {gameBoardArray, updateDOM, editArray, checkRows};
})();
//play round  
const gameController = (function(){
    gameboard.updateDOM();
    let playerTurn = 1; //1 for player1, 2 for player2
    //add event listener for each tile button
    //loop through each tile and add event listener to edit array element 
    
    const gameboardDOM = document.querySelector(".gameboard"); 
    gameboardDOM.addEventListener('click', (event)=>{
        const tile = event.target; 
        if (playerTurn == 1 && tile.textContent === ""){
            gameboard.editArray(tile.value, "O");
            playerTurn = 2; 
            gameboard.updateDOM();
        }
        else if (playerTurn ==2 && tile.textContent === ""){
            gameboard.editArray(tile.value, "X");
            playerTurn = 1; 
            gameboard.updateDOM();
        }
        gameboard.checkRows();
        console.log(gameboard.gameBoardArray);
    })
})();







