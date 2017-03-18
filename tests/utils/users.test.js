"use strict"

// *****************************************************************************
// *****************************************************************************
// Require

const expect = require( "expect" )

const {Users} = require( "./../../server/utils/users" )


// *****************************************************************************
// *****************************************************************************
// Test setup

const usersSeed = [
  {
    id  : 1,
    name: "Anna",
    room: "Bananas"
  },
  {
    id  : 2,
    name: "Bob",
    room: "Bananas"
  },
  {
    id  : 3,
    name: "Jenny",
    room: "Apples"
  }
]

const users = new Users()


// *****************************************************************************
// *****************************************************************************
// Users tests

describe( "Users", () => {


  beforeEach( () => {

    users.users = usersSeed

  })



  describe( "addUser", () => {

    it( "Should add new user to the array and return it", () => {

      const users = new Users()

      const user = {
        id  : 345,
        name: "Mikael",
        room: "Node"
      }

      const newUser = users.addUser( user.id, user.name, user.room )

      expect( newUser ).toBeAn( "object" )
      expect( newUser ).toEqual( user )

      expect( users.users ).toEqual( [user] )


    })

  })



  describe( "removeUser", () => {

    it( "Should remove the user from the user array", () => {

      const removedUser = users.removeUser( 3 )

      expect( users.users.length ).toBe( 2 )
      expect( removedUser ).toEqual( usersSeed[2] )

    })


    it( "Should not remove user if incorrect id", () => {

      const removedUser = users.removeUser( "3" )

      expect( users.users.length ).toBe( 3 )
      expect( removedUser ).toNotExist()

    })


  })



  describe( "getUser", () => {

    it( "Should return the user object", () => {

      const user = users.getUser( 3 )

      expect( user ).toBeAn( "object" )
      expect( user ).toEqual( usersSeed[2] )


    })


    it( "Should not return user if invalid id", () => {

      const user = users.getUser( "3" )

      expect( user ).toNotExist()

    })


  })



  describe( "getUserList", () => {

    it( "Should return a list of names for all users in Bananas room", () => {

      const userList = users.getUserList( "Bananas" )

      expect( userList ).toEqual( ["Anna", "Bob"] )


    })

    it( "Should return a list of names for all users in Apples room", () => {

      const userList = users.getUserList( "Apples" )

      expect( userList ).toEqual( ["Jenny"] )


    })


  })


})
