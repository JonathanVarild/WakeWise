
const database = require("../db");


async function getAccuracy () {
    try {
        console.log("Hej")

    const result = await database.query (
        `SELECT * FROM sleep_history
        WHERE planned_start >= NOW() - INTERVAL '7 days';`
    )
    if(result.length == 0){
        console.log("No data in database");
    }
    return result.rows;

    } catch(error){
        throw new Error ("failed to get data " + error.message);
    }
}

async function getTemp(){
    try{
    const result = await database.query(
        `SELECT *
        FROM environment_history
        WHERE stored_on >= NOW() - INTERVAL '7 days';`
    )
    if(result.rows.length == 0){
        console.log("No data in database");
    }
    return result.rows;
  } catch(error){
    throw new Error ("failed to get data " + error.message);
}
}

async function getPhoneData() {
    try {
      const result = await database.query(
        `SELECT id, planned_start, planned_end, actual_start, actual_end, total_phone_use AS phone_usage
         FROM sleep_history
         WHERE planned_start >= NOW() - INTERVAL '7 days';`
      );
      if (result.rows.length === 0) {
        console.log("No data in database");
      }
      return result.rows;
    } catch (error) {
      throw new Error("Failed to get data: " + error.message);
    }
  }

  async function getHabitsScreenTime() {
    try {
      const result = await database.query(
        `SELECT json_value 
        FROM configuration_pairs 
        WHERE id='SCRNT'`
      );
      if (result.rows.length === 0) {
        console.log("No data in database");
      }
      return result.rows;
    } catch (error) {
      throw new Error("Failed to get data: " + error.message);
    }
  }
    



module.exports = {
    getAccuracy,
    getTemp,
    getPhoneData,
    getHabitsScreenTime,

}


