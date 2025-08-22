import React from 'react';
import '../style/MainsPage.css';

const MainsPage = () => {
  const mains = [
    { 
      name: "Karışık Kebap", 
      price: "₺185", 
      description: "Adana, urfa, şiş kebap ve köfte karışımı. Pirinç pilav, közlenmiş domates ve biber eşliğinde.",
      category: "Kebaplar",
      popular: true
    },
    { 
      name: "Adana Kebap", 
      price: "₺145", 
      description: "Acılı kıyma kebabı, közde pişirilmiş. Lavash ekmeği ve özel soslarımız ile.",
      category: "Kebaplar"
    },
    { 
      name: "Urfa Kebap", 
      price: "₺145", 
      description: "Acısız kıyma kebabı, özel baharatlarla marine edilmiş. Geleneksel lezzet.",
      category: "Kebaplar"
    },
    { 
      name: "Kuzu Şiş", 
      price: "₺165", 
      description: "Marine edilmiş kuzu eti parçaları, közde mükemmel pişirilmiş.",
      category: "Kebaplar"
    },
    { 
      name: "Tavuk Şiş", 
      price: "₺125", 
      description: "Özel marine tavuk göğsü, sebzeler eşliğinde ızgarada pişirilmiş.",
      category: "Kebaplar"
    },
    { 
      name: "Köfte", 
      price: "₺135", 
      description: "Ev yapımı köfte, geleneksel tarifimizle hazırlanmış, lezzet garantili.",
      category: "Kebaplar"
    },
    { 
      name: "Kuzu Pirzola", 
      price: "₺195", 
      description: "Taze kuzu pirzolası, ızgarada mükemmel pişirilmiş, aromatik otlarla.",
      category: "Et Yemekleri",
      popular: true
    },
    { 
      name: "Dana Bonfile", 
      price: "₺220", 
      description: "Premium dana bonfile, özel soslarımız ve garnitürlerle servis edilir.",
      category: "Et Yemekleri"
    },
    { 
      name: "Kuzu Külbastı", 
      price: "₺180", 
      description: "İnce dilimlenmiş kuzu eti, ızgarada çabuk pişirilmiş, çok lezzetli.",
      category: "Et Yemekleri"
    },
    { 
      name: "Balık Izgara", 
      price: "₺155", 
      description: "Günün taze balığı, mevsim salatası ve limon ile servis edilir.",
      category: "Balık"
    },
    { 
      name: "Levrek Buğulama", 
      price: "₺175", 
      description: "Taze levrek, sebzelerle buğulanmış, zeytinyağlı sos eşliğinde.",
      category: "Balık"
    },
    { 
      name: "Somon Izgara", 
      price: "₺190", 
      description: "Norveç somonundan, özel baharatlarla marine edilmiş.",
      category: "Balık"
    }
  ];

  const kebabs = mains.filter(item => item.category === "Kebaplar");
  const meats = mains.filter(item => item.category === "Et Yemekleri");
  const fish = mains.filter(item => item.category === "Balık");

  return (
    <div className="mains-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Ana Yemekler</h1>
          <p className="page-subtitle">Ocakbaşımızdan çıkan enfes lezzetler</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="mains-section">
            <h2 className="category-title">Kebaplar</h2>
            <div className="menu-grid">
              {kebabs.map((item, index) => (
                <div key={index} className={`menu-item ${item.popular ? 'popular' : ''}`}>
                  {item.popular && <div className="popular-badge">Çok Tercih Edilen</div>}
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mains-section">
            <h2 className="category-title">Et Yemekleri</h2>
            <div className="menu-grid">
              {meats.map((item, index) => (
                <div key={index} className={`menu-item ${item.popular ? 'popular' : ''}`}>
                  {item.popular && <div className="popular-badge">Çok Tercih Edilen</div>}
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mains-section">
            <h2 className="category-title">Balık</h2>
            <div className="menu-grid">
              {fish.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainsPage;