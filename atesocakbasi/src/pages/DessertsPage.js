import React from 'react';
import '../style/DessertsPage.css';

const DessertsPage = () => {
  const desserts = [
    { 
      name: "Baklava", 
      price: "₺55", 
      description: "Antep fıstıklı, el açması baklava. Geleneksel Türk tatlısının en güzel hali.",
      category: "Geleneksel",
      popular: true
    },
    { 
      name: "Künefe", 
      price: "₺65", 
      description: "Hatay usulü, taze peynirli künefe. Sıcak servis, dondurma eşliğinde.",
      category: "Geleneksel",
      popular: true
    },
    { 
      name: "Sütlaç", 
      price: "₺35", 
      description: "Fırında pişirilmiş, geleneksel sütlaç. Tarçın serpintili, ev yapımı.",
      category: "Sütlü Tatlılar"
    },
    { 
      name: "Muhallebi", 
      price: "₺30", 
      description: "Tarçınlı, ev yapımı muhallebi. Kremsi doku, hafif tatlı.",
      category: "Sütlü Tatlılar"
    },
    { 
      name: "Kazandibi", 
      price: "₺40", 
      description: "Geleneksel kazandibi, yanık aromasıyla özel lezzet.",
      category: "Sütlü Tatlılar"
    },
    { 
      name: "Kemalpaşa", 
      price: "₺45", 
      description: "Yumuşak hamur, şerbetli geleneksel tatlı.",
      category: "Şerbetli"
    },
    { 
      name: "Tulumba Tatlısı", 
      price: "₺40", 
      description: "Çıtır dış, yumuşak iç, şerbetli klasik tatlı.",
      category: "Şerbetli"
    },
    { 
      name: "Revani", 
      price: "₺35", 
      description: "İrmikli, şerbetli yumuşak kek. Hindistan cevizi serpintili.",
      category: "Şerbetli"
    },
    { 
      name: "Maraş Dondurması", 
      price: "₺40", 
      description: "Geleneksel Maraş dondurması çeşitleri. Damla sakızlı, salep aromalı.",
      category: "Dondurma"
    },
    { 
      name: "Dondurma Çeşitleri", 
      price: "₺35", 
      description: "Vanilya, çikolata, çilek gibi klasik aromalar.",
      category: "Dondurma"
    },
    { 
      name: "Meyveli Tart", 
      price: "₺45", 
      description: "Mevsim meyveli, özel tarlarımız. Taze krem ve meyvelerle.",
      category: "Modern"
    },
    { 
      name: "Tiramisu", 
      price: "₺50", 
      description: "İtalyan usulü tiramisu, mascarpone peyniri ve kahve aromalı.",
      category: "Modern"
    },
    { 
      name: "Cheesecake", 
      price: "₺55", 
      description: "New York usulü cheesecake, meyveli soslarla servis.",
      category: "Modern"
    },
    { 
      name: "Profiterol", 
      price: "₺45", 
      description: "Çikolata soslu profiterol, krema dolgulu.",
      category: "Modern"
    }
  ];

  const traditional = desserts.filter(item => item.category === "Geleneksel");
  const milky = desserts.filter(item => item.category === "Sütlü Tatlılar");
  const syrup = desserts.filter(item => item.category === "Şerbetli");
  const iceCream = desserts.filter(item => item.category === "Dondurma");
  const modern = desserts.filter(item => item.category === "Modern");

  return (
    <div className="desserts-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Tatlılar</h1>
          <p className="page-subtitle">Yemeğinizi tatlı bir şekilde tamamlayın</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="desserts-section">
            <h2 className="category-title">Geleneksel Tatlılar</h2>
            <div className="menu-grid">
              {traditional.map((item, index) => (
                <div key={index} className={`menu-item ${item.popular ? 'popular' : ''}`}>
                  {item.popular && <div className="popular-badge">En Sevilen</div>}
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="desserts-section">
            <h2 className="category-title">Sütlü Tatlılar</h2>
            <div className="menu-grid">
              {milky.map((item, index) => (
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

          <div className="desserts-section">
            <h2 className="category-title">Şerbetli Tatlılar</h2>
            <div className="menu-grid">
              {syrup.map((item, index) => (
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

          <div className="desserts-section">
            <h2 className="category-title">Dondurma</h2>
            <div className="menu-grid">
              {iceCream.map((item, index) => (
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

          <div className="desserts-section">
            <h2 className="category-title">Modern Tatlılar</h2>
            <div className="menu-grid">
              {modern.map((item, index) => (
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

export default DessertsPage;