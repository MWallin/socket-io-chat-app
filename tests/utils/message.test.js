"use strict"

// *****************************************************************************
// *****************************************************************************
// Require

const expect = require( "expect" )

const {generateMessage, generateLocationMessage} = require( "./../../server/utils/message" )



// *****************************************************************************
// *****************************************************************************
// Message tests

describe( "message", () => {



  describe( "generateMessage", () => {

    it( "Should generate correct message object", () => {

      const from = "Admin"
      const text = "Text goes here"

      const message = generateMessage( from, text )

      expect( message ).toBeAn( "object" )

      expect( message.createdAt ).toBeA( "number" )

      expect( message ).toInclude({
        from,
        text
      })


    })


  })


  describe( "generateLocationMessage", () => {

    it( "Should generate correct location object", () => {

      const from = "Admin"
      const lat = "112453"
      const long = "14534460"
      const url = `https://www.google.com/maps?q=${lat},${long}`

      const locationMessage = generateLocationMessage( from, lat, long )


      expect( locationMessage ).toBeAn( "object" )

      expect( locationMessage.createdAt ).toBeA( "number" )

      expect( locationMessage ).toInclude({
        from,
        url
      })


    })

  })




})
