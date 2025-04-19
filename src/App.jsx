import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import OrderDetailPage from './pages/OrderDetailPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import RequireAuth from './components/RequireAuth';

import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }>
          <Route path="/home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />
          <Route path="invoices" element={<Orders activeTab="invoices" />} />
          <Route path="invoices/:invoiceId" element={<InvoiceDetailPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
