// var settingsButton = document.getElementById("settings")
// var settingsOptions = document.getElementById("settings-options")
// var settingsOptionsRect = settingsOptions.getBoundingClientRect()
// var optionsHeight = Math.floor(settingsOptionsRect.height)
// var optionsButtonAction = "open"
// var optionsSizeChangeSpeed = 5
//var optionsSizeChangeInterval

// settingsOptions.style.height = "0px"
// settingsOptions.style.border = "0px"

// settingsButton.onclick = () => {
//     if (optionsButtonAction == "close") {
//         optionsSizeChangeInterval = setInterval(closeSettingsOptions, 0)
//         optionsButtonAction = "open"
//     }
//     else if (optionsButtonAction == "open") {
//         optionsSizeChangeInterval = setInterval(openSettingsOptions, 0)
//         optionsButtonAction = "close"
//     }
// }

// closeSettingsOptions = () => {
//     settingsOptions.style.border = "0px"
//     if (optionsHeight > 0) {
//         settingsOptions.style.height = optionsHeight + "px"
//         optionsHeight -= optionsSizeChangeSpeed
//     }
//     else {
//         settingsOptions.style.height = "0px"
//         optionsHeight = 0
//         clearInterval(optionsSizeChangeInterval)

//     }
// }

// openSettingsOptions = () => {
//     settingsOptions.style.border = "0.1rem solid rgba(0, 0, 0, 0.123)"
//     if (optionsHeight < Math.floor(settingsOptionsRect.height)) {
//         settingsOptions.style.height = optionsHeight + "px"
//         optionsHeight += optionsSizeChangeSpeed
//     }
//     else {
//         optionsHeight = Math.floor(settingsOptionsRect.height)
//         settingsOptions.style.height = optionsHeight + "px"
//         clearInterval(optionsSizeChangeInterval)
//     }
// }

// var sideMenuHeaderText = document.getElementById("side-menu-header-text")

// var sideOptionsMenu = document.getElementById("side-options-menu")
// var sideOptionsMenuWidth = 0 //440px
// var sideOptionsMenuMaxWidth = 440
// var addFriends = document.querySelector("#settings-options ul")
//     .getElementsByTagName("li")[0]
// var addFriendsContainer = document.getElementById("add-friend")

// var sideOptionsMenuSizeChangeInterval
// var sideOptionsSizeChangeSpeed = 40

// var sideMenuCloseButton = document.getElementById("side-menu-close-button")


// var friendRequests = document.getElementById("friend-requests")
// var seeOrHideRequestsButton = document.getElementById("see-or-hide-requests")
// var seeOrHideRequestsButtonAction = "see"
// var seeOrHideRequestsButtonText = seeOrHideRequestsButton.innerHTML


// seeOrHideRequestsButton.onclick = () => {
//     if (seeOrHideRequestsButtonAction == "see") {
//         friendRequests.style.display = "block"
//         friendRequests.style.overflowY = "scroll"
//         seeOrHideRequestsButtonAction = "hide"
//         seeOrHideRequestsButton.innerHTML = "İstekleri gizle"
//     }
//     else {
//         friendRequests.style.display = "none"
//         friendRequests.style.overflowY = "hidden"
//         seeOrHideRequestsButtonAction = "see"
//         seeOrHideRequestsButton.innerHTML = seeOrHideRequestsButtonText
//     }
// }

// var profileDetails = document.getElementById("profile-details")

// var settingsHeader = document.getElementById("settings-header")
// var settingsHeaderImg = document.querySelector("#settings-header img")
// var editProfilePop = document.getElementById("edit-profile-pop")
// editProfilePop.style.display = "none"


document.getElementById("settings-options").style.height = "0px"

var settings = {
    switch: document.getElementById("settings"),
    options: {
        box: document.getElementById("settings-options"),
        addFriends: document
            .querySelector("#settings-options ul")
            .getElementsByTagName("li")[0],
        profileSettings: document
            .querySelector("#settings-options ul")
            .getElementsByTagName("li")[1],
        exit: document.querySelector("#settings-options ul")
            .getElementsByTagName("li")[2]
    },
    height: Math.floor(
        document
            .getElementById("settings-options")
            .getBoundingClientRect()
            .height
    ),
    maxHeight: 145,
    action: "open",
    speed: 10,
    interval: "",
    close: function () {
        settings.options.box.style.border = "0px"
        if (settings.height > 0) {
            settings.options.box.style.height = settings.height + "px"
            settings.height -= settings.speed
        }
        else {
            settings.options.box.style.height = "0px"
            settings.height = 0
            clearInterval(settings.interval)
        }
    },
    open: function () {
        //settings.options.box.style.height="9.2rem"
        settings.options.box.style.border = "0.1rem solid rgba(0, 0, 0, 0.123)"
        if (settings.height < settings.maxHeight) {
            settings.options.box.style.height = settings.height + "px"
            settings.height += settings.speed
        }
        else {
            settings.height = settings.maxHeight
            settings.options.box.style.height = settings.height + "px"
            clearInterval(settings.interval)
        }
    }
}

