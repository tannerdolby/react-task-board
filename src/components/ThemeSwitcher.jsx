import { saveTheme } from '../redux/features/task-board-slice';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.taskBoard);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  });

  return (
    <button
      title={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0
      }}
      onClick={() => {
        if (theme === 'dark') {
          dispatch(saveTheme('light'));
          document.body.classList.remove("dark-theme");
        } else {
          dispatch(saveTheme('dark'));
          document.body.classList.add("dark-theme");
        }
      }}
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}

function ThemeIcon({ theme }) {
  const themes = {
    light: '🌙',
    dark: '☀️'
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
