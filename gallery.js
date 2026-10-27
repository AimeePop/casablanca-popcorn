(() => {
'use strict';
document.querySelectorAll('.grid-picker [data-columns]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelector('.inspiration-grid').dataset.columns=button.dataset.columns;
 document.querySelectorAll('.grid-picker [data-columns]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
// Only owner-reviewed entries committed to this file appear publicly.
const gallery=document.querySelector('#community-gallery');
if(!gallery)return;
fetch('assets/approved-artwork.json').then(response=>{
 if(!response.ok)throw new Error('Gallery unavailable');return response.json();
}).then(entries=>{
 for(const art of entries){
  if(!art.src||!/^assets\/approved-artwork\/[a-zA-Z0-9_.-]+$/.test(art.src))continue;
  const figure=document.createElement('figure'),image=document.createElement('img'),caption=document.createElement('figcaption');
  image.src=art.src;image.alt=art.alt||'Community colouring artwork';image.loading='lazy';
  caption.textContent=art.caption||'A little movie magic · community artwork';
  figure.append(image,caption);gallery.append(figure);
 }
 document.querySelector('#community-empty').hidden=gallery.children.length>0;
}).catch(()=>{document.querySelector('#community-empty').textContent='You can email your artwork for review while the community gallery is unavailable.';});
})();
