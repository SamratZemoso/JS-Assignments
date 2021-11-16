function incrementCount() {
    if(localStorage.clickCount) {
        localStorage.clickCount = Number(localStorage.clickCount) + 1;
    } else {
        localStorage.clickCount = 1;
    }

    if(sessionStorage.clickCount) {
        sessionStorage.clickCount = Number(sessionStorage.clickCount) + 1;
    } else {
        sessionStorage.clickCount = 1;
    }
    document.getElementById("local").innerHTML = "Count of local : " + localStorage.clickCount;
    document.getElementById("session").innerHTML = "Count of Session : " + sessionStorage.clickCount;
}