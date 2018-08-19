import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css"
import "react-month-picker-input/dist/react-month-picker-input.css"
import MonthPickerInput from 'react-month-picker-input';
import Offset from './Offset'

class Calendar extends Component{

 constructor (props) {
    super(props)
    console.log("this.props.client.month="+this.props.client.month)
    var firstDay = new Date(this.props.client.year, this.props.client.month-1, 1)
    console.log("firstDay = "+firstDay)
 //   var y = date.getFullYear();
 //   var m = date.getMonth();
//	var firstDay = new Date(y, m, 1);
	var off =2; 
	
	switch(firstDay.getDay()){
  		case 2:
  			break;
  		case 3:
  			off=3	
  			break
  		case 4:
  			off=4
  			break
  		case 5:
  			off=5
  			break
  		case 6:
  			off=6
  			break
  		case 0:
  			off=0
  			break
  		case 1:
  			off=1						
  	}
	
	console.log("date.getDay()="+firstDay.getDay()+" "+off)
    this.state = {
      startDate: moment(),
      endDate: moment(),
      offset : off
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
     console.log("firstDay="+this.state.offset)
  }
 
 isLeapYear(year){
    	if(year%4) return false;
    	if(year%100) return true;
    	if(year%400) return false;
    	return true;
    }
    
  getMonth(date){
  	switch(date.getDay()){
  		case 0:
  			return "Sun"
  		case 1:
  			return "Mon"
  		case 2:
  			return "Tue"
  		case 3:
  			return "Wed"
  		case 4:
  			return "Thu"
  		case 5:
  			return "Fri"
  		case 6:
  			return "Sat";						
  	}
  	return ""+date.getDay();
  }  
  
  getOffset(date){
  	switch(date){
  		case 1:
  			return 0
  		case 2:
  			return 1
  		case 3:
  			return 2
  		case 4:
  			return 3
  		case 5:
  			return 4
  		case 6:
  			return 5
  		case 0:
  			return 6;						
  	}
  	return 0;
  }  
  calendarInfo(yearParam){
   const months=[
    	{name:"January", nam:"Jan", num:1, days:31},
    	{name:"February", nam:"Feb", num:2, days:28},
    	{name:"March", nam:"Mar", num:3, days:31},
    	{name:"April", nam:"Apr", num:4, days:30},
    	{name:"May", nam:"May", num:5, days:31},
		{name:"June", nam:"Jun", num:6, days:30},
		{name:"July", nam:"Jul", num:7, days:31},
		{name:"August", nam:"Aug", num:8, days:31},
		{name:"September", nam:"Sep", num:9, days:30},
		{name:"October", nam:"Oct", num:10, days:31},
		{name:"November", nam:"Nov", num:11, days:30},
		{name:"December", nam:"Dec", num:12, days:31}
    ]
   var data=[];
   var feb = 28;
   var currDate = new Date(this.props.client.year, this.props.client.month-1, 1)
   var currMonth = this.props.client.month; //currDate.getMonth()+1;

  // this.setState({offset: this.getOffset(currDate)});
    
   for(var i=1; i<=months.length; i++){
        if (this.isLeapYear(yearParam)) feb=29;
        var vis = 0;
   		if (currMonth==(i))  vis =1;
   			
   		var tmp = {id:months[i-1].num, year:yearParam, visible: vis, month:months[i-1].num, data:[] }
   		var count = months[i-1].days;
   		if (months[i-1].num==2) count = feb;
   		var tmpDays=[];
   		for (var j=1; j<=count; j++){
   			var date = new Date(yearParam, i-1, j);
   			var v ="";
   			if ( months[i-1].num<10)  v= "0";
   			
   			
   			var tmpDay = {
   						id: ""+(months[i-1].num)+v+(j),
   						hasEvents:0,
   						class:"w3-small", 
   						name: months[i-1].nam+" "+(j),
   						weekday: this.getMonth(date),
   						year: yearParam,
   						month: i,
   						visible: vis
   						}
   			tmpDays.push(tmpDay)			
   		}
   		tmp.data = tmpDays
   		data.push(tmp)
   	 }
   	 return data;
  }  
    
  handleChange1(date) {
    this.setState({
      startDate: date
    });
  }
  handleChange2(date) {
    this.setState({
      endDate: date
    });
  }
	render(){
	 const calendar = this.calendarInfo(this.props.client.year)
     console.log(calendar)
    
	var set = new Set(this.props.events.map((x)=>x.idDate));
	if (this.props.client.calendar!=null)
	for(var i=0; i<calendar.length; i++)
		for(var j=0; j<calendar[i].data.length; j++){
		if (set.has(calendar[i].data[j].id)){
			calendar[i].data[j].class=calendar[i].data[j].class+" w3-text-red";
			calendar[i].data[j].hasEvents=1; 
		}
	}
	console.log(set)
	

	

	 return(   <div class="w3-container w3-card w3-white w3-margin-bottom">
				 <div class="w3-half">
				 Month : <label>{this.props.client.month}</label><br/>
				 Year : <label>{this.props.client.year}</label>
	  			 </div>
	 				<div class="w3-half">
	 				<MonthPickerInput
	 				    closeOnSelect={true}
	 					year={this.props.client.year}
	 					month={this.props.client.month}
  						value={new Date()}
  						onChange={function(selectedYear, selectedMonth) { console.log(selectedYear, selectedMonth);}}
/>
	 				 	
	 				 </div>
      				 <div class="w3-row">
      				 	<a  to="NewEvent" onClick={(e) => {
      						   			        e.preventDefault()
      						   					this.props.onNavigate("NewEvent");
      						   					}} ><button class="w3-button w3-round w3-small w3-text-teal" >+Add</button></a>
      				 </div>
      				 <div class="w3-container">
      					<div class="w3-row">
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Sun"}</b></p></div>
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Mon"}</b></p></div>
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Tues"}</b></p></div>
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Wed"}</b></p></div>
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Thur"}</b></p></div>
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Fri"}</b></p></div>
      					<div  className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class="w3-small"><b>{"Sat"}</b></p></div>
      					</div>
      					<div class="w3-row">
						<span>      					
      					{calendar.map((x)=>
      						<span style={x.visible===1 ? {}:{ display : 'none'}}>
      						    <Offset tim={this.state.offset}/>
      							{x.data.map((y)=>{
      							if (y.hasEvents==0)
      						 		return (<div  style={y.visible===1 ? {}:{ display : 'none'}} className="week  w3-border-top w3-border-bottom w3-left-align w3-col"><p class={y.class}>{y.name}</p><div id="" className="hour w3-border-top w3-border-bottom w3-flat-clouds"></div></div>)
      							else 
      						   		return (<div  style={y.visible===1 ? {}:{ display : 'none'}} className="week  w3-border-top w3-border-bottom w3-left-align w3-col">
      						   			<a onClick={(e) => {
      						   			        e.preventDefault()
      						   					console.log(y.id); 
      						   					var obj = this.props.obj;  
      						   					obj.id=y.id;
      						   					obj.name=y.name;
      						   					this.setState(obj); 
      						   					this.props.onNavigate("List");
      						   					//this.setState({screen : "List"}); 
      						   					}} >
      						   				<p class={y.class}>{y.name}</p>
      						   			</a>
      						   			<div id="" className="hour w3-border-top w30border-bottom w3-flat-clouds"></div>
      						   		 </div>)
      						})}
      						</span>)}
      					</span>
      					</div>
      				</div><br/>
      		   </div>
          	);
		}
	
}

Calendar.propTypes = {
	client: PropTypes.object.isRequired,
	events: PropTypes.array,
	onNavigate: PropTypes.func.isRequired
}

export default Calendar;

