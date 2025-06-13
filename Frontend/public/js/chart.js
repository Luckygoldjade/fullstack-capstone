// Chart.js donut chart
const ctx = document.getElementById("statusChart").getContext("2d");

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Applied', 'Interview', '2nd Interview', 'Offer', 'Rejected'],
    datasets: [{
      data: [10, 4, 2, 1, 6],
      backgroundColor: [
        '#c3ecfa',
        '#173f4f',
        '#97bbff',
        '#c3f0d7',
        '#f88b88'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '60%',
  }
});
