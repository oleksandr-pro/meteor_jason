import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

import Layout from './layout';
import Create from './create';
import Update from './update';
import SongsList from './index';

// FlowRouter documentation: https://github.com/kadirahq/flow-router
FlowRouter.route('/songs', {
    name: 'list',
    action () {
        mount(Layout, {  // Mount a component and pass it an object with its props
            content () {  // Define the 'content' function as a prop for the Layout component
                return <SongsList />  // We return a component that will be mounted within the Layout component
            }
        })
    }
})

FlowRouter.route('/songs/create', {
    name: 'create',
    action () {
        mount(Layout, {
            content () {
                return <Create />
            }
        })
    }
})

FlowRouter.route('/songs/:songId', {  // songId is a route parameter.
    name: 'update',                         // We can make this params optional: ':songId?'
    action ({songId}) {
        mount(Layout, {
            content () {
                return <Update songId={songId} />
            }
        })
    }
})
