import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../redux/actions/currencyActions';
import styles from './CurrencySwitcher.module.css';

const currencyIcons = {
  USD: '💵',
  RUB: '💶',
  AMD: '💷'
};

const CurrencySwitcher = () => {
  const dispatch = useDispatch();
  const [activeCurrency, setActiveCurrency] = useState(localStorage.getItem("nowCurrency") || 'USD');

  const handleCurrencyChange = (currency) => {
    setActiveCurrency(currency);
    localStorage.setItem("nowCurrency", currency)
    dispatch(setCurrency(currency));
  };

  return (
    <div className={styles.container}>
      <button className={styles.dropdownButton}>
        {currencyIcons[activeCurrency]} {activeCurrency}
      </button>
      <div className={styles.dropdownContent}>
        {['USD', 'RUB', 'AMD'].map((currency) => (
          <button
            key={currency}
            onClick={() => handleCurrencyChange(currency)}
          >
            {currencyIcons[currency]} {currency}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySwitcher;
