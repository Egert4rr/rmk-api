import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const api_base = "http://localhost:3030"; // <-- Enter api_base here "http://localhost:{backendport}"

createApp({
    data() {
        return {
            regions: [{ region: "Harjumaa" }, { region: "Hiiumaa" }, { region: "Ida-Virumaa" }, { region: "Jõgevamaa" }, { region: "Järvamaa" }, { region: "Läänemaa" },
            { region: "Lääne-Virumaa" }, { region: "Põlvamaa" }, { region: "Pärnumaa" }, { region: "Raplamaa" }, { region: "Saaremaa" }, { region: "Tartumaa" },
            { region: "Valgamaa" }, { region: "Viljandimaa" }, { region: "Võrumaa" }],
            checkedRegions: [],
            filteredTrails: [],
            filteredHikes: [],
            trailInModal: { "_id": "", "title": "", "tags": [{ "telkimisvõimalus": false, "kattegaLõke": false, "lõkkekoht": false }], "picture": "", "region": "", "distance": "" },
            hikerInModal: {},
            selectedHiker: {},
            hikeInModal: { "_id": "", "Name": "", "Organizer": "", "PlannedTrails": [{ "_id": "", "title": "", "tags": [{ "telkimisvõimalus": false, "kattegaLõke": false, "lõkkekoht": false }], "picture": "", "region": "", "distance": "" }], "StartDate": new Date(0), "Startinglocation": "", "Regions": [""] },
            formRegions: [],
            loginModal: {},
            signUpModal: {},
            profileModal: {},
            HikeModal: {},
            hikers: [],
            loginName: "",
            loginPass: "",
            loginError: null,
            token: "",
            isFiltered: false,
            SignUpName: "",
            SignUpEmail: "",
            SignUpPassword: "",
            SignUpConfPassword: "",
            selectedFilter: "Trail",
            tags: [],
            profileEmailChangeIsHidden: false,
            profilePhonenumberChangeIsHidden: false,
            profileEmail: "",
            profilePhonenumber: "",
            deleteAccountIsHidden: false,
            name: "",
            startingDate: "",
            Startinglocation: "",
            dropdownHikesList: [],
            dropDownhikeId: "",
            hikeModalOrganizerName: "",
            hikeModalOrganizerEmail: "",
            deleteHikeIsHidden: false,
            isAdmin: false,
            adminHikerIsSelected: false

        }
    },

    async created() {
        this.adminHikerIsSelected = false
        this.isFiltered = false
        this.token = sessionStorage.getItem("token") === null ? "" : sessionStorage.getItem("token")
        await this.getTrails()
        await this.getHikes()
        if (this.token) {
            await this.getUserHikes()
            await this.getHikers()
            this.hikerInModal = await (await fetch(`${api_base}/hikers/${JSON.parse(window.atob(this.token.split('.')[1])).userId}`)).json()
        }


    },
    methods: {
        resetLoginError: function () {
            this.loginError = null
        },
        getTrail: async function (id) {
            this.trailInModal = await (await fetch(`${api_base}/trails/${id}`)).json()
            if (this.token !== "") {
                await this.getUserHikes()
            }
            let trailInfoModal = new bootstrap.Modal(document.getElementById("trailInfoModal"), {})

            trailInfoModal.show()
        },
        getHike: async function (id) {
            this.hikeInModal = await (await fetch(`${api_base}/hikes/${id}`)).json()
            if (this.token !== "") {
                await this.getUserHikes()
            }
            const HikerOrganizer = await (await fetch(`${api_base}/hikers/${this.hikeInModal.Organizer}`)).json()
            this.hikeModalOrganizerName = HikerOrganizer.name
            this.hikeModalOrganizerEmail = HikerOrganizer.email

            let hikeInfoModal = new bootstrap.Modal(document.getElementById("hikeInfoModal"), {})
            hikeInfoModal.show()
        },
        getHikers: async function () {
            this.hikers = await (await fetch(`${api_base}/hikers`)).json()
        },
        getTrails: async function () {
            this.filteredTrails = await (await fetch(`${api_base}/trails`)).json()
        },
        getHikes: async function () {
            this.filteredHikes = await (await fetch(`${api_base}/hikes`)).json()
        },
        getProfile: async function () {
            this.hikerInModal = await (await fetch(`${api_base}/hikers/${JSON.parse(window.atob(this.token.split('.')[1])).userId}`)).json()
            this.profileModal = new bootstrap.Modal(document.getElementById("profileModal"), {})
            this.profileModal.show()
        },
        getAdminSelectedHiker: async function (id) {
            this.selectedHiker = await (await fetch(`${api_base}/hikers/${id}`)).json()
            this.profileModal = new bootstrap.Modal(document.getElementById("profileModal"), {})
            this.adminHikerIsSelected = true
            this.profileModal.show()
        },
        postSearch: async function () {
            if (this.checkedRegions.length !== 0) {
                if (this.selectedFilter === "Trail") {
                    const response = await fetch(`${api_base}/search/`,
                        {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ "regions": this.checkedRegions })
                        }
                    )
                    const result = await response.json()
                    if (response.ok) {
                        this.filteredTrails = [...result.filteredTrails]
                        this.isFiltered = true
                    } else {
                        alert("no work")
                    }
                }
                else {
                    const response = await fetch(`${api_base}/searchHike/`,
                        {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ "regions": this.checkedRegions })
                        }
                    )
                    const result = await response.json()
                    if (response.ok) {
                        console.log(this.filteredHikes)
                        this.filteredHikes = [...result.filteredHikes]
                        this.isFiltered = true
                    } else {
                        alert("no work")
                    }

                }

            }

        },

        removeFilter: function () {
            this.isFiltered = false
        },
        showHike: function () {
            this.HikeModal = new bootstrap.Modal(document.getElementById("createHikeModal"), {})
            this.HikeModal.show()
        },
        showLogin: function (event) {
            event.preventDefault()
            this.loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {})
            this.loginModal.show()
        },
        showSignUp: function (event) {
            this.loginModal.hide()
            event.preventDefault()
            this.signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"), {})
            this.signUpModal.show()
        },

        createHike: async function () {
            let name = this.name;
            let startingDate = this.startingDate
            let startinglocation = this.Startinglocation
            let organizer = JSON.parse(window.atob(this.token.split('.')[1])).userId
            const response = await fetch(`${api_base}/hikes`,
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "Name": name, "Organizer": organizer, "PlannedTrails": [], "StartDate": startingDate, "Startinglocation": startinglocation, "Regions": [] })
                })
            const result = await response.json()
            console.log(result)
            if (response.ok) {
                this.HikeModal.hide();
                this.getHikes();
                this.getUserHikes();
            }
            else {
                this.loginError = result.error;
                console.log(this.loginError)
            }

        },

        doSignUp: async function () {
            let password = this.SignUpPassword;
            let confPassword = this.SignUpConfPassword;
            let name = this.SignUpName;
            let email = this.SignUpEmail;
            if (password != "" && confPassword != "" && name != "" && email != "") {
                if (password === confPassword) {
                    const response = await fetch(`${api_base}/register`, {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ "name": name, "email": email, "password": password }),
                    })
                    const result = await response.json()
                    if (response.ok) {
                        if (result.success) {
                            this.signUpModal.hide();
                        }
                    } else {
                        this.loginError = result.error;
                        console.log(this.loginError);
                    }
                }
            } else {
                this.loginError = "unfilled"
            }

        },
        doLogIn: async function () {
            const response = await fetch(`${api_base}/login`,
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email": this.loginName, "password": this.loginPass }),
                }
            )
            const result = await response.json()
            if (response.ok) {
                if (result.success) {
                    this.token = result.data.token
                    sessionStorage.setItem("token", this.token);
                    this.getUserHikes()
                    this.hikerInModal = await (await fetch(`${api_base}/hikers/${JSON.parse(window.atob(this.token.split('.')[1])).userId}`)).json()
                    this.loginModal.hide()
                    if (this.hikerInModal.isAdmin) {
                        await this.getHikers()
                    }

                }
            } else {
                this.loginError = result.error
            }
        },

        addUserHike: async function () {
            let trailId = this.trailInModal._id;
            const response = await fetch(`${api_base}/addUserHike`,
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "hikeId": this.dropDownhikeId, "trailId": trailId, "region": this.trailInModal.region })
                })
            const result = await response.json()
            if (response.ok) {
                console.log(result)
            }

        },

        getUserHikes: async function () {
            const tokenUserId = JSON.parse(window.atob(this.token.split('.')[1])).userId

            const userHikesResponse = await fetch(`${api_base}/getHikesbyUser`,
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "userId": tokenUserId })
                })
            const userHikesResult = await userHikesResponse.json()
            if (userHikesResponse.ok) {
                this.dropdownHikesList = userHikesResult.dropdownHikesList

            }
        },

        doLogOff: function () {
            this.loginName = ""
            this.loginPass = ""
            this.token = ""
            this.loginError = null
            this.deleteAccountIsHidden = false
            this.dropdownHikesList = []
            sessionStorage.removeItem("token")
        },
        profileHideStateEmail: function () {
            if (!this.profileEmailChangeIsHidden) {
                this.profileEmailChangeIsHidden = true
            }
            else { this.profileEmailChangeIsHidden = false }
        },
        profileHideStatePhonenumber: function () {
            if (!this.profilePhonenumberChangeIsHidden) {
                this.profilePhonenumberChangeIsHidden = true
            }
            else { this.profilePhonenumberChangeIsHidden = false }
        },
        resetHideState: function () {
            this.profileEmailChangeIsHidden = false
            this.profilePhonenumberChangeIsHidden = false
            this.deleteAccountIsHidden = false
            this.deleteHikeIsHidden = false
            this.selectedHiker = {}
            this.adminHikerIsSelected = false
        },
        doDeleteAccount: async function () {
            if (!this.deleteAccountIsHidden) {
                this.deleteAccountIsHidden = true
            } else {
                if (this.adminHikerIsSelected == false) {
                    const response = await fetch(`${api_base}/hikers/${this.hikerInModal._id}`, {
                        method: "delete"
                    })
                    if (response.ok) {
                        console.log("deleted account successfully")
                        this.doLogOff()
                    } else { alert("something went wrong when deleting") }
                } else {
                    const response = await fetch(`${api_base}/hikers/${this.selectedHiker._id}`, {
                        method: "delete"
                    })
                    if (response.ok) {
                        console.log("deleted account successfully")
                        this.deleteAccountIsHidden = false
                        await this.getHikers()
                    } else { alert("something went wrong when deleting") }
                }

            }

        },
        doDeleteHike: async function () {
            if (!this.deleteHikeIsHidden) {
                this.deleteHikeIsHidden = true
            } else {
                const response = await fetch(`${api_base}/hikes/${this.hikeInModal._id}`, {
                    method: "delete"
                })
                if (response.ok) {
                    console.log("deleted hike successfully")
                    this.getHikes()
                    this.getUserHikes()
                    this.deleteHikeIsHidden = false
                } else { alert("something went wrong when deleting") }
            }

        },
        doChangeCredentialsEmail: async function () {
            if (this.profileEmail != this.hikerInModal.email && this.profileEmail != "") {
                const response = await fetch(`${api_base}/hikers/${this.hikerInModal._id}`, {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email": this.profileEmail })
                })
                if (response.ok) {
                    this.hikerInModal.email = this.profileEmail
                    this.profileEmail = ""
                    this.profileHideStateEmail()
                } else { alert("something went wrong when saving changes") }
            } else {
                this.profileEmail = ""
                this.profileHideStateEmail()
            }
        },
        doChangeCredentialsPhonenumber: async function () {
            if (this.profilePhonenumber != this.hikerInModal.phonenumber && this.profilePhonenumber != "") {
                const response = await fetch(`${api_base}/hikers/${this.hikerInModal._id}`, {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "phonenumber": this.profilePhonenumber })
                })
                if (response.ok) {
                    this.hikerInModal.phonenumber = this.profilePhonenumber
                    this.profilePhonenumber = ""
                    this.profileHideStatePhonenumber()
                } else { alert("something went wrong when saving changes") }
            } else {
                this.profilePhonenumber = ""
                this.profileHideStatePhonenumber()
            }
        },

        doChangeFilter: function (filter) {
            this.selectedFilter = filter
        }
    }
}).mount('#app')