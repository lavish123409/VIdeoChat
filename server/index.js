const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server , {
    cors : {
        origin : "*",
        methods : ["GET" , "POST"]
    }
});

const port = process.env.PORT || 5000;

app.get('/' , (req,res) => res.send("Server is listening" + req ));

app.use(cors());

io.on('connection' , (socket) => {

    console.log("new connection : ",socket.id);

    socket.emit('me' , socket.id);

    socket.on('disconnect' , () => {
        socket.broadcast.emit('calldisconnected');
    });

    socket.on('calluser' , ({userToCall , from , name , signalData }) => {
        console.log('call coming to server from : ',from ,' to ' , userToCall);

        io.to(userToCall).emit('incomingcall' , {from , name , signalData});
    });

    socket.on("callaccepted" , ({to , signalData , name}) => {
        socket.to(to).emit("callaccepted" , {name , signalData} );
    });

    socket.on('calldisconnected' , ( to ) => {
        socket.to(to).emit('calldisconnected');
    });
})

server.listen( port , () => console.log(`Server listening on ${port}`));
