 import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("summary", {
  temp: null,
  humidity: null,

});

export default module;

export const getTemp = module.addFetcher(
  "/getTemp",
  "/api/stats/getTemp",
  {
    onSuccess: async (state, action) => {
        console.log("Payload:", action.payload); 
        state.temp = action.payload.room_temperature;
        console.log(state.temp);
      },
    },
);



export const setUserNotes = module.addFetcher("setUserNotes", "/api/stats/setUserNotes", {
    onSuccess: async (state, action) => {
      const { user_note } = action.payload; 
    console.log("User notes updated successfully:", user_note);

    onError: ( action) => {
      console.error("Error in setRecordingNotes:", action.error); 
    }}
  });


