import React , { useContext } from 'react';

import { SocketContext } from "../SocketContext";


const VideoScreen = () => {
    const { /*me , socket , */name , myVideo , stream , userVideo , callAccepted , callEnded , call, userStream} = useContext(SocketContext);
    
    var normal_width = 500 , normal_height = 375;
    var w = userStream != null? normal_width : 0;
    var h = userStream != null? normal_height : 0;

    const styleObj = { display : "inline-block" , border : "3px solid black"};

    return (
        <div>
            {/* our video */}
            <div style = {styleObj}>
                {/* <div><label>{/*JSON.stringify(socket == null ? 'socet' : 'present'}</label></div>
                <div><label>{me || 'soc.id'}</label></div> */}
                <div><label>{name || 'Name'}</label></div>
                { stream && (<video ref={myVideo} width = {normal_width} height = {normal_height} autoPlay/>
                )}
            </div>
            {/**caller video */}
            <div style = {styleObj}>
                { callAccepted && !callEnded && ( 
                      <div><label>{call.callerName || 'Name'}</label></div>
                )}
                    <div>
                    <video ref={userVideo} fluid="false" width = {w} height = {h}/*src = {userStream}*/ autoPlay/>
                    </div>
                {/* )} */}
            </div>
        </div>
    )
}

export default VideoScreen
