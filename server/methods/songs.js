import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Songs from '../../imports/api/collections/songs'

/**
 * Methods are used to run code on the server and optionally, send a response
 * to the client (ex: APIs, do computations, work with the DB, etc).
 * In Meteor, methods are functions defined as values of a simple
 * object that is in turn, passed to the Meteor.methods function
 */
Meteor.methods({
    'createSong': function ({title, play_time, address}) {
        check(title, String);
        check(play_time, String);
        check(address, String);

        return Songs.insert({title, play_time, address})
    },
    'updateSong': function (songId) {
        check(songId, String);

        return Songs.find(songId)
    },
    'deleteSong': function (songId) {
        check(songId, String);

        return Songs.delete(songId)
    }
});
