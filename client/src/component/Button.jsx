import React from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaPaperPlane, FaFolderOpen } from "react-icons/fa";

const Button = ({ type, onClick, children, icon, className, submit }) => {
  const baseStyle = "px-4 font-semibold rounded inline-flex items-center";
  const typeStyles = {
    edit: "bg-slate-blue text-white-second hover:bg-blue-700 py-1",
    delete: "bg-red-500 text-white-second hover:bg-red-700 py-1",
    submit:
      "bg-slate-blue dark:bg-cyber-blue text-white hover:bg-green-700 w-full justify-center py-2",
    open: "bg-yellow-500 text-white hover:bg-yellow-700 py-2",
  };

  const IconComponent =
    icon ||
    {
      edit: FaEdit,
      delete: FaTrash,
      submit: FaPaperPlane,
      open: FaFolderOpen,
    }[type];

  const buttonStyle = `${baseStyle} ${typeStyles[type] || ""} ${className}`;

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {IconComponent && <IconComponent className="mr-2" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["edit", "delete", "submit", "open"]).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  children: null,
  icon: null,
  className: "",
};

export default Button;
