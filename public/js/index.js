"use strict"

const socket = io()


socket.on( "connect", () => {

  console.log( "Connected to server" )

})


socket.on( "disconnect", () => {

  console.log( "Disconnected from server" )

})


// *****************************************************************************
// *****************************************************************************
// Print newMessage

socket.on( "newMessage", ( message ) => {

  const li = $( "<li></li>" )

  li.text( `${message.from}: ${message.text} at ${message.createdAt}` )

  $( "#messages" ).append( li )

})


// *****************************************************************************
// *****************************************************************************
// Print locationMessage

socket.on( "newLocationMessage", ( message ) => {

  const li = $( "<li></li>" )
  const a = $( "<a target=\"_blank\">My current location</a>" )

  li.text( `${message.from}: ` )

  a.attr( "href", message.url )

  li.append( a )

  $( "#messages" ).append( li )


})



// *****************************************************************************
// *****************************************************************************
// Send message

$( "#message-form" ).on( "submit", ( e ) => {

  e.preventDefault()

  socket.emit( "createMessage", {
    from: "User",
    text: $( "[name=message]" ).val(),
  }, ( data ) => {

    //Do nothing

  })


})


// *****************************************************************************
// *****************************************************************************
// Send user location

const locationButton = $( "#send-location" )

locationButton.on( "click", () => {

  if ( !navigator.geolocation ) {
    return alert( "Geolocation not supported by your browser" )
  }

  navigator.geolocation.getCurrentPosition( ( position ) => {

    console.log( position )

    socket.emit( "createLocationMessage", {
      latitude : position.coords.latitude,
      longitude: position.coords.longitude
    })

  }, () => {

    alert( "Unable to fetch location" )

  })

})

