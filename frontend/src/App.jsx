import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Protected Route Component
function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }}></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Public Route - redirect to dashboard if already logged in
function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }}></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
