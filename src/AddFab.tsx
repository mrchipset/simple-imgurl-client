import React from 'react';
import { MouseEvent } from 'react'
import { Counter } from './features/counter/Counter';
import './App.css';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type AddFabProps = {
    handleClick: Function
}

type AddFabState = {

}

class AddFab extends React.Component<AddFabProps, AddFabState> {
    readonly fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
    };


    constructor(props: AddFabProps | Readonly<AddFabProps>) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: MouseEvent<HTMLButtonElement>): void {
        // TODO call the state event
        this.props.handleClick()
    }
    
    render(): React.ReactNode {
        return (
            <Fab sx={this.fabStyle} aria-label="Add" color="primary" onClick={this.handleClick}>
                <AddIcon />
            </Fab>
        );
    }
}

export default AddFab;

