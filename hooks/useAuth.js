import { getSessionData } from "../scripts/Session";

/**
 * Specifies the id of the user
 * @returns {number}
 */
export const useAuth = () => getSessionData('user');