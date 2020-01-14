/**
 * List view of the Resumes.
 */

import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data'
import { FlowRouter } from 'meteor/kadira:flow-router'
import _ from 'underscore'
import moment from 'moment'
import React from 'react'
import {Paper, Button} from "@material-ui/core";
import Songs from "../../../api/collections/songs";

/**
 * Definition of the Index component that will use the data "injected" by the
 * createContainer function
 * Define the props (properties/params) that this component will need/use.
 */
const propTypes = {
    /**
     * Prop validation (it's not enforced)
     * Props can be accessed in the component using "this.props.propName".
     * This component uses an array of Resume objects
     */
    songs: PropTypes.arrayOf(PropTypes.object).isRequired
}

class SongsList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {}
    }

    renderNoResumes () {
        return (
            <h3>No Songs yet!</h3>
        )
    }

    renderResumes () {
        /**
         * This section could be in its own component, imported and used here
         * Here's some homework!
         */
        return _.map(this.props.songs, song => {
            return (
                <Paper style={{padding: 20, marginBottom: 10}} key={song._id}>
                    <p><b>Title:</b> {song.title}</p>
                    <p><b>Play Time:</b> {moment(song.play_time).format('LLL')}</p>
                    <p><b>Address:</b> {song.address}</p>
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        onClick={() => FlowRouter.go('update', {songId: song._id})}>
                        Update
                    </Button>
                </Paper>
            )
        })
    }

    render () {
        return (
            <Paper style={{padding: 20}}>
                <h3>Listing of Songs</h3>
                {this.props.songs.length ? this.renderResumes() : this.renderNoResumes()}
                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => FlowRouter.go('create')}>
                    Create
                </Button>
            </Paper>
        )
    }
}

// We assign the defined props to this component
SongsList.propTypes = propTypes;

/**
 * createContainer function is used to fetch and inject data from the DB.
 * Components should be "dumb" and presentational only.
 * This function subscribes to N publications, queries the DB and returns the
 * data in the form of 'props' (object). It injects this props to the passed in component,
 * in this case: Index
 */
export default withTracker(() => {
    // Meteor.subscribe('listSongs');
    const songs = Songs.find().fetch();
    return { songs }
})(SongsList);
