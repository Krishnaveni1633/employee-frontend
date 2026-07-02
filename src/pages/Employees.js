import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await API.get('/employees', {
        params: { search, department, page, limit: 10 }
      });
      setEmployees(response.data.employees);
      setTotal(response.data.total);
    } catch (error) {
      toast.error('Failed to fetch employees!');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await API.delete(`/employees/${id}`);
        toast.success('Employee deleted!');
        fetchEmployees();
      } catch (error) {
        toast.error('Failed to delete! Admin only.');
      }
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
          <button style={styles.navBtn} onClick={() => navigate('/add-employee')}>
            Add Employee
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
        <h2>All Employees ({total})</h2>

        <div style={styles.filters}>
          <input
            style={styles.searchInput}
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            style={styles.searchInput}
            placeholder="Filter by department..."
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button style={styles.searchBtn} onClick={fetchEmployees}>
            Search
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Position</th>
              <th style={styles.th}>Salary</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={styles.tableRow}>
                <td style={styles.td}>{emp.id}</td>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.email}</td>
                <td style={styles.td}>{emp.department}</td>
                <td style={styles.td}>{emp.position}</td>
                <td style={styles.td}>₹{emp.salary.toLocaleString()}</td>
                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => navigate(`/edit-employee/${emp.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={styles.pageInfo}>Page {page}</span>
          <button
            style={styles.pageBtn}
            onClick={() => setPage(p => p + 1)}
            disabled={employees.length < 10}
          >
            Next
          </button>
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
  content: { padding: '30px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '250px',
  },
  searchBtn: {
    padding: '10px 20px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  tableHeader: { backgroundColor: '#1a73e8' },
  th: {
    padding: '15px',
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: '12px 15px', color: '#333' },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  pageBtn: {
    padding: '8px 16px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pageInfo: { fontSize: '16px', color: '#333' },
};

export default Employees;