import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import 'spectre.css';

import { AuthContext } from '../context/AuthContext';

function NavBar(props) {
  const { user, setUser } = useContext(AuthContext);
  // 700 pixels should be minimum width.

  return (
    <div class="nav-main">
      <header id="nav-lg" class="navbar">
        <section class="navbar-section">
          <div class="btn btn-link">
            {user ? (
              <NavLink to="/Notes" activeClassName="active">
                Notes
              </NavLink>
            ) : null}
          </div>
        </section>
        <section class="navbar-center">
          <h2>Notes</h2>
        </section>
        <section class="navbar-section">
          <div class="btn btn-link">
            {user ? (
              <NavLink to="/Auth" activeClassName="active">
                Profile
              </NavLink>
            ) : null}
          </div>
        </section>
      </header>
    </div>
  );
}
export default NavBar;
