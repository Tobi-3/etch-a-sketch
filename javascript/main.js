const gridContainer = document.getElementById('container');
const gridSize = 600;
gridContainer.style.width = `${gridSize}px`;
gridContainer.style.height = `${gridSize}px`;


function createSquare(id, sideLength) { 
    let sqr = document.createElement('div');
    sqr.className = 'square';
    sqr.id = id;
    sqr.style.width = `${sideLength}px`;
    sqr.style.height = `${sideLength}px`;
    sqr.addEventListener('click', () => sqr.style.backgroundColor = 'white' )
    sqr.addEventListener('mouseover', () => sqr.style.backgroundColor = 'black')

    return sqr;
};


function updateGrid(squaresPerRow) { 

    const oldSquares = [...gridContainer.getElementsByTagName("*")]
    oldSquares.forEach(oldSqr => oldSqr.remove());

    // change gridrows/-columns
    gridContainer.style.gridTemplateColumns = `${gridSize / squaresPerRow}px `.repeat(squaresPerRow);
    gridContainer.style.gridTemplateRows = `${gridSize / squaresPerRow}px `.repeat(squaresPerRow);

    //create new squares
    for (let sqr = 1; sqr <= squaresPerRow**2; sqr++){
        gridContainer.appendChild( createSquare(`square${sqr}`, (gridSize / squaresPerRow) ) );
    }
    
}


function createBtn(className, label, func) {
    const button = document.createElement('button');
    button.className= className;
    button.textContent = label;
    button.addEventListener('click', func);
    
    return button;
}


const clearbtn = createBtn('btn', 'Clear Grid', () => { 
            const squares = [...gridContainer.getElementsByTagName('*')];
            squares.forEach(element => {
            element.style.backgroundColor = 'white';
        })
    }
);

const newGridBtn = createBtn('btn', 'New Grid', () => {
        let input;

        do {
            input = prompt('How many blocks per row? (2-64)', 4);
            if(input > 1 && input < 65 || input == null) {
                break;
            } else alert('Please enter a natural number between 2 and 64');
        }
        while (true) 

        if(input != null) updateGrid(input);
    }
)

// add buttons to page
document.body.insertBefore(clearbtn, gridContainer);
document.body.insertBefore(newGridBtn, gridContainer);

updateGrid(4); //initialize first grid


