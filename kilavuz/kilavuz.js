
(function(){
 function norm(s){return (s||'').toLocaleLowerCase('tr').replace(/[ıİ]/g,'i').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ö/g,'o').replace(/ç/g,'c').replace(/â/g,'a');}
 var idx=window.ZEUS_INDEX.map(function(a){return Object.assign({},a,{nt:norm(a.t),ns:norm(a.s),nx:norm(a.x)});});
 document.querySelectorAll('.search').forEach(function(box){
  var inp=box.querySelector('input'),res=box.querySelector('.results'),sel=-1;
  function run(){var q=norm(inp.value.trim());sel=-1;if(q.length<2){res.style.display='none';return;}
   var words=q.split(/\s+/);var hits=[];
   idx.forEach(function(a){var sc=0,ok=true;words.forEach(function(w){var s=0;if(a.nt.indexOf(w)>=0)s+=10;if(a.ns.indexOf(w)>=0)s+=4;if(a.nx.indexOf(w)>=0)s+=1;if(!s)ok=false;sc+=s;});if(ok)hits.push([sc,a]);});
   hits.sort(function(x,y){return y[0]-x[0];});
   res.innerHTML=hits.length?hits.slice(0,10).map(function(h){var a=h[1];return '<a href="'+a.u+'"><b>'+a.t+'</b><small>'+a.c+' · '+a.s+'</small></a>';}).join(''):'<div class="none">Sonuç bulunamadı. Farklı bir kelime deneyin veya destek ekibine yazın.</div>';
   res.style.display='block';}
  inp.addEventListener('input',run);inp.addEventListener('focus',run);
  inp.addEventListener('keydown',function(e){var l=res.querySelectorAll('a');if(!l.length)return;
   if(e.key==='ArrowDown'){sel=Math.min(sel+1,l.length-1);e.preventDefault();}else if(e.key==='ArrowUp'){sel=Math.max(sel-1,0);e.preventDefault();}else if(e.key==='Enter'){location.href=l[Math.max(sel,0)].getAttribute('href');return;}else return;
   l.forEach(function(x,i){x.classList.toggle('on',i===sel);});});
  document.addEventListener('click',function(e){if(!box.contains(e.target))res.style.display='none';});
 });
 var m=document.querySelector('.menu');if(m)m.addEventListener('click',function(){document.querySelector('.side').classList.toggle('open');});
})();
