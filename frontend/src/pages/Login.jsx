import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Icons
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
);

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <LogoIcon />
                    </div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your account to continue</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            <AlertIcon />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email Address
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                disabled={loading}
                            />
                            <span className="form-input-icon">
                                <MailIcon />
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                disabled={loading}
                            />
                            <span className="form-input-icon">
                                <LockIcon />
                            </span>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        <span>
                            {loading && <div className="spinner"></div>}
                            {loading ? 'Signing in...' : 'Sign In'}
                        </span>
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Demo accounts: <strong>admin@example.com</strong> / admin123
                    </p>
                </div>
            </div>
        </div>
    );
}
