import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactReply, setContactReply] = useState('');

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }
    fetchUsers();
    fetchTickets();
    fetchContactMessages();
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

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          user:users!tickets_user_id_fkey(username, avatar)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContactMessages(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
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

  const handleContactReply = async () => {
    if (!selectedContact || !contactReply.trim()) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({
          status: 'resolved',
          admin_reply: contactReply,
          resolved_at: new Date().toISOString()
        })
        .eq('id', selectedContact.id);

      if (error) throw error;

      alert('Reply sent successfully!');
      setSelectedContact(null);
      setContactReply('');
      fetchContactMessages();
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply: ' + error.message);
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    banned: users.filter(u => u.status === 'banned').length,
    admins: users.filter(u => u.is_admin).length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    pendingContacts: contactMessages.filter(c => c.status === 'pending').length
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
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="bi bi-people mr-2"></i>
            Users
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 relative ${
              activeTab === 'tickets'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="bi bi-ticket-perforated mr-2"></i>
            Tickets
            {stats.openTickets > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {stats.openTickets}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 relative ${
              activeTab === 'contacts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="bi bi-envelope mr-2"></i>
            Contact Messages
            {stats.pendingContacts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {stats.pendingContacts}
              </span>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        {activeTab === 'users' && (
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
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
        <>
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
        </>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Tickets</h2>
              <button onClick={fetchTickets} className="btn btn-primary">
                <i className="bi bi-arrow-clockwise"></i>
                Refresh
              </button>
            </div>

            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={ticket.user.avatar} alt={ticket.user.username} className="w-10 h-10 rounded-full" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">{ticket.user.username}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{ticket.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="capitalize">
                          <i className="bi bi-tag mr-1"></i>
                          {ticket.category}
                        </span>
                        <span className="capitalize">
                          <i className="bi bi-exclamation-triangle mr-1"></i>
                          {ticket.priority}
                        </span>
                        <span>
                          <i className="bi bi-clock mr-1"></i>
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <Link to={`/tickets/${ticket.id}`} className="btn btn-outline btn-sm">
                        <i className="bi bi-eye"></i>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tickets.length === 0 && (
              <div className="text-center py-12">
                <i className="bi bi-ticket-perforated text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No tickets found</p>
              </div>
            )}
          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
              <button onClick={fetchContactMessages} className="btn btn-primary">
                <i className="bi bi-arrow-clockwise"></i>
                Refresh
              </button>
            </div>

            <div className="grid gap-4">
              {contactMessages.map((contact) => (
                <div key={contact.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.subject}</h3>
                          <p className="text-sm text-gray-600">{contact.name} - {contact.email}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{contact.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          <i className="bi bi-clock mr-1"></i>
                          {new Date(contact.created_at).toLocaleString()}
                        </span>
                        {contact.resolved_at && (
                          <span className="text-green-600">
                            <i className="bi bi-check-circle mr-1"></i>
                            Resolved {new Date(contact.resolved_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {contact.admin_reply && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            <i className="bi bi-reply-fill mr-2"></i>
                            Admin Reply:
                          </p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.admin_reply}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {contact.status}
                      </span>
                      {contact.status === 'pending' && (
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="bi bi-reply"></i>
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {contactMessages.length === 0 && (
              <div className="text-center py-12">
                <i className="bi bi-envelope text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No contact messages found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Reply Modal */}
      {selectedContact && (
        <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Reply to {selectedContact.name}</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Original Message:</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                <textarea
                  value={contactReply}
                  onChange={(e) => setContactReply(e.target.value)}
                  className="input resize-none"
                  rows="6"
                  placeholder="Type your reply here..."
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactReply}
                  className="btn btn-primary flex-1"
                  disabled={!contactReply.trim()}
                >
                  <i className="bi bi-send"></i>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
