export const planetChartData = {
  type: "doughnut",
  data: {
    labels: ["Tagmoo3", "Point 90", "Cairo festival"],
    datasets: [
      {
        // one line graph
        label: "doughnut",
        backgroundColor: [
          "rgba(5, 169, 244 , .8)",
          "rgba(249, 86, 129, .8)",
          "rgba(159, 93, 176 , .8)"
        ],
        data: [100, 200, 140]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 0.92
  }
};

export default planetChartData;
