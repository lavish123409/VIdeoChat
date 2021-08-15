import React , {useContext}  from 'react';

import { SocketContext } from "../SocketContext";

const Options = () => {
    const {name , me , setName , makeCall , callAccepted , callEnded , disconnectCall} = useContext(SocketContext);

    // const [id, setId] = useState(null);

    return (
        <div>
            Options to call
            <div>
                <input type="text" placeholder="Name" value={name || ''} onChange = {(e) => setName(e.target.value)} />
            </div>

            <button onClick = {() => {var v = document.getElementById('getId'); v.value = me}} >Get ID</button>
            <input type="text" placeholder="ID" id="getId" readOnly/>

            { (callAccepted && !callEnded) ? (
            <div><button onClick = {() => disconnectCall()} > Hang Up </button></div>    
            ) : (
            <div><button onClick = {() => makeCall(document.getElementById('toCallID').value)} >Call : </button>
            <input type="text" placeholder="Put ID to call .... here" id="toCallID" /></div>

            )}

        </div>
    )
}

export default Options
