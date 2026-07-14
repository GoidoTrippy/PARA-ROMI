const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


ctx.fillStyle = '#e5b13a'; // Un color oro cálido / arena de playa
ctx.fillRect(0, 0, canvas.width, canvas.height);


ctx.font = 'bold 22px Arial';
ctx.fillStyle = '#ffffff';
ctx.textAlign = 'center';
ctx.fillText('Un detalle para ti...', canvas.width / 2, canvas.height / 2 - 20);
ctx.font = '18px Arial';
ctx.fillText('Pasa tu hermoso dedo para descubrirlo ', canvas.width / 2, canvas.height / 2 + 20);


let isDrawing = false;


function getCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function startDrawing(event) {
    isDrawing = true;
    scratch(event);
}

function stopDrawing() {
    isDrawing = false;
}

function scratch(event) {
    if (!isDrawing) return;
    event.preventDefault(); 

    const { x, y } = getCoordinates(event);

    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2); // El 
    ctx.fill();
}

// Eventos para iPhone / Táctil
canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', scratch, { passive: false });
canvas.addEventListener('touchend', stopDrawing);

// Eventos para PC 
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);