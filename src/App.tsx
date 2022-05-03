import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import AddFab from './AddFab';
import MyHeader from './MyHeader';
import UploadImgDlg from './UploadImgDlg';
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
    this.handleUploadDlgClose = this.handleUploadDlgClose.bind(this)
    this.handleFabClicked = this.handleFabClicked.bind(this)
  }

  handleUploadDlgClose(): void {
    this.setState({
      open_upload_dlg: false
    })
  }

  handleFabClicked(): void {
    this.setState({
      open_upload_dlg: true
    })
  }

  render(): React.ReactNode {
    const open = this.state.open_upload_dlg

    return (
      <div className="App">
        <MyHeader />
        <MyImageList/>
        <UploadImgDlg open={open} handleClose={this.handleUploadDlgClose} />
        <AddFab handleClick={this.handleFabClicked} />
      </div>
    );
  }
}

export default App;
