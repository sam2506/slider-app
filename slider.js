var pos = 0;
var animationTime = 2000
var numOfImages = document.getElementsByClassName("image-1").length;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getImageToSlide(pos) {
    var images = document.getElementsByClassName("slider")[0].children;
    if(pos == 0)
    console.log(images[pos]);
    return images[pos];
}

function getNewBackground(pos) {
    var opaqImage = document.getElementsByClassName("opaq");
    if(opaqImage.length!=0) {
        var image = opaqImage[0];
        image.className = "image";
    }
    var images = document.getElementsByClassName("image");
    return images[pos];
}

async function changePreviousImageClassName(prevIndex) {
    var image = getImageToSlide(prevIndex);
    image.className = "image-2";
    await sleep(animationTime);
    image.className = "image-1";
}

function slideDownAndChangeBackround(pos, prevIndex) {
    var newBackground = getNewBackground(pos);
    newBackground.className = "opaq";
    var imageToSlide = getImageToSlide(pos);
    imageToSlide.className = "anim";
    changePreviousImageClassName(prevIndex);
    imageToSlide.style.top = "0%";
    return;
}

function slideUpAndChangeBackround(pos, prevIndex) {
    var newBackground = getNewBackground(pos);
    newBackground.className = "opaq";
    var imageToSlide = getImageToSlide(pos);
    imageToSlide.className = "anim-2";
    changePreviousImageClassName(prevIndex);
    imageToSlide.style.top = "0%";
    return;
}

function changeActiveBtn(idx) {
    var currActive = document.getElementsByClassName("act");
    var prevIndex;
    if(currActive.length != 0) {
        var curr = currActive[0];
        prevIndex = [...curr.parentElement.children].indexOf(curr)
        curr.className = "fa fa-circle inact";
    }
    var btns = document.getElementsByClassName("inact");
    btns[idx].className = "fa fa-circle act";

    if(prevIndex == numOfImages-1 && idx == 0) {
        slideDownAndChangeBackround(idx, prevIndex);
        return;
    }
    if(prevIndex == 0 && idx == numOfImages-1) {
        slideUpAndChangeBackround(idx, prevIndex);
        return;
    }
    if(prevIndex > idx) {
        slideUpAndChangeBackround(idx, prevIndex);
        return;
    }
    if (prevIndex < idx) {
        slideDownAndChangeBackround(idx, prevIndex);
        return;
    }
}
var div = document.getElementsByClassName('fg-slider__dots');
for (var i = 0, len = div[0].children.length; i < len; i++)
{
    (function(index){
        div[0].children[i].onclick = function(){
            changeActiveBtn(index);
        }    
    })(i);
}

function slideDown() {
    if(pos == numOfImages-1) {
        pos = 0;
    } else {
        pos += 1;
    }
    changeActiveBtn(pos);
}
function slideUp() {
    if(pos == 0) {
        pos = numOfImages - 1;
    } else {
        pos -= 1;
    }
    changeActiveBtn(pos);
}