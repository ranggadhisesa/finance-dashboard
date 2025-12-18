import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Icons
const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);

const DollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const TrendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
);

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-brand">
                        <div className="header-logo">
                            <LogoIcon />
                        </div>
                        <h1 className="header-title">Finance Dashboard</h1>
                    </div>

                    <div className="header-user">
                        <div className="user-info">
                            <div className="user-name">{user?.name || 'User'}</div>
                            <div className="user-role">{user?.role || 'Guest'}</div>
                        </div>
                        <div className="user-avatar">
                            {getInitials(user?.name)}
                        </div>
                        <button className="btn-logout" onClick={handleLogout}>
                            <LogoutIcon />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Welcome Section */}
                <section className="welcome-section">
                    <div className="welcome-content">
                        <h2 className="welcome-title">
                            {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
                        </h2>
                        <p className="welcome-subtitle">
                            Welcome to your finance dashboard. Here's what's happening today.
                        </p>
                    </div>
                </section>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon blue">
                                <UsersIcon />
                            </div>
                        </div>
                        <div className="stat-value">2,845</div>
                        <div className="stat-label">Total Users</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon green">
                                <DollarIcon />
                            </div>
                        </div>
                        <div className="stat-value">$48,290</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon yellow">
                                <ChartIcon />
                            </div>
                        </div>
                        <div className="stat-value">12.5%</div>
                        <div className="stat-label">Growth Rate</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon purple">
                                <ActivityIcon />
                            </div>
                        </div>
                        <div className="stat-value">1,423</div>
                        <div className="stat-label">Active Sessions</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <section className="quick-actions">
                    <h3 className="section-title">
                        <TrendIcon />
                        Quick Actions
                    </h3>
                    <div className="actions-grid">
                        <button className="action-btn">
                            <FileIcon />
                            <span>Reports</span>
                        </button>
                        <button className="action-btn">
                            <CalendarIcon />
                            <span>Schedule</span>
                        </button>
                        <button className="action-btn">
                            <BellIcon />
                            <span>Notifications</span>
                        </button>
                        <button className="action-btn">
                            <SettingsIcon />
                            <span>Settings</span>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
