declare global {
    interface UserMsg {
        token?: string
        name?: string
        userNo: string
        config?: { [key: string]: string }
    }
}



// interface UserMsg {
//     token?: string
//     name?: string
//     userNo: string
//     config?: { [key: string]: string }
// }
type UserNo = string

class User {
    public token?: string
    public name?: string
    public userNo: string
    public config?: { [key: string]: string }
    constructor(userData: UserMsg) {
        this.token = userData.token
        this.config = userData.config
        this.name = userData.name
        this.userNo = userData.userNo
        if (!localStorage.getItem('userData' + this.userNo)) this.setLocalStorage()
    }
    public setToken(token: string) {
        this.token = token
        this.setLocalStorage()
    }
    public setConfig(config: { [key: string]: string }) {
        this.config = config
        this.setLocalStorage()
    }
    public setName(name: string) {
        this.name = name
        this.setLocalStorage()
    }
    public setLocalStorage() {
        let data: UserMsg = {
            // token: this.token,
            name: this.name,
            userNo: this.userNo,
            config: this.config
        }
        if (this.token) sessionStorage.setItem('userToken' + data.userNo, this.token)
        localStorage.setItem('userData' + data.userNo, JSON.stringify(data))
    }
    public removeLocalStorage() {
        localStorage.removeItem('userData' + this.userNo)
        sessionStorage.removeItem('userToken' + this.userNo)
    }
    public setUserData(userData: UserMsg) {
        this.token = userData.token
        this.config = userData.config
        this.name = userData.name
        this.userNo = userData.userNo
        this.setLocalStorage()
    }
}

class LocalStorage {
    private config: { [key: string]: string } | null
    private userList: string[]
    private userNoNow: string | null
    private user?: User | null
    constructor() {
        this.userNoNow = localStorage.getItem('userNoNow')
        this.userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList') as string) : []
        this._setUser()
        this.config = localStorage.getItem('globeConfig') ? JSON.parse(localStorage.getItem('globeConfig') as string) : null
    }
    _setUser() {
        let userDataStr = localStorage.getItem('userData' + this.userNoNow)
        if (!userDataStr) return
        else {
            let userData = JSON.parse(userDataStr) as UserMsg
            let userToken = sessionStorage.getItem('userToken' + this.userNoNow)
            userData.token = userToken?userToken:''
            if (this.userList && this.userNoNow && this.userList.includes(this.userNoNow)) {
                this.user = new User(userData)
            }
        }

    }
    _setUserList() {
        localStorage.setItem('userList', JSON.stringify(this.userList))
    }
    _setUserNoNow(userNo: string) {
        this.userNoNow = userNo
        localStorage.setItem('userNoNow', this.userNoNow)
        if (!this.userList.includes(this.userNoNow)) {
            this.userList.push(this.userNoNow)
            this._setUserList()
        }
    }
    getAllConfig() {
        return this.config
    }
    setAllConfig(config: { [key: string]: string }) {
        this.config = config
        localStorage.setItem('globeConfig', JSON.stringify(config))
    }
    getUserConfig() {
        return this.user?.config
    }
    setUserConfig(config: { [key: string]: string }) {
        if (this.user) {
            this.user.setConfig(config)
            return true
        } else {
            return false
        }
    }
    getUserToken() {
        return this.user?.token
    }
    setUserToken(token: string) {
        if (this.user) {
            this.user.setToken(token)
            return true
        } else {
            return false
        }
    }
    getUserName() {
        return this.user?.name
    }
    setUserName(name: string) {
        if (this.user && this.userNoNow) {
            this.user.setName(name)
            return true
        } else {
            return false
        }
    }
    createUser(userData: UserMsg | UserNo) {
        if (typeof userData === 'string') {
            if (this.userList && this.userList.includes(userData)) {
                this._setUser()
                this._setUserNoNow(userData)
            } else {
                this.user = new User({
                    userNo: userData
                })
                this._setUserNoNow(userData)
            }
        }
        else {
            this._setUserNoNow(userData.userNo)
            this.user = new User(userData)
        }
    }
    dropUser() {
        if (this.userNoNow) {
            this.userList?.splice(this.userList.indexOf(this.userNoNow), 1)
            this._setUserList()
            this.user?.removeLocalStorage()
            this.user = null
            this.userNoNow = null
            localStorage.removeItem('userNoNow')
            return true
        } else {
            return false
        }
    }
    setUserData(userData: UserMsg) {
        this.user?.setUserData(userData)
    }
}


let LocalStorageUtil = new LocalStorage()
export default LocalStorageUtil
