import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lineData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Darta',
        data: [10000, 20000, 15000, 17000, 22000, 25000, 30000, 32000, 31000, 27000, 24000, 20000],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4
      },
      {
        label: 'Chalani',
        data: [20000, 15000, 17000, 19000, 24000, 28000, 31000, 33000, 32000, 29000, 26000, 23000],
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220,53,69,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  const barData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Data One',
        data: [40, 20, 10, 40, 40, 10, 30, 70, 50, 20, 10, 10],
        backgroundColor: 'rgba(220,53,69,0.6)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    }
  };
  

  return (
    <div className="d-flex">
      <Sidebar />
      

      <div style={{ marginLeft: '270px', width: '100%',padding: '20px' }}>
        <h1 className="my-3">Dashboard</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Rastriya Banijya Bank Data Type Chart 1</h5>
            <div className="row">
              <div className={isMobile ? 'col-12 mb-4' : 'col-md-6'}>
                <div style={{ height: '300px' }}>
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
              <div className={isMobile ? 'col-12' : 'col-md-6'}>
                <div style={{ height: '300px' }}>
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Chalani Details */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Chalani Details</h5>
            <ul>
              <li>Total Chalani Count: 36,000</li>
              <li>Peak Month: August (33,000)</li>
              <li>Lowest Month: February (15,000)</li>
              <li>Average Monthly Chalani: ~25,000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
