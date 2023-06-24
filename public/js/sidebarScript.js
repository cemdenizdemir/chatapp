const searchDiv = document.querySelector(".search-div")
const searchInput = searchDiv.getElementsByClassName("search")[0]
const friendRequest = document.getElementById("friend-requests")
const loadingIcon = document.getElementById("add-friend-loading-icon")
const noUserFound = document.getElementById("no-user-found")
const usersFound = document.getElementById("users-found")

var foundUserForm

sendFriendRequest = (e) => {
    socket.emit("sendFriendRequest", e.target.name)
}

searchUser = () => {
    socket.emit("searchUser", searchInput.value)
}

searchInput.onkeypress = (e) => {
    if(e.key == "Enter"){
        loadingIcon.style.display = "block"
        searchUser()
    } 
}



// findCommonFriends = (user, searchedUser) => {
//     return user.friends.filter( friend => {
//         return searchedUser.friends.find(friend)
//     })
// }

const socket = io()

socket.emit("join", (error) => {

})

socket.on("searchUserResults", (users) => {
    loadingIcon.style.display = "none"
    usersFound.innerHTML = ""
    if(users.length > 0) {
        noUserFound.style.display = "none"  

        users.forEach( (user, index) => {
            var commonFriends = user.commonFriends > 0 ? "Ortak arkadaşlar :" + user.commonFriends : "Ortak arkadaş yok"
            var profileImage

            if(user.profileImage){
                profileImage = user._id+"/profileImage/small.png"
            }
            else { profileImage = "defaultpp.png"}
            
            usersFound.innerHTML += 
            `
            <form name="${user.url}" class="found-user-form" action="/">
                <div class="found-user-box">
                    <img src="/img/${profileImage}">
                    <div>
                        <span id="name">${user.name}</span>
                        <span id="common-friends">${commonFriends}</span>
                        <div class="visit-profile">Profili gör</div>
                        <button class="add-friend-button"></button>
                    </div>
                </div>
            </form>
            `
        })
        foundUserForm = document.querySelectorAll(".found-user-form")
        //foundUserForm[0].addEventListener("submit", sendFriendRequest(e) )
       
        //alert(foundUserForm[0].innerHTML)
        for(var i=0; i< foundUserForm.length; i++) {
            foundUserForm[i].addEventListener("submit", (e) => {
                e.preventDefault()
                sendFriendRequest(e)
            })
        }
    } else {
        noUserFound.style.display = "block"   
        usersFound.innerHTML = ""
    }
})