let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  postToy()
  fetch("http://localhost:3000/toys")
  .then(res=>res.json())
  .then(data=>toyCollention(data))
});

function toyCollention(collections){
  const main = document.querySelector('#toy-collection')
  collections.forEach(collection=>{
    let divElement =document.createElement('div')
    divElement.className="card"
    let h2Element = document.createElement('h2')
    h2Element.textContent = collection.name
    let imgElement = document.createElement('img')
    imgElement.className = "toy-avatar"
    imgElement.alt = collection.name
    imgElement.src = collection.image
    let likeElement = document.createElement('p')
    likeElement.textContent = `${collection.likes} like`
    let closebtn = document.createElement("button1");
    closebtn.addEventListener('click', (e)=> e.target.parentNode.remove());
    closebtn.textContent = 'X';
    let btnElement = document.createElement('button')
    btnElement.className = "like-btn"
    btnElement.innerText = "like"
    btnElement.id = collection.id
    btnElement.addEventListener('click', function(e){
      e.preventDefault();
      let num1 = collection.likes
      let total = num1+1
      let Id = collection.id
      fetch(`http://localhost:3000/toys/${Id}`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          likes: total
          }),
      })
      console.log(Id, total)
    })

    divElement.append(closebtn,imgElement,h2Element,likeElement,btnElement)
    main.appendChild(divElement)

  })
}

function postToy(){
  const form = document.querySelector('.add-toy-form')

   
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let formName = document.querySelector('.input-text').value;
        let formImage = document.querySelector('.input-img').value;

        fetch('http://localhost:3000/toys',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: formName,
                image:formImage,
                likes: 0
            }),

        })
        form.reset();
    })
}