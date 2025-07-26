require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.WHATSAPP_CHAT_BASE_URL;
const TOKEN = process.env.WHATSAPP_CHAT_TOKEN;

class WhatsappMessageService {
  constructor() {
    this.api = axios.create({
      baseURL: `${BASE_URL}/messages`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Get messages by conversation ID
   */
  async getMessages(conversationId, limit = 10) {
    try {
      const response = await this.api.get('', {
        params: {
          conversation_id: conversationId,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Send a new message to a conversation
   */
  async sendMessage(conversationId, message) {
    try {
      const params = new URLSearchParams({
        conversation_id: conversationId,
        message,
      });
      const response = await this.api.post('', params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Get a message by its ID
   */
  async getMessageById(messageId) {
    try {
      const response = await this.api.get(`/${messageId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * React to a message (e.g., add red_angry_face reaction)
   */
  async updateMessageReaction(messageId, reactionType, user) {
    try {
      const params = new URLSearchParams();
      params.append(`reactions[${reactionType}][]`, user);

      const response = await this.api.put(`/${messageId}`, params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Delete a message by ID
   */
  async deleteMessage(messageId) {
    try {
      const response = await this.api.delete(`/${messageId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

module.exports = WhatsappMessageService;
