import React , { Children, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './customStyle.css';
import Metronome from './Metronome';
import App from './App';
import Custom from './Custom';
import Alternate2 from './indexSlider';
//import appReducer from './reducer';
import reportWebVitals from './reportWebVitals';


const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};

class Object2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : "empty" ,
      textId : "inputText",
      inputId : "Text",
      buttonId : "buttonId",
    };
  }

  componentDidMount() {
    this.setState( { text: "empty" + this.props.Id ,
    textId : "textText" + this.props.Id ,
    inputId : "inputText" + this.props.Id ,
    buttonId : "Button" + this.props.Id  } );
  }

  

  run() {
    const a = this.state.inputId;
    document.getElementById( this.state.textId ).innerHTML = document.getElementById( this.state.inputId ).value;
 //   this.setState( { text: document.getElementById( this.state.inputId ).value } );
  }

  render() {
    return (
      <div style={{display: "inline-block"}} >
        <td>{this.props.content}</td>
        <input className="inputField" id={this.state.inputId} />
        <button id={this.state.buttonId} style={{display: "inline-block"}} onClick={() => {this.run()}} >Send</button>
        <div className="textField" id={this.state.textId} style={{display: "inline-block"}}>{this.state.text}</div>
      </div>
    );
  }
}

// https://stackoverflow.com/questions/49171107/how-to-add-and-remove-table-rows-dynamically-in-react-js
class RowAdding2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [{content: "" , number: 0 }] ,
      stage : 0 ,
      variable1 : "<h1>Text</h1>" ,
      variable2 : '<img style="width: 50px;" src="logo192.png"></img>' ,
      variable3 : '<table style="width: 50px; border: 1px solid black"><th>First</th><th>Second</th></table>'
    };
  }

  componentDidMount() {
    this.setState ( { 
      variable1 : "<h1>Text</h1>" ,
      variable2 : '<img style="width: 50px;" src="logo192.png"></img>' ,
      variable3 : '<table style="width: 50px; border: 1px solid black"><th>First</th><th>Second</th><tr><td>First1</td><td>Second1</td></tr><tr><td>First2</td><td>Second2</td></tr></table>' } );
  }
// 
  handleAddRow = () => {
    this.setState((prevState, props) => { 
    
      if(this.state.rows.length == 1) {
        this.setState ( { stage : 1 } );
      } else if(this.state.rows.length == 2) {
        this.setState ( { stage : 2 } );
      } else if(this.state.rows.length == 3) {
        this.setState ( { stage : 3 } );
      } else {
        this.setState ( { stage : 0 } );
      }
      if( this.state.stage == 1 ) document.getElementsByClassName('inputField')[0].value = this.state.variable1 ;
      if( this.state.stage == 2 ) document.getElementsByClassName('inputField')[1].value = this.state.variable2 ;
      if( this.state.stage == 3 ) document.getElementsByClassName('inputField')[2].value = this.state.variable3 ;
         
      const row = { content: "hello this is a new row ! => " + this.state.rows.length , number: this.state.rows[this.state.rows.length-1].number+1 };
      return { rows: [...prevState.rows, row] };
    });
  };

  handleAmendRow = (e) => {
    this.setState((prevState, props) => {
      const row = {content: "hello this is a new row! => " + this.state.rows.length + <Object2/>};
      return { rows: [...prevState.rows, row] };
    });
  };

  handleRemoveRow = () => {
    if( this.state.rows.length > 1 ) {
      this.setState((prevState, props) => {
        return { rows: prevState.rows.reverse().slice(1).reverse() };
      });
    }
  };

  handleDeleteElem = (e) => {
    if( this.state.rows.length > 1 ) {
      this.setState((prevState, props) => {
        for( var i=e-1; i<this.state.rows.length-2; i++ ) {
          // document.getElementById("textText"+(i)).innerHTML = document.getElementById("textText"+(i+1)).innerHTML;
          // document.getElementById("inputText"+(i)).value = document.getElementById("inputText"+(i+1)).value;

          document.getElementsByClassName("textField")[i].innerHTML = document.getElementsByClassName("textField")[i+1].innerHTML;
          document.getElementsByClassName("inputField")[i].value = document.getElementsByClassName("inputField")[i+1].value;
        }
        return { rows: prevState.rows.slice(0,e).concat( prevState.rows.slice(e+1 , prevState.rows.length ) ) };

      });
    }
  };
  render() {
    return (
      <div style={styles}>
        <table>
          <tbody>
            <button style={{display: 'inline-block' , backgroundColor: "red" , cursor: 'pointer'}} className="" onClick={this.handleRemoveRow}>
              <b>-</b>
            </button>
            <button style={{display: 'inline-block' , backgroundColor: "green" , cursor: 'pointer'}} className="" onClick={this.handleAddRow}>
              <b>+</b>
            </button>
            { this.state.rows.slice(1).map( ( row , i) => (
              <tr>
                <button id={"deleteButton"+(i+1)} onClick={() => this.handleDeleteElem(i+1)}>Delete</button>
                <Object2 Id={row.number}/>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default RowAdding2;
