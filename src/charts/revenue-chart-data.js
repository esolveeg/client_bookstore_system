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
      "August"
    ],
    datasets: [
      {
        // one line graph
        label: "Sales",
        backgroundColor: "rgba(249, 86, 129, .8)",
        data: [10, 20, 40, 69, 130, 50, 200, 400]
      },
      {
        // one line graph
        label: "Branch Name",
        backgroundColor: "rgba(5, 169, 244 , .8)",
        data: [120, 200, 300, 60, 90, 200, 190, 80]
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1
  }
};

export default planetChartData;
