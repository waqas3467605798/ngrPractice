import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'


  class GetData extends Component{
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
            noData:null,
            closingStatus:false
            
          }
      }



      componentDidMount(){
        firebase.database().ref('bioData').on('child_added' , (data)=> { 
          this.state.objects.push(data.val())

      
        }  ) 

        // setTimeout(()=>{ this.setState({status:!this.state.status})},1000)
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

  if('msg' in reqOjb){
   var savedMsg = reqOjb.msg;
   this.setState({renderMsg: savedMsg, renderMstStatus:true, noData:null})
  

  }
  else{
    
    var noDataFound = 'No data found'
    this.setState({noData: noDataFound, renderMstStatus:false})
    console.log(noDataFound)
    
  }



  this.setState({closingStatus:true})

}





deleteReminder = (index)=> {
var segName = document.getElementById('selectMsg').value

var reqObj = this.state.objects.find(  (obj)=>{return obj.firstName === segName}  )
reqObj.msg.splice(index,1)



firebase.database().ref('bioData').child(reqObj.key).set(reqObj)

document.getElementById(`toDelete${index}`).style.color = 'red'

alert('Deleted Successfully')

// window.location.reload(false)

}





  render(){
    
    return (
    
    
    <div>
    
  
    {/* Get Messages */}
    <br/><br/><br/> 
    <h2 className='headings'>Select Account and get your data</h2>
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Account</button> <br/>
    <div className='selectWidth'><select className='browser-default' id='selectMsg'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} value={item.firstName} className='browser-default'>{item.firstName}</option>}  )}   </select> </div> <br/>
    {/* <button onClick={this.getMessages}>Get Messages</button> */}
    <button className="waves-effect waves-light btn" onClick={this.getMessages}>Get Messages</button>


    <div className={this.state.renderMstStatus === true ? '' : 'display'}>
     <table><tbody><tr><th>Description</th><th>Delet/edit</th></tr>{this.state.renderMsg.map(  (item,i)=>{return <tr key={i}><td id={`toDelete${i}`}><b>{i} - </b> {item}</td><td><button onClick={()=> this.deleteReminder(i)}> Delete </button><button> Edit </button></td></tr>}  )}</tbody></table>
    </div>

     <h4 className={this.state.noData === null ? 'display' : ''}>
        {this.state.noData}
     </h4>
     



{/* Botom end design */}
<div className={this.state.closingStatus === false ? 'display' : ''} style={{backgroundColor:'lawngreen'}}>
<hr/>
<p style={{textAlign:'center'}}> <b>End</b></p>
<hr/>
</div>






    </div>
  );
}
}

export default GetData;
