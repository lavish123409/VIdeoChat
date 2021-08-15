import React from 'react';

import  VideoScreen  from "./components/VideoScreen";
import  Options  from "./components/Options";
import  CallMessage  from "./components/CallMessage";

const App = () => {
    return (
        <div>
            Video Chat

            <VideoScreen />
            <Options/>
            <CallMessage/>
        </div>
    )
}

export default App
