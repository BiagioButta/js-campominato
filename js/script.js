const starthtml = document.getElementById('start');

function gameStart(){
    const difficoltahtml = document.getElementById('difficolta').value;
    let cellGame;

    switch(difficoltahtml){
        case '1':
            cellGame = 100;
            break;
        case '2':
            cellGame = 81;
            break;
        case '3':
            cellGame = 49;
            break;
    }

    const BOMB = 16;
    const posizioneBomba = []
    while(posizioneBomba.length < BOMB){
        const bomb = randomNumber(1, cellGame);
        if(!posizioneBomba.includes(bomb)){
            posizioneBomba.push(bomb);
        }
    }

    const MAX_ATTEMPT = cellGame - BOMB
    score = 0;
    console.log(posizioneBomba);

    function campoMinato(){
        const boardhtml = document.getElementById('board');
        boardhtml.innerHTML = '';

        const cellCamp = Math.sqrt(cellGame);
        
        for(let i = 1; i <= cellGame; i++){
            const cell = document.createElement('div');
            cell.classList = 'cell d-flex justify-content-center align-items-center';
            cell.style.width = `calc(100% / ${cellCamp})`
            cell.style.height = `calc(100% / ${cellCamp})`
            cell.innerHTML = `
            <span class="square">${i}<span>
            `
            boardhtml.appendChild(cell);

            cell.addEventListener('click', controlGame)

            function controlGame(){
                if(posizioneBomba.includes(i)){
                    this.classList.add('bg-red');
                    const gameOver = document.createElement('div');
                    gameOver.classList = 'game-over d-flex justify-content-center align-items-center shadow-lg';
                    gameOver.innerHTML = `
                    <div class="d-flex flex-column text-center mt-3">
                        <h3>GAME OVER</h3>
                        <p>Score: ${score}</p>
                    </div>`;
                    boardhtml.appendChild(gameOver);

                    endGame();

                    function endGame(){
                        const squares = document.querySelectorAll('.square');
                        for(let i = 0; i < squares.length; i++) {
                            const num = parseInt(squares[i].innerText);
                            if(posizioneBomba.includes(num)){
                                parentSquare = squares[i].parentNode;
                                parentSquare.classList.add('bg-red');
                            }
                        }
                    }    
                } else {
                    this.classList.add('inverse-shadow', 'bg-grey-600');
                    score++;
                    console.log(score);
                    if (score == MAX_ATTEMPT){
                        endGame();
                    }
                }
                
                // rimuovo il click sulle celle già cliccate
                cell.removeEventListener('click', controlGame);
            }
        }
    }   

    campoMinato();
}

starthtml.addEventListener('click', gameStart);

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}