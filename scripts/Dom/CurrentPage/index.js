/**
 * Get the current page in browser
 * @returns {string}
 */
export const getCurrentPage = () => {
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments.pop();
  if (lastSegment === "index.html") return pathSegments.pop();
  return lastSegment;
};
