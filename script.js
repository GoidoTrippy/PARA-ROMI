const mensajesExtra = [
    "1. Dicen que el Caribe tiene los paisajes más bellos, pero yo sé que no hay vista que supere el hechizo de tus ojos y la magia de tu sonrisa.",
    "2. Hoy le tengo un poco de envidia a la brisa del mar, porque ella sí puede jugar con tus trenzas y acariciar tu cuello mientras yo te pienso desde aquí.",
    "3. Sé que empacaste vestidos preciosos y accesorios perfectos, pero el verdadero arte es ese cuerpo hermoso que los lleva puestos y me vuelve loco.",
    "4. Quiero que el sol resalte cada curva de tu piel en la arena. Mándame fotos, que de los pensamientos poéticos (y un poco impuros) me encargo yo.",
    "5. Disfruta cada segundo en ese paraíso. Pero vuelve pronto, que tengo planeado recorrer a besos cada centímetro que el sol de Jamaica tocó."
];

let indiceActual = 0;

// Variables Globales DOM
const btnEmpezar = document.getElementById('btnEmpezar');
const pantallaInicio = document.getElementById('pantallaInicio');
const contenedorPrincipal = document.getElementById('contenedorPrincipal');
const musicaFondo = document.getElementById('musicaFondo');
const btnSOS = document.getElementById('btnSOS');
const btnAbrirBuzon = document.getElementById('btnAbrirBuzon');
const btnMadrugada = document.getElementById('btnMadrugada');

// Lista de TODOS los botones sorpresa (para bloquearlos al inicio)
const todosLosBotones = [
    document.getElementById('btnCapsula'), document.getElementById('btnMasSorpresas'),
    document.getElementById('btnContrato'), document.getElementById('btnRadar'),
    document.getElementById('btnHuella'), document.getElementById('btnPensamientos'),
    document.getElementById('btnTension'), document.getElementById('btnBesos'),
    document.getElementById('btnBoveda')
];

// INICIO
btnEmpezar.addEventListener('click', () => {
    pantallaInicio.style.display = 'none';
    contenedorPrincipal.style.display = 'block';
    btnSOS.style.display = 'block'; 
    btnAbrirBuzon.style.display = 'block';
    btnMadrugada.style.display = 'flex';
    iniciarLienzo(); 
    musicaFondo.volume = 0.5; musicaFondo.play().catch(e=>console.log(e));
});

// 1. RASPADO (CANVAS) Y BLOQUEO DE BOTONES
function iniciarLienzo() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    
    // Bloquear botones al inicio
    todosLosBotones.forEach(btn => { if(btn) btn.style.pointerEvents = 'none'; });

    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#e5b13a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 20px Arial'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
    ctx.fillText('Desliza tu hermoso dedo...', canvas.width / 2, canvas.height / 2 - 20);

    let isDrawing = false; let pixelesBorrados = 0;
    function getCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }
    function startDrawing(event) { isDrawing = true; scratch(event); }
    function stopDrawing() {
        isDrawing = false;
        if (pixelesBorrados > 35) {
            // Desbloqueo Inmediato (Mejora especial para iPhone)
            todosLosBotones.forEach(btn => { if(btn) btn.style.pointerEvents = 'auto'; });
            canvas.style.pointerEvents = 'none'; 
            canvas.style.transition = 'opacity 1.5s ease'; canvas.style.opacity = '0';
            setTimeout(() => { canvas.style.display = 'none'; }, 1500);
        }
    }
    function scratch(event) {
        if (!isDrawing) return; event.preventDefault(); 
        const { x, y } = getCoordinates(event);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 35, 0, Math.PI * 2); ctx.fill();
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

