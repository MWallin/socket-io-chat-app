"use strict"

// *****************************************************************************
// *****************************************************************************
// Setup

const socket = io()




// *****************************************************************************
// *****************************************************************************
// Handle on- and offboarding

socket.on( "connect", () => {

  const params = $.deparam( window.location.search )

  socket.emit( "join", params, ( error ) => {

    if ( error ) {

      alert( error )

      window.location.href = "/"


    } else {

      console.log( "No error" )

    }


  })


})


socket.on( "disconnect", () => {

  console.log( "Disconnected from server" )

})


// *****************************************************************************
// *****************************************************************************
// Send message

$( "#message-form" ).on( "submit", ( e ) => {

  e.preventDefault()

  const messageTextbox = $( "[name=message]" )

  if ( !messageTextbox.val() == "" ) {

    socket.emit( "createMessage", {
      text: messageTextbox.val(),
    }, ( data ) => {


      messageTextbox.val( "" )

      messageTextbox.focus()


    })

  }


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

  scrollToBottom()


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

  scrollToBottom()


})





// *****************************************************************************
// *****************************************************************************
// Update the people panel

socket.on( "updateUserList", ( users ) => {

  const template = $( "#userList-template" ).html()

  const html = ejs.render( template,
    {
      users
    }
  )

  $( "#users" ).html( html )



})










// *****************************************************************************
// *****************************************************************************
// Helper functions

function scrollToBottom () {

  // Selectors
  const messages = $( "#messages" )
  const newMessage = messages.children( "li:last-child" )


  // Heights
  const clientHeight = messages.prop( "clientHeight" )
  const scrollTop    = messages.prop( "scrollTop" )
  const scrollHeight = messages.prop( "scrollHeight" )
  const newMessageHeight  = newMessage.innerHeight()
  const lastMessageHeight = newMessage.prev().innerHeight()


  if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ) {

    messages.scrollTop( scrollHeight )

  }

}

