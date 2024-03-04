const gameboard = (function(){
    let gameBoardArray = Array(9).fill(""); 

    function createChildren(){
        const gameboardDOM = document.querySelector(".gameboard"); 
        gameBoardArray.forEach((tileElement, index)=>{
            let tileContainer = document.createElement("button");
            //tileContainer.textContent = tileElement; 
            if (tileElement == 'X'){
                const image = document.createElement("img");
                tileContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-outline</title><path d="M3,16.74L7.76,12L3,7.26L7.26,3L12,7.76L16.74,3L21,7.26L16.24,12L21,16.74L16.74,21L12,16.24L7.26,21L3,16.74M12,13.41L16.74,18.16L18.16,16.74L13.41,12L18.16,7.26L16.74,5.84L12,10.59L7.26,5.84L5.84,7.26L10.59,12L5.84,16.74L7.26,18.16L12,13.41Z" /></svg>';
                /*image.src = "images/close.svg";
                tileContainer.appendChild(image);*/
            }
            else if (tileElement == 'O'){
                const image = document.createElement("img");
                tileContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
                /*image.src = "images/circle.svg";
                tileContainer.appendChild(image);*/
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
    const checkTie = () =>{
        let occupiedTiles = 0; 
        gameBoardArray.forEach((element)=>{
            if (element !== ""){
                occupiedTiles += 1; 
            }
        })
        if (occupiedTiles == 9){
            return [true, 0];
        }
        else {
            return [false, 0]; 
        }
    }

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
                    return [true, 'o']; 
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
    
    return {gameBoardArray, updateDOM, 
        editArray, checkRows, 
        checkColumns, checkDiagonals,
        checkTie};
})();

//play round  
const gameController = (function(){
    gameboard.updateDOM();

    const continuePlaying = ()=>{
        let rows = gameboard.checkRows();
        let columns = gameboard.checkColumns(); 
        let diagonals = gameboard.checkDiagonals(); 
        let tie = gameboard.checkTie(); 
        if (rows[0] == true){ 
            return [false, rows[1]];
        }
        else if (columns[0] == true){
            return [false, columns[1]];
        }
        else if (diagonals[0] == true){
            return [false, diagonals[1]];
        }
        else if (tie[0] == true){
            return [false, 2]; 
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
    console.log("playerturn: " + playerTurn);
    const tile = event.target; 
    if (playerTurn == 1 && !tile.hasChildNodes()){
        gameboard.editArray(tile.value, "O");
        playerTurn = 2; 
        gameboard.updateDOM();
    }
    else if (playerTurn ==2 && !tile.hasChildNodes()){
        gameboard.editArray(tile.value, "X");
        playerTurn = 1; 
        gameboard.updateDOM();
    }
    let continuePlaying = gameController.continuePlaying(); 
    if (continuePlaying[0] == false){ 
        svgDiv = document.querySelector("dialog .dialog-image");   
        if (continuePlaying[1] == 'x'){
            document.querySelector("dialog p").textContent = "Winner is: ";
            svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-outline</title><path d="M3,16.74L7.76,12L3,7.26L7.26,3L12,7.76L16.74,3L21,7.26L16.24,12L21,16.74L16.74,21L12,16.24L7.26,21L3,16.74M12,13.41L16.74,18.16L18.16,16.74L13.41,12L18.16,7.26L16.74,5.84L12,10.59L7.26,5.84L5.84,7.26L10.59,12L5.84,16.74L7.26,18.16L12,13.41Z" /></svg>';
        }
        else if (continuePlaying[1] == 'o'){
            document.querySelector("dialog p").textContent = "Winner is: ";
            svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>' 
        }
        else {
            document.querySelector("dialog p").textContent = "Tie!"; 
        }
        
        dialog.showModal();
    }
})

const resetButton = document.querySelector("#play-again");
resetButton.addEventListener('click', ()=>{
    gameController.resetGame();
    console.log(gameboard.gameBoardArray);
    dialog.close(); 
})




