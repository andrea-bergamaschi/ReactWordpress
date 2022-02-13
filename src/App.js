import './App.css';
import axios from 'axios';
import MyHeader from './components/MyHeader';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Taxonomy from './components/Taxonomy';
import Post from './components/Post';
import Page from './components/Page';
import { useEffect, useState } from 'react';
import MyFooter from './components/MyFooter';
import Login from './components/Login';
import Register from './components/Register';
import Info from './components/Info';

function App() {

  const websiteUrl = 'https://reactwordpress.000webhostapp.com';

  const [postRoutes, setPostRoutes] = useState([]);
  const [pageRoutes, setPageRoutes] = useState([]);
  const [categoryRoutes, setCategoryRoutes] = useState([]);
  const [tagRoutes, setTagRoutes] = useState([]);

  
  useEffect(() => {
    let APIpages = `${websiteUrl}/wp-json/wp/v2/pages`;
    axios.get(APIpages)
      .then(response => {
        setPageRoutes(response.data);
      }
      );
  }, [])

  useEffect(() => {
    let APIposts = `${websiteUrl}/wp-json/wp/v2/posts`;
    axios.get(APIposts)
      .then(response => {
        setPostRoutes(response.data);
      }
      );
  }, [])

  useEffect(() => {
    let APIcategories = `${websiteUrl}/wp-json/wp/v2/categories`;
    axios.get(APIcategories)
      .then(response => {
        setCategoryRoutes(response.data);
      }
      );
  }, [])

  useEffect(() => {
    let APItags = `${websiteUrl}/wp-json/wp/v2/tags`;
    axios.get(APItags)
      .then(response => {
        setTagRoutes(response.data);
      }
      );
  }, [])

  return (
    <>
      <MyHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        {postRoutes.map((el, index) => <Route key={index} path={`${el.link.slice(websiteUrl.length)}`} element={<Post data={el} />} />)}
        {pageRoutes.map((el, index) => <Route key={index} path={`${el.link.slice(websiteUrl.length)}`} element={<Page data={el} />} />)}
        {
          categoryRoutes.map((el, index) => <Route key={index} path={`${el.link.slice(websiteUrl.length)}`} element={<Taxonomy type="category" url={el['_links']['wp:post_type'][0].href} />} />
          )}
        {
          tagRoutes.map((el, index) => <Route key={index} path={`${el.link.slice(websiteUrl.length)}`} element={<Taxonomy type="tag" url={el['_links']['wp:post_type'][0].href} />} />
          )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/info" element={<Info />} />
      </Routes>
      <MyFooter/>
    </>
  );
}

export default App;
