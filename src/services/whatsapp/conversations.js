require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.WHATSAPP_CHAT_BASE_URL;
const TOKEN = process.env.WHATSAPP_CHAT_TOKEN;

class WhatsappConversationService {
  constructor() {
    this.api = axios.create({
      baseURL: `${BASE_URL}/conversations`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Get a list of conversations
   */
  async getConversations(limit = 10) {
    try {
      const response = await this.api.get('', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Create a new conversation with contact_id
   */
  async createConversation(contactId) {
    try {
      const params = new URLSearchParams({ contact_id: contactId });
      const response = await this.api.post('', params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Get a conversation by ID
   */
  async getConversationById(conversationId) {
    try {
      const response = await this.api.get(`/${conversationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Update a conversation (e.g., mute it)
   */
  async updateConversation(conversationId, isMuted = true) {
    try {
      const params = new URLSearchParams({ is_muted: isMuted });
      const response = await this.api.put(`/${conversationId}`, params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Delete a conversation by ID
   */
  async deleteConversation(conversationId) {
    try {
      const response = await this.api.delete(`/${conversationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

module.exports = WhatsappConversationService;
