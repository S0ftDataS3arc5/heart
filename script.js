const path = document.getElementById('heartPath');
const typedEl = document.getElementById('typedText');
const sparkles = document.getElementById('sparkles');

function createSparkles(count=18){
  for(let i=0;i<count;i++){
    const s=document.createElement('div');
    s.className='sparkle';
    sparkles.appendChild(s);
    animateSparkle(s);
  }
}

function animateSparkle(el){
  const wrap = document.querySelector('.svg-wrap');
  const w = wrap.clientWidth, h = wrap.clientHeight;
  const x = Math.random()*w; const y = Math.random()*h*0.6 + h*0.2;
  el.style.left = x + 'px'; el.style.top = y + 'px';
  const scale = 0.6 + Math.random()*1.2;
  el.style.width = (8*scale) + 'px'; el.style.height = (8*scale) + 'px';
  el.style.opacity = (0.3 + Math.random()*0.9);
  setTimeout(()=>{
    el.style.transition = 'transform 1800ms ease, opacity 1800ms ease';
    el.style.transform = `translateY(-${30+Math.random()*40}px) scale(${0.6+Math.random()}) rotate(${Math.random()*60-30}deg)`;
    el.style.opacity = 0;
  }, 80 + Math.random()*600);
  // recycle
  setTimeout(()=>{
    sparkles.removeChild(el);
    animateSparkle(document.createElement('div'));
  }, 2600);
}

function drawHeartPartByPart(){
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;

  const steps = 5;
  let step = 0;

  function drawStep(){
    step++;
    const target = Math.max(0, Math.round(len * (1 - step/steps)));
    const start = parseFloat(path.style.strokeDashoffset);
    const duration = 450;
    const startTime = performance.now();
    function frame(t){
      const p = Math.min(1,(t-startTime)/duration);
      path.style.strokeDashoffset = start + (target-start)*easeOutCubic(p);
      if(p<1) requestAnimationFrame(frame);
      else{
        if(step<steps){ setTimeout(drawStep, 180); }
        else{ onCompleteDraw(); }
      }
    }
    requestAnimationFrame(frame);
  }
  drawStep();
}

function easeOutCubic(t){ return 1 - Math.pow(1-t,3); }

function onCompleteDraw(){
  // fill and glow
  path.style.fill = 'rgba(255,77,136,0.95)';
  path.classList.add('glow');
  // subtle throb
  path.animate([
    {transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}
  ],{duration:900,iterations:3,easing:'ease-in-out'});
  startTyping('I love you baby');
}

function startTyping(text, delay=80){
  typedEl.textContent='';
  let i=0;
  function step(){
    if(i<text.length){
      typedEl.textContent += text[i++];
      setTimeout(step, delay + Math.random()*60);
    } else {
      // add small heartbeat on complete
      typedEl.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:900,iterations:2});
    }
  }
  setTimeout(step, 420);
}

window.addEventListener('load', ()=>{
  // Prepare sparkles
  createSparkles(10);
  // Ensure path length is measured after render
  setTimeout(()=>{
    drawHeartPartByPart();
  },150);
});
