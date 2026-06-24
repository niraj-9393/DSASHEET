document.addEventListener("DOMContentLoaded", async() => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    })

    if(!tab.url.startsWith("https://leetcode.com/problems/")){
        document.getElementById("question_link").placeholder = "Open a LeetCode problem first!";
          const closeBtn = document.getElementById("close");
    const cancelBtn = document.querySelector(".cancel");

    closeBtn.addEventListener("click", () => {
        window.close();
    });

    cancelBtn.addEventListener("click", () => {
        window.close();
    });
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

    
    const difficulty = result[0].result;
    document.getElementById('difficulty').value = difficulty;
    const remark = document.getElementById('remark');
    let queRemark ;
    remark.addEventListener('change',(event)=>{
      queRemark =  event.target.value
         console.log(queRemark);
    })
   
    // close extention when click on the close btn and cancel btn

    const closeBtn = document.getElementById("close");
    const cancelBtn = document.querySelector(".cancel");

    closeBtn.addEventListener("click", () => {
        window.close();
    });

    cancelBtn.addEventListener("click", () => {
        window.close();
    });
    const  addToSheetBtn = async()=>{
        const url = "http://localhost:5000/problem/addtosheet";
        try {
            const res = await fetch(url, {
             method: "POST",
             headers: {
        "Content-Type": "application/json"
    },
     body: JSON.stringify({
        name: que_name,
        link: tab.url,
        difficulty,
        remark: queRemark
    })
});
            console.log(res);
        } catch (error) {
            
        }
    }
    document.getElementById("addToSheet")
    .addEventListener("click", addToSheetBtn);
})