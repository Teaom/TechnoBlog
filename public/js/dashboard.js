const divs = document.getElementsByClassName("divs")


divs.array.forEach(element => {
    fetch("/api/comments/"+ element.id.slice(5)).then(res => res.json()).then(data => console.log(data))
    element.append()
});