let id = location.hash.slice(1);

const username = document.querySelector('.name')
const email = document.querySelector('.email')
const identity = document.querySelector('.identity')
const phone = document.querySelector('.phone')
const role = document.querySelector('.role')
const description = document.querySelector('.description')

const feed = document.getElementById('feedback')
const btn = document.querySelector('#submit-btn')

const displayData = (doc) => {
    username.value === doc.name
    email.value === doc.email
    identity.value.innerHTML === doc.identity
    phone.value === doc.phoneNumber
    role.value === doc.role
    description.value === doc.description

    console.log(doc.name)
}


db.collection('members').doc(id).get().then(doc =>{
    displayData(doc.data())
})

const updateMember = () => {
   
    db.collection('members').doc(id).update({
        name: username.value,
        email: email.value,
        identity: identity.value,
        phoneNumber: phone.value,
        role: role.value,
        description: description.value
    }).then(()=>{
        feed.style.backgroundColor = 'green'
        feed.style.display = "block";
        feed.innerHTML = "A member added successfully";
        setTimeout(() => {
            window.location.href = '../manager/members.html'
        }, 5000);
    }).catch(err => {
        feed.style.display = 'block';
        feed.style.backgroundColor = "red";
        feed.innerHTML = err.message
    })
   
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    if(confirm("Do you want to save changes?") == true){
        updateMember();
        feed.style.display = 'block'
        feed.style.backgroundColor = 'green'
        feed.innerHTML = "Member updated successfully"
        setTimeout(() => {
            window.location.href = "../manager/members.html";
        }, 5000);
    }else {
        feed.style.display = 'block'
        feed.style.backgroundColor = 'green'
        feed.innerHTML = "Changes couldn't be saved! Try again"
        setTimeout(() => {
            window.location.reload()
        }, 5000);
    }
})