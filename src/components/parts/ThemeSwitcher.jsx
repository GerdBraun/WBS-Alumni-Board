const ThemeSwitcher = () => {
  const setTheme = () => {
    if (document.getElementById("themeSwitcher").checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <label htmlFor="themeSwitcher" className="theme-switcher flex items-center">
      <span className="mr-2">☀️</span>
      <input
        type="checkbox"
        className="toggle"
        id="themeSwitcher"
        defaultChecked={localStorage.getItem("theme") === "dark"}
        onChange={() => setTheme()}
      />
       <span className="ml-2">🌙</span>
       </label>
  );
};

export default ThemeSwitcher;
