import { IoSunnySharp } from "react-icons/io5";
import { RiMoonClearFill } from "react-icons/ri";
import { useTheme } from "../context/theme";

const ToggleMode = () => {
  const { mode, toggleTheme } = useTheme();

  const toggleSwitch = () => {
    toggleTheme();
  };

  return (
    <div
      onClick={toggleSwitch}
      style={{ cursor: "pointer" }}
      className="flex justify-center items-center p-2
     rounded-full bg-slate-blue dark:bg-cyber-blue"
    >
      {mode === "dark" ? (
        <IoSunnySharp className="text-text-dark text-lg" />
      ) : (
        <RiMoonClearFill className="text-text-light text-lg" />
      )}
    </div>
  );
};

export default ToggleMode;
