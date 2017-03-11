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

  const formattedTime = moment( message.createdAt ).format( "HH:MM:SS" )

  const template = $( "#message-template" ).html()

  const html =  ejs.render( template,
    {
      from     : message.from,
      text     : message.text,
      createdAt: formattedTime
    }
  )

  $( "#messages" ).append( html )

})




// *****************************************************************************
// *****************************************************************************
// Print locationMessage

socket.on( "newLocationMessage", ( message ) => {

  const formattedTime = moment( message.createdAt ).format( "HH:MM:SS" )

  const template = $( "#locationMessage-template" ).html()

  const html = ejs.render( template,
    {
      from     : message.from,
      url      : message.url,
      createdAt: formattedTime
    }
  )

  $( "#messages" ).append( html )


})



// *****************************************************************************
// *****************************************************************************
// Send message

$( "#message-form" ).on( "submit", ( e ) => {

  e.preventDefault()

  const messageTextbox = $( "[name=message]" )

  if ( !messageTextbox.val() == "" ) {

    socket.emit( "createMessage", {
      from: "User",
      text: messageTextbox.val(),
    }, ( data ) => {

      messageTextbox.val( "" )

      messageTextbox.focus()

    })

  }

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

