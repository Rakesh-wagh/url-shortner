import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import UrlList from './pages/URLList/UrlList';
import ShortenUrl from './pages/ShortenUrl/ShortenUrl';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/urls" element={
          <ProtectedRoute>
            <UrlList />
          </ProtectedRoute>
        } />
        <Route path="/shorten-url" element={
          <ProtectedRoute>
            <ShortenUrl />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
