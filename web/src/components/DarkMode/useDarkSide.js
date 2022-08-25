import React, { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLocalStorage } from '../../useLocalStorage';

export default function UseDarkMode(props) {

  const [theme, setTheme] = useLocalStorage("theme", "light");


  const handleThemeSwitch = () => {
    setTheme(theme === 'light' || theme === null ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light' || theme === null) {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);



  return (
    <>
      <button
        type="button"
        onClick={() => { handleThemeSwitch(); props.modeState(theme) }}
        theme={theme}
        name={`Switch to ${theme} Theme`}
        aria-label="Switch theme color"
        className=" bg-moroi-greyblue text-lg p-2 ml-10 mt-5 md:mt-0 rounded-md self-center items-center justify-center transition-custom duration-500 ease-in-out dark:bg-moroi-gray dark:text-colorEight dark:shadow-lg">
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
      </button>
    </>
  )

}
