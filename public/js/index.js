"use strict"

const socket = io()


socket.on( "connect", () => {

  console.log( "Connected to server" )

})




socket.on( "newMessage", ( message ) => {

  console.log( `${message.from} say ${message.text} at ${message.createdAt}` )

})

socket.emit( "createMessage", {
  from: "Frank",
  text: "Hellooooooo"
}, ( data ) => {
  console.log( "Got it!", data )
})


socket.on( "disconnect", () => {

  console.log( "Disconnected from server" )

})
