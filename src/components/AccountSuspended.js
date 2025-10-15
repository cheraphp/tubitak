import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

function AccountSuspended() {
  const { user, logout } = useAuth();
  const [banInfo, setBanInfo] = useState(null);
  const [bannedByUser, setBannedByUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanInfo = async () => {
      if (!user) return;

      const { data: userData } = await supabase
        .from('users')
        .select('status, banned_reason, banned_at, suspended_until, banned_by')
        .eq('id', user.id)
        .maybeSingle();

      if (userData) {
        setBanInfo(userData);

        if (userData.banned_by) {
          const { data: adminData } = await supabase
            .from('users')
            .select('username, email')
            .eq('id', userData.banned_by)
            .maybeSingle();

          if (adminData) {
            setBannedByUser(adminData);
          }
        }
      }

      setLoading(false);
    };

    fetchBanInfo();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="loading-spinner w-12 h-12"></div>
      </div>
    );
  }

  const isBanned = banInfo?.status === 'banned';
  const isSuspended = banInfo?.status === 'suspended';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRemainingTime = () => {
    if (!banInfo?.suspended_until) return null;
    const now = new Date();
    const endDate = new Date(banInfo.suspended_until);
    const diff = endDate - now;

    if (diff <= 0) return 'Suspension expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} days, ${hours} hours remaining`;
    if (hours > 0) return `${hours} hours, ${minutes} minutes remaining`;
    return `${minutes} minutes remaining`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-scale-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className={`p-8 ${isBanned ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-orange-600 to-orange-700'} text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-20 h-20 rounded-full ${isBanned ? 'bg-red-500' : 'bg-orange-500'} bg-opacity-30 flex items-center justify-center animate-pulse`}>
                  <i className={`bi ${isBanned ? 'bi-x-circle' : 'bi-exclamation-triangle'} text-5xl`}></i>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {isBanned ? 'Account Banned' : 'Account Suspended'}
              </h1>
              <p className="text-center text-white/90 text-lg">
                {isBanned
                  ? 'Your account has been permanently banned from VocQuiz'
                  : 'Your account has been temporarily suspended'}
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${isBanned ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'} flex items-center justify-center flex-shrink-0`}>
                    <i className="bi bi-info-circle text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Reason</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {banInfo?.banned_reason || 'No reason provided'}
                    </p>
                  </div>
                </div>

                {bannedByUser && (
                  <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                    <div className={`w-10 h-10 rounded-lg ${isBanned ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'} flex items-center justify-center flex-shrink-0`}>
                      <i className="bi bi-person-badge text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Actioned By</h3>
                      <p className="text-gray-700">
                        {bannedByUser.username}
                      </p>
                      <p className="text-gray-500 text-sm">{bannedByUser.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                  <div className={`w-10 h-10 rounded-lg ${isBanned ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'} flex items-center justify-center flex-shrink-0`}>
                    <i className="bi bi-calendar-x text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {isBanned ? 'Banned On' : 'Suspended On'}
                    </h3>
                    <p className="text-gray-700">{formatDate(banInfo?.banned_at)}</p>
                  </div>
                </div>

                {isSuspended && banInfo?.suspended_until && (
                  <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <i className="bi bi-hourglass-split text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Suspended Until</h3>
                      <p className="text-gray-700 mb-1">{formatDate(banInfo.suspended_until)}</p>
                      <p className="text-orange-600 font-medium text-sm">
                        {getRemainingTime()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isSuspended && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <i className="bi bi-info-circle text-blue-600 text-xl flex-shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Temporary Suspension</h4>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      You will be able to access your account again after the suspension period ends.
                      Please review our community guidelines to avoid future suspensions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isBanned && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <i className="bi bi-shield-x text-red-600 text-xl flex-shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Permanent Ban</h4>
                    <p className="text-red-700 text-sm leading-relaxed">
                      This ban is permanent and cannot be appealed. If you believe this was made in error,
                      please contact us through our support channels.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={logout}
              className="w-full btn bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-lg"
            >
              <i className="bi bi-box-arrow-right"></i>
              Sign Out
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:support@vocquiz.com" className="text-primary-600 hover:text-primary-700 font-medium">
              support@vocquiz.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountSuspended;
