import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'


  class Content extends Component{
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




changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}





save = ()=> {
  let obj = {};
  obj.firstName = this.state.firstName;
  obj.secondName = this.state.secondName;
  obj.age = this.state.age;
  var msg = ['Detail of messages'];
  obj.msg = msg;
  
  var key = firebase.database().ref('bioData').push().key
  obj.key = key
  firebase.database().ref('bioData').child(key).set(obj)
  alert('saved successfully')
 this.setState({firstName:'', secondName:'',age:''}) 

 console.log(obj)
}





getData = ()=>{
  // firebase.database().ref('bioData').on('child_added' , (data)=> { console.log(data.val())}  )
this.setState({status:true})
}


componentDidMount(){
  firebase.database().ref('bioData').on('child_added' , (data)=> { 
    this.state.objects.push(data.val())

  }  ) 
}



saveValue = ()=>{
  var val = document.getElementById('selected').value
  var message = this.state.message;
  var reqOjb = this.state.objects.find( (x)=>{return x.firstName === val}  )
  
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


  
// reqOjb.message.push(message)
console.log(this.state.objects)
  // console.log(reqOjb.key)
  


}




getMessages = ()=>{
  var val = document.getElementById('selectMsg').value
  var reqOjb = this.state.objects.find( (x)=>{return x.firstName === val}  )

  if('msg' in reqOjb && reqOjb.msg.length > 1){
   var savedMsg = reqOjb.msg;
   this.setState({renderMsg: savedMsg, renderMstStatus:true, noData:null})
  //  console.log()

  }else {
    
    var noDataFound = 'No data found'
    this.setState({noData: noDataFound, renderMstStatus:false})
    console.log(noDataFound)
    
  }



}


  render(){
    let obb = {name:'honda', color:'green', model:'2008', capacity:'1300cc'}
    let {name,color,model,capacity} = obb
    return (
    <div>
    <h2>Add new Account</h2>
    <input type='text'  value={this.state.firstName} name='firstName' onChange={this.changeHandler} placeholder='First Name' />  <br/>
    <input type='text' value={this.state.secondName} name='secondName' onChange={this.changeHandler} placeholder='Second Name' /> <br/>
    <input type='text' value={this.state.age} name='age' onChange={this.changeHandler} placeholder='Age' /><br/> 
    <button onClick={this.save}>Save</button>


<br/><br/><br/><br/>


    <h2>To save more data</h2>
    <button onClick={this.getData}>Select Account</button> <br/>
    <select id='selected'>  {this.state.objects.map(  (item,i)=>{ return <option key={i}>{item.firstName}</option>}  )}   </select>  <br/>
    <input type='text' value={this.state.message} name='message' onChange={this.changeHandler} placeholder='Put the Message'/> <br/>

    <button onClick={this.saveValue}>save msg</button>




    <br/><br/><br/><br/>



    <h2>To Get saved data</h2>
    <button onClick={this.getData}>Select Account</button> <br/>
    <select id='selectMsg'>  {this.state.objects.map(  (item,i)=>{ return <option key={i}>{item.firstName}</option>}  )}   </select>  <br/>
    <button onClick={this.getMessages}>Get Messages</button>
    


    <div className={this.state.renderMstStatus === true ? '' : 'display'}>
     <ul> {this.state.renderMsg.map(  (item,i)=>{return <li key={i}>{item}</li>}  )} </ul>
    </div>

     <h4 className={this.state.noData === null ? 'display' : ''}>
        {this.state.noData}
     </h4>



    </div>
  );
}
}

export default Content;
