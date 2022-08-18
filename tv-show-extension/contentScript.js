confirm("hello from the content script!")

const aTags = document.getElementsByTagName("a")
const text = []
for (const tag of aTags) {
    // change all tags to Hello World
    // tag.textContent = "Hello World"
    // Highlight text with i in word
    if (tag.textContent.includes("i")) {
        tag.style = "background-color: yellow;"
    }
    text.push(tag.textContent)
}

chrome.storage.local.set({
    text,
})

chrome.runtime.sendMessage(null, text, (response) => {
    console.log("I'm from the send response function " + response)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
})