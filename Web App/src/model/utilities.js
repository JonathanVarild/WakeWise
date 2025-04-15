// Helper function copied (by Jonathan) from my other project.
// https://github.com/JonathanVarild/BusTrackr/blob/b5aa892d34e35676e63c9174a07a998472e3ac61/src/store/interface/utilities.js#L1
export async function fetchResolvedCB(resp) {
	if (resp.status < 200 || resp.status > 200) {
		const error = await resp.json();
		return Promise.reject(new Error(error.message));
	}
	return resp.json();
}