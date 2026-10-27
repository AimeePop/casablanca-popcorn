// Audio begins only after the popcorn character is clicked or tapped.
let popcornAudio, musicBuffer, musicLoading, activeMusic;
let audioBusy = false;
async function playPopcornSound(){
 if(audioBusy)return;
 const AudioContext=window.AudioContext||window.webkitAudioContext;
 if(!AudioContext)return;
 audioBusy=true;
 try{
  popcornAudio=popcornAudio||new AudioContext();
  const ctx=popcornAudio;
  await ctx.resume();
  musicLoading=musicLoading||fetch('assets/as-time-goes-by-8-seconds.mp3')
   .then(response=>{if(!response.ok)throw new Error('Music unavailable');return response.arrayBuffer();})
   .then(bytes=>ctx.decodeAudioData(bytes));
  try{musicBuffer=await musicLoading;}catch{musicLoading=null;}
  const start=ctx.currentTime+.02;
  [0,.32,.64].forEach((delay,i)=>{
   const t=start+delay;
   const oscillator=ctx.createOscillator(),gain=ctx.createGain();
   oscillator.type='sine';
   oscillator.frequency.setValueAtTime(430-i*55,t);
   oscillator.frequency.exponentialRampToValueAtTime(85,t+.12);
   gain.gain.setValueAtTime(.0001,t);
   gain.gain.exponentialRampToValueAtTime(.055,t+.012);
   gain.gain.exponentialRampToValueAtTime(.0001,t+.15);
   oscillator.connect(gain);gain.connect(ctx.destination);
   oscillator.start(t);oscillator.stop(t+.16);
  });
  // The music follows the final pop, with gentle fades at both ends.
  const musicStart=start+.82;
  if(musicBuffer){
   const music=ctx.createBufferSource(),gain=ctx.createGain();
   const duration=Math.min(8,musicBuffer.duration);
   music.buffer=musicBuffer;activeMusic=music;
   gain.gain.setValueAtTime(0,musicStart);
   gain.gain.linearRampToValueAtTime(.55,musicStart+.2);
   gain.gain.setValueAtTime(.55,musicStart+Math.max(.2,duration-.5));
   gain.gain.linearRampToValueAtTime(0,musicStart+duration);
   music.connect(gain);gain.connect(ctx.destination);
   music.onended=()=>{activeMusic=null;audioBusy=false;};
   music.start(musicStart,0,duration);
  }else{
   const end=ctx.createOscillator(),silent=ctx.createGain();
   silent.gain.value=0;end.connect(silent);silent.connect(ctx.destination);
   end.onended=()=>{audioBusy=false;};end.start(start);end.stop(musicStart);
  }
 }catch{audioBusy=false;}
}
document.querySelectorAll('.popcorn-smile').forEach((popcorn) => {
  function scatterPopcorn() {
    playPopcornSound();
    const origin = popcorn.getBoundingClientRect();
    const centreX = origin.left + origin.width / 2;
    const centreY = origin.top + origin.height / 2;

    Array.from({ length: 52 }).forEach((_, index) => {
      const piece = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 52 + (Math.random() - .5) * .26;
      const distance = 90 + Math.random() * 390;
      piece.className = 'popcorn-pop';
      piece.style.left = `${centreX}px`;
      piece.style.top = `${centreY}px`;
      piece.style.setProperty('--pop-size', `${12 + Math.random() * 28}px`);
      piece.style.setProperty('--pop-x', `${Math.cos(angle) * distance}px`);
      piece.style.setProperty('--pop-y', `${Math.sin(angle) * distance}px`);
      piece.style.setProperty('--pop-rotate', `${(Math.random() - .5) * 760}deg`);
      piece.style.animationDelay = `${Math.random() * .12}s`;
      document.body.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    });
  }

  popcorn.addEventListener('click', scatterPopcorn);
});
