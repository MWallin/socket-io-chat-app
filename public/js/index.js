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

  const messageTextbox = $( "[name=message]" )

  socket.emit( "createMessage", {
    from: "User",
    text: messageTextbox.val(),
  }, ( data ) => {

    messageTextbox.val( "" )

    messageTextbox.focus()

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

  locationButton.attr( "disabled", "disabled" ).text( "Sending..." )


  navigator.geolocation.getCurrentPosition( ( position ) => {


    socket.emit( "createLocationMessage", {
      latitude : position.coords.latitude,
      longitude: position.coords.longitude
    })

    locationButton.removeAttr( "disabled" ).text( "Send location" )


  }, () => {

    locationButton.removeAttr( "disabled" ).text( "Send location" )

    alert( "Unable to fetch location" )

  })

})

