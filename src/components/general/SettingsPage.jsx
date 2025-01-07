import ThemeSwitcher from "../parts/ThemeSwitcher";

const SettingsPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <ThemeSwitcher />
    </div>
  );
};

export default SettingsPage;
