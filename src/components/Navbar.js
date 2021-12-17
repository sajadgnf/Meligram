import React from 'react';

// styles
import styles from "./Navbar.module.css"

const Navbar = ({ logoutHandler }) => {
    return (
        <div className={styles.navbar}>
            <h3 className={styles.name}>Meligram</h3>

            <button className={styles.logoutBtn} onClick={logoutHandler}>Log out</button>
        </div>
    );
};

export default Navbar;