settings.options.box.style.border = "0px"

settings.switch.onclick = () => {
    if (settings.action == "close") {
        settings.interval = setInterval(settings.close, 0)
        settings.action = "open"
    }
    else {
        settings.interval = setInterval(settings.open, 0)
        settings.action = "close"
    }
}

var sideMenu = {
    header: document.getElementById("side-menu-header-text"),
    options: {
        menu: document.getElementById("side-options-menu"),
        width: 0, //440px
        maxWidth: 440,
    },
    speed: 40,
    interval: "",
    closeButton: document.getElementById("side-menu-close-button"),
    pages: {
        addFriends: {
            content: document.getElementById("add-friend"),
            friendRequests: {
                box: document.getElementById("friend-requests"),
                switch: document.getElementById("see-or-hide-requests"),
                action: "see",
                text: document.getElementById("see-or-hide-requests").innerHTML
            }
        },
        profileSettings: {
            content: document.getElementById("see-settings"),
            profileDetails: {
                box: document.getElementById("profile-details"),
                header: document.getElementById("settings-header"),
                img: document.querySelector("#settings-header img"),
                editProfilePop: document.getElementById("edit-profile-pop"),
                editText:  document.querySelector("#edit-profile-pop p"),
                editSettingsBox: document.getElementById("edit-profile-image-settings")
            }
        }
    },
    open: function() {
        if(sideMenu.options.width < sideMenu.options.maxWidth){
            sideMenu.options.width += sideMenu.speed
            sideMenu.options.menu.style.width = sideMenu.options.width + "px"
        }
        else{
            sideMenu.options.width = sideMenu.options.maxWidth
            sideMenu.options.menu.style.width = sideMenu.options.maxWidth + "px"
            clearInterval(sideMenu.interval)
        }
    },
    close : function () {
        if(sideMenu.options.width > 0){
            sideMenu.options.width -= sideMenu.speed
            sideMenu.options.menu.style.width = sideMenu.options.width + "px"
        }
        else {
            sideMenu.options.width = 0
            sideMenu.options.menu.style.width = "0px"
            clearInterval(sideMenu.interval)
        }
    }
}



openSideMenuContainer = (menu) => {
    if(menu == "add-friends") {
        sideMenu.header.textContent = "Arkadaş ekle"
        sideMenu.pages.addFriends.content.style.display = "block"
    }
    if(menu == "see-settings") {
        sideMenu.header.textContent = "Ayarlar"
        sideMenu.pages.profileSettings.content.style.display = "block" //-------------------------------
    }
}

closeSideMenuContainer = () => {
    sideMenu.pages.addFriends.content.style.display = "none"
    sideMenu.pages.profileSettings.content.style.display = "none" // -------------------------
}



sideMenu.closeButton.onclick = () => {
    if (sideMenu.options.width >= 0) {
        sideMenu.interval = setInterval(sideMenu.close)
        closeSideMenuContainer()
    }
}


var seeSettings = document.querySelector("#settings-options ul")
    .getElementsByTagName("li")[1]
var seeSettingsContainer = document.getElementById("see-settings")

settings.options.addFriends.onclick = () => {
    if(sideMenu.options.width < sideMenu.options.maxWidth) {
        sideMenu.interval = setInterval(sideMenu.open)
        openSideMenuContainer("add-friends")
    }

    settings.action = "close"
    settings.options.box.style.border = "0px"
    settings.options.box.style.height = "0px"
}

settings.options.profileSettings.onclick = () => {
    if(sideMenu.options.width < sideMenu.options.maxWidth) {
        sideMenu.interval = setInterval(sideMenu.open)
        openSideMenuContainer("see-settings")
    }

    settings.action = "close"
    settings.options.box.style.border = "0px"
    settings.options.box.style.height = "0px"
}

