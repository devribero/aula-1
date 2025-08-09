import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import LogoutButton from './LogoutButton';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contato" className={styles.navLink}>Contato</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/login" className={styles.navLink}>Login</Link>
          </li>
          <li className={styles.navItem}>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;