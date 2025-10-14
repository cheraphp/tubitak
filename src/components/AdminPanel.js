import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser({
      ...user,
      newLevel: user.level,
      newXp: user.xp,
      newStatus: user.status,
      suspendDays: 0
    });
    setShowEditModal(true);
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    try {
      const updates = {
        level: parseInt(selectedUser.newLevel),
        xp: parseInt(selectedUser.newXp),
        status: selectedUser.newStatus
      };

      // If suspending, calculate suspension end date
      if (selectedUser.newStatus === 'suspended' && selectedUser.suspendDays > 0) {
        const suspendUntil = new Date();
        suspendUntil.setDate(suspendUntil.getDate() + parseInt(selectedUser.suspendDays));
        updates.suspended_until = suspendUntil.toISOString();
      } else {
        updates.suspended_until = null;
      }

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', selectedUser.id);

      if (error) throw error;

      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + error.message);
    }
  };

  const handleBanUser = async (userId, reason) => {
    if (!window.confirm('Are you sure you want to ban this user?')) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          status: 'banned',
          banned_reason: reason || 'Violated terms of service'
        })
        .eq('id', userId);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Error banning user: ' + error.message);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || u.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    banned: users.filter(u => u.status === 'banned').length,
    admins: users.filter(u => u.is_admin).length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-shield-lock-fill text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gradient">Admin Panel</span>
              </Link>
            </div>
            <Link to="/" className="btn btn-outline">
              <i className="bi bi-arrow-left"></i>
              Back to Site
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <i className="bi bi-people text-4xl text-blue-600"></i>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <i className="bi bi-check-circle text-4xl text-green-600"></i>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Suspended</p>
                <p className="text-3xl font-bold text-gray-900">{stats.suspended}</p>
              </div>
              <i className="bi bi-pause-circle text-4xl text-yellow-600"></i>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Banned</p>
                <p className="text-3xl font-bold text-gray-900">{stats.banned}</p>
              </div>
              <i className="bi bi-x-circle text-4xl text-red-600"></i>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Admins</p>
                <p className="text-3xl font-bold text-gray-900">{stats.admins}</p>
              </div>
              <i className="bi bi-shield-check text-4xl text-purple-600"></i>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input md:w-48"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
            <button onClick={fetchUsers} className="btn btn-primary">
              <i className="bi bi-arrow-clockwise"></i>
              Refresh
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level / XP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quizzes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.username} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-medium text-gray-900">{u.username}</div>
                          <div className="text-xs text-gray-500">ID: {u.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">Level {u.level}</div>
                        <div className="text-gray-500">{u.xp} XP</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.total_quizzes || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        u.status === 'active' ? 'bg-green-100 text-green-800' :
                        u.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.is_admin && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <i className="bi bi-shield-check mr-1"></i>
                          Admin
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditUser(u)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        {u.status !== 'banned' && !u.is_admin && (
                          <button
                            onClick={() => handleBanUser(u.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Ban User"
                          >
                            <i className="bi bi-ban"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit User: {selectedUser.username}</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <input
                    type="number"
                    min="1"
                    value={selectedUser.newLevel}
                    onChange={(e) => setSelectedUser({...selectedUser, newLevel: e.target.value})}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">XP</label>
                  <input
                    type="number"
                    min="0"
                    value={selectedUser.newXp}
                    onChange={(e) => setSelectedUser({...selectedUser, newXp: e.target.value})}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedUser.newStatus}
                  onChange={(e) => setSelectedUser({...selectedUser, newStatus: e.target.value})}
                  className="input"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>

              {selectedUser.newStatus === 'suspended' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suspend for (days)</label>
                  <input
                    type="number"
                    min="1"
                    value={selectedUser.suspendDays}
                    onChange={(e) => setSelectedUser({...selectedUser, suspendDays: e.target.value})}
                    className="input"
                    placeholder="Number of days"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="btn btn-primary flex-1"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
