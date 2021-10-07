import React from 'react';
import '../styles/tailwind.css';
import './global.css';
import 'highlight.js/styles/stackoverflow-dark.css';

const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
