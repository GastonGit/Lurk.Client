import React from 'react';
import '../styles/App.css';
import Video from './Video';

export default function App(): JSX.Element {
    return (
        <div className="app">
            <div className="app__content">
                <Video />
            </div>
        </div>
    );
}
