import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const api_base = "http://localhost:3080"

createApp({
    data() {
    return {
        regions:[{region: "Harjumaa"}, {region: "Hiiumaa"}, {region: "Ida-Virumaa"}, {region: "Jõgevamaa"}, {region: "Järvamaa"}, {region: "Läänemaa"}, 
                  {region: "Lääne-Virumaa"}, {region: "Põlvamaa"}, {region: "Pärnumaa"}, {region: "Raplamaa"}, {region: "Saaremaa"}, {region: "Tartumaa"},
                  {region: "Valgamaa"}, {region: "Viljandimaa"}, {region: "Võrumaa"}],
        checkedRegions:[],
        filteredTrails:[],
        formRegions:[],
        loginModal:{},
        loginName:"",
        loginPass:"",
        loginError:"",
        token:""

    }
    },
    async created() {
        // this.games = await (await fetch(`${api_base}/trails`)).json()
        this.token = sessionStorage.getItem("token")===null?"":sessionStorage.getItem("token")
        console.log("Created",this.token);
    },
    methods:{
        /*getTrail: async function(id){
            this.trailInModal = await (await fetch(`${api_base}/trails/${id}`)).json()
            let trailInfoModal = new bootstrap.Modal(document.getElementById("trailInfoModal"), {})
            trailInfoModal.show()
        },*/

        postSearch: async function() {
            const response = await fetch(`${api_base}/search/`,
            {
                method:"post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"regions":this.checkedRegions})
            }
            )
            const result = await response.json()
            if (response.ok) {
                this.filteredTrails = result.filteredTrails
                console.log(this.filteredTrails);
            } else {
                alert("no work")
            }
        },

        showLogin: function(event) {
            console.log(event);
            event.preventDefault()
            this.loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {})
            this.loginModal.show()
        },
        doLogIn: async function(){
            const response = await fetch(`${api_base}/login`,
                {
                    method:"post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email":this.loginName, "password":this.loginPass })
                }
            )
            const result = await response.json()
            if(response.ok){                
                if(result.success){
                    this.token = result.data.token
                    sessionStorage.setItem("token", this.token);
                    this.loginModal.hide()
                }
            } else {
                this.loginError = result.error
            }
        },
        doLogOff: function() {
            this.loginName=""
            this.loginPass=""
            this.loginError=""
            this.token = ""
            sessionStorage.removeItem("token")
        }
    }
}).mount('#app')