import React from 'react';

import { DropzoneArea } from 'material-ui-dropzone'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import service from './service';
import md5 from 'md5'

const BUCKET = 'foo'



type UploadImgDlgProps = {
    open: boolean,
    handleClose: Function,
    handleUpload: Function,
}

type UploadImgDlgState = {
    files: File[]
}

class UploadImgDlg extends React.Component<UploadImgDlgProps, UploadImgDlgState> {

    readonly state: UploadImgDlgState = {
        files: []
    }

    constructor(props: UploadImgDlgProps | Readonly<UploadImgDlgProps>) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleClose(): void {
        this.props.handleClose()
    }

    handleUpload(): void {
        // TODO upload the file
        const files = this.state.files
        files.forEach((file) => {
            file.text().then((value) => {
                const _md5 = md5(value)
                service.Put(BUCKET, _md5, file).then(ret => {
                    console.log('PUT:' + ret)
                    if (ret) {
                        const item = {
                            img: service.Get(BUCKET, _md5),
                            key: _md5,
                            bucket: BUCKET
                        }
                        this.props.handleUpload(item)
                    }
                })
            })
        })
        this.props.handleClose()
    }

    render(): React.ReactNode {
        const open = this.props.open
        return (
            <Dialog open={open} onClose={this.handleClose}>
                <DialogTitle>Upload image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To upload image please select the image file or drop it here.
                    </DialogContentText>
                    <DropzoneArea
                        // showPreviews={true}
                        filesLimit={16}
                        maxFileSize={1024 * 1024 * 4}
                        acceptedFiles={['image/*']}
                        showAlerts={['error', 'info']}
                        onChange={(files) => {
                            this.setState({
                                files: files
                            })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.handleUpload}>Upload</Button>
                </DialogActions>
            </Dialog>

        );
    }
}

export default UploadImgDlg;
