
// Función para cargar y procesar datos desde el archivo CSV
function loadDataFromCSV() {
    // Nombre del archivo CSV
    const fileName = "data.csv";

    Papa.parse(fileName, {
        header: true, // Indica que la primera fila contiene encabezados
        download: true, // Descarga el archivo CSV
        dynamicTyping: true, // Convierte automáticamente los valores a tipos de datos apropiados

        complete: function (results) {
            const jsonData = results.data;

            // Llama a la función de filtrado y generación de gráficos
            applyFiltersAndGenerateCharts(jsonData);
        },
    });
}


// Función para aplicar filtros y generar gráficos
function applyFiltersAndGenerateCharts(data) {
    // Obtén los valores seleccionados en los filtros
    const ageFilter = document.getElementById("ageFilter").value;
    const objectiveFilter = document.getElementById("objectiveFilter").value;
    const riskToleranceFilter = document.getElementById("riskToleranceFilter").value;

    // Aplica los filtros
    let filteredData = data.filter((item) => {
        return (
            (!ageFilter || item.Edad === ageFilter) && // Filtrar por edad
            (!objectiveFilter || item.Perfil === objectiveFilter) && // Filtrar por perfil
            (!riskToleranceFilter || item.Riesgo === riskToleranceFilter) // Filtrar por riesgo
        );
    });

    // Actualiza la tabla y los gráficos con los datos filtrados
    displayTable(filteredData);
    generateCharts(filteredData);
}

// Función para mostrar datos en la tabla
function displayTable(data) {
    const table = document.getElementById("data-table");
    table.innerHTML = ""; // Limpia la tabla

    data.forEach((item) => {
        const row = table.insertRow();
        for (let key in item) {
            const cell = row.insertCell();
            cell.innerHTML = item[key];
        }
    });
}

// Función para generar gráficos
function generateCharts(data) {
    generateCharts(data);
    generateAgeBarChart(ages);
    calculateAgeDistribution(ages);
    generateProfilePieChart(profiles);
    getChartDataCount(data)
    generateRiskTolerancePieChart(riskTolerances)

}

// Carga los datos al inicio
window.onload = loadDataFromCSV;
