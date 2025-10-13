import React from 'react';

function PrivacyPolicy({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="bi bi-shield-lock-fill text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Last Updated */}
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US')}
            </p>
            <p className="text-gray-700">
              At VocQuiz, we respect your privacy. This Privacy Policy is designed to inform you
              about the personal data collected, used, and protected when you use our services.
            </p>
          </div>

          {/* 1. Information Collected */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-1-circle-fill text-primary-600"></i>
              Information Collected
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p><strong>Account Information:</strong> Your email address, username, and password (stored securely and encrypted).</p>
              <p><strong>Usage Data:</strong> Quiz results, earned XP points, level information, and performance statistics.</p>
              <p><strong>Automatically Collected Information:</strong> Technical data such as IP address, browser type, and usage timestamps.</p>
            </div>
          </div>

          {/* 2. Purpose of Data Use */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-2-circle-fill text-primary-600"></i>
              Purpose of Data Use
            </h3>
            <div className="pl-8 space-y-2 text-gray-700">
              <p>• Create and manage your account</p>
              <p>• Save quiz results and track your performance</p>
              <p>• Rank users on the leaderboard</p>
              <p>• Improve service quality and user experience</p>
              <p>• Ensure platform security</p>
            </div>
          </div>

          {/* 3. Data Security */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-3-circle-fill text-primary-600"></i>
              Data Security
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Your personal data is stored on secure servers and protected with industry-standard security measures.</p>
              <p>Passwords are never stored in plain text and are securely encrypted.</p>
              <p>Your data is not shared, sold, or rented to third parties.</p>
            </div>
          </div>

          {/* 4. User Rights */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-4-circle-fill text-primary-600"></i>
              User Rights
            </h3>
            <div className="pl-8 space-y-2 text-gray-700">
              <p><strong>Right of Access:</strong> You can request access to your personal data we store.</p>
              <p><strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete information.</p>
              <p><strong>Right to Deletion:</strong> You can request deletion of your account and data.</p>
              <p><strong>Right to Object:</strong> You may object to the processing of your data.</p>
            </div>
          </div>

          {/* 5. Cookies */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-5-circle-fill text-primary-600"></i>
              Cookies
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Our website uses cookies to enhance the user experience.</p>
              <p>Local storage is used to save session information and remember your preferences.</p>
              <p>You can manage and delete cookies via your browser settings.</p>
            </div>
          </div>

          {/* 6. Users Under 18 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-6-circle-fill text-primary-600"></i>
              Users Under 18
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Users under 18 must have parental or guardian consent to use our platform.</p>
              <p>If we learn that an under-18 user has registered without consent, the account and data will be deleted immediately.</p>
            </div>
          </div>

          {/* 7. KVKK Compliance */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-7-circle-fill text-primary-600"></i>
              KVKK Compliance
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>Your personal data is processed under the Turkish Personal Data Protection Law (KVKK, Law No. 6698).</p>
              <p>Data Controller: Süleyman Demirel Vocational and Technical Anatolian High School</p>
              <p>You can contact us to exercise your rights under KVKK.</p>
            </div>
          </div>

          {/* 8. Changes */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-8-circle-fill text-primary-600"></i>
              Changes
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>This Privacy Policy may be updated as needed.</p>
              <p>Users will be notified of significant changes.</p>
              <p>We recommend reviewing updates regularly.</p>
            </div>
          </div>

          {/* 9. Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-9-circle-fill text-primary-600"></i>
              Contact
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>If you have questions about our Privacy Policy, you can contact us:</p>
              <p><strong>Email:</strong> privacy@vocquiz.com</p>
              <p><strong>Address:</strong> Süleyman Demirel Vocational and Technical Anatolian High School</p>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <i className="bi bi-info-circle-fill text-primary-600 text-xl flex-shrink-0"></i>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Important Note:</strong> By using this platform,
                you declare that you have read, understood, and accepted this Privacy Policy.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            <i className="bi bi-check-lg"></i>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
