// client/src/App.jsx (Enhanced)
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;