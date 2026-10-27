(() => {
 const root=document.querySelector('.home-features');if(!root)return;
 const slides=[...root.querySelectorAll('[data-slide]')],dots=[...root.querySelectorAll('[data-dot]')],status=root.querySelector('[data-carousel-status]');
 let index=0,timer;
 function start(){clearInterval(timer);if(!document.hidden)timer=setInterval(()=>show(index+1,false),8000)}
 function show(next,manual=true){index=(next+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==index);dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===index)));if(manual){status.textContent=dots[index].getAttribute('aria-label').replace('Show ','');start();}}
 dots.forEach((d,i)=>d.addEventListener('click',()=>show(i)));
 document.addEventListener('visibilitychange',start);start();
})();
