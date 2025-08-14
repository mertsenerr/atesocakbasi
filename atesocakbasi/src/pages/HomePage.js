import React, { useState, useEffect, useRef } from 'react';
import { Star, ChefHat, Wine, Utensils, ArrowRight, Clock, ChevronUp, ChevronDown, MapPin, Users, Award, Flame, Eye, Target, Heart } from 'lucide-react';
import TableStatusModal from '../components/TableStatusModal'; // DOĞRU IMPORT YOLU
import '../style/HomePage.css';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [activeRestaurant, setActiveRestaurant] = useState(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showTableStatusModal, setShowTableStatusModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Düşük threshold ile erken tetikleme
    const observerOptions = {
      threshold: 0.1, // %10 görünürlükte tetikle
      rootMargin: '0px 0px -50px 0px'
    };

    // Kartlar için observer - TEKRARLANABILIR ve REVERSE
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const cardIndex = Array.from(card.parentElement.children).indexOf(card);
        const isFromLeft = cardIndex % 2 === 0; // 0,2,4... soldan, 1,3,5... sağdan
        
        if (entry.isIntersecting) {
          // GÖRÜNÜME GİRİYOR - NORMAL ANİMASYON
          setTimeout(() => {
            // Çok uzak başlangıç pozisyonu
            card.style.transform = isFromLeft ? 'translateX(-800px)' : 'translateX(800px)';
            card.style.opacity = '0';
            
            // Animasyonlu giriş
            setTimeout(() => {
              card.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              card.style.transform = 'translateX(0)';
              card.style.opacity = '1';
            }, 100);
            
          }, cardIndex * 300); // Her kart 300ms aralıkla
          
        } else {
          // GÖRÜNÜMDEN ÇIKIYOR - REVERSE ANİMASYON
          setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            // Tersine gitsin - soldan gelen sağa, sağdan gelen sola
            card.style.transform = isFromLeft ? 'translateX(800px)' : 'translateX(-800px)';
            card.style.opacity = '0';
          }, cardIndex * 100);
        }
      });
    }, observerOptions);

    // Header için observer - TEKRARLANABILIR ve REVERSE
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const header = entry.target;
        
        // Header elementlerini bul
        const badge = header.querySelector('.section-badge');
        const title = header.querySelector('.restaurants-title');
        const subtitle = header.querySelector('.restaurants-subtitle');
        
        if (entry.isIntersecting) {
          // GÖRÜNÜME GİRİYOR - NORMAL ANİMASYON
          
          // Badge animasyonu - yukarıdan
          if (badge) {
            badge.style.transform = 'translateY(-200px)';
            badge.style.opacity = '0';
            setTimeout(() => {
              badge.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              badge.style.transform = 'translateY(0)';
              badge.style.opacity = '1';
            }, 200);
          }
          
          // Title animasyonu - aşağıdan
          if (title) {
            title.style.transform = 'translateY(150px)';
            title.style.opacity = '0';
            setTimeout(() => {
              title.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              title.style.transform = 'translateY(0)';
              title.style.opacity = '1';
            }, 400);
          }
          
          // Subtitle animasyonu - aşağıdan
          if (subtitle) {
            subtitle.style.transform = 'translateY(100px)';
            subtitle.style.opacity = '0';
            setTimeout(() => {
              subtitle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              subtitle.style.transform = 'translateY(0)';
              subtitle.style.opacity = '1';
            }, 600);
          }
          
        } else {
          // GÖRÜNÜMDEN ÇIKIYOR - REVERSE ANİMASYON
          
          // Badge reverse - aşağı
          if (badge) {
            badge.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            badge.style.transform = 'translateY(200px)';
            badge.style.opacity = '0';
          }
          
          // Title reverse - yukarı
          if (title) {
            title.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            title.style.transform = 'translateY(-150px)';
            title.style.opacity = '0';
          }
          
          // Subtitle reverse - yukarı
          if (subtitle) {
            subtitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            subtitle.style.transform = 'translateY(-100px)';
            subtitle.style.opacity = '0';
          }
        }
      });
      }, { 
      threshold: 0.1, // %10 görünürlükte tetikle
      rootMargin: '0px 0px -50px 0px'
    });

    // Elementleri gözlemle
    const cards = document.querySelectorAll('.restaurant-card');
    const header = document.querySelector('.restaurants-header');

    // Başlangıçta tüm kartlar görünür (güvenlik için)
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
      cardObserver.observe(card);
    });

    if (header) {
      headerObserver.observe(header);
    }

    // Cleanup
    return () => {
      cards.forEach(card => cardObserver.unobserve(card));
      if (header) headerObserver.unobserve(header);
    };
  }, []); 
  
  const popularItems = [
    {
      id: 1,
      icon: <ChefHat size={40} />,
      title: "Karışık Kebap",
      description: "Adana, urfa, şiş kebap ve köftemizin muhteşem karışımı. Özel soslarımız ve taze salata eşliğinde servis edilir.",
      rating: 4.8,
      totalRatings: 127,
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      reverse: false
    },
    {
      id: 2,
      icon: <Utensils size={40} />,
      title: "Meze Tabağı", 
      description: "Geleneksel Ege mezelerimizin özenle seçilmiş karışımı. Ev yapımı turşular, taze peynirler, közlenmiş sebzeler.",
      rating: 4.7,
      totalRatings: 89,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      reverse: true
    },
    {
      id: 3,
      icon: <Wine size={40} />,
      title: "Rakı Sofrası",
      description: "Özel rakı seçkimiz ve ona yakışan mezeler ile geleneksel Türk sofra kültürünün en güzel hali.",
      rating: 4.9,
      totalRatings: 156,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      reverse: false
    }
  ];
  
  // Yeni Data - Menu Categories
  const menuCategories = [
    {
      id: 1,
      icon: <Flame size={32} />,
      title: "Ocakbaşı Klasikleri",
      description: "Geleneksel lezzetlerimizin modern yorumu",
      items: [
        { name: "Adana Kebap", price: "185₺", desc: "Özel baharatlarla harmanlanmış dana eti" },
        { name: "Urfa Kebap", price: "175₺", desc: "Acısız, lezzetli dana eti kebabı" },
        { name: "Karışık Kebap", price: "220₺", desc: "Adana, urfa ve şiş kebabın muhteşem karışımı" },
        { name: "Kuzu Şiş", price: "195₺", desc: "Marine edilmiş kuzu eti şişi" }
      ],
      bgColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.3)",
      iconColor: "#ef4444"
    },
    {
      id: 2,
      icon: <Utensils size={32} />,
      title: "Ege Mezeleri",
      description: "Yöresel tatların özenle hazırlanan sunumu",
      items: [
        { name: "Meze Tabağı", price: "95₺", desc: "Seçme Ege mezelerinin karışımı" },
        { name: "Közlenmiş Patlıcan", price: "45₺", desc: "Közde pişirilen közlenmiş patlıcan" },
        { name: "Atom", price: "55₺", desc: "Geleneksel atom salatası" },
        { name: "Çoban Salata", price: "35₺", desc: "Taze sebzelerle hazırlanan salata" }
      ],
      bgColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "rgba(34, 197, 94, 0.3)",
      iconColor: "#22c55e"
    },
    {
      id: 3,
      icon: <Wine size={32} />,
      title: "İçecekler",
      description: "Özenle seçilmiş içecek koleksiyonumuz",
      items: [
        { name: "Rakı (70cl)", price: "350₺", desc: "Premium rakı seçenekleri" },
        { name: "Şarap (75cl)", price: "280₺", desc: "Yerel ve ithal şarap çeşitleri" },
        { name: "Taze Sıkılmış Meyve Suyu", price: "25₺", desc: "Günlük taze meyve suları" },
        { name: "Türk Kahvesi", price: "18₺", desc: "Geleneksel Türk kahvesi" }
      ],
      bgColor: "rgba(168, 85, 247, 0.1)",
      borderColor: "rgba(168, 85, 247, 0.3)",
      iconColor: "#a855f7"
    }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Alsancak Şubesi",
      address: "Konak, Cumhuriyet Blv. No:142, 35250 Konak/İzmir",
      phone: "+90 232 445 67 89",
      image: "img/alsancak.png",
      features: ["Açık Hava Terası", "Canlı Müzik", "Vale Hizmeti", "200 Kişi Kapasitesi"],
      openHours: "11:00 - 02:00",
      isMainBranch: true,
      // YENİ: Masa bilgileri
      tables: {
        total: 25,
        occupied: 18,
        reserved: 3,
        available: 4
      }
    },
    {
      id: 2,
      name: "Bayraklı Şubesi",
      address: "Alsancak, Kıbrıs Şehitleri Cd. No:58, 35220 Konak/İzmir",
      phone: "+90 232 456 78 90",
      image: "img/main1.png",
      features: ["Deniz Manzarası", "Özel Etkinlik Salonu", "Otopark", "150 Kişi Kapasitesi"],
      openHours: "12:00 - 01:00",
      isMainBranch: false,
      tables: {
        total: 20,
        occupied: 12,
        reserved: 5,
        available: 3
      }
    },
    {
      id: 3,
      name: "Gaziemir Şubesi",
      address: "Bornova, Kazım Dirik Cd. No:275, 35100 Bornova/İzmir",
      phone: "+90 232 567 89 01",
      image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Aile Dostu", "Çocuk Oyun Alanı", "Bahçe", "120 Kişi Kapasitesi"],
      openHours: "11:30 - 00:30",
      isMainBranch: false,
      tables: {
        total: 15,
        occupied: 8,
        reserved: 2,
        available: 5
      }
    },
    {
      id: 4,
      name: "Bostanlı Şubesi",
      address: "Bornova, Kazım Dirik Cd. No:275, 35100 Bornova/İzmir",
      phone: "+90 232 567 89 01",
      image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Aile Dostu", "Çocuk Oyun Alanı", "Bahçe", "120 Kişi Kapasitesi"],
      openHours: "11:30 - 00:30",
      isMainBranch: false,
      tables: {
        total: 18,
        occupied: 14,
        reserved: 1,
        available: 3
      }
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} size={16} fill="currentColor" className="star filled" />);
      } else if (i - 0.5 <= rating) {
        stars.push(
          <div key={i} className="star-half">
            <Star size={16} className="star empty" />
            <Star size={16} fill="currentColor" className="star half-fill" />
          </div>
        );
      } else {
        stars.push(<Star key={i} size={16} className="star empty" />);
      }
    }
    return <div className="stars">{stars}</div>;
  };

  const renderTableStatus = (tables) => {
    const tableItems = [];
    let tableNumber = 1;
    
    // Dolu masalar
    for (let i = 0; i < tables.occupied; i++) {
      tableItems.push(
        <div key={`occupied-${i}`} className="table-item occupied" data-table={`Masa ${tableNumber}`} data-status="Dolu">
          <div className="table-number">{tableNumber}</div>
          <div className="table-3d-view">
            <div className="chair-left">
              <div className="chair-back-left"></div>
              <div className="chair-seat-left"></div>
              <div className="chair-legs-left"></div>
            </div>
            
            <div className="table-3d">
              <div className="table-surface-3d"></div>
              <div className="table-leg-fl"></div>
              <div className="table-leg-fr"></div>
              <div className="table-leg-bl"></div>
              <div className="table-leg-br"></div>
            </div>
            
            <div className="chair-right">
              <div className="chair-back-right"></div>
              <div className="chair-seat-right"></div>
              <div className="chair-legs-right"></div>
            </div>
            
            <div className="person-indicator left-person"></div>
            <div className="person-indicator right-person"></div>
          </div>
        </div>
      );
      tableNumber++;
    }
    
    // Rezerveli masalar
    for (let i = 0; i < tables.reserved; i++) {
      tableItems.push(
        <div key={`reserved-${i}`} className="table-item reserved" data-table={`Masa ${tableNumber}`} data-status="Rezerveli">
          <div className="table-number">{tableNumber}</div>
          <div className="table-3d-view">
            <div className="chair-left">
              <div className="chair-back-left"></div>
              <div className="chair-seat-left"></div>
              <div className="chair-legs-left"></div>
            </div>
            
            <div className="table-3d">
              <div className="table-surface-3d">
                <div className="reserved-card">R</div>
              </div>
              <div className="table-leg-fl"></div>
              <div className="table-leg-fr"></div>
              <div className="table-leg-bl"></div>
              <div className="table-leg-br"></div>
            </div>
            
            <div className="chair-right">
              <div className="chair-back-right"></div>
              <div className="chair-seat-right"></div>
              <div className="chair-legs-right"></div>
            </div>
          </div>
        </div>
      );
      tableNumber++;
    }
    
    // Boş masalar
    for (let i = 0; i < tables.available; i++) {
      tableItems.push(
        <div key={`available-${i}`} className="table-item available" data-table={`Masa ${tableNumber}`} data-status="Müsait">
          <div className="table-number">{tableNumber}</div>
          <div className="table-3d-view">
            <div className="chair-left">
              <div className="chair-back-left"></div>
              <div className="chair-seat-left"></div>
              <div className="chair-legs-left"></div>
            </div>
            
            <div className="table-3d">
              <div className="table-surface-3d"></div>
              <div className="table-leg-fl"></div>
              <div className="table-leg-fr"></div>
              <div className="table-leg-bl"></div>
              <div className="table-leg-br"></div>
            </div>
            
            <div className="chair-right">
              <div className="chair-back-right"></div>
              <div className="chair-seat-right"></div>
              <div className="chair-legs-right"></div>
            </div>
          </div>
        </div>
      );
      tableNumber++;
    }
    
    return tableItems;
  };

  const handleReservationClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowTableStatusModal(true); 
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    // Rezervasyon verilerini işle
    console.log('Rezervasyon Bilgileri:', {
      restaurant: selectedRestaurant,
      ...reservationData
    });
    
    // Başarı mesajı göster
    alert(`${selectedRestaurant.name} için rezervasyonunuz alındı!`);
    
    // Modal'ı kapat ve verileri sıfırla
    setShowReservationModal(false);
    setReservationData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: 2,
      specialRequests: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="homepage modern-ui">
      {/* Hero Section - Modern Design */}
      <section className="hero-modern">
        <div className="hero-background-container">
           <video className="hero-background-video"
              autoPlay 
              loop 
              muted 
              playsInline
              preload="metadata"
              style={{ width:"100%", height:"100%" , objectFit:"cover"}}
            >
              <source src="videos/hero-video.MP4" type="video/mp4" />
              <p>Tarayıcınız video oynatmayı desteklemiyor.</p>
            </video>
          <div className="hero-overlay-modern"></div>
        </div>
        
        {/* YENİ: Bu wrapper div'i eklemen gerekiyor */}
        <div className="hero-main-content">
          <div className="hero-content-modern">
            <div className={`hero-text-container ${isVisible ? 'animate-in' : ''}`}>
              <h1 className="hero-title-modern">
                <span className="title-line">Zamandan</span>
                <span className="title-line">Bağımsız</span>
                <span className="title-line highlight">Lezzet</span>
                <span className="title-line">Hikayesi</span>
              </h1>
              
              <p className="hero-subtitle-modern">
                Ege'nin köklü lezzetlerini modern sunum teknikleriyle buluşturuyoruz. 
                Her lokmada tradition ve innovation'ın mükemmel uyumu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section-modern">
        <div className="container">
          <div className="menu-section-header">
            <img src="img/menubackground3.png" alt="" />
            <div className="menu-header">
                <p>Köklü Tatlar</p>
                <div className="menu-header-special-word">
                    <p>Modern Sunum</p>
                </div>
            </div>
          </div>
          {/* Enhanced Food Gallery Grid */}
          <div className="enhanced-food-grid">
            {/* Sol büyük hero - Et Ürünlerimiz */}
            <div className="hero-food-card">
              <div className="hero-food-container">
                <img src="img/menusection1.jpg" alt="Adana Kebap" />
                <div className="food-overlay">
                  <div className="food-content">
                    <h3>Et Ürünlerimiz</h3>
                    <p>Geleneksel Et Lezzetlerimiz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Üst küçük kartlar */}
            <div className="small-food-cards top-cards">
              <div className="small-food-card">
                <div className="small-food-container">
                  <img src="img/menusection4.png" alt="Rakı & Mezeler" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h4>Rakı Sofrası</h4>
                      <p>Çeşitli mezeler ile</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="small-food-card">
                <div className="small-food-container">
                  <img src="img/menusection2.png" alt="Meze Tabağı" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h4>Mezelerimiz</h4>
                      <p>Spesyellerle Birlikte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta kartlar */}
            <div className="medium-food-cards">
              <div className="medium-food-card">
                <div className="medium-food-container">
                  <img src="img/menusection7.png" alt="Urfa Kebap" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h4>Meyve Bahçesi</h4>
                      <p>Hakedilen Bir Kapanış</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="medium-food-card">
                <div className="medium-food-container">
                  <img src="img/menusection6.png" alt="Kuzu Şiş" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h4>Ara Sıcaklar</h4>
                      <p>Tadı Damağınızda Kalacak</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alt geniş kart */}
            <div className="wide-food-card">
              <div className="wide-food-container">
                <img src="img/menusection8.png" alt="Restaurant Atmosferi" />
                <div className="food-overlay">
                  <div className="food-content">
                    <h4>Tatlı Şöleni</h4>
                    <p>Ağzımız Tatlansın</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ dikey kartlar */}
            <div className="vertical-food-cards">
              <div className="vertical-food-card">
                <div className="vertical-food-container">
                  <img src="img/menusection10.png" alt="Baklava" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h4>Tavuk Ürünlerimiz</h4>
                      <p>Harlı Kömür Lezzetiyle</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="vertical-food-card">
                <div className="vertical-food-container">
                  <img src="img/menusection11.png" alt="Türk Kahvesi" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h4>Rezervasyon</h4>
                      <p>Eşsiz Lezzete Tanık Ol</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Küçük accent kartlar */}
            <div className="accent-food-cards">
              <div className="accent-food-card">
                <div className="accent-food-container">
                  <img src="img/menusection5.png" alt="Kokteyl" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h5>Kokteyller</h5>
                      <p>Özel karışımlar</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="accent-food-card">
                <div className="accent-food-container">
                  <img src="img/menusection9.png" alt="Şarap" />
                  <div className="food-overlay">
                    <div className="food-content">
                      <h5>Şarap Seçkisi</h5>
                      <p>Kaliteli şaraplar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Restaurants Section */}
      <section className="restaurants-section-modern">
        <div className="container">
          {/* Section Header */}
          <div className="restaurants-header">
            <div className="section-badge">
              Restorantlarımız
            </div>
            <h2 className="restaurants-title">
              İzmir'in Kalbi
            </h2>
            <p className="restaurants-subtitle">
              İzmir'in en güzel lokasyonlarında sizleri ağırlamaktan mutluluk duyuyoruz.
            </p>
          </div>

           {/* Restaurant Cards */}
          <div className="restaurants-grid">
            {restaurants.map((restaurant, index) => {
              const isLeftAligned = index % 2 === 0;
              const alignmentClass = isLeftAligned ? 'left-aligned' : 'right-aligned';
              
              return (
                <div 
                  key={restaurant.id} 
                  className={`restaurant-card ${alignmentClass}`}
                >
                  {/* Görsel Kısmı */}
                  <div className="restaurant-image">
                    <img src={restaurant.image} alt={restaurant.name} />
                  </div>

                  {/* İçerik Kısmı */}
                  <div className="restaurant-content">
                    <div className="content-top">
                      <h3 className="restaurant-name">{restaurant.name}</h3>
                      
                      <div className="restaurant-address">
                        <MapPin size={20} />
                        <p>{restaurant.address}</p>
                      </div>
                    </div>

                    <div className="content-middle">
                      <div className="restaurant-hours">
                        <Clock size={20} />
                        <span>{restaurant.openHours}</span>
                      </div>
                    </div>

                    <div className="restaurant-footer">
                      <a href={`tel:${restaurant.phone}`} className="restaurant-phone">
                        {restaurant.phone}
                      </a>
                      <button 
                        className="restaurants-reservation-btn"
                        onClick={() => handleReservationClick(restaurant)}
                      >
                        Rezervasyon
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {showTableStatusModal && selectedRestaurant && (
        <TableStatusModal 
          restaurant={selectedRestaurant}
          onClose={() => {
            setShowTableStatusModal(false);
            setSelectedRestaurant(null);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;