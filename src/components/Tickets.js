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
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical': return 'bi-wrench';
      case 'content': return 'bi-book';
      case 'account': return 'bi-person-circle';
      case 'suggestion': return 'bi-lightbulb';
      case 'report': return 'bi-flag';
      default: return 'bi-chat-dots';
    }
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
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-ticket-perforated-fill text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gradient">Support Tickets</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {user?.is_admin && (
                <Link to="/admin" className="btn btn-outline">
                  <i className="bi bi-shield-lock"></i>
                  Admin Panel
                </Link>
              )}
              <Link to="/" className="btn btn-outline">
                <i className="bi bi-arrow-left"></i>
                Back
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage your support requests</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            <i className="bi bi-plus-lg"></i>
            Create Ticket
          </button>
        </div>

        <div className="card p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('open')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'open'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'in_progress'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'resolved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Resolved
            </button>
            <button
              onClick={() => setFilterStatus('closed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'closed'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="card p-12 text-center">
            <i className="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600">
              {filterStatus === 'all'
                ? "You haven't created any tickets yet."
                : `No ${filterStatus} tickets found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/ticket/${ticket.id}`}
                className="card p-6 hover:shadow-lg transition-all block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <i className={`${getCategoryIcon(ticket.category)} text-primary-600 text-xl`}></i>
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {ticket.subject}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {ticket.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <img
                          src={ticket.user.avatar}
                          alt={ticket.user.username}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{ticket.user.username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="bi bi-calendar"></i>
                        <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className={`flex items-center gap-1 ${getPriorityColor(ticket.priority)}`}>
                        <i className="bi bi-exclamation-circle-fill"></i>
                        <span className="capitalize">{ticket.priority} priority</span>
                      </div>
                      {ticket.assigned && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <i className="bi bi-person-check"></i>
                          <span>Assigned to {ticket.assigned.username}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <i className="bi bi-chevron-right text-gray-400 text-xl flex-shrink-0"></i>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="bi bi-ticket-perforated text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Create Support Ticket</h2>
                    <p className="text-sm opacity-90">We'll help you as soon as possible</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <i className="bi bi-x-lg text-xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateTicket} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="input"
                    required
                  >
                    <option value="technical">Technical Support</option>
                    <option value="content">Content & Quizzes</option>
                    <option value="account">Account Issues</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="report">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="input"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                  className="input resize-none"
                  rows="6"
                  placeholder="Provide details about your issue..."
                  required
                  minLength="20"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">Minimum 20 characters</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  <i className="bi bi-check-lg"></i>
                  Create Ticket
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
