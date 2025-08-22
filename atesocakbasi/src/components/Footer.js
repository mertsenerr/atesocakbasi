import React from 'react';
import { Phone, MapPin, Instagram, Clock } from 'lucide-react';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="img/headerlogo.png" 
                alt="Ateş Ocakbaşı 1958" 
                className="footer-logo-image"
              />
            </div>
            <p className="footer-motto">Ege'nin kalbinde, ocakbaşı lezzetleriyle...</p>
          </div>

          <div className="footer-section">
            <h3>İletişim</h3>
            <div className="contact-item">
              <Phone size={18} />
              <span>0232 422 1080</span>
            </div>
            <div className="contact-item">
              <Instagram size={18} />
              <span>@atesocakbasi</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>Lokasyonlar</h3>
            <div className="location-item">
              <MapPin size={16} />
              <span>Alsancak</span>
            </div>
            <div className="location-item">
              <MapPin size={16} />
              <span>Hipodrom</span>
            </div>
            <div className="location-item">
              <MapPin size={16} />
              <span>Bayraklı</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>Çalışma Saatleri</h3>
            <div className="hours-item">
              <Clock size={16} />
              <span>Her gün: 11:00 - 24:00</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Ateş Ocakbaşı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;