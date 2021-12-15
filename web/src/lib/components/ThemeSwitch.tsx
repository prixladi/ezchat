import { useTheme } from 'next-themes';
import React from 'react';
import Image from 'next/image';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Image alt="theme switch" src="/assets/moon.svg" width="3rem" height="3rem" />
    </button>
  );
};

export default ThemeSwitch;
