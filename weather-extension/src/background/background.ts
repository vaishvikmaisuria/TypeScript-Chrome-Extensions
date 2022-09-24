console.log("running in background")

import { setStoredCities } from "../utils/storage"

chrome.runtime.onInstalled.addListener(() => {
    setStoredCities([])
})
