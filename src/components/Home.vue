<template>
  <div class="home-container">
    <h1>API HOME</h1>
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
    // Fetches the Senators from AWS (the AWS db is accessible via AWS API Gateway.
    // The db is accessed via an AWS lambda function
    // The Db is populated via the propub API, whose key is in the env file. A lambda function uses the API to populate the db)
    getData() {
      this.$http.get('https://twjp60odn0.execute-api.us-east-1.amazonaws.com/default/mysql_read', {headers: {'X-Api-Key': 'hSA8ANq2Vj7WPMQCLnkma4YkhUeaJlAa8Tfp0l21'}})
      .then(r => {
        this.senators = r.data
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
