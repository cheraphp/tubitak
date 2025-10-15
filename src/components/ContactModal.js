import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;

      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="bi bi-envelope-fill text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="text-sm opacity-90">Get in touch with us</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <i className="bi bi-info-circle-fill text-blue-600 text-xl flex-shrink-0 mt-0.5"></i>
                <div className="text-sm text-gray-700">
                  <strong className="text-gray-900">Note:</strong> Your message will be reviewed as soon as possible and we will get back to you.
                  For urgent matters, please contact school administration directly.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="bi bi-person mr-2"></i>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="bi bi-envelope mr-2"></i>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="bi bi-tag mr-2"></i>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select a subject</option>
                  <option value="technical">Technical Support</option>
                  <option value="content">Content and Quiz Questions</option>
                  <option value="account">Account Issues</option>
                  <option value="suggestion">Suggestions and Feedback</option>
                  <option value="report">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="bi bi-chat-left-text mr-2"></i>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Write your message here..."
                  className="input resize-none"
                  minLength="10"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Minimum 10 characters
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="bi bi-clock text-primary-600"></i>
                  <span><strong>Response Time:</strong> 1-2 business days</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="bi bi-telephone text-primary-600"></i>
                  <span><strong>Urgent Matters:</strong> Contact school administration</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline flex-1"
                >
                  <i className="bi bi-x-circle"></i>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send"></i>
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <i className="bi bi-check-circle-fill text-green-600 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
              <p className="text-gray-600 mb-2">
                Thank you for your message. We will get back to you as soon as possible.
              </p>
              <p className="text-sm text-gray-500">
                This window will close automatically...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
