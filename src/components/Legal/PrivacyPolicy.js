import React from 'react';

function PrivacyPolicy({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="bi bi-shield-lock-fill text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold">Gizlilik Politikası</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Son Güncellenme:</strong> {new Date().toLocaleDateString('tr-TR')}
            </p>
            <p className="text-gray-700">
              VocQuiz olarak gizliliğinize saygı duyuyoruz. Bu Gizlilik Politikası,
              hizmetlerimizi kullanırken toplanan, kullanılan ve korunan kişisel verileriniz
              hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-1-circle-fill text-primary-600"></i>
              Toplanan Bilgiler
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p><strong>Hesap Bilgileri:</strong> E-posta adresiniz, kullanıcı adınız ve şifreniz (şifrelenmiş olarak saklanır).</p>
              <p><strong>Kullanım Verileri:</strong> Quiz sonuçlarınız, kazanılan XP puanları, seviye bilgileri ve performans istatistikleri.</p>
              <p><strong>Otomatik Toplanan Bilgiler:</strong> IP adresi, tarayıcı türü ve kullanım zamanı gibi teknik bilgiler.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-2-circle-fill text-primary-600"></i>
              Bilgilerin Kullanım Amacı
            </h3>
            <div className="pl-8 space-y-2 text-gray-700">
              <p>• Hesabınızı oluşturmak ve yönetmek</p>
              <p>• Quiz sonuçlarınızı kaydetmek ve performansınızı takip etmek</p>
              <p>• Lider tablosunda sıralama yapmak</p>
              <p>• Hizmet kalitesini iyileştirmek ve kullanıcı deneyimini geliştirmek</p>
              <p>• Platformun güvenliğini sağlamak</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-3-circle-fill text-primary-600"></i>
              Veri Güvenliği
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Kişisel verileriniz güvenli sunucularda saklanır ve endüstri standardı güvenlik önlemleri ile korunur.</p>
              <p>Şifreleriniz asla düz metin olarak saklanmaz ve güvenli bir şekilde şifrelenir.</p>
              <p>Verileriniz üçüncü şahıslarla paylaşılmaz, satılmaz veya kiralanmaz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-4-circle-fill text-primary-600"></i>
              Kullanıcı Hakları
            </h3>
            <div className="pl-8 space-y-2 text-gray-700">
              <p><strong>Erişim Hakkı:</strong> Sakladığımız kişisel verilerinize erişim talep edebilirsiniz.</p>
              <p><strong>Düzeltme Hakkı:</strong> Yanlış veya eksik bilgilerinizi düzeltme talebinde bulunabilirsiniz.</p>
              <p><strong>Silme Hakkı:</strong> Hesabınızı ve verilerinizi silme talebinde bulunabilirsiniz.</p>
              <p><strong>İtiraz Hakkı:</strong> Verilerinizin işlenmesine itiraz edebilirsiniz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-5-circle-fill text-primary-600"></i>
              Çerezler (Cookies)
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır.</p>
              <p>Oturum bilgilerinizi saklamak ve tercihlerinizi hatırlamak için yerel depolama (localStorage) kullanılır.</p>
              <p>Tarayıcı ayarlarınızdan çerezleri yönetebilir ve silebilirsiniz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-6-circle-fill text-primary-600"></i>
              18 Yaş Altı Kullanıcılar
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>18 yaş altı kullanıcıların platformumuzu kullanabilmesi için veli veya vasilerinin onayı gerekmektedir.</p>
              <p>18 yaş altı bir kullanıcının izinsiz kayıt olduğunu öğrendiğimizde, hesabı ve verileri derhal sileriz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-7-circle-fill text-primary-600"></i>
              KVKK Uyumu
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verileriniz işlenmektedir.</p>
              <p>Veri sorumlusu: Süleyman Demirel Mesleki ve Teknik Anadolu Lisesi</p>
              <p>KVKK kapsamındaki haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-8-circle-fill text-primary-600"></i>
              Değişiklikler
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Bu Gizlilik Politikası gerektiğinde güncellenebilir.</p>
              <p>Önemli değişiklikler yapıldığında kullanıcılar bilgilendirilecektir.</p>
              <p>Güncellemeleri düzenli olarak kontrol etmenizi öneririz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-9-circle-fill text-primary-600"></i>
              İletişim
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Gizlilik politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:</p>
              <p><strong>E-posta:</strong> privacy@vocquiz.com</p>
              <p><strong>Adres:</strong> Süleyman Demirel Mesleki ve Teknik Anadolu Lisesi</p>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <i className="bi bi-info-circle-fill text-primary-600 text-xl flex-shrink-0"></i>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Önemli Not:</strong> Bu platformu kullanarak,
                bu Gizlilik Politikası'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            <i className="bi bi-check-lg"></i>
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
