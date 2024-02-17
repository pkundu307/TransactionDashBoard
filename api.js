const axios = require('axios');

async function fetchData() {
  try {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchMonthlySales(month) {
  try {
    const data = await fetchData();
    const filteredData = data.filter(item => {
      const date = new Date(item.dateOfSale);
      return date.getMonth() === month - 1 && item.sold;
    });
    const totalSaleAmount = filteredData.reduce((total, item) => total + item.price, 0);
    return totalSaleAmount;
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    throw error;
  }
}
async function fetchMonthlySoldItems(month) {
  try {
    const data = await fetchData();
    const filteredData = data.filter(item => {
      const date = new Date(item.dateOfSale);
      return date.getMonth() === month - 1 && item.sold;
    });
    const totalSoldItems = filteredData.length;
    return totalSoldItems;
  } catch (error) {
    console.error('Error fetching monthly sold items:', error);
    throw error;
  }
}
async function fetchMonthlyUnsoldItems(month) {
  try {
    const data = await fetchData();
    const filteredData = data.filter(item => {
      const date = new Date(item.dateOfSale);
      return date.getMonth() === month - 1 && !item.sold;
    });
    const totalUnsoldItems = filteredData.length;
    return totalUnsoldItems;
  } catch (error) {
    console.error('Error fetching monthly unsold items:', error);
    throw error;
  }
}

async function fetchMonthlyPriceRangeItems(month) {
  try {
    const data = await fetchData();
    const filteredData = data.filter(item => {
      const date = new Date(item.dateOfSale);
      return date.getMonth() === month - 1;
    });

    const priceRanges = [
      { min: 0, max: 100, count: 0 },
      { min: 101, max: 200, count: 0 },
      { min: 201, max: 300, count: 0 },
      { min: 301, max: 400, count: 0 },
      { min: 401, max: 500, count: 0 },
      { min: 501, max: 600, count: 0 },
      { min: 601, max: 700, count: 0 },
      { min: 701, max: 800, count: 0 },
      { min: 801, max: 900, count: 0 },
      { min: 901, max: Infinity, count: 0 },
    ];

    for (const item of filteredData) {
      for (const range of priceRanges) {
        if (item.price >= range.min && item.price <= range.max) {
          range.count++;
          break;
        }
      }
    }

    return priceRanges;
  } catch (error) {
    console.error('Error fetching monthly price range items:', error);
    throw error;
  }
}

async function fetchMonthlyCategoryItems(month) {
  try {
    const data = await fetchData();
    const filteredData = data.filter(item => {
      const date = new Date(item.dateOfSale);
      return date.getMonth() === month - 1;
    });

    const categories = {};

    for (const item of filteredData) {
      if (categories[item.category]) {
        categories[item.category]++;
      } else {
        categories[item.category] = 1;
      }
    }

    return categories;
  } catch (error) {
    console.error('Error fetching monthly category items:', error);
    throw error;
  }
}

module.exports = { fetchData,fetchMonthlyCategoryItems, fetchMonthlySales,fetchMonthlyPriceRangeItems  ,fetchMonthlySoldItems,fetchMonthlyUnsoldItems};