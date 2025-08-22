import React, { useState } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import '../style/Header.css';

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'starters', label: 'Ara Sıcaklar' },
    { id: 'mains', label: 'Ana Yemekler' },
    { id: 'drinks', label: 'Içecekler' },
    { id: 'desserts', label: 'Tatlılar' }
  ];

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    setIsMenuDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuDropdownOpen(false);
  };

  // Dropdown açılma/kapanma kontrolleri
  const handleDropdownEnter = () => {
    setIsMenuDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsMenuDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => handleMenuClick('home')}>
            <img 
              src="img/headerlogo.png" 
              alt="Ateş Ocakbaşı 1958" 
              className="logo-image"
            />
          </div>
    
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {/* Ana Sayfa */}
            <button
              onClick={() => handleMenuClick('home')}
              className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
            >
              <span>Ana Sayfa</span>
            </button>

            {/* Menüler Dropdown */}
            <div 
              className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="nav-item dropdown-trigger">
                <span>Menü</span>
                <ChevronDown size={10} className={`dropdown-arrow ${isMenuDropdownOpen ? 'open' : ''}`} />
              </button>
              
              <div 
                className={`dropdown-menu ${isMenuDropdownOpen ? 'open' : ''}`}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="dropdown-content">
                  <div className="dropdown-section">
                    <ul>
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleMenuClick(item.id);
                            }}
                            className={`dropdown-item ${activeSection === item.id ? 'active' : ''}`}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Restorantlar */}
            <button 
              className="nav-item"
              onClick={() => handleMenuClick('popular')}
            >
              <span>Restorantlar</span>
            </button>
          </nav>

          <button 
            className="nav-item reservation-btn"
            onClick={() => handleMenuClick('reservation')}
          >
            <span>Rezervasyon</span>
          </button>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {/* Ana Sayfa */}
            <button
              onClick={() => handleMenuClick('home')}
              className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
            >
              <span>Ana Sayfa</span>
            </button>

            {/* Menüler Section */}
            <div className="mobile-menu-section">
              <div className="mobile-section-title">
                <span>Menüler</span>
              </div>
              <div className="mobile-submenu">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`mobile-nav-item submenu-item ${activeSection === item.id ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popüler Yemekler */}
            <button 
              className="mobile-nav-item"
              onClick={() => handleMenuClick('popular')}
            >
              <span>Popüler Yemekler</span>
            </button>
            
            <button 
              className="mobile-nav-item reservation-btn"
              onClick={() => handleMenuClick('reservation')}
            >
              <span>Rezervasyon</span>
            </button>

            {/* Mobile Contact */}
            <div className="mobile-contact">
              <Phone size={14} />
              <span>0232 422 1080</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;