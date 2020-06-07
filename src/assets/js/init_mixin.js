import { mapActions, mapState, mapMutations, mapGetters } from "vuex"

export const initMixin = {
	data(){
		return {
			inProgress: false, // for ensuring requests in rowAddUpdate() run in order
			requestWaiting: false, // for ensuring requests in rowAddUpdate() run in order
		}
	},
	computed: {
		...mapGetters([]),
		...mapState([]),
	},
	methods: {
		...mapActions([]),
		...mapMutations([]),
		partyGradient(party) {
			switch (party) {
				case 'D':
					return '0deg, rgba(0,174,243,1) 0%, rgba(0,174,243,0.12086841572566531) 5%, rgba(0,174,243,0) 100%'
				case 'R':
					return '0deg, rgba(232,27,35,1) 0%, rgba(232,27,35,0.1740897042410714) 5%, rgba(232,27,35,0) 100%'
				default:
					return ''
			}
		}
	}
};
