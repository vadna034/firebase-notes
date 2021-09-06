import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import 'spectre.css';

import { AuthContext } from '../context/AuthContext';

function NavBar(props) {
  const { user } = useContext(AuthContext);
  // 700 pixels should be minimum width.

  return (
    <div className="nav-main">
      <header id="nav-lg" className="navbar">
        <section className="navbar-section">
          {user ? (
            <div>
              <div className="btn btn-link">
                <NavLink to="/Notes">My Collection</NavLink>
              </div>
              <div className="btn btn-link">
                <NavLink to="/Profile">Profile</NavLink>
              </div>
            </div>
          ) : null}
        </section>
        <section className="navbar-center">
          <h2>Easy Notes</h2>
        </section>
        <section className="navbar-section">
          <div className="btn btn-link"></div>
        </section>
      </header>
    </div>
  );
}
export default NavBar;
