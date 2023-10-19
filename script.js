const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const closeBtn = document.getElementById("close");
const messageBox = document.getElementById("win-message");

const names = ["Ibrahim", "Rifat", "Teebro", "Jisab", "Jasim"];
const rotationValues = [
  { minDegree: 0, maxDegree: 23, value: "Rifat" },
  { minDegree: 24, maxDegree: 95, value: "Ibrahim" },
  { minDegree: 96, maxDegree: 167, value: "Jasim" },
  { minDegree: 168, maxDegree: 239, value: "Jisab" },
  { minDegree: 240, maxDegree: 311, value: "Teebro" },
  { minDegree: 312, maxDegree: 360, value: "Rifat" },
];
const data = [20, 20, 20, 20, 20];
var pieColors = ["#4BC421", "#FF9400", "#F22828", "#C12EEE", "#2D96FF"];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: names,
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  console.log(" Final Value : ", angleValue);
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>"${i.value}" is Winner!</p>`;
      messageBox.style.visibility = "visible";
      spinBtn.disabled = false;
      break;
    }
  }
};

let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  console.log("Rotation value : ", myChart.options.rotation);
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  console.log("Random Degree : ", randomDegree);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

closeBtn.addEventListener("click", () => {
  messageBox.style.visibility = "hidden";
});
