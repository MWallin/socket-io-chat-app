"use strict"

// *****************************************************************************
// *****************************************************************************
// Require

// *****************************************************************************
// *****************************************************************************
// Message handling

function generateMessage ( from, text ) {

  return {
    from,
    text,
    createdAt: new Date().getTime()
  }

}


function generateLocationMessage ( from, latitude, longitude ) {

  const baseGmapsURL = "https://www.google.com/maps?q="


  return {
    from,
    url      : `${baseGmapsURL}${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }

}



// *****************************************************************************
// *****************************************************************************
// Exports

module.exports = {
  generateMessage,
  generateLocationMessage
}
