import BusinessObject from './BusinessObject'

/**UserBO fürs Frontend */

export default class UserBO extends BusinessObject {

    /** Konstruktion eines neuen Users */

    constructor(aUser) {
        super();
        this.owner = aUser;
    }

    setUser(aUser) {
        this.User = aUser;
    }

    getUser() {
        return this.User;
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
          Object.setPrototypeOf(u, User.prototype);
          result.push(u);
        }
    
        return result;
      }
}