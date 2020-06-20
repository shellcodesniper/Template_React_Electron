import React from 'react';
import 'stylesheets/App.css';
import Routes from "./Routes"
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  render() {
    // 로그인 여부 확인 후 Home / Login 페이지로 넘겨주기
    return (
      <div className="App">
        <Routes />
      </div>
    );
    
  }

}


export default App;
