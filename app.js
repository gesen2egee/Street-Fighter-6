
(function(){
  var body=document.body, sec=body.dataset.sec, cur=body.dataset.id, pre=body.dataset.pre||'';
  var ul=document.getElementById('nav'), aside=document.querySelector('aside');
  function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var html='', grp=null;
  (window.SF6_NAV&&SF6_NAV[sec]||[]).forEach(function(e){
    if(e.g!==grp){grp=e.g;html+='<li class="nav-cat">'+esc(grp)+'</li>';}
    html+='<li data-k="'+esc(e.k||'')+'"><a href="'+pre+sec+'/'+e.id+'.html"'+(e.id===cur?' class="active"':'')+
      '><span class="num">'+esc(e.b)+'</span><span>'+esc(e.t)+'</span></a></li>';
  });
  ul.innerHTML=html;
  var act=ul.querySelector('a.active'); if(act) act.scrollIntoView({block:'center'});
  var q=document.getElementById('nav-search');
  q.addEventListener('input',function(){
    var k=q.value.trim().toLowerCase();
    aside.classList.toggle('searching',!!k);
    ul.querySelectorAll('li').forEach(function(li){
      if(li.classList.contains('nav-cat')){li.style.display=k?'none':'';return;}
      li.style.display=(!k||(li.textContent+' '+li.dataset.k).toLowerCase().indexOf(k)!==-1)?'':'none';
    });
  });
  document.getElementById('toggle').addEventListener('click',function(){aside.classList.toggle('open');});
  var root=document.documentElement;
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme=dark?'light':'dark';
    try{localStorage.setItem('sf6-guides-theme',root.dataset.theme);}catch(e){}
  });
})();
