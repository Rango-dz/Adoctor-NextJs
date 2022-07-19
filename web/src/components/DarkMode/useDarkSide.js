import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useAppContext } from "../../components/Layout";

export default function UseDarkMode(props) {

  const context = useAppContext();
  const setTheme = context[2];
  const theme = context[1];

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);



  return (
    <>
      <button
        type="button"
        onClick={() => { handleThemeSwitch(); props.modeState(theme) }}
        theme={theme}
        className=" bg-moroi-greyblue text-lg p-2 ml-10 mt-5 md:mt-0 rounded-md self-center items-center justify-center transition-custom duration-500 ease-in-out dark:bg-moroi-gray dark:text-colorEight dark:shadow-lg">
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
      </button>
    </>
  )

}
