<template>
  <div class="person-pod-container">
    <div class="person-img-container">
      <v-img
          :src="'images/congress/225x275/' + person.id + '.jpg'"
          :gradient="partyGradient(person.party)"
          max-width="125"
          contain
          style="border-radius: 5%"
      >
        <template v-slot:default>
          <div class="logo-overlay" :class="person.party"></div>
        </template>
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
    <div class="person-detail-container">
      <p class="title">{{ person.last_name + ', ' + person.first_name }}</p>
      <p style="position: absolute; bottom: 0; right: 0;">{{ person.state }}</p>
    </div>
  </div>
</template>

<script>
import { initMixin } from "../assets/js/init_mixin";
export default {
  name: 'PersonPod',
  mixins: [initMixin],
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  created() {
  },
  data() {
    return {
      personExtra: []
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .person-img-container {
    max-width: 225px;
    border-radius: 50%;
    margin-right: 1rem;
    float: left;
  }
  .person-detail-container {
    height: 100%;
  }
  .logo-overlay {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
  }
  .R {
    background-image: url(/images/1920px-Republican_Disc.svg.png);
    background-size: 30px;
  }
  .D {
    background-image: url(/images/1920px-US_Democratic_Party_Logo.svg.png);
    background-size: 30px;
  }
</style>