sideMenu.pages.addFriends.friendRequests.switch.onclick = () => {
    if(sideMenu.pages.addFriends.friendRequests.action == "see") {
        sideMenu.pages.addFriends.friendRequests.box.style.display = "block"
        sideMenu.pages.addFriends.friendRequests.box.style.overflowY = "scroll"
        sideMenu.pages.addFriends.friendRequests.action = "hide"
        sideMenu.pages.addFriends.friendRequests.switch.innerHTML = "İstekleri gizle"
    }
    else {
        sideMenu.pages.addFriends.friendRequests.box.style.display = "none"
        sideMenu.pages.addFriends.friendRequests.box.style.overflowY = "hidden"
        sideMenu.pages.addFriends.friendRequests.action = "see"
        sideMenu.pages.addFriends.friendRequests.switch.innerHTML 
        = sideMenu.pages.addFriends.friendRequests.text
    }
}
    
sideMenu.pages.profileSettings.profileDetails.editProfilePop.onmouseenter = () => {
    sideMenu.pages.profileSettings.profileDetails.editText.style.display = "block"
    sideMenu.pages.profileSettings.profileDetails.editSettingsBox.style.display = "block"
}
sideMenu.pages.profileSettings.profileDetails.editProfilePop.onmouseleave = () => {
    sideMenu.pages.profileSettings.profileDetails.editText.style.display = "none"
    sideMenu.pages.profileSettings.profileDetails.editSettingsBox.style.display = "none"
}




var fullImageDiv = {
    box: document.getElementById("full-image-container"),
    username: document.getElementById("full-image-container").querySelector("p"),
    closeButton: document.getElementById("full-image-container").querySelector("button"),
    img: document.getElementById("full-image-container").querySelector("img")
}

seeSmallImage = () => {
    alert()
}

seeFullImage = (name, imgSrc) => {
    socket.emit("checkProfileImage")
    socket.on("checkProfileImageResult", async (result) => {
        if(result == true) {
            fullImageDiv.box.style.display = "flex"
            fullImageDiv.username.textContent = name
            fullImageDiv.img.src = "/img/" + imgSrc + "/profileImage/small.png"
        }
    })
}


// var seeProfileImage = document.querySelector("#edit-profile-image-settings")
//     .getElementsByTagName("li")[0]



sideMenu.pages.profileSettings.profileDetails.editSettingsBox.getElementsByTagName("li")[0].onclick = function () {
    seeFullImage(
        sideMenu.pages.profileSettings.profileDetails.editProfilePop.title,
        this.title
    )
}

fullImageDiv.closeButton.onclick = () => {
    fullImageDiv.box.style.display = "none"
}

class draggableSwitch {
    constructor (parent, child, func) {
        this.parent = parent
        this.child = child
        this.width = parseInt(parent.style.width)*16
        this.tempMouse
        this.selected = false
        this.func = func
    }

    drag = (e) => {
        //alert(this.parent.style.width)
        this.selected = true
        this.tempMouse = e.clientX
        //alert(this.tempMouse)
        this.child.onmousemove = (e) => {
            if(this.selected == true) {
                this.child.style.left = e.clientX - this.tempMouse +"px"

                if(parseInt(this.child.style.left) < 0) {
                    this.child.style.left = 0 + "px"
                }
                if(parseInt(this.child.style.left) > this.width){
                    this.child.style.left = this.width + "px"
                }
                
            }
            
        }
        this.child.onmouseup = (e) => {
            this.land(e)
        }
        this.child.onmouseleave = (e) => {
            this.land(e)
        }
    }
    land = (e) => {
        this.selected = false
        if(parseInt(this.child.style.left) >= this.width){
            this.func()
        }   
        this.child.style.left = 0 + "px"
    }
}

editProfileSettings = (command) => {
    socket.emit("editProfileSettings", command)
}

document.querySelector(".draggable-switch").style.width = "2rem"

const removeProfile = new draggableSwitch (
    document.querySelector(".draggable-switch"),
    document.querySelector(".draggable-switch .switch"),
    () => {
        editProfileSettings("removeProfileImage")
        fullImageDiv.img.src = "/img/cenk.png"
    }
    )

removeProfile.child.onmousedown = function (e) {
    removeProfile.drag(e)
} 



// removeProfile.child.onmouseup = function (e) {
//     removeProfile.land(e)
// }

// removeProfile.child.onmouseleave = (e) => {
//     this.land(e)
// }