# 🔥 Ateş Ocakbaşı - Rezervasyon, Masa Yönetimi ve Menü Sistemi

![HTML5](https://img.shields.io/badge/HTML5-0a0f1f?style=for-the-badge&logo=html5)
![React](https://img.shields.io/badge/React-0A0F1F?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-0A0F1F?style=for-the-badge&logo=firebase)
![JavaScript](https://img.shields.io/badge/JavaScript-0A0F1F?style=for-the-badge&logo=javascript)
![TypeScript](https://img.shields.io/badge/TypeScript-0A0F1F?style=for-the-badge&logo=typescript)
![JSON](https://img.shields.io/badge/JSON-0A0F1F?style=for-the-badge&logo=json)
![ESLint](https://img.shields.io/badge/ESLint-0A0F1F?style=for-the-badge&logo=eslint)
![Node.js](https://img.shields.io/badge/Node.js-0A0F1F?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-0A0F1F?style=for-the-badge&logo=express)
![CSS3](https://img.shields.io/badge/CSS3-0A0F1F?style=for-the-badge&logo=css3)

**Ateş Ocakbaşı**, şubeye özel **masa rezervasyon sistemi**, **anlık doluluk takibi**, **çevrim içi menü erişimi** ve **SMS tabanlı rezervasyon bildirimleri** sunan modern bir web uygulamasıdır.  
Kullanıcılar kolayca rezervasyon oluşturabilir, masaların güncel durumunu görebilir, site üzerinden menülere ulaşabilir ve rezervasyon onay/hatırlatma mesajlarını SMS ile alabilir.

---

## 📌 Özellikler

- 🗓 **Rezervasyon Oluşturma** — Tarih, saat ve kişi sayısına göre masa rezervasyonu yapma.
- 🏷 **Şube Bazlı Masa Yönetimi** — Her şube için ayrı masa listesi ve durum takibi.
- 🔄 **Anlık Doluluk Durumu** — Masaların dolu/boş durumunu gerçek zamanlı güncelleme.
- 📋 **Online Menü Erişimi** — Müşteriler site üzerinden menüye göz atabilir.
- ✉ **SMS ile Rezervasyon Aktivasyonu** — Rezervasyonun onaylanması için kullanıcıya SMS gönderilir.
- ⏰ **SMS Hatırlatma Mesajı** — Rezervasyon saatinden önce otomatik hatırlatma mesajı.
- 🔔 **Rezervasyon Onayı/İptali** — Personel paneli üzerinden rezervasyon yönetimi.
- 📊 **Görsel Masa Planı** (opsiyonel) — Masaların plan üzerinde gösterimi.

---

## 🛠 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **React.js** | Kullanıcı arayüzü |
| **TypeScript** | Tip güvenliği ve sürdürülebilir kod yapısı |
| **Firebase** | Gerçek zamanlı veri tabanı ve kimlik doğrulama |
| **Node.js / Express.js** | (Ops.) API katmanı |
| **Twilio / SMS API** | SMS gönderim servisi |
| **CSS3** | Stil ve düzen |
| **ESLint + Prettier** | Kod kalite ve format denetimi |

---

## 📷 Önizleme

| Rezervasyon Formu | Masa Durumu | Menü Görüntüleme | SMS Bildirim |
|-------------------|-------------|------------------|--------------|
| ![Reservation Screenshot](reservation-image-url) | ![Table Status Screenshot](table-status-image-url) | ![Menu Screenshot](menu-image-url) | ![SMS Screenshot](sms-image-url) |

---

## 🚀 Kurulum

```bash
# Klonla
git clone https://github.com/<kullanici-adi>/atesocakbasi-com.git
cd atesocakbasi-com

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev
