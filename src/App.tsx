import React from 'react';
import './App.css';
import MyHeader from './MyHeader';
import MyImageList from './MyImageList';

type AppProps = {}
type AppState = {
  open_upload_dlg: boolean
}
class App extends React.Component<AppProps, AppState> {

  readonly state: AppState = {
    open_upload_dlg: false
  }

  constructor(props: AppProps | Readonly<AppProps>) {
    super(props)

  }

  render(): React.ReactNode {

    return (
      <div className="App">
        <MyHeader />
        <MyImageList/>
      </div>
    );
  }
}

export default App;
