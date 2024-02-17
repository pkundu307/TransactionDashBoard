const express = require('express');
const { fetchData,fetchMonthlySales,fetchMonthlyCategoryItems , fetchMonthlySoldItems, fetchMonthlyUnsoldItems, fetchMonthlyPriceRangeItems  } = require('./api');

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/sales/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const totalSaleAmount = await fetchMonthlySales(month);
    res.json({ totalSaleAmount });
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/sold/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const totalSoldItems = await fetchMonthlySoldItems(month);
    res.json({ totalSoldItems });
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/unsold/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const totalUnsoldItems = await fetchMonthlyUnsoldItems(month);
    res.json({ totalUnsoldItems });
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/price-range/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const priceRanges = await fetchMonthlyPriceRangeItems(month);
    res.json(priceRanges);
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/category/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const categories = await fetchMonthlyCategoryItems(month);
    res.json(categories);
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;