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
          {user ? (
            <div>
              <div class="btn btn-link">
                <NavLink to="/Notes" activeClassName="active">
                  My Collection
                </NavLink>
              </div>
              <div class="btn btn-link">
                <NavLink to="/Auth" activeClassName="active">
                  Profile
                </NavLink>
              </div>
            </div>
          ) : null}
        </section>
        <section class="navbar-center">
          <h2>Easy Notes</h2>
        </section>
        <section class="navbar-section">
          <div class="btn btn-link"></div>
        </section>
      </header>
    </div>
  );
}
export default NavBar;
