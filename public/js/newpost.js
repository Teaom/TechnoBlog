console.log('connected')

const newpost = async (event) => {
    event.preventDefault()
console.log('clicked')
    const title = document.querySelector('#title').value.trim()
    const body = document.querySelector('#descript').value.trim()
console.log(title, body, 'consolelog')
    if (title && body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
            
        } else {
            alert(response.statusText);
            
        }
    }
}

// Event listener for form submit
document
    .querySelector('#newPosty')
    .addEventListener('click', newpost)