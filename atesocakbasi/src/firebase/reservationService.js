// src/firebase/reservationService.js
import { db } from './config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc,
  getDocs,
  query, 
  where,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';

// Masa durumlarını gerçek zamanlı dinle
export const subscribeToTableStatus = (restaurantId, callback) => {
  try {
    console.log('🔄 Firebase bağlantısı kuruluyor...');
    const q = query(collection(db, 'tables'), where('restaurantId', '==', restaurantId));
    
    return onSnapshot(q, (snapshot) => {
      const tables = [];
      snapshot.forEach((doc) => {
        tables.push({ id: doc.id, ...doc.data() });
      });
      console.log('📊 Firebase\'den gelen data:', tables);
      callback(tables);
    }, (error) => {
      console.error('❌ Firebase dinleme hatası:', error);
      callback([]);
    });
  } catch (error) {
    console.error('💥 Firebase bağlantı hatası:', error);
    callback([]);
    return () => {
      console.log('🔌 Firebase bağlantısı kapatıldı');
    };
  }
};

// Rezervasyon oluştur
export const createReservation = async (reservationData) => {
  try {
    console.log('🔥 Rezervasyon oluşturuluyor:', reservationData);
    
    const docRef = await addDoc(collection(db, 'reservations'), {
      ...reservationData,
      status: 'pending',
      createdAt: serverTimestamp(),
      notificationSent: false
    });
    
    console.log('✅ Firebase\'a kaydedildi:', docRef.id);
    
    await updateTableStatus(reservationData.tableId, 'reserved');
    await sendReservationSMS(reservationData);
    
    return { success: true, reservationId: docRef.id };
  } catch (error) {
    console.error('❌ Rezervasyon oluşturma hatası:', error);
    return { success: false, error: error.message };
  }
};

// Masa durumunu güncelle
export const updateTableStatus = async (tableId, status) => {
  try {
    const tableRef = doc(db, 'tables', tableId);
    await updateDoc(tableRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    console.log(`✅ Masa ${tableId} durumu ${status} olarak güncellendi`);
  } catch (error) {
    console.error('❌ Masa durumu güncelleme hatası:', error);
  }
};

// SMS gönderimi - TEST VERSİYONU
const sendReservationSMS = async (reservationData) => {
  try {
    console.log('📱 SMS GÖNDERİLİYOR (TEST MOD)');
    console.log('Telefon:', reservationData.phone);
    
    const message = `Sayın ${reservationData.name}, ${reservationData.date} tarihinde saat ${reservationData.time} için ${reservationData.restaurantName} şubemizde ${reservationData.tableNumber} numaralı masa rezervasyonunuz oluşturulmuştur.`;
    
    console.log('💬 Mesaj:', message);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        alert(`📱 SMS GÖNDERİLDİ (TEST)\n\nTelefon: ${reservationData.phone}\n\n${message}`);
      }, 500);
    }
    
    console.log('✅ SMS gönderildi (TEST)');
    return { success: true, messageId: 'test_' + Date.now() };
    
  } catch (error) {
    console.error('❌ SMS gönderimi hatası:', error);
    return { success: false, error: error.message };
  }
};

// Telefon numarası doğrulama
export const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^(\+90|0)?5\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};