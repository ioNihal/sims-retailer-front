import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Account from './pages/Account';
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
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
