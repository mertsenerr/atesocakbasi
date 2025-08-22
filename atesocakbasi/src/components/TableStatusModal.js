  import React, { useState, useEffect } from 'react';
// LUCIDE ICONLARI
import { 
  X, 
  Users, 
  Clock, 
  User, 
  Phone, 
  Calendar, 
  MessageSquare, 
  AlertCircle, 
  Check 
} from 'lucide-react';

// DOĞRU IMPORT YOLU
import { 
  subscribeToTableStatus, 
  createReservation, 
  validatePhoneNumber 
} from '../firebase/reservationService';

// CSS IMPORT
import '../style/TableStatusModal.css';

const TableStatusModal = ({ restaurant, onClose }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log('🔄 Firebase bağlantısı kuruluyor...');

    // Firebase'den masa durumlarını dinle
    const unsubscribe = subscribeToTableStatus(restaurant.id, (tablesData) => {
      console.log('📊 Firebase\'den gelen data:', tablesData);
      
      // Eğer Firebase'den veri gelmezse, mock data kullan
      if (tablesData.length === 0) {
        console.log('⚠️ Firebase\'den veri gelmedi, mock data kullanılıyor');
        setTables(generateMockTables(restaurant.tables));
      } else {
        console.log('✅ Firebase verisi kullanılıyor');
        setTables(tablesData);
      }
    });

    return () => {
      console.log('🔌 Firebase bağlantısı kapatılıyor');
      unsubscribe();
    };
  }, [restaurant]);

  // Mock veri oluştur (Firebase bağlantısı yoksa)
  const generateMockTables = (tableInfo) => {
    console.log('🎭 Mock data oluşturuluyor:', tableInfo);
    const mockTables = [];
    let tableNumber = 1;
    
    // Dolu masalar
    for (let i = 0; i < tableInfo.occupied; i++) {
      mockTables.push({
        id: `table-${tableNumber}`,
        number: tableNumber,
        status: 'occupied',
        capacity: Math.random() > 0.5 ? 4 : 2,
        floor: tableNumber <= 15 ? 1 : 2
      });
      tableNumber++;
    }
    
    // Rezerveli masalar
    for (let i = 0; i < tableInfo.reserved; i++) {
      mockTables.push({
        id: `table-${tableNumber}`,
        number: tableNumber,
        status: 'reserved',
        capacity: Math.random() > 0.5 ? 4 : 2,
        floor: tableNumber <= 15 ? 1 : 2,
        reservationTime: '19:00'
      });
      tableNumber++;
    }
    
    // Boş masalar
    for (let i = 0; i < tableInfo.available; i++) {
      mockTables.push({
        id: `table-${tableNumber}`,
        number: tableNumber,
        status: 'available',
        capacity: Math.random() > 0.5 ? 4 : 2,
        floor: tableNumber <= 15 ? 1 : 2
      });
      tableNumber++;
    }
    
    return mockTables;
  };

  const handleTableClick = (table) => {
    if (table.status === 'available') {
      console.log('🎯 Masa seçildi:', table);
      setSelectedTable(table);
      setShowReservationForm(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'İsim soyisim gereklidir';
    }
    
    if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    
    if (!formData.date) {
      newErrors.date = 'Tarih seçimi zorunludur';
    }
    
    if (!formData.time) {
      newErrors.time = 'Saat seçimi zorunludur';
    }
    
    if (formData.guests > selectedTable?.capacity) {
      newErrors.guests = `Bu masa maksimum ${selectedTable.capacity} kişiliktir`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('❌ Form validation başarısız');
      return;
    }
    
    setLoading(true);
    console.log('🚀 Rezervasyon işlemi başlatılıyor...');
    
    try {
      const reservationData = {
        ...formData,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        tableId: selectedTable.id,
        tableNumber: selectedTable.number,
        tableCapacity: selectedTable.capacity
      };
      
      console.log('📝 Rezervasyon verisi:', reservationData);
      
      const result = await createReservation(reservationData);
      
      if (result.success) {
        console.log('✅ Rezervasyon başarılı!');
        setSuccessMessage('Rezervasyonunuz başarıyla oluşturuldu! SMS ile onay mesajı gönderildi.');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.log('❌ Rezervasyon başarısız:', result.error);
        setErrors({ submit: 'Rezervasyon oluşturulurken bir hata oluştu.' });
      }
    } catch (error) {
      console.error('💥 Rezervasyon hatası:', error);
      setErrors({ submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getTableColor = (status) => {
    switch (status) {
      case 'available':
        return '#ffffff';
      case 'reserved':
        return '#4a5568';
      case 'occupied':
        return '#9ca3af';
      default:
        return '#e5e7eb';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Müsait';
      case 'reserved':
        return 'Rezerveli';
      case 'occupied':
        return 'Dolu';
      default:
        return 'Bilinmiyor';
    }
  };

  // Katları ayır
  const floors = [...new Set(tables.map(t => t.floor))].sort();

  return (
    <div className="table-status-modal-overlay" onClick={onClose}>
      <div className="table-status-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <h2>{restaurant.name} - Masa Durumu</h2>
            <p>Rezervasyon yapmak için boş masalardan birini seçin</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {!showReservationForm ? (
            <>
              {/* Durum göstergesi */}
              <div className="status-legend">
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span>Müsait</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color reserved"></div>
                  <span>Rezerveli</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color occupied"></div>
                  <span>Dolu</span>
                </div>
              </div>

              {/* Kat planları */}
              {floors.map(floor => (
                <div key={floor} className="floor-section">
                  <h3 className="floor-title">{floor}. Kat</h3>
                  <div className="tables-grid">
                    {tables
                      .filter(table => table.floor === floor)
                      .map(table => (
                        <div
                          key={table.id}
                          className={`table-item ${table.status}`}
                          onClick={() => handleTableClick(table)}
                          style={{
                            backgroundColor: getTableColor(table.status),
                            cursor: table.status === 'available' ? 'pointer' : 'not-allowed'
                          }}
                        >
                          <div className="table-number">Masa {table.number}</div>
                          <div className="table-info">
                            <Users size={14} />
                            <span>{table.capacity} Kişilik</span>
                          </div>
                          <div className="table-status-text">
                            {getStatusText(table.status)}
                          </div>
                          {table.status === 'reserved' && table.reservationTime && (
                            <div className="reservation-time">
                              <Clock size={12} />
                              <span>{table.reservationTime}</span>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* Rezervasyon Formu */
            <div className="reservation-form-container">
              {successMessage ? (
                <div className="success-message">
                  <Check size={48} />
                  <h3>Başarılı!</h3>
                  <p>{successMessage}</p>
                </div>
              ) : (
                <>
                  <div className="selected-table-info">
                    <h3>Seçilen Masa: {selectedTable.number}</h3>
                    <p>{selectedTable.capacity} Kişilik - {selectedTable.floor}. Kat</p>
                  </div>

                  <form onSubmit={handleSubmit} className="reservation-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          <User size={16} />
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Adınız ve soyadınız"
                          className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>

                      <div className="form-group">
                        <label>
                          <Phone size={16} />
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="5XX XXX XX XX"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          <Calendar size={16} />
                          Tarih *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                      </div>

                      <div className="form-group">
                        <label>
                          <Clock size={16} />
                          Saat *
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={errors.time ? 'error' : ''}
                        >
                          <option value="">Saat seçin</option>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = 11 + Math.floor(i / 2);
                            const minute = i % 2 === 0 ? '00' : '30';
                            if (hour <= 23) {
                              return (
                                <option key={i} value={`${hour}:${minute}`}>
                                  {hour}:{minute}
                                </option>
                              );
                            }
                            return null;
                          })}
                        </select>
                        {errors.time && <span className="error-text">{errors.time}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          <Users size={16} />
                          Kişi Sayısı *
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className={errors.guests ? 'error' : ''}
                        >
                          {[...Array(selectedTable.capacity)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} Kişi
                            </option>
                          ))}
                        </select>
                        {errors.guests && <span className="error-text">{errors.guests}</span>}
                      </div>

                      <div className="form-group">
                        <label>E-posta</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>
                        <MessageSquare size={16} />
                        Özel İstekler
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Doğum günü, özel diyet, vb."
                        rows="3"
                      />
                    </div>

                    {errors.submit && (
                      <div className="error-message">
                        <AlertCircle size={16} />
                        {errors.submit}
                      </div>
                    )}

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowReservationForm(false)}
                        disabled={loading}
                      >
                        Geri
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                      >
                        {loading ? 'İşleniyor...' : 'Rezervasyon Yap'}
                      </button>
                    </div>
                  </form>

                  <div className="info-note">
                    <AlertCircle size={16} />
                    <p>Rezervasyon onayı SMS ile gönderilecektir. Rezervasyon saatinden 2 saat önce hatırlatma mesajı alacaksınız.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableStatusModal;