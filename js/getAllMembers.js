const members = document.getElementById('membersCollection')

function displayMembers(doc){

    let div = document.createElement('tr')
    div.setAttribute('data-id', doc.id);
    let th = document.createElement('td')
    th.setAttribute('scope', 'row')
    let name = document.createElement('td')
    let role = document.createElement('td')
    let number = document.createElement('td')

    th.textContent = doc.data().num
    name.textContent = doc.data().name
    role.textContent = doc.data().role
    number.textContent = doc.data().phoneNumber

    
    div.appendChild(th)
    div.appendChild(name)
    div.appendChild(role)
    div.appendChild(number)

    members.appendChild(div)

    div.addEventListener('click', ()=>{
        div.style.backgroundColor = "skyblue";
        location.assign(`viewmem.html#${doc.id}`)
    })

    
}

db.collection('members').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            displayMembers(change.doc)
        } else if (change.type == 'removed'){
            let div = document.querySelector('[data-id' + change.doc.id + ']');
            members.removeChild(div);
        }
    })
})