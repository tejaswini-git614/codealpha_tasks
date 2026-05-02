const display = document.getElementById('res');


function Solve(val) {
    if (display.value === 'Error') display.value = '';

    
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];

    if (operators.includes(lastChar) && operators.includes(val)) {
        return; 
    }

    display.value += val;
    previewResult();
}


function Result() {
    try {
        const expression = display.value.replace(/x/g, '*');

        
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(`return ${expression}`)();
        display.value = result;
    } catch {
        display.value = 'Error';
    }
}


function Clear() {
    display.value = '';
}


function Back() {
    display.value = display.value.slice(0, -1);
}


function previewResult() {
    try {
        const expression = display.value.replace(/x/g, '*');

        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) return;

        const result = Function(`return ${expression}`)();

        
        display.placeholder = '= ' + result;
    } catch {
        display.placeholder = '';
    }
}


document.addEventListener('keydown', function (event) {
    function highlightButton(key) {
    const buttons = document.querySelectorAll('.btn input');

    buttons.forEach(btn => {
        if (btn.value === key || 
            (key === '*' && btn.value === 'x') ||
            (key === 'Enter' && btn.value === '=')) {
            
            btn.classList.add('pressed');
            setTimeout(() => btn.classList.remove('pressed'), 100);
        }
    });
}
    const key = event.key;
    highlightButton(key); 

    if ('0123456789'.includes(key)) {
        Solve(key);
    } 
    else if (['+', '-', '*', '/', '%', '.'].includes(key)) {
        Solve(key === '*' ? 'x' : key);
    } 
    else if (key === 'Enter') {
        event.preventDefault();
        Result();
    } 
    else if (key === 'Backspace') {
        Back();
    } 
    else if (key.toLowerCase() === 'c') {
        Clear();
    }
});
const buttons = document.querySelectorAll('.btn input');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('pressed');

        setTimeout(() => {
            btn.classList.remove('pressed');
        }, 100);
    });
});