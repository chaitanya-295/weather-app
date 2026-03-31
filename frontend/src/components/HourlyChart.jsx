const isDark = document.documentElement.classList.contains("dark");

const options = {
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      ticks: {
        color: isDark ? "#e5e7eb" : "#374151"
      }
    },
    y: {
      ticks: {
        color: isDark ? "#e5e7eb" : "#374151"
      }
    }
  }
};