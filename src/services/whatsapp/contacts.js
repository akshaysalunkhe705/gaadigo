require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.WHATSAPP_CHAT_BASE_URL;
const TOKEN = process.env.WHATSAPP_CHAT_TOKEN;

class WhatsappContactService {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async getActiveContacts(limit = 10) {
    try {
      const response = await this.api.get('', {
        params: {
          active: true,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async createContact({ username, phone_number, avatar_url }) {
    try {
      const params = new URLSearchParams({ username, phone_number, avatar_url });
      const response = await this.api.post('', params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async getContactById(contactId) {
    try {
      const response = await this.api.get(`/${contactId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async updateContact(contactId, displayName) {
    try {
      const params = new URLSearchParams({ display_name: displayName });
      const response = await this.api.put(`/${contactId}`, params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async deleteContact(contactId) {
    try {
      const response = await this.api.delete(`/${contactId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

module.exports = WhatsappContactService;
