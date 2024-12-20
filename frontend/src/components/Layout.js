import React from "react";
import ChatBot from "./ChatBot";

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <ChatBot />
    </div>
  );
};

export default Layout;
