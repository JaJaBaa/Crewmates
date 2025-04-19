import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/" className="logo">
            Crewmates
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/create">Create New</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Crewmates &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Layout;
