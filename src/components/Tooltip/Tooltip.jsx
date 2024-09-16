import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const Tooltip = ({ children, tooltip }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const handleScroll = () => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const headerHeight = 60;

      if (
        rect.top < headerHeight ||
        rect.left < 0 ||
        rect.bottom > (window.innerHeight || document.documentElement.clientHeight) ||
        rect.right > (window.innerWidth || document.documentElement.clientWidth)
      ) {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    } else {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    <div className={styles.tooltip} onClick={handleToggle} ref={tooltipRef}>
      {children}
      {isVisible && <span className={styles.tooltiptext}>{tooltip}</span>}
    </div>
  );
};

export default Tooltip;
