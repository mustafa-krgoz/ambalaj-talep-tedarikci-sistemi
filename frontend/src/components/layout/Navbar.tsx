import Link from 'next/link';
import Image from 'next/image';
import '../../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Image src="/icons/paketera.png" alt="Paketera" width={50} height={50} className="logo" />
      </div>

      <div className="navbar-center">
        <Link href="/" className="nav-link">Ana Sayfa</Link>
        <Link href="/about" className="nav-link">Hakkımızda</Link>
        <Link href="/products" className="nav-link">Ürünler</Link>
        <Link href="/suppliers" className="nav-link">Tedarikçiler</Link>
      </div>

      <div className="navbar-right">
        <button className="nav-button">Giriş Yap</button>
        <button className="nav-button">Kayıt Ol</button>
      </div>
    </nav>
  );
}