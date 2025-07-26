const fs = require('fs');
const path = require('path');

/**
 * Save webhook payload as a .txt file
 * @param {Object} data - The full webhook JSON payload
 */
const saveWebhookToFile = async (data) => {
  try {
    if (!data?.payload?.id) {
      throw new Error('Invalid webhook data: Missing payload.id');
    }

    const filename = `message_${data.payload.id}.txt`;
    const dirPath = path.join(__dirname, '..', 'webhooks');
    const filePath = path.join(dirPath, filename);

    // Ensure the directory exists
    fs.mkdirSync(dirPath, { recursive: true });

    const content = JSON.stringify(data, null, 2);

    // Write to file
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`✅ Webhook saved to: ${filePath}`);
    return { success: true, filename };
  } catch (error) {
    console.error('❌ Failed to save webhook:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = saveWebhookToFile;
