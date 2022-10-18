import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import axios from "axios";

createApp({
    data() {
    return {
        regions:[{region: "Harjumaa"}, {region: "Hiiumaa"}, {region: "Ida-Virumaa"}, {region: "Jõgevamaa"}, {region: "Järvamaa"}, {region: "Läänemaa"}, 
                  {region: "Lääne-Virumaa"}, {region: "Põlvamaa"}, {region: "Pärnumaa"}, {region: "Raplamaa"}, {region: "Saaremaa"}, {region: "Tartumaa"},
                  {region: "Valgamaa"}, {region: "Viljandimaa"}, {region: "Võrumaa"}],
        trailInModal:{},
        formRegions:[]
    }
    },
    async created() {
        this.trails = await (await fetch("http://localhost:3080/trails/")).json()
    },
    methods:{
        /*getTrail: async function(id){
            this.trailInModal = await (await fetch(`http://localhost:3080/trails/${id}`)).json()
            let trailInfoModal = new bootstrap.Modal(document.getElementById("trailInfoModal"), {})
            trailInfoModal.show()
        },*/

        postSearch: async function() {
            regions.forEach(region => {
                if (FormData.get(region) === true) {
                    formRegions.append(region)
                }
            });
            formRegions = {formRegions}

            axios.post("http://localhost:3080/search/")
        }
    }
}).mount('#container')