import MoonIcon from './icons/MoonIcon';
import { saveTheme } from '../redux/features/task-board-slice';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';

export default function ThemeSwitch({}) {
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector((state) => state.taskBoard);
    return (
        <button
            style={{
                background: 'transparent',
                border: 'none',
                padding: 0
            }}
            onClick={(e) => {
                console.log('ThemeSwitch click', theme);
                if (theme === 'light') {
                    dispatch(saveTheme('dark'));
                    document.body.classList.add("dark-theme");
                } else {
                    dispatch(saveTheme('light'));
                    document.body.classList.remove("dark-theme");
                }
            }}
        >
            {/* TODO: toggle between the two icons
            <!-- moon icon -->
            
            <!-- sun icon -->
            */}
            <MoonIcon />
        </button>
    )
}