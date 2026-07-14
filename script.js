const mensajesExtra = [
    "1. Dicen que el Caribe tiene los paisajes más bellos, pero yo sé que no hay vista que supere el hechizo de tus ojos y la magia de tu sonrisa.",
    "2. Hoy le tengo un poco de envidia a la brisa del mar, porque ella sí puede jugar con tus trenzas y acariciar tu cuello mientras yo te pienso desde aquí.",
    "3. Sé que empacaste vestidos preciosos y accesorios perfectos, pero el verdadero arte es ese cuerpo hermoso que los lleva puestos y me vuelve loco.",
    "4. Quiero que el sol resalte cada curva de tu piel en la arena. Mándame fotos, que de los pensamientos poéticos (y un poco impuros) me encargo yo.",
    "5. Disfruta cada segundo en ese paraíso. Pero vuelve pronto, que tengo planeado recorrer a besos cada centímetro que el sol de Jamaica tocó."
];

let indiceActual = 0;

// Elementos
const pantallaInicio = document.getElementById('pantallaInicio');
const btnEmpezar = document.getElementById('btnEmpezar');
const contenedorPrincipal = document.getElementById('contenedorPrincipal');
const musicaFondo = document.getElementById('musicaFondo');
const btnSOS = document.getElementById('btnSOS');

const btnMasSorpresas = document.getElementById('btnMasSorpresas');
const modalSorpresas = document.getElementById('modalSorpresas');
const btnCerrar = document.getElementById('btnCerrar');
const textoCarrusel = document.getElementById('textoCarrusel');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const contador = document.getElementById('contador');

const btnIrACupones = document.getElementById('btnIrACupones');
const modalCupones = document.getElementById('modalCupones');
const btnCerrarCupones = document.getElementById('btnCerrarCupones');

// Nuevos Elementos Menú VIP y Cápsula
const btnAbrirMenu = document.getElementById('btnAbrirMenu');
const modalMenu = document.getElementById('modalMenu');
const btnCerrarMenu = document.getElementById('btnCerrarMenu');
const btnCapsula = document.getElementById('btnCapsula');
const modalCapsula = document.getElementById('modalCapsula');
const btnCerrarCapsula = document.getElementById('btnCerrarCapsula');
const tituloCapsula = document.getElementById('tituloCapsula');
const textoCapsula = document.getElementById('textoCapsula');

// Nuevos Elementos Buzón
const btnAbrirBuzon = document.getElementById('btnAbrirBuzon');
const modalBuzon = document.getElementById('modalBuzon');
const btnCerrarBuzon = document.getElementById('btnCerrarBuzon');
const btnEnviarPostal = document.getElementById('btnEnviarPostal');
const textoPostal = document.getElementById('textoPostal');

// Inicio
btnEmpezar.addEventListener('click', () => {
    pantallaInicio.style.display = 'none';
    contenedorPrincipal.style.display = 'block';
    btnSOS.style.display = 'block'; // Muestra el botón de emergencia
    btnAbrirBuzon.style.display = 'block'; // Muestra el botón del buzón
    iniciarLienzo(); 
    musicaFondo.volume = 0.5;
    musicaFondo.play().catch(e => console.log(e));
});

// Lógica Cápsula de Tiempo
btnCapsula.addEventListener('click', () => {
    modalCapsula.style.display = 'flex';
    
    // Fecha actual y fecha de desbloqueo (16 de julio de 2026)
    const hoy = new Date();
    const fechaDesbloqueo = new Date('2026-07-16T00:00:00'); 

    if (hoy >= fechaDesbloqueo) {
        tituloCapsula.innerText = "🔓 Cápsula Abierta";
        textoCapsula.innerHTML = "<b>¡Sorpresa!</b><br><br>Si estás leyendo esto, ya llevas unos días en el paraíso. Solo quería aparecer mágicamente por aquí para decirte que me haces mucha falta. Sigue disfrutando, aquí te pienso bonito.";
    } else {
        tituloCapsula.innerText = "🔒 Archivo Bloqueado";
        textoCapsula.innerText = "¡Hey! ¡Sin hacer trampa! Esta cápsula está sellada. Vuelve a intentarlo el 16 de julio para descubrir lo que hay dentro. 😏";
    }
});
btnCerrarCapsula.addEventListener('click', () => { modalCapsula.style.display = 'none'; });

// Lógica Menú VIP Culinario
btnAbrirMenu.addEventListener('click', () => {
    modalCupones.style.display = 'none';
    modalMenu.style.display = 'flex';
});
btnCerrarMenu.addEventListener('click', () => { modalMenu.style.display = 'none'; });

// Función que se ejecuta al elegir un platillo
function pedidoConfirmado(platillo) {
    const mensaje = document.getElementById('mensajePedido');
    mensaje.style.display = 'block';
    
    // Oculta los botones después de elegir
    const botonesPlatillos = document.querySelectorAll('.btn-platillo');
    botonesPlatillos.forEach(btn => btn.style.display = 'none');
    
    // Te podríamos hacer un link a WhatsApp automático aquí también:
    // window.open(`https://wa.me/506XXXXXXXX?text=¡Chef Diego! Ya elegí mi menú VIP: ${platillo}`, '_blank');
}

// Carrusel
btnMasSorpresas.addEventListener('click', () => { modalSorpresas.style.display = 'flex'; actualizarCarrusel(); });
btnCerrar.addEventListener('click', () => { modalSorpresas.style.display = 'none'; });
btnCerrarCupones.addEventListener('click', () => { modalCupones.style.display = 'none'; });

