/**
 * Compenent for creating a new Resume
 */

import { Meteor } from 'meteor/meteor'
import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {Paper, Button, Snackbar} from "@material-ui/core";

export default class Create extends React.Component {

    constructor (props) {
        super(props);
        /**
         * The state object is used to keep track of the component state.
         * On state you can save anything. Use it to register event changes, etc.
         */
        this.state = {
            // saveMessage will be used to display a material-ui Snackbar component
            saveMessage: false
        };
    }

    submitForm = () => {
        /**
         * We call a method to save the new Resume to de DB. We could also just
         * call the "collection.insert" method directly here.
         */
        const inputValues = {
            title: this.refs.title.value,
            play_time: this.refs.play_time.value,
            address: this.refs.address.value
        };
        Meteor.call('createSong', inputValues, (error, response) => {
            if (error) {
                console.log(error, response)
            }

            // Update the saveMessage key on the components state object, to show the Snackbar
            this.setState({saveMessage: true})
        })
    };

    render () {
        return (
            <Paper style={{padding: 20}}>
                <h1>Add Song</h1>
                <form>
                    <p><b>Title:</b> <input type='text' ref='title' /></p>
                    <p><b>Play Time:</b> <input type='date' ref='play_time' /></p>
                    <p><b>File:</b> <input type={'text'} ref={'address'}></input></p>
                </form>
                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={this.submitForm}>
                    Submit
                </Button>
                <Button
                    style={{marginLeft: 20}}
                    color={'secondary'}
                    variant={'contained'}
                    onClick={() => FlowRouter.go('list')}>
                    Cancel
                </Button>

                <Snackbar
                    message='Song added successfully!'
                    open={this.state.saveMessage}
                    autoHideDuration={3000} />
            </Paper>
        )
    }

}
