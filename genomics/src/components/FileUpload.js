import React from 'react';
import LabelButton from '../components/LabelButton'
import { Memory, FolderOpen } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = ({
  fileButton: {
      fontFamily: "Gotham, sans-serif",
      color: "#B877E9",
  }
});

// from tutorial at https://medium.com/@ashishpandey_1612/file-upload-with-react-flask-e115e6f2bf99
class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
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

  render() {
    return (
      <div>
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} style={styles.fileButton} type="file" />
        </div>
        <br />
      </form>
      </div>
    );
  }
}

export default FileUpload;
