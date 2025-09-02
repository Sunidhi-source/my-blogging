import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.jsx'
import Admin_layout from './Admin/Admin_layout.jsx'
import Articles from './Admin/Articles.jsx'
import Categories from './Admin/Categories.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import User from './Admin/User.jsx'
import About from './App/About.jsx'
import Blog from './App/Blog.jsx'
import Contact from './App/Contact.jsx'
import Home from './App/Home.jsx'
import Post from './App/Post.jsx'
import Auth_layout from './Auth/Auth_layout.jsx'
import Forgot from './Auth/Forgot.jsx'
import Reset from './Auth/Reset.jsx'
import Signin from './Auth/Signin.jsx'
import Signup from './Auth/Signup.jsx'
import Account from './User/Account.jsx'
import NewArticle from './User/NewArticle.jsx'
import UpdateArticle from './User/UpdateArticle.jsx';
import MyArticles from './User/Articles.jsx'
import User_layout from './User/User_layout.jsx'
import { AuthProvider, useAuth } from './Context/AuthContext.jsx';
import { AdminProvider, useAdmin } from './Context/AdminContext.jsx';
import AuthorsPage from './App/AuthorsPage.jsx';
import CategoryPage from './App/CategoryPage.jsx';
import AuthorArticles from './Components/AuthorArticles.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
<Routes>

<Route path='/' element={<AuthProvider><AdminProvider><App/></AdminProvider></AuthProvider>}>
<Route index element={<Home/>}></Route>
<Route path='about/' element={<About/>}></Route>
<Route path='blog/:type' element={<Blog/>}></Route>
<Route path='contact/' element={<Contact/>}></Route>
<Route path='post/:id' element={<Post/>}></Route>
<Route path='authors/' element={<AuthorsPage/>}></Route>
<Route path='authorarticles/:id' element={<AuthorArticles/>}></Route>
<Route path='categories/' element={<CategoryPage/>}></Route>
</Route>
  
<Route path='user/' element={<AuthProvider><User_layout/></AuthProvider>}>
<Route index element={<Account/>}></Route>
<Route path='addarticle/' element={<NewArticle/>}></Route>
<Route path='articles/' element={<MyArticles/>}></Route>
<Route path='edit/:id' element={<UpdateArticle/>}></Route>

</Route>

<Route path='admin/' element={<AdminProvider><Admin_layout/></AdminProvider>}>
<Route index element={<Dashboard/>}></Route>
<Route path='articles/' element={<Articles/>}></Route>
<Route path='categories/' element={<Categories/>}></Route>
<Route path='user/' element={<User/>}></Route>
</Route>

<Route path='auth/' element={<AuthProvider><AdminProvider><Auth_layout/></AdminProvider></AuthProvider>}>
<Route index element={<Signin/>}></Route>
<Route path='forgot/' element={<Forgot/>}></Route>
<Route path='reset/' element={<Reset/>}></Route>
<Route path='signup/' element={<Signup/>}></Route>
</Route>
 
</Routes>
  </BrowserRouter>
  </StrictMode>,
)
