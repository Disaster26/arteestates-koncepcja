(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  function close(){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu')}
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});

  // daty: nie wcześniej niż dziś, wyjazd po przyjeździe
  var d=new Date(),iso=function(x){return new Date(x.getTime()-x.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
  var today=iso(d);
  [['hIn','hOut'],['fIn','fOut']].forEach(function(p){
    var a=document.getElementById(p[0]),z=document.getElementById(p[1]);
    a.min=today;z.min=today;
    a.addEventListener('change',function(){if(a.value){var t=new Date(a.value);t.setDate(t.getDate()+1);z.min=iso(t);if(!z.value||z.value<=a.value)z.value=iso(t)}});
  });

  var rez=document.getElementById('rezerwacja');
  // pasek "Sprawdź dostępność" w hero - przenosi dane do formularza zapytania
  document.getElementById('heroCta').addEventListener('submit',function(e){
    e.preventDefault();
    ['In','Out','G'].forEach(function(k){var s=document.getElementById('h'+k),t=document.getElementById('f'+k);if(s.value)t.value=s.value});
    rez.scrollIntoView({behavior:'smooth'});
  });
  // "Zapytaj o termin" przy apartamencie - ustawia wybrany adres
  var sel=document.getElementById('fApt');
  document.querySelectorAll('[data-apt]').forEach(function(a){a.addEventListener('click',function(){sel.value=a.getAttribute('data-apt')})});

  // dolny pasek na telefonie: dopiero po przewinięciu za przycisk z pierwszego ekranu, chowany przy formularzu
  var mob=document.getElementById('mob'),cta=document.querySelector('#heroCta .btn');
  var past=false,inK=false;
  function upd(){mob.classList.toggle('widac',past&&!inK)}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){past=!e[0].isIntersecting&&e[0].boundingClientRect.top<0;upd()}).observe(cta);
    new IntersectionObserver(function(e){inK=e[0].isIntersecting;upd()},{threshold:.05}).observe(rez);
  }

  // formularz: to podgląd, nic nie wysyła
  var f=document.getElementById('form'),m=document.getElementById('formMsg');
  f.addEventListener('submit',function(e){e.preventDefault();m.hidden=false;m.scrollIntoView({block:'nearest',behavior:'smooth'})});
})();
