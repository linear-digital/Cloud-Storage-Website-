export const imageurl = (url) => {
    const serverUrl = "http://localhost:4000"
    if (url) {
        return `${serverUrl}/${url}`
    }
}