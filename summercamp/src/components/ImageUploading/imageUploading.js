import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SingleFileUploadComponent from './SingleFileUploadComponent';
import MultiFileUploadComponent from './MultiFileUploadComponent';

class imageUploading extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Single Image Preview
              </div>
              <div className="card-body">
                <SingleFileUploadComponent />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Multiple Image Preview
              </div>
              <div className="card-body">
                <MultiFileUploadComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default imageUploading;