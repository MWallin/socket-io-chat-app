"use strict"

// Heroku
// https://dry-woodland-55220.herokuapp.com/

// *****************************************************************************
// *****************************************************************************
// Configure environment

require( "./config/config.js" )




// *****************************************************************************
// *****************************************************************************
// Requires and constants

// Externals

const socketIO = require( "socket.io" )
const express  = require( "express" )
const path     = require( "path" )
const http     = require( "http" )


// Internals



// Constants

const PORT = process.env.PORT




// *****************************************************************************
// *****************************************************************************
// App setup

const app = express()

const server = http.createServer( app )

const io = socketIO( server )

app.use( express.static( path.join( __dirname, "/../public" ) ) )



// *****************************************************************************
// *****************************************************************************
// Actual app

io.on( "connection", ( socket ) => {

  console.log( "New user has connected" )

  socket.emit( "newMessage", {
    from     : "Emma",
    text     : "Dags att köpa middag",
    createdAt: "2017-03-12 17:23:02"
  })


  socket.on( "createMessage", ( newMessage ) => {

    console.log( `${newMessage.from} säger ${newMessage.text}` )

  })


  socket.on( "disconnect", () => {

    console.log( "User has disconnected" )

  })

})







// *****************************************************************************
// *****************************************************************************
// Start server

server.listen( PORT, () => {

  console.log( `Server is listening on port ${PORT}` )

})
