require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const BASE_URL = process.env.WHATSAPP_CHAT_BASE_URL;
const TOKEN = process.env.WHATSAPP_CHAT_TOKEN;

class WhatsappAttachmentService {
  constructor() {
    this.api = axios.create({
      baseURL: `${BASE_URL}/attachments`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }

  /**
   * Get attachments by conversation ID
   */
  async getAttachments(conversationId, limit = 10) {
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
   * Upload a file as attachment
   * @param {string} filePath - Path to the file (e.g., ../Invoice.pdf)
   */
  async uploadAttachment(filePath) {
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));

      const response = await axios.post(`${BASE_URL}/attachments`, form, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          ...form.getHeaders(),
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Get attachment by ID
   */
  async getAttachmentById(attachmentId) {
    try {
      const response = await this.api.get(`/${attachmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Update attachment filename
   */
  async updateAttachment(attachmentId, newFilename) {
    try {
      const params = new URLSearchParams({ filename: newFilename });
      const response = await this.api.put(`/${attachmentId}`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Delete an attachment
   */
  async deleteAttachment(attachmentId) {
    try {
      const response = await this.api.delete(`/${attachmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

module.exports = WhatsappAttachmentService;
