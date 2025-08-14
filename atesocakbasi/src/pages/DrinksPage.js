import React from 'react';
import '../style/DrinksPage.css';

const DrinksPage = () => {
  const drinks = {
    alcoholic: [
      { name: "Rakı", price: "₺85", description: "Yeni Rakı, Tekirdağ Rakı seçenekleri. Geleneksel Türk içeceği.", category: "Rakı" },
      { name: "Premium Rakı", price: "₺120", description: "Efe Rakı, Kulüp Rakı gibi premium seçenekler.", category: "Rakı" },
      { name: "Efes Pilsen", price: "₺45", description: "Türkiye'nin en sevilen birası, soğuk servis.", category: "Bira" },
      { name: "Tuborg Gold", price: "₺50", description: "Premium lager bira, altın tadı.", category: "Bira" },
      { name: "Corona", price: "₺65", description: "Meksika'dan ithal, limon dilimi ile servis.", category: "Bira" },
      { name: "Kırmızı Şarap", price: "₺120", description: "Yerli ve ithal kırmızı şarap seçenekleri.", category: "Şarap" },
      { name: "Beyaz Şarap", price: "₺115", description: "Seçkin beyaz şarap çeşitleri, soğuk servis.", category: "Şarap" },
      { name: "Chivas Regal", price: "₺180", description: "12 yıllık İskoç viskisi, premium kalite.", category: "Viski" },
      { name: "Johnnie Walker", price: "₺165", description: "Red Label, Black Label seçenekleri.", category: "Viski" },
      { name: "Jack Daniel's", price: "₺170", description: "Tennessee viskisi, yumuşak karakter.", category: "Viski" }
    ],
    nonAlcoholic: [
      { name: "Ayran", price: "₺15", description: "Ev yapımı, köpüklü ayran. Geleneksel lezzet.", category: "Geleneksel" },
      { name: "Şalgam", price: "₺20", description: "Acılı ve acısız seçenekleri. Adana usulü.", category: "Geleneksel" },
      { name: "Limonata", price: "₺35", description: "Taze sıkılmış limon, naneli seçenek mevcut.", category: "Taze Sıkılmış" },
      { name: "Portakal Suyu", price: "₺30", description: "Taze sıkılmış portakal suyu, doğal şeker.", category: "Taze Sıkılmış" },
      { name: "Coca Cola", price: "₺25", description: "Klasik kola, buzlu servis.", category: "Gazlı İçecek" },
      { name: "Fanta", price: "₺25", description: "Portakal aromalı gazlı içecek.", category: "Gazlı İçecek" },
      { name: "Sprite", price: "₺25", description: "Limon aromalı gazlı içecek, ferahlatıcı.", category: "Gazlı İçecek" },
      { name: "Su", price: "₺10", description: "Doğal kaynak suyu, büyük şişe.", category: "Su" },
      { name: "Çay", price: "₺10", description: "Geleneksel demleme çay, ince belli bardakta.", category: "Sıcak İçecek" },
      { name: "Türk Kahvesi", price: "₺25", description: "Orta, şekerli, sade seçenekleri. Lokumlu servis.", category: "Sıcak İçecek" },
      { name: "Espresso", price: "₺30", description: "İtalyan usulü espresso, yoğun aroma.", category: "Sıcak İçecek" },
      { name: "Cappuccino", price: "₺35", description: "Kremalı cappuccino, tarçın serpintili.", category: "Sıcak İçecek" }
    ]
  };

  const raki = drinks.alcoholic.filter(item => item.category === "Rakı");
  const beer = drinks.alcoholic.filter(item => item.category === "Bira");
  const wine = drinks.alcoholic.filter(item => item.category === "Şarap");
  const whiskey = drinks.alcoholic.filter(item => item.category === "Viski");
  
  const traditional = drinks.nonAlcoholic.filter(item => item.category === "Geleneksel");
  const fresh = drinks.nonAlcoholic.filter(item => item.category === "Taze Sıkılmış");
  const soft = drinks.nonAlcoholic.filter(item => item.category === "Gazlı İçecek");
  const hot = drinks.nonAlcoholic.filter(item => item.category === "Sıcak İçecek");
  const water = drinks.nonAlcoholic.filter(item => item.category === "Su");

  const DrinkCategory = ({ title, items }) => (
    <div className="drinks-section">
      <h3 className="category-title">{title}</h3>
      <div className="menu-grid">
        {items.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-header">
              <h4 className="menu-item-name">{item.name}</h4>
              <span className="menu-item-price">{item.price}</span>
            </div>
            <p className="menu-item-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="drinks-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">İçecekler</h1>
          <p className="page-subtitle">Yemeğinizi tamamlayacak içecek seçenekleri</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Alkollü İçecekler */}
          <div className="drinks-category alcoholic">
            <h2 className="main-category-title">Alkollü İçecekler</h2>
            <DrinkCategory title="Rakı" items={raki} />
            <DrinkCategory title="Bira" items={beer} />
            <DrinkCategory title="Şarap" items={wine} />
            <DrinkCategory title="Viski" items={whiskey} />
          </div>

          {/* Alkolsüz İçecekler */}
          <div className="drinks-category non-alcoholic">
            <h2 className="main-category-title">Alkolsüz İçecekler</h2>
            <DrinkCategory title="Geleneksel İçecekler" items={traditional} />
            <DrinkCategory title="Taze Sıkılmış" items={fresh} />
            <DrinkCategory title="Gazlı İçecekler" items={soft} />
            <DrinkCategory title="Sıcak İçecekler" items={[...hot, ...water]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksPage;