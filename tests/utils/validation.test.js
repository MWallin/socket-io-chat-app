"use strict"

// *****************************************************************************
// *****************************************************************************
// Require

const expect = require( "expect" )

const {isRealString} = require( "./../../server/utils/validation" )



// *****************************************************************************
// *****************************************************************************
// Message tests

describe( "validation", () => {

  describe( "isRealString", () => {

    it( "Should reject non-string values", () => {

      const result = isRealString( 2135 )

      expect( result ).toBe( false )


    })


    it( "Should reject string with only spaces", () => {

      const result = isRealString( "            " )

      expect( result ).toBe( false )


    })


    it( "Should allow string with non-space characters", () => {

      const result = isRealString( "     Hello Miami" )

      expect( result ).toBe( true )

    })



  })


})


