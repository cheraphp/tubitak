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
  }, [user, navigate, fetchTicket, fetchMessages]);

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
          is_admin: user.is_admin || false
        }]);

      if (error) throw error;

      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (!ticket) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/tickets" className="btn btn-outline">
              <i className="bi bi-arrow-left"></i>
              Back to Tickets
            </Link>
            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="capitalize">{ticket.category}</span>
                  <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <img src={ticket.user.avatar} alt={ticket.user.username} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">{ticket.user.username}</div>
                    <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Conversation ({messages.length})
                </h3>

                <div className="space-y-4 mb-6">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.user.is_admin ? 'flex-row-reverse' : ''}`}>
                      <img src={msg.user.avatar} alt={msg.user.username} className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className={`flex-1 ${msg.user.is_admin ? 'text-right' : ''}`}>
                        <div className={`inline-block rounded-lg p-3 ${msg.user.is_admin ? 'bg-blue-50' : 'bg-gray-100'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{msg.user.username}</span>
                            {msg.user.is_admin && (
                              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-600 text-white">Admin</span>
                            )}
                            <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {ticket.status !== 'closed' && (
                  <form onSubmit={handleSendMessage}>
                    <div className="flex gap-3">
                      <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="input resize-none"
                          rows="3"
                          placeholder="Type your message..."
                          required
                        ></textarea>
                        <button
                          type="submit"
                          disabled={sending}
                          className="btn btn-primary mt-2"
                        >
                          {sending ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {user.is_admin && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="input"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium capitalize">{ticket.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Priority:</span>
                  <span className="ml-2 font-medium capitalize">{ticket.priority}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-2 font-medium">{new Date(ticket.created_at).toLocaleString()}</span>
                </div>
                {ticket.assigned && (
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <span className="ml-2 font-medium">{ticket.assigned.username}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
