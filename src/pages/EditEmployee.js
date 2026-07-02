import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: '',
  });

  // Load existing employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await API.get(`/employees/${id}`);
        setForm({
          name: response.data.name,
          email: response.data.email,
          department: response.data.department,
          position: response.data.position,
          salary: response.data.salary,
        });
      } catch (error) {
        toast.error('Failed to load employee!');
        navigate('/employees');
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/employees/${id}`, {
        ...form,
        salary: parseFloat(form.salary),
      });
      toast.success('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      toast.error('Failed! Manager or Admin only.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Employee Management System</h2>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
          <button style={styles.navBtn} onClick={() => navigate('/employees')}>
            Employees
          </button>
          <button style={styles.logoutBtn} onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Edit Employee #{id}</h2>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'department', 'position', 'salary'].map((field) => (
              <div key={field} style={styles.inputGroup}>
                <label style={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  style={styles.input}
                  type={field === 'salary' ? 'number' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}
            <div style={styles.buttons}>
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={() => navigate('/employees')}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Employee'}
              </button>
            </div>
          </form>
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
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '500px',
  },
  title: {
    textAlign: 'center',
    color: '#1a73e8',
    marginBottom: '30px',
  },
  inputGroup: { marginBottom: '20px' },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  submitBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default EditEmployee;