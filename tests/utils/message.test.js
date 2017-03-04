"use strict"

// *****************************************************************************
// *****************************************************************************
// Require

const expect = require( "expect" )

const {generateMessage} = require( "./../../server/utils/message" )



// *****************************************************************************
// *****************************************************************************
// Message tests

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
