import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import PropTypes from 'prop-types';
import {Paper, Button, Snackbar} from "@material-ui/core";
import Songs from '../../../api/collections/songs'

// Define the props (propeties/params) that this component will need/use
const propTypes = {
    song: PropTypes.any,
    isLoading: PropTypes.bool
};
// Define the component as a Class, extending React.Component
class Update extends React.Component {

    // Class constructor
    constructor (props) {
        super(props);
        // Set the components initial state
        this.state = {
            saveMessage: false
        };
    }

    // Define methods for this class
    submitForm = () => {
        // Here we do a "direct update" from the client instead of using a method
        const inputValues = {
            title: this.refs.title.value,
            play_time: this.refs.play_time.value,
            address: this.refs.address.value
        };
        Songs.update({_id: this.props.song._id}, {$set: inputValues}, (error, response) => {
            if (error) {
                console.log(error)
            }

            this.setState({saveMessage: true})
        })
    };

    deleteSong = () => {
        Songs.remove({_id: this.props.song._id}, (error, response) => {
            if (error) {
                console.log(error)
            }

            FlowRouter.go('list')
        })
    };

    // The render method is the only required one. It must return classic DOM hierachy
    render () {
        // If the prop "resume" is not loaded yet, we can show a Loading component for example
        if (this.props.isLoading || !this.props.song) return (<div>Loading...</div>);
        return (
            // We are using Material-ui components: http://www.material-ui.com/
            <Paper style={{padding: 20, marginBottom: 10}}>
                <h1>Update Song</h1>
                <form>
                    <p>
                        <b>Title:</b>
                        <input type='text' ref='title' defaultValue={this.props.song.title} />
                    </p>
                    <p>
                        <b>Play Time:</b>
                        <input type='date' ref='play_time' defaultValue={this.props.song.play_time} />
                    </p>
                    <p>
                        <b>Address:</b>
                        <input type='text' ref='address' defaultValue={this.props.song.address} />
                    </p>
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
                    onClick={this.deleteSong}>
                    Delete
                </Button>
                <Button
                    style={{marginLeft: 20}}
                    variant={'contained'}
                    onClick={() => FlowRouter.go('list')} >
                    List
                </Button>

                <Snackbar
                    message='Song updated successfully!'
                    open={this.state.saveMessage}
                    autoHideDuration={3000} />
            </Paper>
        )
    }
}

Update.propTypes = propTypes;

export default withTracker(({songId}) => {
    const song = Songs.findOne(songId);
    return { song, isLoading: false }
})(Update)
