export const imageurl = (url) => {
    // const serverUrl = "http://localhost:4000"
    const serverUrl = "https://temp.mdtamiz.com"
    if (url) {
        return `${serverUrl}/${url}`
    }
}