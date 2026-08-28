/* BLOODLINE BRAWL — WARFARE SCROLL LOCK V12
   Prevents browser/page scrolling from interfering with gameplay controls.
   Keeps normal clicks and the boot/result UI usable. */

const GAME_KEYS=new Set([
  'Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
  'KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight',
  'KeyQ','KeyE','KeyR','KeyF','KeyJ','KeyK','Digit1','Digit2'
]);

function canvas(){return document.getElementById('gameCanvas');}
function gameplayActive(){
  const c=canvas();
  if(!c)return false;
  const boot=document.getElementById('bootScreen');
  const results=document.getElementById('resultScreen');
  const bootVisible=boot && !boot.classList.contains('hidden');
  const resultsVisible=results && !results.classList.contains('hidden');
  return !bootVisible && !resultsVisible;
}

// Lock the document itself so no scrollbar can appear from dynamic HUD/layout changes.
document.documentElement.style.overflow='hidden';
document.body.style.overflow='hidden';
document.documentElement.style.overscrollBehavior='none';
document.body.style.overscrollBehavior='none';

// Stop Space/arrows and gameplay keys from triggering browser scrolling or focus movement.
document.addEventListener('keydown',e=>{
  if(gameplayActive() && GAME_KEYS.has(e.code)) e.preventDefault();
},{passive:false});

// Stop trackpad/mouse-wheel page movement while playing. Camera input remains mouse-move based.
document.addEventListener('wheel',e=>{
  if(gameplayActive()) e.preventDefault();
},{passive:false});

// Prevent mobile/touch overscroll/bounce on the game canvas.
document.addEventListener('touchmove',e=>{
  if(gameplayActive() && e.target===canvas()) e.preventDefault();
},{passive:false});

// Keep the viewport pinned even if the browser tries to restore an old scroll position.
window.addEventListener('scroll',()=>{
  if(gameplayActive() && (window.scrollX!==0 || window.scrollY!==0)) window.scrollTo(0,0);
},{passive:true});
