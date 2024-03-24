import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import NewsList from './components/NewsList/NewsList';
import NewsDetail from "./components/NewsList/NewsDetail/NewsDetail";
import UsersList from "./components/UsersList/UsersList";
import UserDetail from "./components/UsersList/UserDetail/UserDetail";
import LoginLayout from "./components/layouts/LoginLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./components/login/Login";

const App = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LoginLayout><Login/></LoginLayout>}/>
          <Route path="/news" element={<DefaultLayout><NewsList/></DefaultLayout>}/>
          <Route path="/news/:id" element={<DefaultLayout><NewsDetail/></DefaultLayout>}/>
          <Route path="/users" element={<DefaultLayout><UsersList/></DefaultLayout>}/>
          <Route path="/users/:id" element={<DefaultLayout><UserDetail/></DefaultLayout>}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
