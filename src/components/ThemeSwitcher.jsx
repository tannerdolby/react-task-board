import { saveTheme } from '../redux/features/task-board-slice';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function hasDarkModeSystemTheme() {
  return (
    window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export default function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.taskBoard);
  
  useEffect(() => {
    if (hasDarkModeSystemTheme()) {
      dispatch(saveTheme("dark"));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('system theme', hasDarkModeSystemTheme());
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }, [theme]);

  return (
    <button
      title={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        outline: 'none'
      }}
      onClick={() => {
        if (theme === 'dark') {
          dispatch(saveTheme('light'));
        } else {
          dispatch(saveTheme('dark'));
        }
      }}
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}

function ThemeIcon({ theme }) {
  const themes = {
    dark: '🌙',
    light: '☀️'
  };

  if (Object.hasOwn(themes, theme)) {
    return (
      <span className="theme-icon">{themes[theme]}</span>
    )
  }

  return null;
}

ThemeIcon.propTypes = {
  theme: PropTypes.string,
}
