document.addEventListener("DOMContentLoaded", async() => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    })

    if(!tab.url.startsWith("https://leetcode.com/problems/")){
        document.getElementById("question_link").placeholder = "Open a LeetCode problem first!";
        return;
    }
    
    const que_name = tab.title.split("- LeetCode")[0]
    document.getElementById('question_link').value = tab.url;
    document.getElementById('question_name').value = que_name;
      
    const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const queDifficulty1 = document.getElementsByClassName('text-difficulty-easy')
            const queDifficulty2 = document.getElementsByClassName('text-difficulty-medium')
            const queDifficulty3 = document.getElementsByClassName('text-difficulty-hard')
            let dif;
            if(queDifficulty1.length > 0){ dif = queDifficulty1 }
            if(queDifficulty2.length > 0){ dif = queDifficulty2 }
            if(queDifficulty3.length > 0){ dif = queDifficulty3 }
            
            return dif[0].innerText  
        }
    })

    
    const difficulty = result[0].result
    document.getElementById('difficulty').value = difficulty

})