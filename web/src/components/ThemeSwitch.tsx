import { useTheme } from 'next-themes';
import React from 'react';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="theme-switcher"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <img />
    </button>
  );
};

export default ThemeSwitch;
