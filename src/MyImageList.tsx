import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react';
import { MouseEvent } from 'react'
import service  from './service'
import AddFab from './AddFab'
import UploadImgDlg from './UploadImgDlg';

const BUCKET = 'foo'

type ImgItem = {
    img: string,
    title: string,
    key: string,
}
type MyImageListProps = {
    // TODO add a function to show new added images
}

type MyImageListState = {
    items: ImgItem[],
    open_upload_dlg: boolean
}
class MyImageList extends React.Component<MyImageListProps, MyImageListState> {
    readonly state: MyImageListState = {
        items: [],
        open_upload_dlg: false
    }
    
    
    constructor(props: any) {
        super(props)
        this.handleUploadDlgClose = this.handleUploadDlgClose.bind(this)
        this.handleFabClicked = this.handleFabClicked.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleCopyAddr = this.handleCopyAddr.bind(this)
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
    }

    componentDidMount() {
        service.List(BUCKET).then((items) => {
            console.log('Mount finish list')
            const imgItems = new Array<ImgItem>(items.length)
            items.forEach((item, idx) => {
                imgItems[idx] = {
                    img: service.Get(BUCKET, item.Key),
                    title: item.Key,
                    key: item.Key
                }
                console.log(item.Key)
            })
            this.setState({
                items: imgItems
            })
        })
       
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

    handleDeleteItem(e: MouseEvent<HTMLButtonElement>): void {
        const id = e.currentTarget.id
        const idxStr = id.match(/\d+/g)
        if (idxStr === null) {
            return
        }
        const idx = parseInt(idxStr[0])
        // remove the idx item
        const item = this.state.items[idx]
        service.Delete(BUCKET, item.key).then((ret) => {
            if (ret) {
                this.setState({
                    items: this.state.items.filter((_, i) => i !==idx)
                })
            }
            // this.state.items.splice(idx, 1)
        })

        console.log(`clicked button ${idx}`)
    }

    handleCopyAddr(e: MouseEvent<HTMLButtonElement>): void {
        const id = e.currentTarget.id
        const idxStr = id.match(/\d+/g)
        if (idxStr === null) {
            return
        }
        const idx = parseInt(idxStr[0])
        const url = this.state.items[idx].img
        copyTextToClipboard(url)
        console.log(`clicked button ${idx}`)
    }

    handleUploadSuccess(item: ImgItem): void {
        let items = this.state.items
        items.push(item)
        this.setState({
            items: items
        })
    }

    render(): React.ReactNode {
        const open = this.state.open_upload_dlg

        function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
            return {
                src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
                srcSet: `${image}?w=${width * cols}&h=${height * rows
                    }&fit=crop&auto=format&dpr=2 2x`,
            };
        }

        const itemData = this.state.items
        return (
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
            >

                <ImageList
                    sx={{
                        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                        transform: 'translateZ(0)',
                        overflow: 'hidden',

                    }}
                    rowHeight={200}
                    gap={1}
                >
                    {itemData.map((item, idx) => {
                        const cols = 1;
                        const rows = 1;

                        return (
                            <ImageListItem key={item.img} cols={cols} rows={rows}>
                                <img
                                    {...srcset(item.img, 250, 200, rows, cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    position="top"
                                    actionIcon={
                                        <Box>
                                            <IconButton onClick={this.handleCopyAddr}
                                                sx={{ color: 'white' }}
                                                aria-label='copy address'
                                                id={`btn-copy-${idx}`}
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                            <IconButton onClick={this.handleDeleteItem}
                                                sx={{ color: 'white' }}
                                                aria-label='delete item'
                                                id={`btn-delete-${idx}`}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>

                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
                <AddFab handleClick={this.handleFabClicked} />
                <UploadImgDlg open={open} handleClose={this.handleUploadDlgClose} handleUpload={this.handleUploadSuccess}/>
            </Box>
        );
    }
}

async function  copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}

export default MyImageList;
