import React from 'react';
import LabelButton from '../components/LabelButton'
import { Memory, FolderOpen } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = ({
  fileButton: {
      fontFamily: "Gotham Book, sans-serif",
      color: "#B877E9",
  }
});

// from tutorial at https://medium.com/@ashishpandey_1612/file-upload-with-react-flask-e115e6f2bf99
class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: "",
      selectedFile: null
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }



  // handleUpload = event => {
  //   const uploadedFile = event.target.files[0];
  //   console.log(uploadedFile);
  //   this.setState({
  //     selectedFile: uploadedFile,
  //     loaded: 0,
  //   });
  //   const data = new FormData()
  //   data.append('file', this.state.selectedFile)
  //   this.props.uploadFileURL(data);
  //   // continue implementation from https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
  // }

  render() {
    return (
      <div>
        <input
          ref={(input) => { this.uploadInput = input }}
          style={styles.fileButton}
          type="file"
          onChange={this.handleUploadImage}
        />
        <br />
      </div>
    );
  }
}

export default FileUpload;
