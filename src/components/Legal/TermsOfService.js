import React from 'react';

function TermsOfService({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="bi bi-file-text-fill text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold">Terms of Service</h2>
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
              These Terms of Service govern your use of the VocQuiz platform.
              By using the platform, you agree to these terms.
            </p>
          </div>

          {/* 1. Service Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-1-circle-fill text-primary-600"></i>
              Service Description
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>VocQuiz is an English vocabulary learning platform for Turkish students.</p>
              <p>The platform offers quizzes at different levels from grade 9 to grade 12.</p>
              <p>The service was developed for educational purposes for Süleyman Demirel Vocational and Technical Anatolian High School.</p>
            </div>
          </div>

          {/* 2. Account Creation and Usage */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-2-circle-fill text-primary-600"></i>
              Account Creation and Usage
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p><strong>Account Security:</strong> You are responsible for keeping your account information secure. Do not share your password.</p>
              <p><strong>Accurate Information:</strong> You must provide accurate and up-to-date information during registration.</p>
              <p><strong>Age Requirement:</strong> Users under 18 can register with parental or guardian consent.</p>
              <p><strong>Single Account:</strong> Each user may create only one account.</p>
            </div>
          </div>

          {/* 3. Usage Rules */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-3-circle-fill text-primary-600"></i>
              Usage Rules
            </h3>
            <div className="pl-8 space-y-2 text-gray-700">
              <p><strong>Permitted Usage:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Participate in quizzes for educational purposes</li>
                <li>Track your performance</li>
                <li>Compete on the leaderboard</li>
                <li>Monitor your personal progress</li>
              </ul>

              <p className="mt-4"><strong>Prohibited Actions:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Cheating or manipulating the system</li>
                <li>Using other users' accounts</li>
                <li>Using bots or scripts</li>
                <li>Compromising platform security</li>
                <li>Harassing other users</li>
                <li>Sharing inappropriate content</li>
              </ul>
            </div>
          </div>

          {/* 4. Content and Copyright */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-4-circle-fill text-primary-600"></i>
              Content and Copyright
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>All content on the platform (quiz questions, images, design) is protected by copyright.</p>
              <p>You may not copy, reproduce, or distribute content without permission.</p>
              <p>The platform is for personal and educational use only.</p>
            </div>
          </div>

          {/* 5. Scoring and Leaderboard */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-5-circle-fill text-primary-600"></i>
              Scoring and Leaderboard
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>XP (Experience Points) are calculated based on quiz performance.</p>
              <p>Your level depends on your total XP earned.</p>
              <p>The leaderboard is updated in real-time and visible to all users.</p>
              <p>Accounts may be suspended or deleted if cheating is detected.</p>
            </div>
          </div>

          {/* 6. Disclaimer */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-6-circle-fill text-primary-600"></i>
              Disclaimer
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>The platform is provided "as is" without any warranties.</p>
              <p>We are not responsible for service interruptions, errors, or data loss.</p>
              <p>Quiz results are for practice purposes only and do not represent official exam scores.</p>
              <p>We do not guarantee alignment with your educational curriculum.</p>
            </div>
          </div>

          {/* 7. Account Suspension and Termination */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-7-circle-fill text-primary-600"></i>
              Account Suspension and Termination
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p><strong>We may suspend your account in the following cases:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>If you violate the terms of service</li>
                <li>If cheating or fraud is detected</li>
                <li>If you harm other users</li>
                <li>If you engage in illegal activities</li>
              </ul>

              <p className="mt-4"><strong>Account Deletion:</strong> You may delete your account at any time. Deleted accounts cannot be recovered.</p>
            </div>
          </div>

          {/* 8. Changes */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-8-circle-fill text-primary-600"></i>
              Changes
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>We reserve the right to modify these Terms of Service at any time.</p>
              <p>Users will be informed of significant changes.</p>
              <p>Continuing to use the platform after changes constitutes acceptance of the new terms.</p>
            </div>
          </div>

          {/* 9. Governing Law */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-9-circle-fill text-primary-600"></i>
              Governing Law
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>These Terms of Service are governed by the laws of the Republic of Turkey.</p>
              <p>Any disputes arising from the use of the platform will be resolved in Turkish courts.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="bi bi-envelope-fill text-primary-600"></i>
              Contact
            </h3>
            <div className="pl-8 space-y-3 text-gray-700">
              <p>For questions regarding these terms:</p>
              <p><strong>Email:</strong> support@vocquiz.com</p>
              <p><strong>Institution:</strong> Süleyman Demirel Vocational and Technical Anatolian High School</p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <i className="bi bi-exclamation-triangle-fill text-warning-600 text-xl flex-shrink-0"></i>
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">Important:</strong> By using this platform,
                you declare that you have read, understood, and fully accepted these Terms of Service.
                If you do not agree, you should not use the platform.
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

export default TermsOfService;
