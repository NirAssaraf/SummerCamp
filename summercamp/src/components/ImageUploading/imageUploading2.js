import React, { Component, Fragment,useRef } from 'react'
import { Form } from 'semantic-ui-react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// import './UploadImage.css';

class ImageUploading extends Component {

    constructor() {
        super()
        this.state = {
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 1 / 1
            },
            croppedImageUrl: null,
            error:'',
        }


    }

    handleFile = e => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({src: fileReader.result })
        }   
        fileReader.readAsDataURL(e.target.files[0])
    }
    handleFile2 = (file) => {
        const fileReader = new FileReader()
        const valid=this.validateFile(file);
        if(valid){
        fileReader.onloadend = () => {
            this.setState({src: fileReader.result })
            this.setState({error:''})

        }   
        fileReader.readAsDataURL(file)
    }
    else{
        this.setState({error:'no Image file'})

    }
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        // this.props.onUpload(this.state.croppedImage)
        this.setState({src:null})
 
    
        // addPhotoToUser(user, formData)
    }
    onImageLoaded = image => {
        this.imageRef = image
    }
    
    onCropChange = (crop) => {
        this.setState({ crop });
    }
    
    onCropComplete = crop => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
            this.setState({ croppedImageUrl })
        }
    }
    
    getCroppedImg(image, crop) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
         )
    
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })
    }
    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage }) 
    }

     dragOver = (e) => {
        e.preventDefault();
    }
    
     dragEnter = (e) => {
        e.preventDefault();
    }
    
     dragLeave = (e) => {
        e.preventDefault();
    }
    
     fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.handleFile2(files[0]);

        console.log(files[0]);
    }
     validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }
    render() {

        const { crop, profile_pic, src } = this.state
    
        return (
            
            <Fragment className='dragdropImage'>
               
            <Form  onSubmit={this.handleSubmit}>
          
          {/* {!src?( <div className="drop-container"
    onDragOver={this.dragOver}
    onDragEnter={this.dragEnter}
    onDragLeave={this.dragLeave}
    onDrop={this.fileDrop}
    onClick={()=>document.getElementById('profile_pic').click()}
>
    
<div className="drop-message">
    <div className="upload-icon"><span class="iconify" data-icon="bi:cloud-upload-fill" data-inline="false"></span></div>
    Drag & Drop files here or click to upload
    <p> {this.state.error}</p>

</div>

</div>
):''}  */}
                <label htmlFor="profile_pic"></label>
                <input className='pikeFile_btn' type='file' accept={'image/*'}
                 id='profile_pic' value={profile_pic} 

                onChange={this.handleFile}  />

                {src && (
                    <div>
                        <div className='upload_btn'>

                <button className='upload_btn_right'  ><span class="iconify" data-icon="el:ok" data-inline="false"></span></button>
                <button className='upload_btn_left' onClick={()=>this.setState({src:null})}><span class="iconify" data-icon="topcoat:cancel" data-inline="false"></span></button>

                </div>
                    <ReactCrop
                      src={src}
                      crop={crop}
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                     /> 
              

                </div>
                )}
            </Form>
            </Fragment>
        )
    }
}



export default ImageUploading