btnSiguiente.addEventListener('click', () => { if (indiceActual < mensajesExtra.length - 1) { indiceActual++; actualizarCarrusel(); } });
btnAnterior.addEventListener('click', () => { if (indiceActual > 0) { indiceActual--; actualizarCarrusel(); } });

function actualizarCarrusel() {
    textoCarrusel.innerText = mensajesExtra[indiceActual];
    contador.innerText = `${indiceActual + 1} / ${mensajesExtra.length}`;
    if (indiceActual === mensajesExtra.length - 1) { btnIrACupones.style.display = 'block'; } else { btnIrACupones.style.display = 'none'; }
}

btnIrACupones.addEventListener('click', () => { modalSorpresas.style.display = 'none'; modalCupones.style.display = 'flex'; });

// --- LÓGICA DEL BUZÓN DE POSTALES ---
btnAbrirBuzon.addEventListener('click', () => {
    modalBuzon.style.display = 'flex';
});

btnCerrarBuzon.addEventListener('click', () => {
    modalBuzon.style.display = 'none';
});

btnEnviarPostal.addEventListener('click', () => {
    const mensaje = textoPostal.value.trim();
    if(mensaje !== "") {
        // Codificamos el mensaje para que WhatsApp lo entienda con espacios y saltos de línea
        const textoCodificado = encodeURIComponent(mensaje);
        // Usamos tu mismo número del S.O.S
        const urlWhatsApp = `https://wa.me/50688317018?text=📬 *Nueva Postal desde Jamaica:*%0A%0A${textoCodificado}`;
        
        window.open(urlWhatsApp, '_blank'); // Abre WhatsApp
        
        // Limpiamos el buzón y lo cerramos
        textoPostal.value = "";
        modalBuzon.style.display = 'none';
    }
});

// Easter Egg (Atrapa Corazones)
let corazonesAtrapados = 0;
const corazones = document.querySelectorAll('.corazon-flotante');
const modalSecreto = document.getElementById('modalSecreto');
const btnCerrarSecreto = document.getElementById('btnCerrarSecreto');

corazones.forEach(corazon => {
    corazon.addEventListener('click', function() {
        if(this.style.opacity !== '0') {
            this.style.opacity = '0';
            this.style.transform = 'scale(2)';
            corazonesAtrapados++;
            if(corazonesAtrapados === 3) {
                setTimeout(() => { modalSecreto.style.display = 'flex'; }, 400);
            }
        }
    });
});
btnCerrarSecreto.addEventListener('click', () => { modalSecreto.style.display = 'none'; });

// Raspado (Canvas)
function iniciarLienzo() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    btnMasSorpresas.style.pointerEvents = 'none';
    btnCapsula.style.pointerEvents = 'none'; // También bloqueamos la cápsula al inicio
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = '#e5b13a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Desliza tu dedo...', canvas.width / 2, canvas.height / 2 - 20);

    let isDrawing = false;
    let pixelesBorrados = 0;

    function getCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function startDrawing(event) { isDrawing = true; scratch(event); }

    function stopDrawing() {
        isDrawing = false;
        if (pixelesBorrados > 30) {
            btnMasSorpresas.style.pointerEvents = 'auto'; 
            btnCapsula.style.pointerEvents = 'auto'; 
            canvas.style.transition = 'opacity 1.5s ease';
            canvas.style.opacity = '0';
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
        pixelesBorrados++; 
    }

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
}
// --- LÓGICA DEL CONTRATO DE FICHAJE ---
const btnContrato = document.getElementById('btnContrato');
const modalContrato = document.getElementById('modalContrato');
const btnCerrarContrato = document.getElementById('btnCerrarContrato');
const btnFirmar = document.getElementById('btnFirmar');

btnContrato.addEventListener('click', () => {
    modalContrato.style.display = 'flex';
});

btnCerrarContrato.addEventListener('click', () => {
    modalContrato.style.display = 'none';
});
// Animación al confirmar el Boleto VIP
btnFirmar.addEventListener('click', () => {
    btnFirmar.innerText = "¡Check-in Confirmado! Te espero ansioso 😏❤️";
    btnFirmar.style.backgroundColor = "#2ecc71";
    btnFirmar.style.boxShadow = "0 0 15px #2ecc71";
    btnFirmar.disabled = true;
});

// --- LÓGICA DEL RADAR DE CONEXIÓN ---
const btnRadar = document.getElementById('btnRadar');
const modalRadar = document.getElementById('modalRadar');
const btnCerrarRadar = document.getElementById('btnCerrarRadar');

btnRadar.addEventListener('click', () => {
    modalRadar.style.display = 'flex';
});

btnCerrarRadar.addEventListener('click', () => {
    modalRadar.style.display = 'none';
});

// --- LÓGICA DEL BUZÓN DE POSTALES ---
btnAbrirBuzon.addEventListener('click', () => {
    modalBuzon.style.display = 'flex';
});

btnCerrarBuzon.addEventListener('click', () => {
    modalBuzon.style.display = 'none';
});

btnEnviarPostal.addEventListener('click', () => {
    const mensaje = textoPostal.value.trim();
    if(mensaje !== "") {
        // Codificamos el mensaje para que WhatsApp lo entienda
        const textoCodificado = encodeURIComponent(mensaje);
        // Usamos tu mismo número del S.O.S
        const urlWhatsApp = `https://wa.me/50688317018?text=📬 *Nueva Postal desde Jamaica:*%0A%0A${textoCodificado}`;
        
        window.open(urlWhatsApp, '_blank'); // Abre WhatsApp
        
        // Limpiamos el buzón y lo cerramos
        textoPostal.value = "";
        modalBuzon.style.display = 'none';
    }
});