import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import './index.less';
import './index.styl';
import './fonts/iconfont.css'
console.log(1+2,'ppp');
const a = [1,23];
const  b = ()=>{
    a.reduce((c,d)=>c+d,0)();
} 
if(module.hot){
    module.hot.accept('./App.js')
}
// b();
// 2.slice(1);
// import './index.sass'
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
