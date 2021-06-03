export const planetChartData = {
  type: "line",
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
        backgroundColor: "rgb(56, 84, 165, .8)",
        data: [120, 200, 300, 60, 90, 200, 190, 80, 90, 70, 80, 70]
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1
  }
};

export default planetChartData;
