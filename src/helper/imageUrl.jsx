export const imageurl = (url) => {
    const serverUrl = "https://temp.mdtamiz.com"
    // const serverUrl = "https://https://temp.mdtamiz.com"
    if (url?.includes("http")) {
        return url
    }
    else if (url) {
        return `${serverUrl}/${url}`
    }
    else {
        return 'https://docs.material-tailwind.com/img/face-2.jpg'
    }
}

// export const imageurl = (url) => {
//     if (url?.includes("http")) {
//         return url
//     }
//     else if (url === "/images/avater.png" || url === "") {
//         return `https://social-media.mdtamiz.com/uploads/posts/5454545/333692911_avater.png`
//     }
//     else {
//         const link = `https://social-media.mdtamiz.com/${url || "uploads/posts/5454545/836795297_Dots-Preloader.gif"}`
//         return link
//     }
// }