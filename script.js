// --- DATOS DEL CARRUSEL (MENSAJES POÉTICOS Y DETALLISTAS) ---
const mensajesExtra = [
    "1. Dicen que el Caribe tiene los paisajes más bellos, pero yo sé que no hay vista que supere el hechizo de tus ojos y la magia de tu sonrisa.",
    "2. Hoy le tengo un poco de envidia a la brisa del mar, porque ella sí puede jugar con tus trenzas y acariciar tu cuello mientras yo te pienso desde aquí.",
    "3. Sé que empacaste vestidos preciosos y accesorios perfectos, pero el verdadero arte es ese cuerpo hermoso que los lleva puestos y me vuelve loco.",
    "4. Quiero que el sol resalte cada curva de tu piel en la arena. Mándame fotos, que de los pensamientos poéticos (y un poco impuros) me encargo yo.",
    "5. Disfruta cada segundo en ese paraíso. Pero vuelve pronto, que tengo planeado recorrer a besos cada centímetro que el sol de Jamaica tocó."
];

let indiceActual = 0;

// --- ELEMENTOS DEL DOM ---
const pantallaInicio = document.getElementById('pantallaInicio');
const btnEmpezar = document.getElementById('btnEmpezar');
const contenedorPrincipal = document.getElementById('contenedorPrincipal');
const musicaFondo = document.getElementById('musicaFondo');

const btnMasSorpresas = document.getElementById('btnMasSorpresas');
const modalSorpresas = document.getElementById('modalSorpresas');
const btnCerrar = document.getElementById('btnCerrar');
const textoCarrusel = document.getElementById('textoCarrusel');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const contador = document.getElementById('contador');

// --- FASE 1: INICIAR EXPERIENCIA (Y MÚSICA) ---
btnEmpezar.addEventListener('click', () => {
    pantallaInicio.style.display = 'none';
    contenedorPrincipal.style.display = 'block';
    
    iniciarLienzo(); 
    
    musicaFondo.volume = 0.5;
    musicaFondo.play().catch(error => console.log("El navegador bloqueó el audio", error));
});

// --- FASE 3: LÓGICA DEL CARRUSEL ---
btnMasSorpresas.addEventListener('click', () => {
    modalSorpresas.style.display = 'flex';
    actualizarCarrusel();
});

btnCerrar.addEventListener('click', () => {
    modalSorpresas.style.display = 'none';
});

btnSiguiente.addEventListener('click', () => {
    if (indiceActual < mensajesExtra.length - 1) {
        indiceActual++;
        actualizarCarrusel();
    }
});

btnAnterior.addEventListener('click', () => {
    if (indiceActual > 0) {
        indiceActual--;
        actualizarCarrusel();
    }
});

function actualizarCarrusel() {
    textoCarrusel.innerText = mensajesExtra[indiceActual];
    contador.innerText = `${indiceActual + 1} / ${mensajesExtra.length}`;
}

// --- FASE 2: LÓGICA DEL RASPADO (SOLUCIÓN DEL BUG) ---
function iniciarLienzo() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    
    btnMasSorpresas.style.pointerEvents = 'none';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = '#e5b13a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Desliza tu hermoso dedo...', canvas.width / 2, canvas.height / 2 - 20);

    let isDrawing = false;
    let pixelesBorrados = 0; // Usaremos esto para saber qué tanto ha rascado

    function getCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function startDrawing(event) {
        isDrawing = true;
        scratch(event);
    }

    function stopDrawing() {
        isDrawing = false;
        
        // Magia aquí: Solo evaluamos si ya rascó bastante CUANDO LEVANTA EL DEDO, no mientras rasca.
        if (pixelesBorrados > 30) {
            btnMasSorpresas.style.pointerEvents = 'auto'; 
            
            // Hacemos que el lienzo dorado se desvanezca suavemente (efecto fade out)
            canvas.style.transition = 'opacity 1.5s ease';
            canvas.style.opacity = '0';
            
            // Y luego de 1.5 segundos, lo quitamos del medio para que los botones funcionen
            setTimeout(() => { canvas.style.display = 'none'; }, 1500);
        }
    }

    function scratch(event) {
        if (!isDrawing) return;
        event.preventDefault(); 

        const { x, y } = getCoordinates(event);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2); 
        ctx.fill();

        pixelesBorrados++; // Aumenta el contador de forma invisible
    }

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
}