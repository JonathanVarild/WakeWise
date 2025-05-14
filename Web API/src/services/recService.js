const database = require("../db");

async function getRecordingsData() {
  try {
    const result = await database.query(
      `SELECT files_metadata.id, files_metadata.file_name, recordings.is_favorite, recordings.user_note AS user_note, files_metadata.created_at, recordings.file_id
            FROM files_metadata 
            FULL OUTER JOIN recordings ON files_metadata.id=recordings.file_id;`
    );

    if (result.rows.length === 0) {
      throw new Error("No recordings found");
    }

    return result.rows; 
  } catch (error) {
    throw new Error("Failed to fetch metadata: " + error.message);
  }
}

async function saveMetadata(id, file_name) {
  try {
    const save = await database.query(
      `UPDATE files_metadata 
             SET file_name = $1
             WHERE id = $2`,
      [file_name, id]
    );

    console.log("Database update result:", save);

    if (save.rowCount === 0) {
      throw new Error("No recording found with the given ID");
    }

    return { message: "Recording name updated successfully" };
  } catch (error) {
    throw new Error("Failed to update metadata: " + error.message);
  }
}

async function setRecordingNotes(file_id, user_note) {
  try {
    const note = await database.query(
      `UPDATE recordings
        SET user_note = $1
        WHERE file_id= $2`,
      [user_note, file_id]
    );

    console.log("Database update result:", note); 

    if (note.rowCount === 0) {
      throw new Error("No recording found with the given file_id");
    }
    return {
      message: "Recording note updated successfully",
      file_id,
      user_note,
    };
  } catch (error) {
    throw new Error("Failed to update notes: " + error.message);
  }
}

async function setRecordingFavorite(file_id) {
  try {
    const favorite = await database.query(
      `UPDATE recordings
         SET is_favorite = TRUE
         WHERE file_id = $1`,
      [file_id]
    );

    console.log("Database update result:", favorite);

    if (favorite.rowCount === 0) {
      throw new Error("No recording found with the given file_id");
    }

    const result = {
      message: "Recording marked as favorite successfully",
      file_id,
    };

    console.log("Returning response:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to update favorite: " + error.message);
  }
}

async function removeRecordingFavorite(file_id) {
  try {
    console.log("YO");
    const unFavorite = await database.query(
      `UPDATE recordings
         SET is_favorite = FALSE
         WHERE file_id = $1`,
      [file_id]
    );

    console.log("Database update result:", unFavorite);

    if (unFavorite.rowCount === 0) {
      throw new Error("No recording found with the given file_id");
    }

    const result = {
      message: "Recording unmarked as favorite successfully",
      file_id,
    };

    console.log("Returning response:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to update favorite: " + error.message);
  }
}

async function deleteRecording(file_id) {
  
  try {
    const deleteRec = await database.query(
      `DELETE FROM recordings
        WHERE file_id = $1`,
        [file_id]
    );

    console.log("Database update result:", deleteRec);

    const result = {
      message: "Recording deleted successfully",
      file_id,
    };

    // Make a fetch request to the external API
    const response = await fetch(
      "http://localhost:3002/objectstorage/storage/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: file_id }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete from object storage: ${response.statusText}`
      );
    }

    console.log("Returning response:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to delete: " + error.message);
  }
}

module.exports = {
  getRecordingsData,
  saveMetadata,
  setRecordingNotes,
  setRecordingFavorite,
  removeRecordingFavorite,
  deleteRecording,
};