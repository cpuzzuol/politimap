<template>
  <div class="home-container">
    <h1>API HOME</h1>
    {{ adminAreas }}
<!--    <template v-for="area in adminAreas">-->
      <ul>
        <li v-for="(official, index) in getAreaOfficials(adminAreas[areaIndex])" :key="`official-${adminAreas[areaIndex]}-${index}`">
          {{ official }}
        </li>
      </ul>
<!--    </template>-->

    <v-row>
      <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="4"
          v-for="(senator, index) in senators"
          :key="'sen-' + index"
      >
        <PersonPod :person="senator"></PersonPod>
      </v-col>
    </v-row>
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
      offices: [],
      officials: [],
      senators: []
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
      this.$http.get('https://www.googleapis.com/civicinfo/v2/representatives?address=9313 Liberty Court, Livonia, MI 48150&key=AIzaSyB63xFZV5j9RZOLH_bF-EvR3i5nUA26f58')
      .then(r => {
        console.log(r.data)
        this.offices = r.data.offices
        this.officials = r.data.officials
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
          areaOfficials.push(this.officials[ind])
        })
      })

      return areaOfficials
    }
  }
}
</script>
<style lang="scss">

</style>
