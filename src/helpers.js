export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key)
}