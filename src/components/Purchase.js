import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import M from "materialize-css";


  class Purchase extends Component{
      constructor(){
          super();
          this.state = {
            qty:'',
            date:'',
            // age:'',
            // message:'',
            objects:[],
            partyObjects:[],
            status:false,         //this only for some changes in state, so that render function can run again
            // renderMsg:[],
            renderMstStatus:false,
            noData:null
            
          }
      }



      componentDidMount(){

        
        firebase.database().ref('itemList').on('child_added' , (data)=> { 
          this.state.objects.push(data.val())
        }  )
        
        

        firebase.database().ref('partyList').on('child_added' , (data)=> { 
          this.state.partyObjects.push(data.val())
        }  )



      }
      



changeHandler = (e) => {
this.setState({ 
  [e.target.name]: e.target.value
})

}




getData = ()=>{
this.setState({status:true})        //As status true, the render function will run again
}





saveValue = ()=>{

var obj = {}
obj.qty = Number(this.state.qty);
obj.date = this.state.date;


var itemObjIndex = document.getElementById('selected_save1').selectedIndex
var reqObj = this.state.objects[itemObjIndex]

obj.totalBill = reqObj.costPrice*Number(this.state.qty)     //multiplying by qty and price and saved in object with a property name of 'totolBill'


if('purchaseDate' in reqObj){
  reqObj.purchaseDate.push(obj)

  firebase.database().ref('itemList').child(reqObj.key).set(reqObj)

  alert('Your message successfully saved..!')


}else {
  reqObj.purchaseDate = []
reqObj.purchaseDate.push(obj)
firebase.database().ref('itemList').child(reqObj.key).set(reqObj)
alert('Your message successfully saved..!')
  
}

  

this.setState({qty:'',date:''})

}












  render(){
    // var {objects} = this.state
    return (
    
    
    <div>
    


      {/* Save messages */}
      <br/><br/><br/>
    {/* <h2 className='headings'>Select Item From the listed below</h2> */}
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select item</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save1'>  {this.state.objects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.itemName}</option>}  )}   </select> </div> <br/>
    
    
    <button className="waves-effect waves-light btn" onClick={this.getData} style={{width:'30%'}}>Select Party</button> <br/>
    <div className='selectWidth'> <select className='browser-default' id='selected_save2'>  {this.state.partyObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.partyName}</option>}  )}   </select> </div> <br/>
    
    
    
    <input type='text' value={this.state.qty} name='qty' onChange={this.changeHandler} placeholder='Quantity'/> <br/>
    <input type='text' value={this.state.date} name='date' onChange={this.changeHandler} placeholder='Purchase Date (01-Jan-2021)'/> <br/>
    <button className="waves-effect waves-light btn" onClick={this.saveValue}>Save</button>






  </div>
  );
}
}

export default Purchase;
