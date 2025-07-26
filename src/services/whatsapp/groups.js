require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.WHATSAPP_CHAT_BASE_URL;
const TOKEN = process.env.WHATSAPP_CHAT_TOKEN;

class WhatsappGroupService {
  constructor() {
    this.api = axios.create({
      baseURL: `${BASE_URL}/groups`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Get a list of groups
   */
  async getGroups(limit = 10) {
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
   * Create a new group
   */
  async createGroup(name) {
    try {
      const params = new URLSearchParams({ name });
      const response = await this.api.post('', params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Get group details by ID
   */
  async getGroupById(groupId) {
    try {
      const response = await this.api.get(`/${groupId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Update a group's description
   */
  async updateGroup(groupId, description) {
    try {
      const params = new URLSearchParams({ description });
      const response = await this.api.put(`/${groupId}`, params);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Delete a group
   */
  async deleteGroup(groupId) {
    try {
      const response = await this.api.delete(`/${groupId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

module.exports = WhatsappGroupService;
