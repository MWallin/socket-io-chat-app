"use strict"

// *****************************************************************************
// *****************************************************************************
// Require

const moment = require( "moment" )



// *****************************************************************************
// *****************************************************************************
// Message handling

function generateMessage ( from, text ) {

  return {
    from,
    text,
    createdAt: moment().valueOf()
  }

}


function generateLocationMessage ( from, latitude, longitude ) {

  const baseGmapsURL = "https://www.google.com/maps?q="


  return {
    from,
    url      : `${baseGmapsURL}${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }

}



// *****************************************************************************
// *****************************************************************************
// Exports

module.exports = {
  generateMessage,
  generateLocationMessage
}
