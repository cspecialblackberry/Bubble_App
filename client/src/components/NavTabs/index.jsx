import { Link, useLocation } from 'react-router-dom';

function NavTabs() {
    const currentPage = useLocation().pathname;

    return (
        <ul className="nav-tabs">
            <li className="nav-item">
                <Link
                    to="/"
                    className={currentPage === '/' ? 'nav-link-active' : 'nav-link'}
                >
                    Home/Feed
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/profile"
                    className={currentPage === '/profile' ? 'nav-link-active' : 'nav-link'}
                >
                    Profile
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
            <li className="nav-item">
                <Link
                    to="/friends"
                    className={currentPage === '/friends' ? 'nav-link-active' : 'nav-link'}
                >
                    Friends
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/grouplist"
                    className={currentPage === '/grouplist' ? 'nav-link-active' : 'nav-link'}
                >
                    Groups
                </Link>
            </li>
        </ul>
    );
}

export default NavTabs;
