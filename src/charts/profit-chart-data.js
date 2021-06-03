export const planetChartData = {
  type: "bar",
  data: {
    labels: [
      "Junuary",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Septemeber",
      "October",
      "november",
      "december"
    ],
    datasets: [
      {
        // one line graph
        label: "Total Profit",
        backgroundColor: "rgb(32, 150, 243 , .8)",
        data: [120, 200, 300, 60, 90, 200, 190, 80, 90, 70, 80, 70],
        maxBarThickness: 0
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    xAxes: [
      {
        bmaxBarThickness: 100
      }
    ]
  }
};
export default planetChartData;
