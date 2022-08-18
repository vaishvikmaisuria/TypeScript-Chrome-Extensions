chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.local.set({
        shows: [],
    })
    chrome.contextMenus.create({
        title: "Test Context Menu",
        id: "contextMenu1",
        contexts: ["page", "selection"]
    })
    chrome.contextMenus.onClicked.addListener((event) => {
        // console.log(event)
        chrome.tabs.create({
            url: `https://www.imdb.com/find?q=${event.selectionText}&ref_=nv_sr_sm`
        })
        // chrome.search.query({
        //     disposition: "NEW_TAB",
        //     text: `imdb ${event.selectionText}`,
        // })
    })

    chrome.contextMenus.create({
        title: "Read this text",
        id: "contextMenu2",
        contexts: ["page", "selection"]
    })

    chrome.contextMenus.onClicked.addListener((event) => {
        if(event.menuItemId === "contextMenu1") {
            fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    chrome.storage.local.set({
                        shows: data,
                    })
                })
        } else if (event.menuItemId == "contextMenu2") {
            chrome.tts.speak(event.selectionText, {
                // lang: "zh-CN",
                rate: 0.75,
            })
        }

    })
    // chrome.contextMenus.create({
    //     title: "Test Context Menu 1",
    //     id: "contextMenu2",
    //     parentId: "contextMenu1",
    //     contexts: ["page", "selection"]
    // })
    // chrome.contextMenus.create({
    //     title: "Test Context Menu 2",
    //     id: "contextMenu3",
    //     parentId: "contextMenu1",
    //     contexts: ["page", "selection"]
    // })
})

console.log("background script running")


// chrome.storage.local.get(["text"], (res) => {
//     console.log(res)
// })

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg)
    console.log(sender)
    // console.log(sendResponse)
    sendResponse(
        "received message from background"
    )
    chrome.tabs.sendMessage(sender.tab.id, "Got 'your message from background!")
})