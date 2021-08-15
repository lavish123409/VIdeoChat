import { React , createContext , useState , useRef , useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io.connect("https://wise-dragon-97.loca.lt/");

const ContextProvider = ({ children }) => {
    const [me, setMe] = useState("");
    const [stream, setStream] = useState(null);
    const [userStream, setUserStream] = useState(null);
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(true);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    

    useEffect(() => {
        
        navigator.mediaDevices.getUserMedia({ video : true , audio : true})
            .then( (curr_stream) => {
                setStream(curr_stream);

                myVideo.current.srcObject = curr_stream;
                
            });


        socket.on('me' , (id) => setMe(id));

        socket.on('incomingcall' , ({from , name , signalData}) => {
            console.log('call coming from : ',from);

            setCall({isReceivingCall : true , from , callerName : name , signal : signalData});
        });

        socket.on('calldisconnected' , () => {
        setCallEnded(true);
        setCallAccepted(false);
        setCall({});
        setUserStream(null);

        // connectionRef.current.destroy();
        });
        
        
    }, []);

    // useEffect(() => {
    //     userVideo = useRef();
    // }, [call]);


    const makeCall = (tocallId) => {
        console.log('going to call : ',tocallId);

        const peer1 = new Peer({initiator : true , trickle : false , stream});

        peer1.on('signal' , (data) => {
            socket.emit('calluser' , {userToCall : tocallId , from : me , name , signalData : data});
        });

        peer1.on('stream' , (curr_stream) => {
            setUserStream(curr_stream);
            userVideo.current.srcObject = curr_stream;
        });

        socket.on('callaccepted' , ({signalData , name}) => {
            setCallAccepted(true);
            setCallEnded(false);

            setCall({isReceivingCall : true , from : tocallId , callerName : name , signal : signalData});

            peer1.signal(signalData);
        });

        connectionRef.current = peer1;

    }


    const answerCall = () => {
        setCallAccepted(true);
        setCallEnded(false);

        const peer2 = new Peer({initiator : false , trickle : false , stream});

        peer2.on('signal' , (data) => {
            socket.emit("callaccepted" , {to : call.from , signalData : data , name});
        });

        peer2.on('stream' , (curr_stream) => {
            setUserStream(curr_stream);
            userVideo.current.srcObject = curr_stream;
        });

        peer2.signal(call.signal);

        connectionRef.current = peer2;
    }


    const disconnectCall = () => {
        /*setCallEnded(true);
        setCallAccepted(false);
        setCall({});
        setUserStream(null);
        userVideo = useRef();*/

        connectionRef.current.destroy();

        socket.emit('calldisconnected' , call.from);

        window.location.reload();
    }


    return (
        <SocketContext.Provider value={{
            me,
            myVideo,
            stream,
            name,
            setName,
            makeCall,
            callAccepted,
            callEnded,
            disconnectCall,
            call,
            answerCall,
            userVideo,
            userStream,
            socket
        }}>
        {children}
        </SocketContext.Provider>
    )


    /*return (

        <SocketContext.Provider value={{
            me,
            stream,
            myVideo,
            name,
            setName,
            call,
            callAccepted,
            callEnded,
            userVideo,
            makeCall,
            answerCall,
            disconnectCall
        }}>

            { children }
        </SocketContext.Provider>

    )*/
    

    
}

export {ContextProvider , SocketContext} ;