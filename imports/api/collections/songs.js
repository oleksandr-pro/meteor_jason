import {Meteor} from 'meteor/meteor'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
const Songs = new Meteor.Collection('songs');

Songs.schema = new SimpleSchema({
    play_time: {
        type: Date,
        label: 'Play Time',
        optional: false
    },
    title: {
        type: String,
        label: 'Title',
        optional: false
    },
    address: {
        type: String,
        label: 'File Address',
        optional: false
    }
});

export default Songs
