import React , {useContext} from 'react';

import { SocketContext } from '../SocketContext';

const CallMessage = () => {
    const {call , callAccepted , answerCall} = useContext(SocketContext);
    return (
        <div>
            Call is coming !!
            { call.isReceivingCall && !callAccepted && ( <div><label>Call is coming from : {call.callerName}</label>
            <button onClick = {() => answerCall()} > Accept </button></div>
            )}
        </div>
    )
}

export default CallMessage;
