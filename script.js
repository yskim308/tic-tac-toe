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
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col ++){
                let index = row*3 + col; 
                switch (gameBoardArray[index]){
                    case "X": 
                        xCount += 1; 
                        break;
                    case "O": 
                        oCount += 1; 
                }
                if (xCount == 3 || oCount == 3){
                    console.log("row winner detected");
                }
            }
            xCount = 0; 
            oCount = 0;
        }
    }

    const checkColumns = () => {
        let xCount = 0; 
        let oCount = 0; 
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                let index = row + col*3; 
                switch (gameBoardArray[index]){
                    case "X":
                        xCount += 1; 
                        break; 
                    case "O":
                        oCount += 1; 
                }
                if (xCount == 3 || oCount == 3){
                    console.log("column winner detected");
                }
            }
            xCount = 0; 
            oCount = 0; 
        }
    }

    const checkDiagonals = () =>{
        let xCount = 0; 
        let oCount = 0; 
        for (let i = 0; i < 2; i++){
            for (let j = 0; j < 3; j++){
                let index; 
                i == 0 ? index = i*2 + j*4: index = i*2 + j*2;
                switch (gameBoardArray[index]){
                    case "X": 
                        xCount += 1; 
                        break;
                    case "O": 
                        oCount += 1; 
                        break;
                }
                if (xCount == 3 || oCount == 3){
                    console.log("diagonal winner detected");
                }
            }
            console.log("O count: " + oCount + " X count: " + xCount); 
            xCount = 0;
            oCount = 0;
        }
    }
    
    return {gameBoardArray, updateDOM, editArray, checkRows, checkColumns, checkDiagonals};
})();
//play round  
const gameController = (function(){
    gameboard.updateDOM();
})();


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
    gameboard.checkColumns();
    gameboard.checkDiagonals();
    console.log(gameboard.gameBoardArray);
})





