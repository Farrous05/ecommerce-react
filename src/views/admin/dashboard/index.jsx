import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useState, useEffect } from 'react';
import { 
  ShoppingOutlined, 
  UserOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined,
  RiseOutlined,
  CalendarOutlined,
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
  LineChartOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  useDocumentTitle('Welcome | Admin Dashboard');
  useScrollTop();
  
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    bestSellingProducts: []
  });
  
  const [chartError, setChartError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { products } = useSelector(state => ({
    products: state.products.items || []
  }));
  
  useEffect(() => {
    try {
      // Simulated data - in a real app, this would come from an API
      const mockSalesData = {
        totalSales: 24689.75,
        totalOrders: 342,
        totalCustomers: 218,
        totalProducts: products.length || 45,
        recentOrders: [
          { id: 'ORD-5523', customer: 'John Doe', date: '2023-05-15', total: 129.99, status: 'Delivered' },
          { id: 'ORD-5522', customer: 'Jane Smith', date: '2023-05-14', total: 89.99, status: 'Processing' },
          { id: 'ORD-5521', customer: 'Robert Johnson', date: '2023-05-14', total: 199.50, status: 'Shipped' },
          { id: 'ORD-5520', customer: 'Emily Wilson', date: '2023-05-13', total: 65.25, status: 'Delivered' },
          { id: 'ORD-5519', customer: 'Michael Brown', date: '2023-05-12', total: 145.80, status: 'Delivered' }
        ],
        bestSellingProducts: [
          { id: 'P001', name: 'Ray-Ban Wayfarer', sales: 42, stock: 15 },
          { id: 'P002', name: 'Oakley Holbrook', sales: 38, stock: 22 },
          { id: 'P003', name: 'Persol 649 Series', sales: 30, stock: 8 },
          { id: 'P004', name: 'Gucci Square Frame', sales: 24, stock: 12 }
        ],
        monthlyRevenue: [18500, 19200, 21500, 22800, 24700, 23600, 25800, 26500, 27200, 28100, 29500, 31200]
      };
      
      setSalesData(mockSalesData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error setting sales data:', err);
      setError('Failed to load dashboard data');
      setIsLoading(false);
    }
  }, [products]);
  
  useEffect(() => {
    if (isLoading || chartError) return;

    let chartJsImportTimeout;
    
    const initializeCharts = async () => {
      try {
        // Only try to initialize charts if we're in a browser environment
        if (typeof window === 'undefined') return;
        
        // Set a timeout to prevent infinite loading if Chart.js import fails
        chartJsImportTimeout = setTimeout(() => {
          setChartError(true);
          console.error('Chart.js import timed out');
        }, 5000);
        
        // Dynamically import Chart.js to avoid server-side rendering issues
        const Chart = await import('chart.js/auto');
        
        // Clear the timeout since import succeeded
        clearTimeout(chartJsImportTimeout);
        
        // Create revenue chart
        const revenueCanvas = document.getElementById('revenueChart');
        
        if (revenueCanvas) {
          const revenueCtx = revenueCanvas.getContext('2d');
          
          const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          
          // Destroy existing chart if it exists
          if (window.revenueChart) {
            window.revenueChart.destroy();
          }
          
          window.revenueChart = new Chart.default(revenueCtx, {
            type: 'line',
            data: {
              labels: months,
              datasets: [{
                label: 'Monthly Revenue',
                data: salesData.monthlyRevenue || [],
                fill: true,
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderColor: 'rgba(0, 123, 255, 1)',
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
        }
        
        // Create product sales chart
        const salesCanvas = document.getElementById('salesChart');
        
        if (salesCanvas && salesData.bestSellingProducts) {
          const salesCtx = salesCanvas.getContext('2d');
          
          // Destroy existing chart if it exists
          if (window.salesChart) {
            window.salesChart.destroy();
          }
          
          window.salesChart = new Chart.default(salesCtx, {
            type: 'bar',
            data: {
              labels: salesData.bestSellingProducts.map(product => product.name),
              datasets: [{
                label: 'Units Sold',
                data: salesData.bestSellingProducts.map(product => product.sales),
                backgroundColor: 'rgba(40, 167, 69, 0.7)',
                borderRadius: 5
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
        }
      } catch (err) {
        console.error('Error initializing charts:', err);
        setChartError(true);
      } finally {
        // Always clear the timeout to prevent memory leaks
        clearTimeout(chartJsImportTimeout);
      }
    };
    
    // Initialize charts with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeCharts();
    }, 500);
    
    return () => {
      // Cleanup on component unmount
      clearTimeout(timer);
      clearTimeout(chartJsImportTimeout);
      
      if (window.revenueChart) {
        window.revenueChart.destroy();
      }
      if (window.salesChart) {
        window.salesChart.destroy();
      }
    };
  }, [salesData, chartError, isLoading]);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  // Display a loading state
  if (isLoading) {
    return (
      <div className="loading-state">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  // Display error state if there's a fatal error
  if (error) {
    return (
      <div className="error-state">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <button 
          className="button" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Dashboard Overview</h1>
        <div className="admin-dashboard-date">
          <CalendarOutlined /> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-icon sales-icon">
            <DollarOutlined />
          </div>
          <div className="admin-stat-card-content">
            <h3 className="admin-stat-card-title">Total Sales</h3>
            <p className="admin-stat-card-value">{formatCurrency(salesData.totalSales)}</p>
            <span className="admin-stat-card-change positive">
              <RiseOutlined /> +12.5% from last month
            </span>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-card-icon orders-icon">
            <ShoppingCartOutlined />
          </div>
          <div className="admin-stat-card-content">
            <h3 className="admin-stat-card-title">Total Orders</h3>
            <p className="admin-stat-card-value">{salesData.totalOrders}</p>
            <span className="admin-stat-card-change positive">
              <RiseOutlined /> +8.2% from last month
            </span>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-card-icon customers-icon">
            <UserOutlined />
          </div>
          <div className="admin-stat-card-content">
            <h3 className="admin-stat-card-title">Total Customers</h3>
            <p className="admin-stat-card-value">{salesData.totalCustomers}</p>
            <span className="admin-stat-card-change positive">
              <RiseOutlined /> +5.7% from last month
            </span>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-card-icon products-icon">
            <ShoppingOutlined />
          </div>
          <div className="admin-stat-card-content">
            <h3 className="admin-stat-card-title">Total Products</h3>
            <p className="admin-stat-card-value">{salesData.totalProducts}</p>
            <span className="admin-stat-card-change neutral">
              No change from last month
            </span>
          </div>
        </div>
      </div>
      
      <div className="admin-dashboard-row">
        <div className="admin-dashboard-chart-container revenue-chart">
          <div className="admin-dashboard-chart-header">
            <h2>Revenue Overview</h2>
            <div className="admin-dashboard-chart-actions">
              <select className="admin-select" defaultValue="year">
                <option value="year">This Year</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>
          <div className="admin-dashboard-chart-content">
            {chartError ? (
              <div className="chart-fallback">
                <LineChartOutlined style={{ fontSize: '4rem', opacity: 0.5 }} />
                <p>Chart visualization is currently unavailable.</p>
              </div>
            ) : (
              <canvas id="revenueChart" height="250"></canvas>
            )}
          </div>
        </div>
        
        <div className="admin-dashboard-chart-container sales-chart">
          <div className="admin-dashboard-chart-header">
            <h2>Best Selling Products</h2>
            <div className="admin-dashboard-chart-actions">
              <select className="admin-select" defaultValue="month">
                <option value="year">This Year</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>
          <div className="admin-dashboard-chart-content">
            {chartError ? (
              <div className="chart-fallback">
                <BarChartOutlined style={{ fontSize: '4rem', opacity: 0.5 }} />
                <p>Chart visualization is currently unavailable.</p>
              </div>
            ) : (
              <canvas id="salesChart" height="250"></canvas>
            )}
          </div>
        </div>
      </div>
      
      <div className="admin-dashboard-row">
        <div className="admin-dashboard-recent-orders">
          <div className="admin-dashboard-table-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="view-all-link">
              View All <EyeOutlined />
            </Link>
          </div>
          <div className="admin-dashboard-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesData.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td className="order-amount">{formatCurrency(order.total)}</td>
                    <td>
                      <span className={`order-status ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-button">
                        <EyeOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="admin-dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="admin-quick-actions-grid">
          <Link to="/admin/add" className="admin-quick-action">
            <div className="admin-quick-action-icon">
              <PlusOutlined />
            </div>
            <span>Add New Product</span>
          </Link>
          
          <Link to="/admin/products" className="admin-quick-action">
            <div className="admin-quick-action-icon">
              <EditOutlined />
            </div>
            <span>Manage Products</span>
          </Link>
          
          <Link to="/admin/users" className="admin-quick-action">
            <div className="admin-quick-action-icon">
              <UserOutlined />
            </div>
            <span>Manage Users</span>
          </Link>
          
          <Link to="/" className="admin-quick-action">
            <div className="admin-quick-action-icon">
              <ShoppingOutlined />
            </div>
            <span>View Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
