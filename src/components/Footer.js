import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrivacyPolicy from './Legal/PrivacyPolicy';
import TermsOfService from './Legal/TermsOfService';

function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-mortarboard-fill text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-white">VocQuiz</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Türk öğrenciler için İngilizce kelime öğrenme platformu.
                9-12. sınıf İngilizce müfredatına uygun interaktif quiz'lerle
                kelime dağarcığınızı geliştirin.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <i className="bi bi-house-door"></i>
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <i className="bi bi-trophy"></i>
                    Lider Tablosu
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <i className="bi bi-file-text"></i>
                    Kullanım Koşulları
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <i className="bi bi-shield-lock"></i>
                    Gizlilik Politikası
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">İletişim</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <i className="bi bi-building text-primary-400 mt-1"></i>
                  <div>
                    <div className="font-medium text-white">Kurum</div>
                    <div className="text-gray-400">Süleyman Demirel Mesleki ve Teknik Anadolu Lisesi</div>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <i className="bi bi-envelope text-primary-400"></i>
                  <a href="mailto:info@vocquiz.com" className="hover:text-primary-400 transition-colors">
                    info@vocquiz.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="bi bi-calendar text-primary-400"></i>
                  <span className="text-gray-400">© 2025 VocQuiz</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center md:text-left">
                Bu platform eğitim amaçlı geliştirilmiştir. Tüm hakları saklıdır.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">Türkiye</span>
                <span className="text-gray-600">•</span>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-primary-400 transition-colors"
                >
                  Gizlilik
                </button>
                <span className="text-gray-600">•</span>
                <button
                  onClick={() => setShowTerms(true)}
                  className="hover:text-primary-400 transition-colors"
                >
                  Koşullar
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-800 px-4 py-2 rounded-full">
              <i className="bi bi-shield-check text-primary-400"></i>
              <span>KVKK Uyumlu • Güvenli Platform</span>
            </div>
          </div>
        </div>
      </footer>

      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
    </>
  );
}

export default Footer;
