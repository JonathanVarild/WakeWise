import { createReduxModule } from "../ReduxHelpers";


const module = createReduxModule("statistics", {
	accuracy:[],
  temp:[],
  phoneUsage:[],

})

export default module;

export const getAccuracy = module.addFetcher
 ("/getAccuracy", "/api/stats/getAccuracy", {
    onSuccess: async (state, action) => {
        state.accuracy = action.payload.accuracy;
        state.accuracy.forEach((item) => {
            console.log("Planned Start:", item.planned_start);
          });
        console.log("Accuracy statistics fetched ", state.accuracy )
    },
 })


 export const getTemp = module.addFetcher
 ("/getTemp", "/api/stats/getTemp", {
    onSuccess: async (state, action) => {
        state.temp = action.payload.temp;
        state.temp.forEach((item) => {
          console.log("Temp", item.room_temperature);
        });
      console.log("Temperature ", state.temp )
    },
 })

 export const getPhoneData = module.addFetcher
 ("/getPhoneData", "/api/stats/getPhoneData" , {
    onSuccess: async (state, action) => {
        state.phone_usage = action.payload.phone_usage;
        let i=0;
        state.phone_usage.forEach((item) => {
          console.log("Phone usage:", i, item.phone_usage);
        });
      console.log("Phone usage fetched ", state.phone_usage )
    },
 })

 export const setDate = module.add 



