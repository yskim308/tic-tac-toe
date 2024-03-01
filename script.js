const gameboard = (function(){
    let gameBoardArray = Array(9).fill(""); 

    function createChildren(){
        const gameboardDOM = document.querySelector(".gameboard"); 
        gameBoardArray.forEach((tileElement, index)=>{
            let tileContainer = document.createElement("button");
            //tileContainer.textContent = tileElement; 
            if (tileElement == 'X'){
                const image = document.createElement("img");
                image.src = "images/close.svg";
                tileContainer.appendChild(image);
            }
            else if (tileElement == 'O'){
                const image = document.createElement("img");
                image.src = "images/circle.svg";
                tileContainer.appendChild(image);
            }
            tileContainer.classList.add("tile"); 
            tileContainer.value = index; 
            gameboardDOM.appendChild(tileContainer); 
        })
    }

    function removeChildren(){
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile)=>tile.remove())
    }

    function counter(index) { //1 for x, 0 for o 
        switch (gameBoardArray[index]){
            case "X": 
                return [0, 1];
            case "O":
                return [1, 0]; 
            default:
                return [0, 0]; 
        }
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
                let check = counter(index); 
                xCount += check[1]; 
                oCount += check[0]; 
                if (xCount == 3){
                    return [true,'x'];
                }
                else if (oCount == 3){
                    return [true, 'y']; 
                }
            }
            xCount = 0; 
            oCount = 0;
        }
        return [false, 0];
    }

    const checkColumns = () => {
        let xCount = 0; 
        let oCount = 0; 
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                let index = row + col*3; 
                let check = counter(index); 
                xCount += check[1]; 
                oCount += check[0]; 
                if (xCount == 3){
                    return [true, 'x']; 
                }
                else if (oCount == 3){
                    return [true, 'o']; 
                }
            }
            xCount = 0; 
            oCount = 0; 
        }
        return [false, 0];
    }

    const checkDiagonals = () =>{
        let xCount = 0; 
        let oCount = 0; 
        for (let i = 0; i < 2; i++){
            for (let j = 0; j < 3; j++){
                let index; 
                i == 0 ? index = i*2 + j*4: index = i*2 + j*2;
                let check = counter(index); 
                xCount += check[1]; 
                oCount += check[0]; 
                if (xCount == 3){
                    return [true, 'x']
                }
                else if (oCount == 3){
                    return [true, 'o']
                }
            }
            xCount = 0;
            oCount = 0;
        }
        return [false, 0];
    }
    
    return {gameBoardArray, updateDOM, editArray, checkRows, checkColumns, checkDiagonals};
})();

//play round  
const gameController = (function(){
    gameboard.updateDOM();

    const continuePlaying = ()=>{
        let rows = gameboard.checkRows();
        let columns = gameboard.checkColumns(); 
        let diagonals = gameboard.checkDiagonals(); 
        if (rows[0] == true){
            return [false, rows[1]];
        }
        else if (columns[0] == true){
            return [false, columns[1]];
        }
        else if (diagonals[0] == true){
            return [false, diagonals[1]];
        }
        else{
            return [true, 0]; 
        }
    }

    const resetGame = () => {
        gameboard.gameBoardArray.fill("");
        gameboard.updateDOM(); 
    }



    return {continuePlaying, resetGame}
})();


let playerTurn = 1; //1 for player1, 2 for player2
//add event listener for each tile button
//loop through each tile and add event listener to edit array element 
const dialog = document.querySelector("dialog"); 
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
    let continuePlaying = gameController.continuePlaying(); 
    if (continuePlaying[0] == false){
        dialog.show();
    }
})

const resetButton = document.querySelector("#play-again");
resetButton.addEventListener('click', ()=>{
    gameController.resetGame();
    console.log(gameboard.gameBoardArray);
    dialog.close(); 
})




