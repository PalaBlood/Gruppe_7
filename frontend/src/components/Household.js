import React, { Component } from 'react'


class Household extends Component() {

    state = {
       newHousehold: {household_name},
       addHouseholdDialogOpen: false,
       HouseholdDialogOpen: false,
       error: null,
       loading:true     
    }

    componentdidMount() {
        this.addhouseholdorselecthousehold();
    }

    openaddHouseholdDialog () {
        this.setState({addHouseholdDialogOpen : true})
    }

    closeaddHouseholdDialogOpen () {
        this.setState({addHouseholdDialogOpen: false})
    }

    addhouseholdorselecthousehold() {

    }

    
}