// 2. MODO MADRUGADA (LUNA)
let modoNoche = false;
const poemaOriginal = document.getElementById('poemaPrincipal').innerHTML;
const firmaOriginal = document.getElementById('firmaPrincipal').innerHTML;
btnMadrugada.addEventListener('click', () => {
    modoNoche = !modoNoche;
    document.body.classList.toggle('modo-noche');
    if(modoNoche) {
        btnMadrugada.innerText = "☀️";
        document.getElementById('poemaPrincipal').innerHTML = "<p style='font-style:italic; font-size:1.1em;'>Quería ser lo último que leyeras hoy. Que descanses. Ojalá me sueñes, porque yo seguro te voy a soñar.</p>";
        document.getElementById('firmaPrincipal').innerHTML = "Buenas noches,<br>Diego";
    } else {
        btnMadrugada.innerText = "🌙";
        document.getElementById('poemaPrincipal').innerHTML = poemaOriginal;
        document.getElementById('firmaPrincipal').innerHTML = firmaOriginal;
    }
});

// 3. CARRUSEL Y EQUIPAJE EXTRA
const modalSorpresas = document.getElementById('modalSorpresas');
document.getElementById('btnMasSorpresas').addEventListener('click', () => { modalSorpresas.style.display='flex'; actualizarCarrusel(); });
document.getElementById('btnCerrar').addEventListener('click', () => modalSorpresas.style.display='none');
document.getElementById('btnSiguiente').addEventListener('click', () => { if (indiceActual < mensajesExtra.length-1) { indiceActual++; actualizarCarrusel(); } });
document.getElementById('btnAnterior').addEventListener('click', () => { if (indiceActual > 0) { indiceActual--; actualizarCarrusel(); } });
function actualizarCarrusel() {
    document.getElementById('textoCarrusel').innerText = mensajesExtra[indiceActual];
    document.getElementById('contador').innerText = `${indiceActual + 1} / ${mensajesExtra.length}`;
    document.getElementById('btnIrACupones').style.display = (indiceActual === mensajesExtra.length - 1) ? 'block' : 'none';
}

// 4. CUPONES Y MENÚ VIP
const modalCupones = document.getElementById('modalCupones');
const modalMenu = document.getElementById('modalMenu');
document.getElementById('btnIrACupones').addEventListener('click', () => { modalSorpresas.style.display='none'; modalCupones.style.display='flex'; });
document.getElementById('btnCerrarCupones').addEventListener('click', () => modalCupones.style.display='none');
document.getElementById('btnAbrirMenu').addEventListener('click', () => { modalCupones.style.display='none'; modalMenu.style.display='flex'; });
document.getElementById('btnCerrarMenu').addEventListener('click', () => modalMenu.style.display='none');
function pedidoConfirmado(platillo) {
    document.getElementById('mensajePedido').style.display = 'block';
    document.querySelectorAll('#modalMenu .btn-platillo').forEach(btn => btn.style.display = 'none');
}

// 5. CÁPSULA DEL TIEMPO
const modalCapsula = document.getElementById('modalCapsula');
document.getElementById('btnCapsula').addEventListener('click', () => {
    modalCapsula.style.display='flex';
    const hoy = new Date(); const fechaDesbloqueo = new Date('2026-07-16T00:00:00'); 
    if (hoy >= fechaDesbloqueo) {
        document.getElementById('tituloCapsula').innerText = "🔓 Cápsula Abierta";
        document.getElementById('textoCapsula').innerHTML = "<b>¡Sorpresa!</b><br><br>Si estás leyendo esto, ya llevas unos días en el paraíso. Sigue disfrutando, aquí te pienso bonito.";
    } else {
        document.getElementById('tituloCapsula').innerText = "🔒 Archivo Bloqueado";
        document.getElementById('textoCapsula').innerText = "¡Sin hacer trampa! Vuelve el 16 de julio para descubrir lo que hay dentro. 😏";
    }
});
document.getElementById('btnCerrarCapsula').addEventListener('click', () => modalCapsula.style.display='none');

// 6. BOLETO VIP Y RADAR
const modalContrato = document.getElementById('modalContrato');
const btnFirmar = document.getElementById('btnFirmar');
document.getElementById('btnContrato').addEventListener('click', () => modalContrato.style.display='flex');
document.getElementById('btnCerrarContrato').addEventListener('click', () => modalContrato.style.display='none');
btnFirmar.addEventListener('click', () => { btnFirmar.innerText="¡Check-in Confirmado! 😏❤️"; btnFirmar.style.backgroundColor="#2ecc71"; btnFirmar.disabled=true; });

