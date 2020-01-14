import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {Player} from "../components";

/**
 * Simplest example of a React compenent.
 * A React component needs only a render method. This method must return the
 * HTML dom of the component
 */
export default class Home extends React.Component {
    render () {
        return (
            <div>
                <h1>Meteor with React</h1>
                <p>
                    Welcome to the example of Meteor with react.
                </p>
                <h2>
                    Browse the examples
                </h2>
                <h4>
                    Forms with simple schema
                </h4>
                <Player url={'http://www.evidenceaudio.com/wp-content/uploads/2014/10/lyricslap.mp3'}/>
                <ul>
                    <li>
                        <a href={FlowRouter.path('list')}>
                            Edit Songs Configuration
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
