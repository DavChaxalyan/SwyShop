import React, { useState, useRef, useEffect } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const switcherRef = useRef(null);

  const handleCurrencyChange = (currency) => {
    setActiveCurrency(currency);
    localStorage.setItem("nowCurrency", currency)
    dispatch(setCurrency(currency));
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={switcherRef}>
      <button className={styles.dropdownButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
        {currencyIcons[activeCurrency]} {activeCurrency}
      </button>
      {dropdownOpen && (
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
      )}
    </div>
  );
};

export default CurrencySwitcher;
