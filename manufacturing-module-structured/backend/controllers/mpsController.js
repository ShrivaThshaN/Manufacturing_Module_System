const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

const mpsFile = path.join(__dirname, '../data/mpsData.json');

exports.getMpsData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM MPS ORDER BY id ASC');
    const rows = result.rows;

    // ✅ Convert snake_case -> camelCase for frontend
    const camelCaseData = rows.map(row => ({
      id: row.id,
      productName: row.product_name,
      workOrderId: row.work_order_id,
      quantity: row.quantity,
      dueDate: row.due_date,
      status: row.status
    }));

    // Save to file in camelCase too
    fs.writeFileSync(mpsFile, JSON.stringify(camelCaseData, null, 2));

    res.json(camelCaseData);
  } catch (err) {
    console.error("Error fetching MPS data:", err);
    res.status(500).json({ error: 'Failed to fetch MPS data' });
  }
};
