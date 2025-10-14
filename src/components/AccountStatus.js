import React from 'react';
import { Link } from 'react-router-dom';

function AccountStatus({ status, suspendedUntil, bannedReason, onLogout }) {
  const isSuspended = status === 'suspended';
  const isBanned = status === 'banned';

  if (!isSuspended && !isBanned) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card overflow-hidden">
          <div className={`${isBanned ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-yellow-600 to-orange-600'} text-white p-8 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto backdrop-blur-sm">
                <i className={`bi ${isBanned ? 'bi-x-octagon-fill' : 'bi-exclamation-triangle-fill'}`}></i>
              </div>
              <h1 className="text-4xl font-bold mb-3">
                {isBanned ? 'Account Banned' : 'Account Suspended'}
              </h1>
              <p className="text-xl opacity-90">
                {isBanned ? 'Your account has been permanently banned' : 'Your account has been temporarily suspended'}
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {isBanned && (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-shield-x text-red-600 text-2xl flex-shrink-0 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-red-900 mb-2">Ban Information</h3>
                      <p className="text-red-700 text-sm">
                        Your account has been permanently banned from using VocQuiz. This decision was made due to violations of our terms of service.
                      </p>
                    </div>
                  </div>
                </div>

                {bannedReason && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="bi bi-file-text"></i>
                      Ban Reason
                    </h3>
                    <p className="text-gray-700">{bannedReason}</p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <i className="bi bi-question-circle"></i>
                    Think this is a mistake?
                  </h3>
                  <p className="text-blue-700 text-sm mb-4">
                    If you believe your account was banned in error, you can appeal this decision by contacting our support team.
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-blue-600">
                      <i className="bi bi-envelope"></i>
                      <span>Email: support@vocquiz.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <i className="bi bi-building"></i>
                      <span>Contact: School Administration</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isSuspended && (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-clock-history text-yellow-600 text-2xl flex-shrink-0 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Suspension Information</h3>
                      <p className="text-yellow-700 text-sm mb-3">
                        Your account has been temporarily suspended. You will not be able to access VocQuiz until the suspension period ends.
                      </p>
                      {suspendedUntil && (
                        <div className="bg-white rounded-lg p-3 border border-yellow-300">
                          <p className="text-sm text-gray-600 mb-1">Suspended Until:</p>
                          <p className="text-lg font-bold text-gray-900">
                            {new Date(suspendedUntil).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <i className="bi bi-info-circle"></i>
                    What happens during suspension?
                  </h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li className="flex items-start gap-2">
                      <i className="bi bi-check2 mt-1 flex-shrink-0"></i>
                      <span>Your account and data remain safe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="bi bi-check2 mt-1 flex-shrink-0"></i>
                      <span>You cannot login or take quizzes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="bi bi-check2 mt-1 flex-shrink-0"></i>
                      <span>Your progress and XP are preserved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="bi bi-check2 mt-1 flex-shrink-0"></i>
                      <span>Access will be restored automatically after the suspension period</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <i className="bi bi-question-circle"></i>
                    Questions about your suspension?
                  </h3>
                  <p className="text-orange-700 text-sm mb-3">
                    If you have questions or believe this suspension was made in error, please contact support.
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-orange-600">
                      <i className="bi bi-envelope"></i>
                      <span>Email: support@vocquiz.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-600">
                      <i className="bi bi-building"></i>
                      <span>Contact: School Administration</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="btn btn-outline flex-1 justify-center"
                  onClick={onLogout}
                >
                  <i className="bi bi-box-arrow-left"></i>
                  Logout
                </Link>
                <Link
                  to="/"
                  className="btn btn-primary flex-1 justify-center"
                >
                  <i className="bi bi-house-door"></i>
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-white/80 text-sm">
          <p>VocQuiz - Süleyman Demirel Vocational and Technical Anatolian High School</p>
        </div>
      </div>
    </div>
  );
}

export default AccountStatus;
