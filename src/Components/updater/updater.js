import React from 'react';

import { Grid, Progress } from "semantic-ui-react";

const { ipcRenderer } = window;

class Updater extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updateFinish: false,
      logoDataUrl: '',
      releaseName: '',
      percentage: 0,
      description: ''
    }
  }

  componentDidMount() {
    ipcRenderer.send("register_updateWindow");

    ipcRenderer.on("response_svg_to_data_url", (event, data) => {
      data.status === "success" ? this.setState({ logoDataUrl: data.data }) : console.log(data.err)
    })
    
    ipcRenderer.on("updateProgressPercentage", (event, data) => {
      this.setState({
        percentage: data
      })
    });
    ipcRenderer.on("updateReleaseVersion", (event, data) => {
      this.setState({
        releaseName: data
      })
    })
    // ipcRenderer.on("updateDescription", (event, data) => {
    //   this.setState({
    //     description: data
    //   })
    // })
  }

  render() {
    // const isScrapping = this.state.scrapMode;
    return (
      <Grid>
        {/* <h1>{this.state.percentage}</h1> */}
        <Grid.Row>
          <Grid.Column>
            <h3>{parseFloat(this.state.percentage) === 100 ? "업데이트 완료! 확인 버튼을 눌러 창을 닫아주세요" : "업데이트 중..."}</h3>
            <Progress indicating percent={parseFloat(this.state.percentage)} progress />
            <div className="col-2 mx-0 px-0 float-right mt-3">
            </div>
          </Grid.Column>
        </Grid.Row>ㅇ
      </Grid>
    );
  };
}

export default Updater;