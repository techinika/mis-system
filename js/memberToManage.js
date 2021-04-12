const members = document.getElementById('membersCollection')
let feed = document.getElementById('feedbackp')

function displayMembers(doc){

    let div = document.createElement('tr')
    div.setAttribute('data-id', doc.id);
    let th = document.createElement('td')
    th.setAttribute('scope', 'row')
    let name = document.createElement('td')
    let action = document.createElement('td')

    let deleteBtn = document.createElement('span')
    deleteBtn.setAttribute('class', 'badge')
    deleteBtn.setAttribute('class', 'badge-danger')
    let editBtn = document.createElement('span')
    editBtn.setAttribute('class', 'badge')
    editBtn.setAttribute('class', 'badge-success')

    th.textContent = doc.data().num
    name.textContent = doc.data().name
    deleteBtn.textContent = "Delete"
    editBtn.textContent = "Update" 
    editBtn.style.padding = "6px"
    editBtn.style.margin = '5px'
    deleteBtn.style.padding = "6px"
    deleteBtn.style.margin = '5px'

    action.appendChild(deleteBtn)
    action.appendChild(editBtn)
    
    div.appendChild(th)
    div.appendChild(name)
    div.appendChild(action)

    members.appendChild(div)

    deleteBtn.addEventListener('click', function(){
        if (confirm("Do you want to delete this member?") == true) {
            db.collection("members").doc(doc.id).delete().then(function() {
                feed.style.display = 'block'
                feed.style.backgroundColor = 'green'
                feed.innerHTML = "Member deleted successfully!"
                setTimeout(() => {
                    window.location.reload()
                }, 5000);
            }).catch(function(error) {
                feed.style.display = 'block'
                feed.style.backgroundColor = 'red'
                feed.innerHTML = "Can't delete user "+ error.message
                setTimeout(() => {
                    window.location.reload()
                }, 10000);
            });
        } else {
            feed.style.display = 'block'
            feed.style.backgroundColor = 'green'
            feed.innerHTML = "You chose not to delete this member!"
            setTimeout(() => {
                window.location.reload()
            }, 5000);
        }
    })

    editBtn.addEventListener('click', () => {
        location.assign(`editMember.html#${doc.id}`)
    })

    
    
}

db.collection('members').onSnapshot(snapshot => {
    if(snapshot.size === 0){
        feed.style.display = 'block'
        feed.style.backgroundColor = 'red'
        feed.innerHTML = "No members!"
    }
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