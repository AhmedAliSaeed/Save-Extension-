
let myLeads= []

const inputEl= document.getElementById("input-el")
const inputBtn= document.getElementById("input-btn")
const ulEl= document.getElementById("ul-el")
const deleteBtn= document.getElementById("delete-btn")
const tabBtn= document.getElementById("tab-btn")

const leadsFromTheLocalStorage= JSON.parse( localStorage.getItem("myLeads") )
const tabs= [
    {
        url: "www.google.com"
    }
]    

if(leadsFromTheLocalStorage){
    myLeads= leadsFromTheLocalStorage
    render(myLeads)

}


function render(leads) {
    let listItems= ""
    for(let i=0; i < leads.length; i++){
        listItems+= `
            <li>
                <a href="${leads[i]}" target= '_blank'>
                 ${leads[i]} 
                 </a>
            </li>
            `
    }
    
    ulEl.innerHTML = listItems 
}


tabBtn.addEventListener("click" , function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        let myLeadsStr= JSON.stringify(myLeads)
        localStorage.setItem("myLeads" , myLeadsStr)
        render(myLeads)
    })

    
})


deleteBtn.addEventListener("dblclick" , function(){
    localStorage.clear()
    myLeads= []
    render(myLeads)
})

inputBtn.addEventListener("click" , function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    let myLeadsStr= JSON.stringify(myLeads)
    localStorage.setItem("myLeads" , myLeadsStr)

    render(myLeads)

})




