import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";
function sendMail(data) {
  return {
    type: "NEW_EMAIL",
    payload: data,
  };
}
//API request for fetching artworks from the server
export function createEmail(name, message, toemaiIds, token) {
  return async function thunk(dispatch, getState) {
    console.log("state:", getState);
    console.log("details in action:", name, message, toemaiIds);
    const output = await axios.post(
      `${apiUrl}/email/send`,
      {
        name,
        message,
        toemaiIds,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (output.data.msg === "Success") {
      dispatch(showMessageWithTimeout("success", true, "Email Sent"));
    }
    dispatch(sendMail(output.data));
  };
}
