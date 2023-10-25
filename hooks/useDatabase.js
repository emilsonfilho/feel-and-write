export function useDatabase() {
    function get() {
        function findObjectByPropertyValue(database, objectName, propertyName, propertyValue) {
            const response = database[objectName].find(object => object[propertyName] === propertyValue);
            if (response) {
                return response
            } else {
                return null
            }
        }
    }
}