let id = location.hash.slice(1);

const viewMember = (doc) => {
    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')
    let ide = document.getElementById('identity')
    let role = document.getElementById('role')
    let description = document.getElementById('description')
    let image = document.getElementById('profile-img')

    image.src = doc.image;

    name.innerHTML = doc.name;
    email.innerHTML = doc.email;
    phone.innerHTML = doc.phoneNumber || "No phone number provided";
    ide.innerHTML = doc.identity;
    role.innerHTML = doc.role;
    description.innerHTML = doc.description || "No description provided";
}

db.collection('members').doc(id).get().then(doc=> {
    viewMember(doc.data())
})