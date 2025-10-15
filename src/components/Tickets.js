import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

function Tickets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    category: 'other',
    priority: 'medium'
  });

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('tickets')
        .select(`
          *,
          user:users!tickets_user_id_fkey(username, avatar),
          assigned:users!tickets_assigned_to_fkey(username)
        `)
        .order('created_at', { ascending: false });

      if (!user.is_admin) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchTickets();
  }, [user, navigate, fetchTickets]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('tickets')
        .insert([{
          user_id: user.id,
          ...newTicket
        }]);

      if (error) throw error;

      setShowCreateModal(false);
      setNewTicket({
        subject: '',
        message: '',
        category: 'other',
        priority: 'medium'
      });
      fetchTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket: ' + error.message);
    }
  };

  const filteredTickets = tickets.filter(t =>
    filterStatus === 'all' || t.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'in_progress': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'closed': return 'bg-slate-100 text-slate-700 border border-slate-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high': return { color: 'text-red-600', bg: 'bg-red-50', icon: 'bi-exclamation-circle-fill' };
      case 'medium': return { color: 'text-amber-600', bg: 'bg-amber-50', icon: 'bi-dash-circle-fill' };
      case 'low': return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'bi-check-circle-fill' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', icon: 'bi-circle' };
    }
  };

  const getCategoryConfig = (category) => {
    switch (category) {
      case 'technical': return { icon: 'bi-wrench-adjustable', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'content': return { icon: 'bi-book', color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'account': return { icon: 'bi-person-circle', color: 'text-indigo-600', bg: 'bg-indigo-50' };
      case 'suggestion': return { icon: 'bi-lightbulb', color: 'text-amber-600', bg: 'bg-amber-50' };
      case 'report': return { icon: 'bi-flag', color: 'text-red-600', bg: 'bg-red-50' };
      default: return { icon: 'bi-chat-dots', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                  <i className="bi bi-ticket-perforated-fill text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Support Center
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {user?.is_admin && (
                <Link to="/admin" className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md">
                  <i className="bi bi-shield-lock"></i>
                  Admin Panel
                </Link>
              )}
              <Link to="/" className="btn btn-outline">
                <i className="bi bi-arrow-left"></i>
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                Support Tickets
              </h1>
              <p className="text-gray-600 text-lg">Track and manage your support requests</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-scale-in"
            >
              <i className="bi bi-plus-circle-fill"></i>
              New Ticket
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-6 border border-gray-200/50 animate-slide-up">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Tickets', color: 'from-gray-600 to-gray-700' },
              { value: 'open', label: 'Open', color: 'from-blue-600 to-blue-700' },
              { value: 'in_progress', label: 'In Progress', color: 'from-amber-600 to-amber-700' },
              { value: 'resolved', label: 'Resolved', color: 'from-emerald-600 to-emerald-700' },
              { value: 'closed', label: 'Closed', color: 'from-slate-600 to-slate-700' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filterStatus === filter.value
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-75">
                  ({tickets.filter(t => filter.value === 'all' || t.status === filter.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-16 text-center border border-gray-200/50 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-inbox text-5xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No tickets found</h3>
            <p className="text-gray-600 text-lg mb-6">
              {filterStatus === 'all'
                ? "You haven't created any tickets yet. Need help? Create your first ticket!"
                : `No ${filterStatus.replace('_', ' ')} tickets at the moment.`}
            </p>
            {filterStatus === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              >
                <i className="bi bi-plus-circle-fill"></i>
                Create Your First Ticket
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 animate-fade-in">
            {filteredTickets.map((ticket, index) => {
              const categoryConfig = getCategoryConfig(ticket.category);
              const priorityConfig = getPriorityConfig(ticket.priority);

              return (
                <Link
                  key={ticket.id}
                  to={`/ticket/${ticket.id}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-200/50 overflow-hidden animate-slide-up hover:scale-[1.02] transform"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 ${categoryConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <i className={`${categoryConfig.icon} ${categoryConfig.color} text-2xl`}></i>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {ticket.subject}
                          </h3>
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)} flex-shrink-0`}>
                            {ticket.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {ticket.message}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <img
                              src={ticket.user.avatar}
                              alt={ticket.user.username}
                              className="w-7 h-7 rounded-full ring-2 ring-white shadow-sm"
                            />
                            <span className="font-medium text-gray-900">{ticket.user.username}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-gray-600">
                            <i className="bi bi-calendar-event"></i>
                            <span>{new Date(ticket.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>

                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${priorityConfig.bg}`}>
                            <i className={`${priorityConfig.icon} ${priorityConfig.color}`}></i>
                            <span className={`font-medium capitalize ${priorityConfig.color}`}>
                              {ticket.priority}
                            </span>
                          </div>

                          {ticket.assigned && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700">
                              <i className="bi bi-person-check-fill"></i>
                              <span className="font-medium">{ticket.assigned.username}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-gray-600 capitalize">
                            <i className={categoryConfig.icon}></i>
                            <span className="font-medium">{ticket.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <i className="bi bi-arrow-right-circle text-3xl text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowCreateModal(false)}>
          <div className="modal max-w-3xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="bi bi-ticket-perforated text-3xl"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Create Support Ticket</h2>
                    <p className="text-white/90">Our team will respond as soon as possible</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-12 h-12 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center group"
                >
                  <i className="bi bi-x-lg text-2xl group-hover:rotate-90 transition-transform"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateTicket} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <i className="bi bi-tag mr-2"></i>
                    Category
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="input"
                    required
                  >
                    <option value="technical">🔧 Technical Support</option>
                    <option value="content">📚 Content & Quizzes</option>
                    <option value="account">👤 Account Issues</option>
                    <option value="suggestion">💡 Suggestion</option>
                    <option value="report">🚩 Bug Report</option>
                    <option value="other">💬 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <i className="bi bi-exclamation-circle mr-2"></i>
                    Priority Level
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="input"
                    required
                  >
                    <option value="low">🟢 Low - General inquiry</option>
                    <option value="medium">🟡 Medium - Standard issue</option>
                    <option value="high">🔴 High - Urgent help needed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <i className="bi bi-pencil mr-2"></i>
                  Subject
                </label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  className="input"
                  placeholder="Brief description of your issue"
                  required
                  maxLength="200"
                />
                <p className="text-xs text-gray-500 mt-2">Maximum 200 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <i className="bi bi-chat-left-text mr-2"></i>
                  Detailed Description
                </label>
                <textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                  className="input resize-none"
                  rows="8"
                  placeholder="Please provide as much detail as possible about your issue..."
                  required
                  minLength="20"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Minimum 20 characters • {newTicket.message.length}/2000
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline flex-1 py-3 text-base"
                >
                  <i className="bi bi-x-circle"></i>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 flex-1 py-3 text-base shadow-lg"
                >
                  <i className="bi bi-send-fill"></i>
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tickets;
