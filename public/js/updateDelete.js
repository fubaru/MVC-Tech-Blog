const update = document.querySelector("#update");
const del = document.querySelector("#delete");

const hideId = document.querySelector("#hiddenBlogId");
const postEditTitle = document.querySelector("#editedTitle");
const postEditDesc = document.querySelector("#editedContent");



update.addEventListener("click", event => {
    event.preventDefault();
    const postId = hideId.value;
    const editPost = {
        title: postEditTitle.value,
        description: postEditDesc.value
    }
    console.log(postId);
    console.log(editPost);

    fetch((`/api/posts/${postId}`), {
        method: "PUT",
        body: JSON.stringify(editPost),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/post"
        } else {
            alert("try again")
        }
    });
});

del.addEventListener("click", event => {

});