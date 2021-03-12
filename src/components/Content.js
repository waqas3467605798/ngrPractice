import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'


  class Content extends Component{
      constructor(){
          super();
          this.state = {
            firstName:'',
            // secondName:'',
            // age:'',
            message:'',
            objects:[],
            status:false,
            renderMsg:[],
            renderMstStatus:false,
            noData:null
            
          }
      }



      componentDidMount(){
        firebase.database().ref('bioData').on('child_added' , (data)=> { 
          this.state.objects.push(data.val())
      
        }  ) 
      }
      



changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}





save = ()=> {
  let obj = {};
  obj.firstName = this.state.firstName;
  // obj.secondName = this.state.secondName;
  // obj.age = this.state.age;
  var msg = ['Below are detail of your saved messages'];
  obj.msg = msg;
  
  var key = firebase.database().ref('bioData').push().key
  obj.key = key
  firebase.database().ref('bioData').child(key).set(obj)
  alert('saved successfully')
 this.setState({firstName:'', secondName:'',age:''}) 

 
}





getData = ()=>{
this.setState({status:true})        //As status true, the render function will run again
}









  render(){
    
    return (
    
    
    <div>
    {/* Add new Account */}
    <br/><br/><br/>
    <h2 className='headings'>Please write below your segment Name and Press Save button</h2> <br/>
    <input type='text'  value={this.state.firstName} name='firstName' onChange={this.changeHandler} placeholder='Please Add your Segment Name' />  <br/>
    {/* <input type='text' value={this.state.secondName} name='secondName' onChange={this.changeHandler} placeholder='Second Name' /> <br/>
    <input type='text' value={this.state.age} name='age' onChange={this.changeHandler} placeholder='Age' /><br/>  */}
    {/* <button onClick={this.save}>Save</button> */}
    <button class="waves-effect waves-light btn" onClick={this.save}>Save</button>



    </div>
  );
}
}

export default Content;
