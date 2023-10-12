//scroll fading effect for review reading:

const observer= new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('read-animation');
        } else{
            entry.target.classList.remove('read-animation');
        }
    });
});

const hiddenElements= document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));


const nameObserver= new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('to-animate-content');
        }
    });
});

//scroll fading effect for movie list:

const hiddenNames= document.querySelectorAll('.hidden-name');
hiddenNames.forEach((el)=>nameObserver.observe(el));


const scrollTo=document.querySelector('.navbar');
const scrollElement=document.querySelector('.arrowTop');

const scrollFunction = ()=>{
    scrollTo.scrollIntoView({behavior: "smooth"});
}

scrollElement.addEventListener("click",scrollFunction);



// go to top:

scrollId = document.getElementById("to-scroll-id");
const arrowTop=document.querySelector('.arrowTop');

const myScrollFunc = function () {
    let y = window.scrollY;
    if (y >=1000) {
        scrollId.className="scroll-container show";
        scrollId.style.display='inline';


    
        arrowTop.style.display='inline-block';

        setTimeout(function(){
            arrowTop.style.pointerEvents='auto';
            arrowTop.style.cursor='pointer';
        }, 1000);


    } else {
        scrollId.className="scroll-container hide";
        scrollId.style.display='none';

        arrowTop.style.display='none';
        arrowTop.style.pointerEvents='none';
        arrowTop.style.cursor='default';
    }
};

window.addEventListener("scroll", myScrollFunc);

