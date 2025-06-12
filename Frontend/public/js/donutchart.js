document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("statusChart");
  
  if (!canvas) {
    console.error("Canvas element with ID 'statusChart' not found.");
    return;
  }

  const ctx = canvas.getContext("2d");

  const statuses = ['Applied', 'Interview', '2nd Interview', 'Offer', 'Rejected'];
  const statusData = statuses.map((status) => 
          window.statusCounts[status] ?? 0 )
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: statuses,
      datasets: [{
        data: statusData,
        backgroundColor: [
          '#c3ecfa',        // Applied
          '#173f4f',        // Interview
          '#97bbff',        // 2nd Interview
          '#c3f0d7',        // Offer
          '#f88b88'         // Rejected
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      cutout: '60%' // Donut style
    }
  });
});

