
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
            (!ageFilter || item.Edad == ageFilter) && // Filtrar por edad
            (!objectiveFilter || item.Perfil === objectiveFilter) && // Filtrar por perfil
            (!riskToleranceFilter || item.Riesgo === riskToleranceFilter) // Filtrar por riesgo
        );
    });

    // Limita los resultados a 20 datos
    filteredData = filteredData.slice(0, 20);

    // Actualiza la tabla y los gráficos con los datos filtrados
    displayTable(filteredData);
    generateCharts(filteredData);
}


// Función para cargar y procesar datos desde el archivo Excel
function loadDataFromExcel() {
    // Nombre del archivo Excel
    const fileName = "data.xlsx";

    // Carga el archivo Excel utilizando SheetJS
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Procesa los datos
        const sheetName = workbook.SheetNames[0]; // Supongamos que los datos están en la primera hoja
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Llama a la función de filtrado y generación de gráficos
        applyFiltersAndGenerateCharts(jsonData);
    };

    const req = new XMLHttpRequest();
    req.open("GET", fileName, true);
    req.responseType = "blob";
    req.onload = function () {
        reader.readAsBinaryString(req.response);
    };
    req.send();
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
            (!objectiveFilter || item["Objetivos de Inversión"] === objectiveFilter) && // Filtrar por perfil
            (!riskToleranceFilter || item["Tolerancia al Riesgo"] === riskToleranceFilter) // Filtrar por riesgo
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
    // Implementa la generación de gráficos aquí utilizando Chart.js
    // Por ejemplo, un gráfico de barras para la edad y gráfico de pastel para perfil y riesgo.
}

// Carga los datos al inicio
window.onload = loadDataFromCSV;
