import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get('/me');
        setUser(response.data);
      } catch (error) {
        navigate('/');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Employee Management System</h2>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate('/employees')}>
            Employees
          </button>
          <button style={styles.navBtn} onClick={() => navigate('/add-employee')}>
            Add Employee
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {user && (
          <div style={styles.welcomeCard}>
            <h2>Welcome, {user.name}! 👋</h2>
            <p>Role: <strong>{user.role.toUpperCase()}</strong></p>
            <p>Email: {user.email}</p>
          </div>
        )}

        <div style={styles.cards}>
          <div style={styles.card} onClick={() => navigate('/employees')}>
            <h3>👥 View Employees</h3>
            <p>See all employees in the system</p>
          </div>
          <div style={styles.card} onClick={() => navigate('/add-employee')}>
            <h3>➕ Add Employee</h3>
            <p>Add a new employee to the system</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  navbar: {
    backgroundColor: '#1a73e8',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: 'white', margin: 0 },
  navLinks: { display: 'flex', gap: '10px' },
  navBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  content: { padding: '30px' },
  welcomeCard: {
    backgroundColor: 'white',
    padding: '20px 30px',
    borderRadius: '10px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cards: { display: 'flex', gap: '20px' },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    flex: 1,
    transition: 'transform 0.2s',
  },
};

export default Dashboard;