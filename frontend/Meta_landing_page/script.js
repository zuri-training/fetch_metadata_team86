const arrowLeft = document.querySelector(".angle-left");
const arrowRight = document.querySelector(".angle-right");
const mText= document.querySelector(".m-text");
const text1 = document.querySelector(".m-text-1");
const text2 = document.querySelector(".m-text-2");
const allText = mText.querySelectorAll(".sub-text");
const headLogo = document.querySelector("#head-logo");
let isLeft = false;
let isRight = true;
let count = 0;


const mobile = window.matchMedia("(max-width: 900px)")

if(mobile.matches){
    mobileLayout()
}

mobile.addEventListener("change",()=>{
    if(mobile.matches){
        mobileLayout()
    }
    else if(!mobile.matches){
        desktopLayout()
    }
})



function mobileLayout(){
headLogo.src="Images/mobile/Mobile-Logo.svg"
}
function desktopLayout(){
    headLogo.src="Images/desktop/BrandIcon_with_wordmark.png"
    }

arrowLeft.addEventListener("click",()=>{
  if(isLeft && !isRight){
myInstance = setInterval(()=>{
            count-=10;
            left(count)
            }, 50
        );
            };




});


arrowRight.addEventListener("click",()=>{
    if(!isLeft && isRight){
    yourInstance = setInterval(()=>{    
        count += 10
        right(count);
        },50);
    };
});


function left(value){
        text1.style.left = `-${value}%`;
        text2.style.left = `-${value}%`;

        if(value === 0){
            clearInterval(myInstance);
            isLeft = false;
            isRight = true;
                    };
    };

function right(value){
    text1.style.left = `-${value}%`;
    text2.style.left = `-${value}%`;

    if(value === 100){
        clearInterval(yourInstance);
        isLeft = true;
        isRight = false;
    };

};

let screenWidth = window.innerWidth;