var sideBar = document.getElementById("mobile-nav");
var openSidebar = document.getElementById("openSideBar");
var closeSidebar = document.getElementById("closeSideBar");
var brandName = document.querySelector(".brand-mobile")
sideBar.style.transform = "translateX(-260px)";
function sidebarHandler(flag) {
  if (flag) {
    sideBar.style.transform = "translateX(0px)";
    openSidebar.classList.add("hidden");
    closeSidebar.classList.remove("hidden");
  } else {
    sideBar.style.transform = "translateX(-260px)";
    closeSidebar.classList.add("hidden");
    openSidebar.classList.remove("hidden");
  }
}

// Copy Function
document.addEventListener("DOMContentLoaded", () => {
  hljs.highlightAll();
  const alertCopy = document.getElementById("toast-success");
  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alertCopy.classList.remove("hidden");
      setTimeout(() => {
        alertCopy.classList.toggle('hidden');
      }, 2500);
    })
  }
  // Bullet Code 
  const copyBullet = document.getElementById("copy-bullet");
  const bulletCode = document.querySelector(".bullet-list")
  const bulletText = bulletCode.innerText;
  copyBullet.addEventListener("click", () => {
    copyText(bulletText)
  })
  // Italic
  const copyItalic = document.getElementById("copy-italic")
  const italicCode = document.querySelector(".italic-code"); 
  const italicText = italicCode.innerText;
  copyItalic.addEventListener("click", () => {
    copyText(italicText);
  });
  // Bold
  const copyBold = document.getElementById("copy-bold");  
  const boldCode = document.querySelector(".bold-code");
  const boldText = boldCode.innerText;
  copyBold.addEventListener("click", () => {
    copyText(boldText);
  });

  /*======== Bulleted List =======*/
})


