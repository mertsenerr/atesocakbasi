import React from 'react';
import '../style/StartersPage.css';

const StartersPage = () => {
  const starters = [
    { 
      name: "Karışık Meze Tabağı", 
      price: "₺95", 
      description: "Ev yapımı mezelerimizin özel karışımı. Haydari, közlenmiş patlıcan, atom, ezme salata ve daha fazlası.",
      category: "Soğuk Mezeler"
    },
    { 
      name: "Közlenmiş Patlıcan Salatası", 
      price: "₺45", 
      description: "Közde pişirilen patlıcan, özel soslarla hazırlanmış, taze otlar ve zeytinyağı ile.",
      category: "Soğuk Mezeler"
    },
    { 
      name: "Haydari", 
      price: "₺35", 
      description: "Sarımsaklı yoğurt, taze otlar ve özel baharatlarımızla hazırlanmış kremsi lezzet.",
      category: "Soğuk Mezeler"
    },
    { 
      name: "Atom", 
      price: "₺40", 
      description: "Közlenmiş kırmızı biber, ceviz, sarımsak ve baharatlarla hazırlanmış geleneksel meze.",
      category: "Soğuk Mezeler"
    },
    { 
      name: "Sigara Böreği", 
      price: "₺55", 
      description: "Peynirli, ince yufkadan hazırlanmış, çıtır çıtır kızarmış geleneksel börek.",
      category: "Sıcak Mezeler"
    },
    { 
      name: "Arnavut Ciğeri", 
      price: "₺65", 
      description: "Özel baharatlarla marine edilmiş, soğan ve sumak eşliğinde servis edilen ciğer.",
      category: "Sıcak Mezeler"
    },
    { 
      name: "Çiğ Köfte", 
      price: "₺40", 
      description: "Geleneksel tarifimizle, bulgur ve baharatlarla hazırlanmış, el yapımı çiğ köfte.",
      category: "Soğuk Mezeler"
    },
    { 
      name: "Kalamar Tava", 
      price: "₺70", 
      description: "Taze kalamar halkaları, özel unla kızartılmış, limon ve taratar sos eşliğinde.",
      category: "Sıcak Mezeler"
    },
    { 
      name: "Mantı", 
      price: "₺60", 
      description: "El açması hamur, kıymalı iç, yoğurt ve tereyağlı sos ile geleneksel mantı.",
      category: "Sıcak Mezeler"
    },
    { 
      name: "Falafel", 
      price: "₺50", 
      description: "Nohut ve baharatlarla hazırlanmış, tahini sos eşliğinde servis edilen falafel.",
      category: "Sıcak Mezeler"
    }
  ];

  const coldStarters = starters.filter(item => item.category === "Soğuk Mezeler");
  const hotStarters = starters.filter(item => item.category === "Sıcak Mezeler");

  return (
    <div className="starters-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Ara Sıcaklar</h1>
          <p className="page-subtitle">Yemeğinizden önce damak tadınızı açacak lezzetler</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="starters-section">
            <h2 className="category-title">Soğuk Mezeler</h2>
            <div className="menu-grid">
              {coldStarters.map((item, index) => (
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

          <div className="starters-section">
            <h2 className="category-title">Sıcak Mezeler</h2>
            <div className="menu-grid">
              {hotStarters.map((item, index) => (
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

export default StartersPage;