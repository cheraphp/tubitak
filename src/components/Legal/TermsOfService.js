import React from 'react';

function TermsOfService({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="bi bi-file-text-fill text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold">Kullanım Koşulları</h2>
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
              Bu Kullanım Koşulları, VocQuiz platformunu kullanımınızı düzenler.
              Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-1-circle-fill text-primary-600"></i>
              Hizmet Tanımı
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>VocQuiz, Türk öğrenciler için İngilizce kelime öğrenme platformudur.</p>
              <p>Platform, 9. sınıftan 12. sınıfa kadar farklı seviyelerde quiz'ler sunar.</p>
              <p>Hizmet, eğitim amaçlı olarak Süleyman Demirel Mesleki ve Teknik Anadolu Lisesi için geliştirilmiştir.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-2-circle-fill text-primary-600"></i>
              Hesap Oluşturma ve Kullanım
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p><strong>Hesap Güvenliği:</strong> Hesap bilgilerinizin güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayınız.</p>
              <p><strong>Doğru Bilgi:</strong> Kayıt sırasında doğru ve güncel bilgiler vermelisiniz.</p>
              <p><strong>Yaş Sınırı:</strong> 18 yaş altı kullanıcılar veli veya vasi onayı ile kayıt olabilir.</p>
              <p><strong>Tek Hesap:</strong> Her kullanıcı yalnızca bir hesap oluşturabilir.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-3-circle-fill text-primary-600"></i>
              Kullanım Kuralları
            </h3>
            <div className="pl-8 space-y-2 text-gray-700">
              <p><strong>İzin Verilen Kullanım:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Eğitim amaçlı quiz'lere katılmak</li>
                <li>Performansınızı takip etmek</li>
                <li>Lider tablosunda yarışmak</li>
                <li>Kişisel gelişiminizi izlemek</li>
              </ul>

              <p className="mt-4"><strong>Yasak Davranışlar:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Hile yapmak veya sistemi manipüle etmek</li>
                <li>Başkalarının hesaplarını kullanmak</li>
                <li>Otomatik botlar veya script'ler kullanmak</li>
                <li>Platformun güvenliğini tehdit etmek</li>
                <li>Diğer kullanıcıları rahatsız etmek</li>
                <li>Uygunsuz içerik paylaşmak</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-4-circle-fill text-primary-600"></i>
              İçerik ve Telif Hakları
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Platformdaki tüm içerik (quiz soruları, görüntüler, tasarım) telif hakkı ile korunmaktadır.</p>
              <p>İçeriği izinsiz kopyalayamaz, çoğaltamaz veya dağıtamazsınız.</p>
              <p>Platformu yalnızca kişisel ve eğitim amaçlı kullanabilirsiniz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-5-circle-fill text-primary-600"></i>
              Puanlama ve Lider Tablosu
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>XP (Deneyim Puanı) sistemi quiz performansınıza göre hesaplanır.</p>
              <p>Seviyeniz kazandığınız toplam XP'ye bağlıdır.</p>
              <p>Lider tablosu gerçek zamanlı güncellenir ve tüm kullanıcılara açıktır.</p>
              <p>Hile tespit edildiğinde hesap askıya alınabilir veya silinebilir.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-6-circle-fill text-primary-600"></i>
              Sorumluluk Reddi
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Platform "olduğu gibi" sunulmaktadır ve herhangi bir garanti verilmemektedir.</p>
              <p>Hizmet kesintileri, hatalar veya veri kaybından dolayı sorumluluk kabul etmiyoruz.</p>
              <p>Quiz sonuçları sadece pratik amaçlıdır ve resmi sınav sonuçlarını temsil etmez.</p>
              <p>Platformun eğitim müfredatınıza uygunluğu konusunda garanti vermiyoruz.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-7-circle-fill text-primary-600"></i>
              Hesap Askıya Alma ve Sonlandırma
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p><strong>Biz Şu Durumlarda Hesabınızı Askıya Alabiliriz:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Kullanım koşullarını ihlal ederseniz</li>
                <li>Hile veya sahtekarlık tespit edilirse</li>
                <li>Diğer kullanıcılara zarar verirseniz</li>
                <li>Yasa dışı faaliyetlerde bulunursanız</li>
              </ul>

              <p className="mt-4"><strong>Hesap Silme:</strong> İstediğiniz zaman hesabınızı silebilirsiniz. Silinen hesaplar geri getirilemez.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-8-circle-fill text-primary-600"></i>
              Değişiklikler
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Bu Kullanım Koşulları'nı istediğimiz zaman değiştirme hakkımızı saklı tutarız.</p>
              <p>Önemli değişiklikler yapıldığında kullanıcılar bilgilendirilir.</p>
              <p>Değişikliklerden sonra platformu kullanmaya devam ederseniz, yeni koşulları kabul etmiş sayılırsınız.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-9-circle-fill text-primary-600"></i>
              Uygulanacak Hukuk
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Bu Kullanım Koşulları Türkiye Cumhuriyeti yasalarına tabidir.</p>
              <p>Platformun kullanımından doğacak uyuşmazlıklar Türkiye mahkemelerinde çözülür.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-envelope-fill text-primary-600"></i>
              İletişim
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Kullanım koşulları hakkında sorularınız için:</p>
              <p><strong>E-posta:</strong> support@vocquiz.com</p>
              <p><strong>Kurum:</strong> Süleyman Demirel Mesleki ve Teknik Anadolu Lisesi</p>
            </div>
          </div>

          <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <i className="bi bi-exclamation-triangle-fill text-warning-600 text-xl flex-shrink-0"></i>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Önemli:</strong> Bu platformu kullanarak,
                bu Kullanım Koşulları'nı okuduğunuzu, anladığınızı ve tam olarak kabul ettiğinizi
                beyan edersiniz. Eğer bu koşulları kabul etmiyorsanız, platformu kullanmamalısınız.
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

export default TermsOfService;
