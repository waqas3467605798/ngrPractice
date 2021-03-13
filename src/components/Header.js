import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link} from 'react-router-dom'

  class Header extends Component{
      constructor(){
          super();
          this.state = {
            
          }
      }



     


  render(){
    
    return (
    
    
    <div>
    
      <div id='div1'> 
     Reminder Book
      </div>


      <div id='div2'>
     <Link to='/' style={{textDecoration:'none', marginRight:'50px'}}> Add Segment</Link>
     <Link to='/SaveData' style={{textDecoration:'none', marginRight:'50px'}}> Save Data </Link>
     <Link to='/GetData' style={{textDecoration:'none', marginRight:'50px'}}> Reports </Link>
    
      </div>
    
    </div>
  );
}
}

export default Header;
