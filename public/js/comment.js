// These variables go through and grab the id by taking the url and using a regex to grab only the number (id), then putting that in a variable
const url = window.location.pathname
const filterNumber = url.match(/(\d+)/)
const id = filterNumber[1]
console.log('connected')
// Frontend request to create a comment
const createCommentHandler = async (event) => {
    event.preventDefault()
console.log('clicked')
    const commentContents = document.querySelector('#comment-input').value
    console.log("comment content",commentContents)
    if (commentContents) {
        const response = await fetch(`/api/comments`, {
            method: 'POST', 
            body: JSON.stringify({ postId: id, body: commentContents }),
            headers: { 'Content-type': 'application/json' }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Comment could not be added')
        }
    }
}


const getComments = async() => {
    console.log(id)
    const response = await fetch(`/api/comments/${id}`);
    console.log(response)
}

getComments();

// Event listener for form submit
document
    .querySelector('.create-comment')
    .addEventListener('click', createCommentHandler)