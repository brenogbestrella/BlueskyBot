const { main } = require('../../index.js'); 
module.exports = async (req, res) => {
    try {
        await main(); 
        res.status(200).json({ message: 'Cron job executed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error executing cron job', error: error.message });
    }
};
