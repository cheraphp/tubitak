import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

function TicketDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const fetchTicket = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          user:users!tickets_user_id_fkey(username, avatar),
          assigned:users!tickets_assigned_to_fkey(username, avatar)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        navigate('/tickets');
        return;
      }

      if (!user.is_admin && data.user_id !== user.id) {
        navigate('/tickets');
        return;
      }

      setTicket(data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate, user]);

  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ticket_messages')
        .select(`
          *,
          user:users(username, avatar, is_admin)
        `)
        .eq('ticket_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [id]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchTicket();
    fetchMessages();
  }, [id, user, navigate, fetchTicket, fetchMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('ticket_messages')
        .insert([{
          ticket_id: id,
          user_id: user.id,
          message: newMessage,
          is_admin: user.is_admin
        }]);

      if (error) throw error;

      await supabase
        .from('tickets')
        .update({
          updated_at: new Date().toISOString(),
          status: ticket.status === 'resolved' || ticket.status === 'closed' ? 'open' : ticket.status
        })
        .eq('id', id);

      setNewMessage('');
      fetchMessages();
      fetchTicket();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchTicket();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status: ' + error.message);
    }
  };

  const handleAssignTicket = async () => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({
          assigned_to: user.id,
          status: 'in_progress'
        })
        .eq('id', id);

      if (error) throw error;
      fetchTicket();
    } catch (error) {
      console.error('Error assigning ticket:', error);
      alert('Error assigning ticket: ' + error.message);
    }
  };

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
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/tickets" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-ticket-perforated-fill text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gradient">Ticket #{ticket.id.slice(0, 8)}</span>
              </Link>
            </div>
            <Link to="/tickets" className="btn btn-outline">
              <i className="bi bi-arrow-left"></i>
              Back to Tickets
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{ticket.subject}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority} priority
                </span>
                <span className="text-gray-500 capitalize">{ticket.category}</span>
              </div>
            </div>

            {user.is_admin && (
              <div className="flex gap-2">
                {!ticket.assigned_to && (
                  <button
                    onClick={handleAssignTicket}
                    className="btn btn-outline"
                  >
                    <i className="bi bi-person-plus"></i>
                    Assign to Me
                  </button>
                )}
                <select
                  value={ticket.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="input"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <img
                src={ticket.user.avatar}
                alt={ticket.user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{ticket.user.username}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(ticket.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{ticket.message}</p>
              </div>
            </div>
          </div>

          {ticket.assigned && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2 text-sm">
              <i className="bi bi-person-check text-blue-600"></i>
              <span className="text-blue-900">
                Assigned to <strong>{ticket.assigned.username}</strong>
              </span>
            </div>
          )}
        </div>

        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            <i className="bi bi-chat-left-text mr-2"></i>
            Messages
          </h2>

          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="bi bi-chat text-4xl mb-2"></i>
              <p>No messages yet. Be the first to reply!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.user.is_admin ? 'flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={msg.user.avatar}
                    alt={msg.user.username}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className={`flex-1 ${msg.user.is_admin ? 'text-right' : ''}`}>
                    <div className={`inline-block rounded-lg p-3 ${
                      msg.user.is_admin
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{msg.user.username}</span>
                        {msg.user.is_admin && (
                          <span className="px-2 py-0.5 bg-white/20 rounded text-xs">Admin</span>
                        )}
                      </div>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.user.is_admin ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {ticket.status !== 'closed' && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reply</h3>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="input resize-none"
                rows="4"
                placeholder="Type your message..."
                required
                minLength="5"
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sending || !newMessage.trim()}
              >
                {sending ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
