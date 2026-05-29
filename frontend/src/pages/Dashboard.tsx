import { useState, useEffect } from 'react';
import { Alert } from '../types';

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Security Dashboard</h1>
      <div className="grid">
        <div className="card">
          <h3>Total Alerts</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{alerts.length}</div>
        </div>
        <div className="card">
          <h3>Active Threats</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f85149' }}>
            {alerts.filter(a => a.severity === 'High').length}
          </div>
        </div>
        <div className="card">
          <h3>System Status</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#238636' }}>HEALTHY</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Security Events</h3>
        {loading ? (
          <p>Loading alerts...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Source IP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id}>
                  <td>{new Date(alert.timestamp).toLocaleTimeString()}</td>
                  <td>{alert.type}</td>
                  <td className={`severity-${alert.severity.toLowerCase()}`}>{alert.severity}</td>
                  <td>{alert.source}</td>
                  <td>{alert.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