const modalRadar = document.getElementById('modalRadar');
document.getElementById('btnRadar').addEventListener('click', () => modalRadar.style.display='flex');
document.getElementById('btnCerrarRadar').addEventListener('click', () => modalRadar.style.display='none');

// 7. BUZÓN Y BOTELLA
const modalBuzon = document.getElementById('modalBuzon');
const textoPostal = document.getElementById('textoPostal');
document.getElementById('btnAbrirBuzon').addEventListener('click', () => modalBuzon.style.display='flex');
document.getElementById('btnCerrarBuzon').addEventListener('click', () => modalBuzon.style.display='none');
document.getElementById('btnEnviarPostal').addEventListener('click', () => {
    if(textoPostal.value.trim() !== "") {
        window.open(`https://wa.me/50688317018?text=📬 *Nueva Postal desde Jamaica:*%0A%0A${encodeURIComponent(textoPostal.value.trim())}`, '_blank');
        textoPostal.value = ""; modalBuzon.style.display = 'none';
    }
});

const modalBotella = document.getElementById('modalBotella');
const botellaFlotante = document.getElementById('botellaFlotante');
botellaFlotante.addEventListener('click', () => { modalBotella.style.display='flex'; botellaFlotante.style.display='none'; });
document.getElementById('btnCerrarBotella').addEventListener('click', () => { modalBotella.style.display='none'; setTimeout(() => botellaFlotante.style.display='block', 8000); });

// 8. ESCÁNER BIOMÉTRICO
const modalHuella = document.getElementById('modalHuella');
const btnEscanear = document.getElementById('btnEscanear');
const barraEscaneo = document.getElementById('barraEscaneo');
const resultadoHuella = document.getElementById('resultadoHuella');
let timerEscaneo;
document.getElementById('btnHuella').addEventListener('click', () => modalHuella.style.display='flex');
document.getElementById('btnCerrarHuella').addEventListener('click', () => { modalHuella.style.display='none'; barraEscaneo.style.width='0%'; resultadoHuella.style.display='none'; btnEscanear.style.display='inline-block'; document.getElementById('instruccionHuella').style.display='block';});
function iniciarEscaneo(e) { 
    e.preventDefault(); barraEscaneo.style.transition='width 3s linear'; barraEscaneo.style.width='100%'; 
    timerEscaneo = setTimeout(()=>{ 
        btnEscanear.style.display='none'; 
        document.getElementById('instruccionHuella').style.display='none'; 
        resultadoHuella.style.display='block'; 
        resultadoHuella.innerHTML="<b>Biometría completada.</b><br>Análisis físico: Cuerpo asombroso detectado.<br>Sonrisa: 100% Perfecta.<br>Identidad confirmada: Romi.<br><br><i>Desbloqueado: Eres mi persona favorita.</i>"; 
    }, 3000); 
}
function detenerEscaneo(e) { e.preventDefault(); clearTimeout(timerEscaneo); if(resultadoHuella.style.display!=='block'){ barraEscaneo.style.width='0%'; barraEscaneo.style.transition='width 0.2s'; } }
btnEscanear.addEventListener('mousedown', iniciarEscaneo); btnEscanear.addEventListener('touchstart', iniciarEscaneo, {passive:false});
btnEscanear.addEventListener('mouseup', detenerEscaneo); btnEscanear.addEventListener('mouseleave', detenerEscaneo); btnEscanear.addEventListener('touchend', detenerEscaneo);

