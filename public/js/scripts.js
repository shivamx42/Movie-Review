//scroll fading effect for review reading:

const observer= new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('read-animation');
        } else{
            // entry.target.classList.remove('read-animation');
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

// go to top:

const scrollToTop=document.querySelector('.navbar');
const scrollElement=document.querySelector('.arrowTop');

const scrollFunction = ()=>{
    scrollToTop.scrollIntoView({behavior: "smooth"});
}

scrollElement.addEventListener("click",scrollFunction);





scrollId = document.getElementById("to-scroll-id");
const arrowTop=document.querySelector('.arrowTop');

const myScrollFunc = function () {
    let scrollTop=window.scrollY;
    if (scrollTop>=1000){
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


const scrollToMovie=document.querySelector(".toScrollMovie");
const scrollElementMovie=document.querySelector('.arrowTopMovie');
const scrollFunctionMovie = ()=>{
    scrollToMovie.scrollIntoView({behavior: "smooth"});
}

scrollElementMovie.addEventListener("click",scrollFunctionMovie);

const arrowTopMovie=document.querySelector('.arrowTopMovie');

const myDiv=document.getElementsByClassName('newContent'); 


    for(let i=0;i<myDiv.length;i++){


        myDiv[i].addEventListener('scroll',function() {

        const scrollTopMovie=myDiv[i].scrollTop;
        if (scrollTopMovie>=500) {
            scrollId.className="scroll-container show";
            scrollId.style.display='inline';


        
            arrowTopMovie.style.display='inline-block';

            

            setTimeout(function(){
                arrowTopMovie.style.pointerEvents='auto';
                arrowTopMovie.style.cursor='pointer';
            }, 1000);


        } else {
            scrollId.className="scroll-container hide";
            scrollId.style.display='none';

            arrowTopMovie.style.display='none';
            arrowTopMovie.style.pointerEvents='none';
            arrowTopMovie.style.cursor='default';
            
        }
    });
};
