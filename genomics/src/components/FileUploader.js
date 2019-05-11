import React from 'react';
import LabelButton from '../components/LabelButton'
import { Memory, FolderOpen } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const styles = ({
  fileButton: {
      fontFamily: "Gotham Book, sans-serif",
      color: "#B877E9",
  }
});

// from tutorial at https://medium.com/@ashishpandey_1612/file-upload-with-react-flask-e115e6f2bf99
class FileUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: "",
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload = event => {
    event.preventDefault();

    const uploadedFile = event.target.files[0];

    const data = new FormData()
    data.append('file', uploadedFile)
    data.append('filename', 'patient_data.csv')
    this.props.uploadFileURL(uploadedFile);

    axios.post('http://localhost:8000/upload', data, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
      })
      .then((response) => {
        this.props.returnResultsURL(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // continue implementation from https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
    // fetch('http://localhost:8000/upload', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {
    //
    //   console.log(response);
    //   this.setState({fileURL: `http://localhost:8000/${response.body}`});
    //   this.props.returnResultsURL(response.body);
    //
    //   // response.json().then((body) => {
    //   //   this.setState({ fileURL: `http://localhost:3000/${body.file}` });
    //   //   console.log("successful response fuck yeah");
    //   // });
    // });
  }

  render() {
    return (
      <div>
        <input
          ref={(input) => { this.uploadInput = input }}
          style={styles.fileButton}
          type="file"
          onChange={this.handleUpload}
        />
        <br />
      </div>
    );
  }
}

export default FileUploader;
