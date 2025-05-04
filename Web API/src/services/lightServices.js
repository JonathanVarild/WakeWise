const database = require("../db");


async function getColorsData(){
    try {
        const result = await database.query(
            `SELECT * 
            FROM lights;`
        )

        console.log("Hej")
        return result.rows;
    } 
    catch(error) {
        return null;    
    }
}

async function updateColor(id, color_hex){
    try {
        const result = await database.query(
            `UPDATE lights
            SET color_hex = color_hex,
            WHERE id = id;`
        )
        return { message: "Color updated successfully" };

    }catch (error) {
        throw new Error("Failed to update color: " + error.message);
}
}


module.exports = {
    getColorsData,
    updateColor,

}