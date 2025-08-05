// src/components/layout/Footer.tsx
import '../../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© {new Date().getFullYear()} Paketera</p>
      </div>
      <div className="footer-right">
        <a href="/about" className="footer-link">Hakkımızda</a>
        <a href="/contact" className="footer-link">İletişim</a>
        <a href="/privacy" className="footer-link">Gizlilik</a>
      </div>
    </footer>
  );
}