function generateCharts(data) {
    // Obtén un arreglo de edades desde los datos filtrados
    const ages = data.map((item) => parseInt(item.Edad));

    // Obtén un arreglo de perfiles desde los datos filtrados
    const profiles = data.map((item) => item.Perfil);

    // Obtén un arreglo de tolerancias al riesgo desde los datos filtrados
    const riskTolerances = data.map((item) => item.Riesgo);

    // Llama a las funciones para generar los gráficos
    generateAgeBarChart(ages);
    generateProfilePieChart(profiles);
    generateRiskTolerancePieChart(riskTolerances);
}

function generateAgeBarChart(ages) {
    const ctx = document.getElementById("ageChart").getContext("2d");
    const ageData = {
        labels: Array.from({ length: 73 }, (_, i) => i + 18), // Edades de 18 a 90
        datasets: [
            {
                label: "Distribución de Edad",
                data: calculateAgeDistribution(ages),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    new Chart(ctx, {
        type: "bar",
        data: ageData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function calculateAgeDistribution(ages) {
    // Calcula la distribución de edades
    const ageDistribution = Array(73).fill(0); // Inicializa un arreglo de 73 elementos con ceros
    ages.forEach((age) => {
        ageDistribution[age - 18]++;
    });
    return ageDistribution;
}

function generateProfilePieChart(profiles) {
    const ctx = document.getElementById("objectiveChart").getContext("2d");
    const profileData = getChartDataCount(profiles);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: profileData.labels,
            datasets: [
                {
                    data: profileData.dataCounts,
                    backgroundColor: ["#FF5733", "#33FFA1", "#3377FF", "#FF33DD", "#FFFF33"],
                },
            ],
        },
    });
}

function generateRiskTolerancePieChart(riskTolerances) {
    const ctx = document.getElementById("riskToleranceChart").getContext("2d");
    const riskToleranceData = getChartDataCount(riskTolerances);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: riskToleranceData.labels,
            datasets: [
                {
                    data: riskToleranceData.dataCounts,
                    backgroundColor: ["#FF5733", "#33FFA1", "#3377FF"],
                },
            ],
        },
    });
}

function getChartDataCount(data) {
    // Calcula la cantidad de cada tipo en un arreglo de datos
    const uniqueData = Array.from(new Set(data));
    const dataCounts = uniqueData.map((value) => {
        return data.filter((item) => item === value).length;
    });
    return { labels: uniqueData, dataCounts };
}
