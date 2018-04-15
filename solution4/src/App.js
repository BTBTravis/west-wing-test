import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ReadMoreBtn(props) {
  if (props.show) return <button onClick={props.handleClick}>{ props.text }</button>
  else return null;
}

class ExpandoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
      canExpand: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      closed: !prevState.closed
    }));
  }

  componentDidMount() {
    let bodyEl = this.refs.body;
    let height = bodyEl.clientHeight;
    let maxHeight = 3.4 * parseFloat(getComputedStyle(bodyEl).fontSize);
    console.log('height: ', height);
    console.log('maxHeight: ', maxHeight);
    if(height > maxHeight) this.setState({ canExpand: true, closed: true });
  }

  render() {
    return (
      <div className="expando-block" >
        <div className={ this.state.closed ?  'expando-body closed': 'expando-body' } ref="body" >
          <p>{ this.props.content }</p>
        </div>
        <div className="expando-footer">
          <ReadMoreBtn show={ this.state.canExpand } text={ this.state.closed ? 'Read More' : 'Show Less' } handleClick={ this.handleClick }   />
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <ExpandoBlock content="Lorem ipsum dolor sit amet, omnium recteque est cu, quis enim lucilius vel ad. His in modo autem antiopam. Quot modus discere ea vel, id mea illum suscipiantur, mel affert euripidis cu. Sed meliore delectus mandamus id. Pri aperiri nominati contentiones ne, eros dolorem an sea.  Ludus tacimates vis cu, cu tale hinc utinam vix. Ne per aliquid perpetua conclusionemque, sit minim definiebas et. Ea facer graeci ius, feugiat inermis legendos sit at. Partiendo expetenda eam ad, ridens probatus tincidunt et pro. Ut novum ocurreret vim." />
          <ExpandoBlock content="Lorem ipsum dolor sit amet, omnium recteque est cu, quis eLorem ipsum dolor sit ametfe eithet stse" />
          <ExpandoBlock content="Lorem ipsum dolor sit amet, omnium recteque est  ametfe eithet stse" />
        </div>
      </div>
    );
  }
}

export default App;
