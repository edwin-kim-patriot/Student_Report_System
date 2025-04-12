// client/src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const App = () => (
  <AppProvider>
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </Router>
  </AppProvider>
);

export default App;
