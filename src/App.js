import react, {Component} from 'react'
import Content from './components/Content'
import Header from './components/Header'
import './App.css';
import {BrowserRouter} from 'react-router-dom'





  class App extends Component{

  render(){
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <Content />
    </div>
    </BrowserRouter>
  );
}
}

export default App;
