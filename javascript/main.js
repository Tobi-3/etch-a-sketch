
// globals
const gridContainer = document.getElementById('container');
const btnContainer = document.getElementById('btn-container');
const togglesEtc = {mousedown: false, gridBorders: false, black: true,}
const gridSize = 600;
gridContainer.style.width = `${gridSize}px`;
gridContainer.style.height = `${gridSize}px`;
gridContainer.onmousedown = () => togglesEtc['mousedown'] = true;
gridContainer.onmouseup = () => togglesEtc['mousedown'] = false;

// functions ==================================================================
function randomColor() {
    const randomNum = () => Math.floor(Math.random() * 256);
    return `rgb(${randomNum()},${randomNum()},${randomNum()})`;
}

function createSquare(id, sideLength) { 
    let sqr = document.createElement('div');
    sqr.className = 'square';
    sqr.id = id;
    sqr.backgroundColor= 'whitesmoke';
    sqr.style.width = `${sideLength}px`;
    sqr.style.height = `${sideLength}px`;
    
    
    sqr.addEventListener('mousedown', (e) => {
        sqr.style.backgroundColor = colorSquare(e);
        }
    );

    sqr.addEventListener('mouseenter', (e) => {
        if(togglesEtc.mousedown) {
           sqr.style.backgroundColor = colorSquare(e);
        } 
    });

    return sqr;
};

// returnns color on target square color
function colorSquare(e) {
    
    const background = e.target.style.getPropertyValue('background-color');
    const noColor = background == 'whitesmoke' || background == ''; 
    let color;
    color = (noColor)? (togglesEtc.black)? 'black' : randomColor() : 'whitesmoke';
    
    return color;
}

// creates new grid depending on user input
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

// buttons ====================================================================
const clearbtn = createBtn('btn', 'Clear Grid', () => { 
            const squares = [...gridContainer.getElementsByTagName('*')];
            squares.forEach(element => {
            element.style.backgroundColor = 'whitesmoke';
        })
    }
);

const newGridBtn = createBtn('btn', 'New Grid', () => {
        let input;

        do {
            input = prompt('How many squares per side? (2-64)', 16);
            if(input > 1 && input < 65 || input == null) {
                break;
            } else alert('Please enter a natural number between 2 and 64');
        }
        while (true) 

        if(input != null){
            updateGrid(input);
        }
    }
)

const toggleGridBtn = createBtn('btn', 'Toggle Grid',() => {
    togglesEtc['toggleGridBtn'] = !togglesEtc.toggleGridBtn;
    squares = [...gridContainer.getElementsByTagName('*')];
    
    (togglesEtc.toggleGridBtn)? 
    squares.forEach(sqr => { sqr.style.border = '1px solid black'}):
    squares.forEach(sqr => { sqr.style.border = 'whitesmoke'});
    
})

const toggleColorBtn = createBtn('btn', 'Random',() => {
    toggleColorBtn.textContent = (togglesEtc.black)?'Black':'Random';
    togglesEtc['black'] = !togglesEtc.black;
})

// add buttons to page
btnContainer.append(clearbtn);
btnContainer.append(newGridBtn);
btnContainer.append(toggleGridBtn);
btnContainer.append(toggleColorBtn);

updateGrid(16); //initialize first grid
