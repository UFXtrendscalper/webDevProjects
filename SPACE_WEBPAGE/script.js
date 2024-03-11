
var infoDivs = document.getElementsByClassName('infoDivs');
var navItems = document.querySelectorAll("#navList li");
var contactInfo = document.getElementById('contactInfo');

function showDivs(index) {
    for (var i = 0; i < infoDivs.length; i++) {
        infoDivs[i].style.display = 'none';
        navItems[i].classList.remove('selectedNavItem');
    }
    infoDivs[index].style.display = 'block';
    navItems[index].classList.add('selectedNavItem');
}

function showContactInfo() {
    contactInfo.style.display = 'block';
}

function hideContactInfo() {
    contactInfo.style.display = 'none';
}

showDivs(0);