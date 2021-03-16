import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import M from "materialize-css";


  class SaveData extends Component{
      constructor(){
          super();
          this.state = {
            firstName:'',
            secondName:'',
            age:'',
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

// setTimeout(( )=>{ this.setState({status:!this.state.status})},1000)

      }
      



changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}




getData = ()=>{
  // firebase.database().ref('bioData').on('child_added' , (data)=> { console.log(data.val())}  )
this.setState({status:true})        //As status true, the render function will run again
}





saveValue = ()=>{
  // var val = document.getElementById('selected').value
  // var reqOjb = this.state.objects.find( (x)=>{return x.firstName === val}  )
 
  var objIndex = document.getElementById('selected_save1').selectedIndex
  var reqOjb = this.state.objects[objIndex]


  var message = this.state.message;
  
  if('msg' in reqOjb){
    reqOjb.msg.push(message)

    firebase.database().ref('bioData').child(reqOjb.key).set(reqOjb)

    alert('Your message successfully saved..!')
    this.setState({message:''})

  }else {
    var msg = [];
    msg.push(message)
    reqOjb.msg = msg
    firebase.database().ref('bioData').child(reqOjb.key).set(reqOjb)

    alert('Your message successfully saved..!')
    this.setState({message:''})
  }
}






  render(){
    
    return (
    
    
    <div>
    


      {/* Save messages */}
      <br/><br/><br/>
    <h2 className='headings'>Click on select Account, write your message for selected account and press save button</h2>
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Account</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save1'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.firstName}</option>}  )}   </select> </div> <br/>
    <input type='text' value={this.state.message} name='message' onChange={this.changeHandler} placeholder='Put the Message'/> <br/>

    {/* <button onClick={this.saveValue}>save msg</button> */}
    <button className="waves-effect waves-light btn" onClick={this.saveValue}>Save</button>



  </div>
  );
}
}

export default SaveData;
