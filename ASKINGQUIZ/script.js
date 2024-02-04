// const card = document.querySelector(".card") เลือกคลาสจาก id หรือ class
const ShowBtn = document.querySelector("#show")
const HiddenBtn = document.querySelector("#btn-hidden")
const AddContainer = document.querySelector("#add-container")
const CardContainer = document.querySelector(".card-container")
const NextBtn = document.querySelector("#next")
const PrevBtn = document.querySelector("#prev")
const CurrentElement = document.querySelector(".current")
const ClearBtn = document.querySelector("#clear")
const QuestionElement = document.querySelector("#question")
const AnswerElement = document.querySelector("#answer")
const AddCard = document.querySelector("#add-card")


let CurrentActiveCard = 0; // เก็บการ์ดที่ถูกทำงานว่าเป็นใบที่เท่าไร
let CardElement=[] // เก็บจำนวนคำถามทั้งหมด
const CardData = GetCardData()

function CreateCard(){ //loop ข้อมูลใน CardData ว่ามี่อยู่กี่ข้อแล้วค่อยส้รางการ์ดขึ่้นมา
    CardData.forEach((data,index)=>{
        CreateSingleCard(data,index)
    })
}

function CreateSingleCard(data,index){
    const card=document.createElement("div")
    card.classList.add("card")

    if(index==0){
        card.classList.add("active")
    }
    card.innerHTML=`
    <div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="\inner-card-back\">
        <p>${data.answer}</p>
    </div>
    </div>
    `
    

       
    card.addEventListener("click",()=>card.classList.toggle("show-answer"))
    CardElement.push(card) // นับจำนวนว่ามีการ์ดกี่ใบ
    CardContainer.appendChild(card) // นำมาแสดงผล
    UpdateCurrentQuestion();
   
}

function UpdateCurrentQuestion(){
    CurrentElement.innerText = `${CurrentActiveCard+1} / ${CardElement.length}`
}

CreateCard()
// card.addEventListener("click",()=>card.classList.toggle("show-answer"))
ShowBtn.addEventListener("click",()=>AddContainer.classList.add("show"))
HiddenBtn.addEventListener("click",()=>AddContainer.classList.remove("show"))


NextBtn.addEventListener("click",()=>{
    CardElement[CurrentActiveCard].className = `card left`
    CurrentActiveCard = CurrentActiveCard+1
    if(CurrentActiveCard>CardElement.length-1){
        CurrentActiveCard=CardElement.length-1
    }
    CardElement[CurrentActiveCard].className = `card active`
    UpdateCurrentQuestion()
})

PrevBtn.addEventListener("click",()=>{  
    CardElement[CurrentActiveCard].className = `card right`
    CurrentActiveCard = CurrentActiveCard-1
    if(CurrentActiveCard<0){
        CurrentActiveCard= 0
    }
    CardElement[CurrentActiveCard].className = `card active`
    UpdateCurrentQuestion()
})


AddCard.addEventListener("click",()=>{
    const question=QuestionElement.value
    const answer=AnswerElement.value

    if(question.trim() && answer.trim()){
        const newCard = {question,answer}
        CreateSingleCard(newCard)
        QuestionElement.value = " "
        AnswerElement.value = " "
        AddContainer.classList.remove("show")
        CardData.push(newCard)
        SetCardData(CardData)
    }

})

function SetCardData(cards){
    localStorage.setItem("cards",JSON.stringify(cards))
    window.location.reload()
}

function GetCardData(){
    const cards=JSON.parse(localStorage.getItem("cards"))
    return cards === null? [] : cards
}

ClearBtn.addEventListener("click",()=>{
    localStorage.clear()
    CardContainer.innerHTML = " "
    window.location.reload()
})
   