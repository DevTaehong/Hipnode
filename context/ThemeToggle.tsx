import Image from 'next/image';
import { useTheme } from '@/context/ThemeProvider';

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <button
      className="mr-6 flex h-6 w-6 items-center justify-center"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {mode === 'light' ? (
        <Image src="/assets/icons/sun.svg" alt="sun" width={20} height={20} />
      ) : (
        <Image src="/assets/icons/moon.svg" alt="moon" width={20} height={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
