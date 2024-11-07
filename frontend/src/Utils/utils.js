import { jwtDecode } from "jwt-decode";

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

export const formatCurrency = (amount, currencyCode) => {
    let currencySymbol;
  
    switch (currencyCode) {
      case 'USD':
        currencySymbol = '$';
        break;
      case 'RUB':
        currencySymbol = '₽';
        break;
      case 'AMD':
        currencySymbol = '֏';
        break;
      default:
        console.error("Invalid or unsupported currency code:", currencyCode);
        return amount.toFixed(2);
    }
  
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount).replace(currencyCode, currencySymbol);
  };

export const priceFix = (currency, price, exchangeRates) => {
  return Math.round((currency === 'USD' ? price : price * (exchangeRates[currency] || 1)) * 10) / 10
}