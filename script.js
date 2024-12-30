function calcularLimites() {
    const dosisA = parseFloat(document.getElementById("dosisA").value);
    const factorSeguridad = parseFloat(document.getElementById("factorSeguridad").value);
    const unidadesB = parseFloat(document.getElementById("unidadesB").value);
    const tamanoLoteB = parseFloat(document.getElementById("tamanoLoteB").value);
    const areaEquipos = parseFloat(document.getElementById("areaEquipos").value);
    const areaMuestreo = parseFloat(document.getElementById("areaMuestreo").value);
    const noel = parseFloat(document.getElementById("noel").value);
    const pesoConsumido = parseFloat(document.getElementById("pesoConsumido").value);
    const r = parseFloat(document.getElementById("r").value);
    const pesoPromedio = 70; // Peso promedio estándar en kg

    if (!dosisA || !factorSeguridad || !unidadesB || !tamanoLoteB || !areaEquipos || !areaMuestreo || !noel || !pesoConsumido || !r) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Cálculo de Dosis Terapéutica
    const limiteTerapeutico = ((dosisA / factorSeguridad) * (unidadesB / tamanoLoteB) * (areaMuestreo / areaEquipos)).toFixed(4);

    // Cálculo de Dosis Tóxica
    const limiteToxico = ((noel * pesoPromedio / factorSeguridad) * (tamanoLoteB / pesoConsumido)).toFixed(4);

    // Cálculo de 10 ppm
    const limitePPM = (r * tamanoLoteB * (areaMuestreo / areaEquipos)).toFixed(4);

    // Comparación para determinar el menor
    const limites = [limiteTerapeutico, limiteToxico, limitePPM];
    const limiteAceptacion = Math.min(...limites).toFixed(4);

    // Hora y fecha actual
    const fecha = new Date();
    const fechaActual = fecha.toLocaleString();

    // Mostrar resultados
    const resultados = {
        "Límite de limpieza por Dosis Terapéutica": `${limiteTerapeutico} mg`,
        "Límite de limpieza por Dosis Tóxica": `${limiteToxico} mg`,
        "Límite de limpieza por 10 ppm": `${limitePPM} mg`,
        "Límite de aceptación final (valor menor)": `${limiteAceptacion} mg`,
        "Fecha y hora": fechaActual
    };

    guardarResultados(resultados);

    document.getElementById("resultados").innerHTML = `
        <h2>Resultados:</h2>
        <p><strong>Límite de limpieza por Dosis Terapéutica:</strong> ${limiteTerapeutico} mg</p>
        <p><strong>Límite de limpieza por Dosis Tóxica:</strong> ${limiteToxico} mg</p>
        <p><strong>Límite de limpieza por 10 ppm:</strong> ${limitePPM} mg</p>
        <h3>Límite de aceptación final (valor menor):</h3>
        <p><strong>${limiteAceptacion} mg</strong></p>
        <h3>Cálculos realizados el:</h3>
        <p class="timestamp">${fechaActual}</p>
    `;
}

function guardarResultados(resultados) {
    const blob = new Blob([JSON.stringify(resultados, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resultados.json";
    link.click();
}
