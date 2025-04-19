import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import { MdLanguage } from "react-icons/md";


function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const switcherRef = useRef(null);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
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
    <div className={styles.switcherContainer} ref={switcherRef}>
      <button
        className={styles.selectedLanguage}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <MdLanguage style={{fontSize: "22px"}}/>
        {t("language-selector")}
      </button>
      <div
        className={`${styles.languageDropdown} ${dropdownOpen ? styles.languageDropdownOpen : ''}`}
      >
        <button onClick={() => changeLanguage('en')} className={styles.languageOption}>
          English
        </button>
        <button onClick={() => changeLanguage('ru')} className={styles.languageOption}>
          Русский
        </button>
        <button onClick={() => changeLanguage('hy')} className={styles.languageOption}>
          Հայերեն
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
