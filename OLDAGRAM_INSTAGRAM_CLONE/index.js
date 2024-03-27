const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        alt: "Portrait of Vincent van Gogh, featuring the artist with a stern expression, a reddish beard, and his blue-grey jacket against a swirling blue background.",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        alt: "Self-portrait of Gustave Courbet with a shocked expression, holding his head with his hands, wide-eyed and with a mustache.",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        alt: "Joseph Ducreux's self portrait",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]


function renderPosts() { 
    const postContainerEl = document.getElementById('postContainer-el')
    // clear existing content
    postContainerEl.innerHTML = ''

    let postHtml = '' // emtry string to store html sections before rendreing to the page    
    posts.forEach(post => { 
        postHtml += `
            <section>
                <div class="flex creator-info">
                    <img class="avatar" src="${post.avatar}" alt="${post.alt}">
                    <div>
                        <h1>${post.name}</h1>
                        <h2>${post.location}</h2>
                    </div>
                </div>
            
                <img class="main-img" src="${post.post}" alt="main post picture">
            
                <div class="flex post-feedback">
                    <div class="flex icon-wrapper">
                        <img class="icon-size" src="./images/icon-heart.png" alt="Like post">
                        <img class="icon-size" src="./images/icon-comment.png" alt="Comment on post">
                        <img class="icon-size" src="./images/icon-dm.png" alt="Send a direct message">
                    </div>
            
                        <p class="bold-text">${post.likes} likes</p>
                        <p><span class="bold-text">${post.username}</span> ${post.comment}</p>
                </div>
            </section>
        `        
    })
    postContainerEl.innerHTML = postHtml
}

renderPosts()