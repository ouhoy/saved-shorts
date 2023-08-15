 chrome.storage.local.get(["savedShorts"]).then((result) => {
            console.log(result.savedShorts)
        });