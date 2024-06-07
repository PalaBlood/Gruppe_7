import BusinessObject from './BusinessObject.js'

/**UserBO fürs Frontend */

export default class UserBO extends BusinessObject {

    /** Konstruktion eines neuen Users */

    constructor(afirstname, alastname, agoogleuserid, anick_name, ahouseholdid) {
        super();
        this.first_name = afirstname;
        this.last_name = alastname;
        this.nick_name = anick_name;
        this.google_user_id = agoogleuserid;
        this.householdid = ahouseholdid

    }

    setfirstname(afirstname) {
        this.first_name = afirstname;
    }

    getfirsname() {
        return this.firstname;
    }

    setlastname(alastname) {
        this.last_name = alastname;
    }

    getlastname(){
        return this.lastname;
    }

    setnickname(anick_name) {
        this.nick_name = anick_name;
    }

    getnickname() {
        return this.nick_name;
    }

    setgoogleuserid(agoogleuserid) {
        this.google_user_id = agoogleuserid;
    }

    getgoogleuserid() {
        return this.googleuserid;
    }

    sethouseholdid(ahouseholdid) {
        this.ahouseholdid = ahouseholdid
    }
    
    gethouseholdid() {
        return this.householdid
    }

    static fromJSON(users) {
        let result = [];
    
        if (Array.isArray(users)) {
          users.forEach((u) => {
            Object.setPrototypeOf(a, UserBO.prototype);
            result.push(u);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let u = users;
          Object.setPrototypeOf(u, UserBO.prototype);
          result.push(u);
        }
    
        return result;
      }
}