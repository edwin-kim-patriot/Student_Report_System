// client/src/components/PerformanceChart/PerformanceChart.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './PerformanceChart.css';

const PerformanceChart = ({ reports }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (reports.length === 0) return;

    const performanceCounts = {
      'EXCEEDING EXPECTATION': 0,
      'MEETING EXPECTATION': 0,
      'APPROACHING EXPECTATION': 0,
      'BELOW EXPECTATION': 0
    };

    reports.forEach(report => {
      performanceCounts[report.performance]++;
    });

    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(performanceCounts),
        datasets: [{
          data: Object.values(performanceCounts),
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#f39c12',
            '#e74c3c'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Student Performance Distribution',
            font: {
              size: 16
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reports]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PerformanceChart;