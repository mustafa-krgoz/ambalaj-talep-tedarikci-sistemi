import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../Navbar.module.css';
import { Menu, Close } from '@mui/icons-material';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            src="/icons/paketera.png" 
            alt="Paketera Logo" 
            width={140} 
            height={40} 
            className={styles.logo}
          />
        </Link>

        <div className={styles.navLinks}>
          <Link href="/how-it-works" className={styles.navLink}>Nasıl Çalışır?</Link>
          <Link href="/suppliers" className={styles.navLink}>Tedarikçiler</Link>
          <Link href="/products" className={styles.navLink}>Ürünler</Link>
          <Link href="/pricing" className={styles.navLink}>Fiyatlar</Link>
          <Link href="/contact" className={styles.navLink}>İletişim</Link>
        </div>

        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginButton}>Giriş Yap</Link>
          <Link href="/register" className={styles.registerButton}>Kayıt Ol</Link>
        </div>

        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileNavLinks}>
            <Link href="/how-it-works" className={styles.navLink} onClick={toggleMobileMenu}>Nasıl Çalışır?</Link>
            <Link href="/suppliers" className={styles.navLink} onClick={toggleMobileMenu}>Tedarikçiler</Link>
            <Link href="/products" className={styles.navLink} onClick={toggleMobileMenu}>Ürünler</Link>
            <Link href="/pricing" className={styles.navLink} onClick={toggleMobileMenu}>Fiyatlar</Link>
            <Link href="/contact" className={styles.navLink} onClick={toggleMobileMenu}>İletişim</Link>
          </div>
          <div className={styles.mobileAuthButtons}>
            <Link href="/login" className={styles.loginButton} onClick={toggleMobileMenu}>Giriş Yap</Link>
            <Link href="/register" className={styles.registerButton} onClick={toggleMobileMenu}>Kayıt Ol</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;