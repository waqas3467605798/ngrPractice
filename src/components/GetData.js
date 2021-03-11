import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'


  class GetData extends Component{
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


getMessages = ()=>{
  // var val = document.getElementById('selectMsg').value
  // var reqOjb = this.state.objects.find( (x)=>{return x.firstName === val}  )

  
  var objIndex = document.getElementById('selectMsg').selectedIndex
  var reqOjb = this.state.objects[objIndex]

  if('msg' in reqOjb && reqOjb.msg.length > 1){
   var savedMsg = reqOjb.msg;
   this.setState({renderMsg: savedMsg, renderMstStatus:true, noData:null})
  

  }
  else{
    
    var noDataFound = 'No data found'
    this.setState({noData: noDataFound, renderMstStatus:false})
    console.log(noDataFound)
    
  }



}




  render(){
    
    return (
    
    
    <div>
    
  
    {/* Get Messages */}
    <h2 className='headings'>To Get saved data</h2>
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Account</button> <br/>
    <div className='selectWidth'><select className='browser-default' id='selectMsg'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.firstName}</option>}  )}   </select> </div> <br/>
    {/* <button onClick={this.getMessages}>Get Messages</button> */}
    <button class="waves-effect waves-light btn" onClick={this.getMessages}>Get Messages</button>


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

export default GetData;
