<template>
  <div class="home-container">
    <h1>API HOME</h1>
    <v-tabs
            v-model="tab"
            background-color="deep-purple accent-4"
            class="elevation-2"
            dark
            vertical
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
              v-for="i in tabs"
              :key="i"
              :href="`#tab-${i}`"
      >
        {{ translateAdminAreaName(adminAreas[i]) }}
        <v-icon>
          mdi-phone
        </v-icon>
      </v-tab>

      <v-tab-item
              v-for="i in tabs"
              :key="i"
              :value="'tab-' + i"
      >
        <v-card flat tile>
          <v-card-text>
            <v-row>
              <v-col
                  col="12"
                  sm="6"
                  md="4"
                  lg="3"
                  v-for="(official, index) in getAreaOfficials(adminAreas[i])" :key="`official-${adminAreas[i]}-${index}`"
              >
<!--                {{ getAreaOfficials(adminAreas[i]) }}-->
                <PersonPod :person="official"></PersonPod>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
import { initMixin } from "../assets/js/init_mixin";
import PersonPod from "./PersonPod";
export default {
  name: 'Home',
  mixins: [initMixin],
  components: {
    PersonPod
  },
  created() {
    //this.getData()
    this.getGoogs()
  },
  data() {
    return {
      areaIndex: 2,
      senators: [],
      prevIcon: false,
      nextIcon: false,
      tab: null,
      tabs: 3
    }
  },
  computed: {
    // Get all admin areas (national, state, county, etc) from the offices
    adminAreas() {
      let areas = ['all']
      this.offices.forEach(office => {
        office.levels.forEach(lvl => {
          if(!areas.includes(lvl)) {
            areas.push(lvl)
          }
        })
      })
      return areas
    }
  },
  methods: {
    translateAdminAreaName(name) {
      if(!name) return
      switch (name) {
        case 'country':
          return 'Federal'
        case 'administrativeArea1':
          return 'State'
        case 'administrativeArea2':
          return 'County'
        default:
          return name.toUpperCase()
      }
    },
    // Fetches the Senators from AWS (the AWS db is accessible via AWS API Gateway.
    // The db is accessed via an AWS lambda function
    // The Db is populated via the propub API, whose key is in the env file. A lambda function uses the API to populate the db)
    getData() {
      this.$http.get('https://twjp60odn0.execute-api.us-east-1.amazonaws.com/default/mysql_read')
      //this.$http.get('https://twjp60odn0.execute-api.us-east-1.amazonaws.com/default/mysql_read')
      .then(r => {
        this.senators = r.data
      })
      .catch(e => {
        console.log(e)
      })
    },

    getGoogs() {
      this.$http.get(`https://www.googleapis.com/civicinfo/v2/representatives?address=9313 Liberty Court, Livonia, MI 48150&key=${process.env.VUE_APP_GOOGLE_CIVICS_API_KEY}`)
      .then(r => {
        this.setOffices(r.data.offices)
        this.setOfficials(r.data.officials)
      })
      .catch(e => {
        console.log(e)
      })
    },

    getAreaOfficials(area) {
      const areaOfficials = []

      // Area 0 is 'all', so return everything
      if(this.adminAreas.indexOf(area) == 0) return this.officials

      // Get all the offices that share the area
      const offices = this.offices.filter(ofc => {
        return ofc.levels.includes(area)
      })

      // Find the index of each official
      offices.forEach(ofc => {
        const indices = ofc.officialIndices
        // Push the appropriate officials onto the array
        indices.forEach(ind => {
          areaOfficials.push({ officeIndex: offices.indexOf(ofc), data: this.officials[ind] })
        })
      })

      return areaOfficials
    }
  }
}
</script>
<style lang="scss">

</style>
