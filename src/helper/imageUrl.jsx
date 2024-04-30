export const imageurl = (url) => {
    const serverUrl = "http://localhost:4500"
    // const serverUrl = "https://http://localhost:4500"
    if (url) {
        return `${serverUrl}/${url}`
    }
}