// PerformanceAnalytics.jsx
import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register the required components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceAnalytics = () => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Assignment Scores',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4'],
    datasets: [
      {
        label: 'Course Progress',
        data: [25, 50, 75, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="performance-analytics-container">
      <h3>Performance Analytics</h3>
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Assignment Scores Over Time</h5>
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Course Progress</h5>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Course Status</h5>
              <Doughnut data={doughnutChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
