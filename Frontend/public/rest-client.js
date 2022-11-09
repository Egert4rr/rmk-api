import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const api_base = "http://localhost:3000"; // <-- Enter api_base here "http://localhost:{backendport}"

createApp({
    data() {
        return {
            regions: [{ region: "Harjumaa" }, { region: "Hiiumaa" }, { region: "Ida-Virumaa" }, { region: "Jõgevamaa" }, { region: "Järvamaa" }, { region: "Läänemaa" },
            { region: "Lääne-Virumaa" }, { region: "Põlvamaa" }, { region: "Pärnumaa" }, { region: "Raplamaa" }, { region: "Saaremaa" }, { region: "Tartumaa" },
            { region: "Valgamaa" }, { region: "Viljandimaa" }, { region: "Võrumaa" }],
            checkedRegions: [],
            filteredTrails: [],
            trailInModal: {"_id": "","title": "","tags": [{"telkimisvõimalus": false,"kattegaLõke": false,"lõkkekoht": false}],"picture": "","region": "","distance": ""},
            hikerInModal: {},
            formRegions: [],
            loginModal: {},
            signUpModal: {},
            profileModal: {},
            loginName: "",
            loginPass: "",
            loginError: null,
            token: "",
            isFiltered: false,
            SignUpName: "",
            SignUpEmail: "",
            SignUpPassword: "",
            SignUpConfPassword: "",
            tags: [],
            profileEmailChangeIsHidden: false,
            profilePhonenumberChangeIsHidden: false,
            profileEmail:"",
            profilePhonenumber:"",
        }
    },

    async created() {
        if (this.hikerInModal.name == "" || this.hikerInModal.name == null || this.hikerInModal.name == undefined) {
            this.token == ""
        }
        this.isFiltered = false
        this.token = sessionStorage.getItem("token") === null ? "" : sessionStorage.getItem("token")
        await this.getTrails()
    },
    methods: {
        resetLoginError: function () {
            this.loginError = null
        },
        getTrail: async function (id) {
            this.trailInModal = await (await fetch(`${api_base}/trails/${id}`)).json()
            let trailInfoModal = new bootstrap.Modal(document.getElementById("trailInfoModal"), {})
            trailInfoModal.show()
        },
        getTrails: async function () {
            this.filteredTrails = await (await fetch(`${api_base}/trails`)).json()
        },
        getProfile: async function () {
            this.hikerInModal = await (await fetch(`${api_base}/hikers/${JSON.parse(window.atob(this.token.split('.')[1])).userId}`)).json()
            this.profileModal = new bootstrap.Modal(document.getElementById("profileModal"), {})
            this.profileModal.show()
        },
        postSearch: async function () {
            if (this.checkedRegions.length !== 0) {
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

        },

        removeFilter: async function () {
            this.isFiltered = false
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
        doSignUp: async function () {
            let password = this.SignUpPassword;
            let confPassword = this.SignUpConfPassword;
            let name = this.SignUpName;
            if (password === confPassword && this.SignUpEmail !== "") {
                const response = await fetch(`${api_base}/register`, {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "name": name, "email": this.SignUpEmail, "password": password }),
                })
                const result = await response.json()
                if (response.ok) {
                    if (result.success) {
                        this.signUpModal.hide();
                    }
                }
                else {
                    this.loginError = result.error;
                }

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
                    this.loginModal.hide()
                }
            } else {
                this.loginError = result.error
            }
        },
        doLogOff: function () {
            this.loginName = ""
            this.loginPass = ""
            this.token = ""
            this.loginError = null
            sessionStorage.removeItem("token")
        },
        profileHideStateEmail: function () {
            if (!this.profileEmailChangeIsHidden) {
                this.profileEmailChangeIsHidden = true
            }
            else {this.profileEmailChangeIsHidden = false}
        },
        profileHideStatePhonenumber: function () {
            if (!this.profilePhonenumberChangeIsHidden) {
                this.profilePhonenumberChangeIsHidden = true
            }
            else {this.profilePhonenumberChangeIsHidden = false}
        },
        profileResetHideState: function () {
            this.profileEmailChangeIsHidden = false
            this.profilePhonenumberChangeIsHidden = false
        },
        doChangeCredentialsEmail: function () {
            /*
            const response = await fetch(`${api_base}/edit/${this.hikerInModal._id}`,
            {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"email":})

            }
            )*/
            
        }
    }
}).mount('#app')