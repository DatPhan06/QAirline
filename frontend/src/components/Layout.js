import React from "react";
import ChatBot from "./ChatBot";

/**
 * Layout component that wraps its children and includes a ChatBot component.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <ChatBot />
    </div>
  );
};

export default Layout;