// 9. LECTOR DE PENSAMIENTOS (¡COMA CORREGIDA AQUÍ!)
const modalPensamientos = document.getElementById('modalPensamientos');
const listaPensamientos = [
    "Pensando en si ya tomaste café frente al mar...",
    "Pensando en lo mucho que me encantaría jugar con tu hermoso cabello y más con esas perfectas trenzas.",
    "Pensando en esa sonrisa perfecta que me vuelve completamente loco.",
    "Pensando en tu asombroso cuerpo y en cómo te debe quedar ese bronceado.",
    "Pensando en tus ojos hipnotizantes... es un verdadero peligro mirarte.",
    "Pensando en cómo le voy a hacer para no comerte a besos apenas te vea.",
    "Pensando en que el Caribe es lindo, pero no tiene nada que envidiarle a tu belleza.", // ESTA ERA LA COMA FALTANTE
    "Pensando en la curva de tu espalda y en abrazarte."
];
function generarPensamiento() { document.getElementById('textoPensamiento').innerText = listaPensamientos[Math.floor(Math.random() * listaPensamientos.length)]; }
document.getElementById('btnPensamientos').addEventListener('click', () => { modalPensamientos.style.display='flex'; generarPensamiento(); });
document.getElementById('btnOtroPensamiento').addEventListener('click', generarPensamiento);
document.getElementById('btnCerrarPensamientos').addEventListener('click', () => modalPensamientos.style.display='none');

// 10. ALTA TENSIÓN Y BESOS
const modalTension = document.getElementById('modalTension');
document.getElementById('btnTension').addEventListener('click', () => modalTension.style.display='flex');
document.getElementById('btnCerrarTension').addEventListener('click', () => { modalTension.style.display='none'; document.getElementById('faseAdvertencia').style.display='block'; document.getElementById('fasePicante').style.display='none'; });
document.getElementById('btnSola').addEventListener('click', () => { document.getElementById('faseAdvertencia').style.display='none'; document.getElementById('fasePicante').style.display='block'; });

const modalBesos = document.getElementById('modalBesos');
document.getElementById('btnBesos').addEventListener('click', () => modalBesos.style.display='flex');
document.getElementById('btnCerrarBesos').addEventListener('click', () => { modalBesos.style.display='none'; document.getElementById('textoBeso').style.display='none'; document.getElementById('opcionesBesos').style.display='block'; });
function mostrarBeso(tipo) {
    document.getElementById('opcionesBesos').style.display='none';
    const txt = document.getElementById('textoBeso'); txt.style.display='block';
    if(tipo==='frente') txt.innerText = "Cierra los ojos. Imagina un beso súper tierno en tu frente que te dice 'te extrañé muchísimo'.";
    if(tipo==='cuello') txt.innerText = "Cierra los ojos. Imagina mis manos en tu cintura y un beso lento bajando por tu cuello... Guárdalo para cuando vuelvas.";
    if(tipo==='sorpresa') txt.innerText = "Imagina que te agarro por sorpresa apenas cruzamos miradas. Un beso de esos que te dejan sin respiración.";
}

// 11. BÓVEDA CONFIDENCIAL
const modalBoveda = document.getElementById('modalBoveda');
document.getElementById('btnBoveda').addEventListener('click', () => modalBoveda.style.display='flex');
document.getElementById('btnCerrarBoveda').addEventListener('click', () => { modalBoveda.style.display='none'; document.getElementById('pinInput').value=''; document.getElementById('errorPin').style.display='none'; document.getElementById('secretoBoveda').style.display='none'; document.getElementById('btnVerificarPin').style.display='inline-block';});
document.getElementById('btnVerificarPin').addEventListener('click', () => {
    if(document.getElementById('pinInput').value === "2026") {
        document.getElementById('errorPin').style.display='none'; document.getElementById('btnVerificarPin').style.display='none'; document.getElementById('pinInput').style.display='none'; document.getElementById('secretoBoveda').style.display='block';
    } else { document.getElementById('errorPin').style.display='block'; }
});

// 12. CORAZONES SECRETOS
let corazonesAtrapados = 0; const modalSecreto = document.getElementById('modalSecreto');
document.querySelectorAll('.corazon-flotante').forEach(c => { c.addEventListener('click', function() { if(this.style.opacity!=='0'){ this.style.opacity='0'; this.style.transform='scale(2)'; corazonesAtrapados++; if(corazonesAtrapados===3) setTimeout(()=>modalSecreto.style.display='flex',400); } }); });
document.getElementById('btnCerrarSecreto').addEventListener('click', () => modalSecreto.style.display='none');