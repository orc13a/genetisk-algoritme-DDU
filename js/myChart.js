let ChartLabels = [];

function genChartLabels() {
    for (let g = 1; g <= generations; g++) {
        ChartLabels.push(`Gen ${g}`);
    }
}

genChartLabels();

const ChartData = {
    labels: ChartLabels,
    datasets: [{
        label: 'Bedste taske værdi',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
    }]
};

ChartData.datasets[0].data = gensBests;

const ChartConfig = {
    type: 'line',
    data: ChartData,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    ChartConfig
);