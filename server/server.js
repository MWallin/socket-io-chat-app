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

const {generateMessage, generateLocationMessage} = require( "./utils/message" )

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

  // Say hello to new user
  socket.emit( "newMessage", generateMessage( "Admin", "Welcome to the chat app" ) )


  // Broadcast to existing users
  socket.broadcast.emit( "newMessage", generateMessage( "Admin", "New user joined" ) )




  socket.on( "createMessage", ( newMessage, callback ) => {

    console.log( `${newMessage.from} säger ${newMessage.text}` )

    io.emit( "newMessage", generateMessage( newMessage.from, newMessage.text ) )

    callback()


  })


  socket.on( "createLocationMessage", ( coords ) => {

    io.emit( "newLocationMessage", generateLocationMessage( "Admin", coords.latitude, coords.longitude ) )


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
