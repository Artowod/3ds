// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import "./App.css";

import { LandingPage } from "pages";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div id="App" className="App">
      <Toaster position="top-right" />
      <div className="App_main">
          <Suspense fallback={<span>Loading...</span>}>
            <Routes>
              <Route path={"/"} element={<LandingPage />} />
            </Routes>
          </Suspense>
      </div>
    </div>
  );
}

export default App;
