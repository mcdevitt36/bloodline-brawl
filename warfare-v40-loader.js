import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const BUILD='45';
const parts=Array.from({length:26},(_,i)=>`warfare-v40-part${String(i+1).padStart(2,'0')}.txt?build=${BUILD}`);
const badge=document.getElementById('warfareBuildBadge');
function fail(message,error){
  console.error('[WARFARE V40]',message,error||'');
  if(badge){badge.textContent='V40 • LOAD FAILED';badge.style.background='#641e27';badge.style.borderColor='#ff6972';}
  const box=document.createElement('div');box.style.cssText='position:fixed;z-index:99999;left:50%;top:18px;transform:translateX(-50%);max-width:min(760px,92vw);padding:14px 18px;border:2px solid #ff6972;border-radius:12px;background:#2b0c12;color:#fff;font:800 12px/1.45 Arial,sans-serif;box-shadow:0 16px 40px #0008';box.textContent=`WARFARE V40 FAILED TO LOAD — ${message}`;document.body.appendChild(box);
}
try{
  if(badge)badge.textContent='V40 • LOADING FIRST-PERSON CORE';
  const responses=await Promise.all(parts.map(async url=>{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`${url} returned ${r.status}`);return r.text();}));
  const source=responses.join('');
  if(source.length<60000)throw new Error(`runtime incomplete (${source.length} chars)`);
  new Function('THREE',`${source}\n//# sourceURL=warfare-v40-runtime.js`)(THREE);
  window.__bbWarfareV40Bootstrap={build:45,core:40,parts:parts.length,sourceLength:source.length,mode:'first-person'};
  if(badge){badge.textContent='V40 • FIRST-PERSON WARFARE LIVE • BUILD 45';badge.style.background='#073b28';badge.style.borderColor='#50e69d';}
}catch(error){fail(error?.message||String(error),error);}
