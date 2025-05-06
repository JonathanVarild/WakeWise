const axios = require("axios");

async function getFile(id) {
	try {
		return await axios.get(`http://localhost:3002/objectstorage/storage/getfile?id=${id}`, {
			responseType: "stream",
		});
	} catch (error) {
		return null;
	}
}

module.exports = {
	getFile,
};
