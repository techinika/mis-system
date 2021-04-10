db.collection('members').onSnapshot(snapshot => {
    size = snapshot.size
    let count = document.getElementById('members-count')
    count.textContent = size
})

db.collection('members').where('role', '==', 'Manager').onSnapshot(snapshot => {
    size = snapshot.size
    let count = document.getElementById('manager-count')
    count.textContent = size
})

db.collection('members').where('role', '==', 'Author').onSnapshot(snapshot => {
    size = snapshot.size
    let count = document.getElementById('author-count')
    count.textContent = size
})