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
const {isRealString} = require( "./utils/validation" )
const {Users}        = require( "./utils/users" )

// Constants

const PORT = process.env.PORT





// *****************************************************************************
// *****************************************************************************
// App setup

const app = express()

const server = http.createServer( app )

const io = socketIO( server )

const users = new Users()



app.use( express.static( path.join( __dirname, "/../public" ) ) )



// *****************************************************************************
// *****************************************************************************
// Actual app

io.on( "connection", ( socket ) => {


  socket.on( "join", ( params, callback ) => {

    if ( !isRealString( params.name ) || !isRealString( params.room ) ) {

      return callback( "Name and room name are required" )

    }


    socket.join( params.room )


    users.removeUser( socket.id )

    users.addUser( socket.id, params.name, params.room )


    io.to( params.room ).emit( "updateUserList", users.getUserList( params.room ) )


    // Say hello to new user
    socket.emit( "newMessage", generateMessage( "Admin", `Hi ${params.name}, welcome to the Chat app!` ) )

    // Broadcast to existing users
    socket.broadcast.to( params.room ).emit( "newMessage", generateMessage( "Admin", `${params.name} joined the chat!` ) )


    callback()

  })




  socket.on( "createMessage", ( newMessage, callback ) => {

    const user = users.getUser( socket.id )

    if ( user && isRealString( newMessage.text ) ) {

      io.to( user.room ).emit( "newMessage", generateMessage( user.name, newMessage.text ) )

      callback()


    }

  })




  socket.on( "createLocationMessage", ( coords ) => {

    const user = users.getUser( socket.id )

    if ( user ) {

      io.to( user.room ).emit( "newLocationMessage", generateLocationMessage( user.name, coords.latitude, coords.longitude ) )

    }

  })



  socket.on( "disconnect", () => {

    const user = users.removeUser( socket.id )

    if ( user ) {

      io.to( user.room ).emit( "updateUserList", users.getUserList( user.room ) )

      io.to( user.room ).emit( "newMessage", generateMessage( "Admin", `${user.name} has left the chat!` ) )

    }


  })





})







// *****************************************************************************
// *****************************************************************************
// Start server

server.listen( PORT, () => {

  console.log( `Server is listening on port ${PORT}` )

})
