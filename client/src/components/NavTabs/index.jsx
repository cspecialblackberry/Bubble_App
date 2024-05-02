import { Link, useLocation } from 'react-router-dom';

function NavTabs() {
    const currentPage = useLocation().pathname;

    return (
        <ul className="nav-tabs">
            <li className="home-icon">
                <Link
                    to="/"
                    className={currentPage === '/' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="bubbles-icon.svg" alt="Home Page" />
                </Link>
            </li>
            <li className="profile-icon">
                <Link
                    to="/profile"
                    className={currentPage === '/profile' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="profile-icon.svg" alt="My Profile" />
                </Link>
            </li>
            <li className="new-post-icon">
                <Link
                    to="/newpost"
                    className={currentPage === '/newpost' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="bubble-wand-icon.svg" alt="Create New Post" />
                </Link>
            </li>
            <li className="friends-icon">
                <Link
                    to="/friends"
                    className={currentPage === '/friends' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="friends-icon.svg" alt="My Friends" />
                </Link>
            </li>
            <li className="login-icon">
                <Link
                    to="/login"
                    className={currentPage === '/login' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="login-icon.svg" alt="Login" />
                </Link>
            </li>
        </ul>
    );
}

export default NavTabs;
