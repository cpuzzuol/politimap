<template>
  <div class="person-pod-container">
    <div class="person-img-container">
      <v-img
          v-if="person.data.photoUrl"
          :src="person.data.photoUrl"
          :gradient="partyGradient(party)"
          max-width="125"
          contain
          style="border-radius: 5%"
      >
        <template v-slot:default>
          <div class="logo-overlay" :class="party"></div>
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
      <p class="title">{{ person.data.name }}</p>
      <p>{{ office.name }}</p>
      {{ person.data.party }}
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
  computed: {
    office() {
      return this.offices[this.person.officeIndex]
    },
    party() {
      switch(this.person.data.party) {
        case 'Republican Party':
          return 'r_party'
        case 'Democratic Party':
          return 'd_party'
        default:
          return ''
      }
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
  .r_party {
    background-image: url(/logos/Republican_Party_Logo.png);
    background-size: 30px;
  }
  .d_party {
    background-image: url(/logos/Democratic_Party_Logo.png);
    background-size: 30px;
  }
</style>
