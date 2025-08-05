import styles from '../../Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {/* Logo ve Açıklama */}
          <div>
            <div className={styles.logoContainer}>
              <Image 
                src="/icons/paketera-white.png" 
                alt="Paketera Logo" 
                width={160} 
                height={40} 
                className={styles.logo}
              />
            </div>
            <p className={styles.description}>
              Paketera, ambalaj ihtiyaçlarınız için tedarikçi bulma platformudur.
            </p>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Paketera. Tüm hakları saklıdır.
            </p>
          </div>

          {/* Şirket */}
          <div>
            <h3 className={styles.sectionTitle}>Şirket</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/about" className={styles.link}>Hakkımızda</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/careers" className={styles.link}>Kariyer</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/blog" className={styles.link}>Blog</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/press" className={styles.link}>Basın</Link>
              </li>
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h3 className={styles.sectionTitle}>Kaynaklar</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/how-it-works" className={styles.link}>Nasıl Çalışır?</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/faq" className={styles.link}>SSS</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact" className={styles.link}>İletişim</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/support" className={styles.link}>Destek</Link>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className={styles.sectionTitle}>Bizi Takip Edin</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <Image src="/icons/facebook.svg" alt="Facebook" width={16} height={16} />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Image src="/icons/twitter.svg" alt="Twitter" width={16} height={16} />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={16} height={16} />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} />
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottomBar}>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Gizlilik Politikası</Link>
            <Link href="/terms" className={styles.legalLink}>Kullanım Koşulları</Link>
            <Link href="/cookies" className={styles.legalLink}>Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;