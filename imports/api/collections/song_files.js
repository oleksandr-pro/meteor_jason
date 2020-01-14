import { FilesCollection } from 'meteor/ostrio:files';
import {Meteor} from "meteor/meteor";

const SongFiles = new FilesCollection({
    debug: true,
    collectionName: 'SongFiles',
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 1024 * 1024 * 10 && /mp3|woff|wmv?g/i.test(file.extension)) {
            return true;
        }
        return 'Please upload audio, with size equal or less than 10MB';
    }
});

SongFiles.schema = FilesCollection.schema;

if (Meteor.isServer) {
    SongFiles.denyClient();
    Meteor.publish('files.songfiles.all', function () {
        return SongFiles.find().cursor;
    });
} else {
    Meteor.subscribe('files.songfiles.all');
}
export default SongFiles;
