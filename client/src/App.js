import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Converter from './pages/Converter';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Meteo from './pages/Meteo';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/converter' element={<Converter />} />
                    <Route path='/meteo' element={<Meteo />} />
                    <Route path='/tasks' element={<Tasks />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
