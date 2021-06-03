export const planetChartData = {
  type: "polarArea",
  data: {
    labels: ["Friend Request", "Sisters", "Prodigy"],
    datasets: [
      {
        // one line graph
        label: "Total Sales",
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
