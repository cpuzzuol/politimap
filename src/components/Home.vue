<template>
  <div class="home-container">
    <h1>API HOME</h1>
    <v-row>
      <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
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
  components: { PersonPod },
  created() {
    this.getData()
  },
  data() {
    return {
      senators: []
    }
  },
  methods: {
    getData() {
      this.$http.get('https://api.propublica.org/congress/v1/116/senate/members.json')
      .then(r => {
        this.senators = r.data.results[0].members
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="scss">

</style>
