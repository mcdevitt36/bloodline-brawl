/* BLOODLINE BRAWL — WARFARE KEYBOARD FIRE / AIM V11
   Adds keyboard aliases without replacing mouse controls:
   J = Fire / Melee, K = Aim.
   Synthetic mouse events intentionally reuse Warfare's existing combat/ADS path,
   so fire rate, automatic weapons, melee, pointer lock and aiming stay consistent. */

const canvas=()=>document.getElementById('gameCanvas');
let jHeld=false,kHeld=false;
function send(type,button){const c=canvas();if(!c)return;c.dispatchEvent(new MouseEvent(type,{button,bubbles:true,cancelable:true,view:window}));}
function active(){const c=canvas();return !!c && document.pointerLockElement===c;}

document.addEventListener('keydown',e=>{
  if(e.code==='KeyJ'){
    if(e.repeat||jHeld)return;
    jHeld=true;
    if(active())send('mousedown',0);
  }
  if(e.code==='KeyK'){
    if(e.repeat||kHeld)return;
    kHeld=true;
    if(active())send('mousedown',2);
  }
});
document.addEventListener('keyup',e=>{
  if(e.code==='KeyJ'){
    jHeld=false;
    send('mouseup',0);
  }
  if(e.code==='KeyK'){
    kHeld=false;
    send('mouseup',2);
  }
});
document.addEventListener('pointerlockchange',()=>{
  if(!active()){
    if(jHeld)send('mouseup',0);
    if(kHeld)send('mouseup',2);
  } else {
    if(jHeld)send('mousedown',0);
    if(kHeld)send('mousedown',2);
  }
});