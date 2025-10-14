import React, { useState } from 'react';

function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);

    // Auto close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="bi bi-envelope-fill text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">İletişim</h2>
                <p className="text-sm opacity-90">Bizimle iletişime geçin</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <i className="bi bi-info-circle-fill text-blue-600 text-xl flex-shrink-0 mt-0.5"></i>
                <div className="text-sm text-gray-700">
                  <strong className="text-gray-900">Not:</strong> Mesajınız en kısa sürede değerlendirilecek ve size geri dönüş yapılacaktır.
                  Acil durumlar için lütfen okul yönetimiyle direkt iletişime geçiniz.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="bi bi-person mr-2"></i>
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ad Soyad"
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="bi bi-envelope mr-2"></i>
                    E-posta Adresiniz *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ornek@email.com"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="bi bi-tag mr-2"></i>
                  Konu *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Konu seçiniz</option>
                  <option value="technical">Teknik Destek</option>
                  <option value="content">İçerik ve Quiz Soruları</option>
                  <option value="account">Hesap Sorunları</option>
                  <option value="suggestion">Öneri ve Geri Bildirim</option>
                  <option value="report">Hata Bildirimi</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="bi bi-chat-left-text mr-2"></i>
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Mesajınızı buraya yazınız..."
                  className="input resize-none"
                  minLength="10"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Minimum 10 karakter
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="bi bi-clock text-primary-600"></i>
                  <span><strong>Yanıt Süresi:</strong> 1-2 iş günü</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="bi bi-telephone text-primary-600"></i>
                  <span><strong>Acil Durumlar:</strong> Okul yönetimi ile iletişime geçiniz</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline flex-1"
                >
                  <i className="bi bi-x-circle"></i>
                  İptal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send"></i>
                      Gönder
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <i className="bi bi-check-circle-fill text-green-600 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mesajınız Gönderildi!</h3>
              <p className="text-gray-600 mb-2">
                Mesajınız için teşekkür ederiz. En kısa sürede size geri dönüş yapacağız.
              </p>
              <p className="text-sm text-gray-500">
                Bu pencere otomatik olarak kapanacaktır...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
