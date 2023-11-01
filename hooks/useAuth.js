import { getSessionData } from "../scripts/Session/index.js";

/**
 * Specifies the id of the user
 * @returns {number}
 */
export const useAuth = () => getSessionData("user");
