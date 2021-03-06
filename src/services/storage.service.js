const TOKEN_KEY = 'PIZZAAPP.TOKEN'
const USER_KEY = 'PIZZA.USER.KEY'
const USER_KEYEMAIL = 'PIZZA.USER.KEYEMAIL'
const USER = 'PIZZAAPP.USER'
const REFRESH_TOKEN_KEY = 'PIZZAAPP.REFRESH_TOKEN'


/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },
    

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },

    getUserId() {
        return localStorage.getItem(USER_KEY)
    },
    saveUserId(accessUserId) {
        localStorage.setItem(USER_KEY, accessUserId)
    },

    saveUserEmail(accessUserEmail) {
        localStorage.setItem(USER_KEYEMAIL, accessUserEmail)
    },

    getUserEmail() {
        return localStorage.getItem(USER_KEYEMAIL)
    },
    removeAllItems()
    {
        return localStorage.clear();
    }



}

const SetUser = {
    getUser() {
        let user = localStorage.getItem(USER);
        return JSON.parse(user)
    },
    isAdmin(){
        let user = this.getUser();
        return user != null ? user.role == 'admin' : false
    },
    saveUser(user) {
        localStorage.setItem(USER, JSON.stringify(user));
    },

    removeUser() {
        localStorage.removeItem(USER)
    }
}

export { TokenService, SetUser }