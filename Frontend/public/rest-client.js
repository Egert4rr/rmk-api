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
            trailInModal: [],
            formRegions: [],
            loginModal: {},
            signUpModal: {},
            loginName: "",
            loginPass: "",
            loginError: "",
            token: "",
            isFiltered: false,
            SignUpName: "",
            SignUpEmail: "",
            SignUpPassword: "",
            SignUpConfPassword: ""

        }
    },
    async created() {
        this.isFiltered = false
        this.token = sessionStorage.getItem("token") === null ? "" : sessionStorage.getItem("token")
        await this.getTrails()
        console.log("Created", this.token);
    },
    methods: {
        getTrail: async function (id) {
            this.trailInModal = await (await fetch(`${api_base}/trails/${id}`)).json()
            let trailInfoModal = new bootstrap.Modal(document.getElementById("trailInfoModal"), {})
            trailInfoModal.show()
        },
        getTrails: async function () {
            this.filteredTrails = await ((await fetch(`${api_base}/trails`))).json()
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
            if(password === confPassword && this.SignUpEmail !== ""){
                const response = await fetch(`${api_base}/register`,{
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({"name":name,"email":this.SignUpEmail,"password":password}),
                })
                const result = await response.json()
                if (response.ok){
                    if(result.success){
                        this.signUpModal.hide();
                    }
                }
                else{
                    this.loginError = result.error;
                }

            }

        },
        doLogIn: async function () {
            let email;
            const response = await fetch(`${api_base}/login`,
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email": this.loginName, "password": this.loginPass }),
                }
            )
            email = this.loginName
            let pass = this.loginPass
            console.log(email, pass);
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
            this.loginError = ""
            this.token = ""
            sessionStorage.removeItem("token")
        }
    }
}).mount('#app')