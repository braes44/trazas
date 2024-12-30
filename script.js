async function calcularLimites() {
    const dl50 = parseFloat(document.getElementById("dl50").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const factorSeguridadNOEL = parseFloat(document.getElementById("factorSeguridadNOEL").value);

    const dosisA = parseFloat(document.getElementById("dosisA").value);
    const factorSeguridad = parseFloat(document.getElementById("factorSeguridad").value);
    const unidadesB = parseFloat(document.getElementById("unidadesB").value);
    const tamanoLoteB = parseFloat(document.getElementById("tamanoLoteB").value);
    const areaEquipos = parseFloat(document.getElementById("areaEquipos").value);
    const areaMuestreo = parseFloat(document.getElementById("areaMuestreo").value);

    // Validación de campos
    if (!dl50 || !peso || !factorSeguridadNOEL || !dosisA || !factorSeguridad || !unidadesB || !tamanoLoteB || !areaEquipos || !areaMuestreo) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Cálculo de NOEL
    const noel = (dl50 * peso) / factorSeguridadNOEL;

    // Cálculo de límites de limpieza
    const limiteTerapeutico = ((dosisA / factorSeguridad) * (unidadesB / tamanoLoteB) * (areaMuestreo / areaEquipos)).toFixed(4);
    const limitePPM = (10 * tamanoLoteB * (areaMuestreo / areaEquipos)).toFixed(4);
    const limiteVisual = 0.1; // Límite fijo para método visual

    // Comparación para determinar el menor
    const limites = [limiteTerapeutico, limitePPM, limiteVisual];
    const limiteAceptacion = Math.min(...limites).toFixed(4);

    // Hora y fecha actual
    const fecha = new Date();
    const fechaActual = fecha.toLocaleString();

    // Generar PDF con resultados
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Cálculo de Límites de Limpieza y NOEL", 10, 10);
    doc.text(`Fecha y hora: ${fechaActual}`, 10, 20);

    doc.text("Cálculo de NOEL:", 10, 30);
    doc.text(`Fórmula: NOEL = (DL50 * Peso) / Factor de Seguridad`, 10, 40);
    doc.text(`DL50: ${dl50} mg/kg, Peso: ${peso} kg, Factor de Seguridad: ${factorSeguridadNOEL}`, 10, 50);
    doc.text(`NOEL: ${noel.toFixed(4)} mg`, 10, 60);

    doc.text("Cálculo de Límites de Limpieza:", 10, 80);
    doc.text(`Límite Terapéutico: ${limiteTerapeutico} mg`, 10, 90);
    doc.text(`Límite por 10 ppm: ${limitePPM} mg`, 10, 100);
    doc.text(`Límite Visual: ${limiteVisual} mg`, 10, 110);

    doc.text("Límite de Aceptación Final:", 10, 130);
    doc.text(`${limiteAceptacion} mg`, 10, 140);

    doc.save("calculo_limites.pdf");
}
