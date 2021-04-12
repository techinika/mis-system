
const username = document.querySelector('.name')
const password = document.querySelector('.password')
const email = document.querySelector('.email')
const identity = document.querySelector('.identity')
const phone = document.querySelector('.phone')
const role = document.querySelector('.role')
const description = document.querySelector('.description')
const feed = document.getElementById('feedback')
const btn = document.querySelector('#submit-btn')

const formValidating = () =>{
    if(email.value === ''){
        feed.style.display = 'block';
        feed.style.backgroundColor = "red";
        feed.innerHTML = "Secret can't be empty!";
        console.log('violation error')
    }else if(username.value === ''){
        feed.style.display = 'block';
        feed.style.backgroundColor = "red";
        feed.innerHTML = "Name can't be empty!"
        console.log('violation error')
    }else if(role.value === ''){
        feed.style.display = 'block';
        feed.style.backgroundColor = "red";
        feed.innerHTML = "Role can't be empty!"
    }else if(identity.value === ''){
        feed.style.display = 'block';
        feed.style.backgroundColor = "red";
        feed.innerHTML = "Identity can't be empty!"
    }else if(identity.value.length !== 16){
        feed.style.display = 'block';
        feed.style.backgroundColor = "red";
        feed.innerHTML = "Identity needs to have 16 digits!"
    }else{
        const image = document.querySelector('.image').files[0];
        const imageName = image.name;
        const storageRef = firebase.storage().ref('images/'+imageName);
        const uploadTask = storageRef.put(image);
        uploadTask.on('state_changed', function(snapshot){
            const progress = snapshot.bytestransferred/snapshot.totalBytes *100;
            console.log("Upload is " +progress+ " done");
        }, function(error){
            console.log(error.message);
        }, function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('members').add({
                    image: downloadURL,
                    name: username.value,
                    password: password.value,
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
            });
        });
        
    }
}

btn.addEventListener('click', (e)=>{
    btn.style.backgroundColor = "blue"
    formValidating()
})
