(function(){
  var KEY='kolot_lang';
  function setLang(l){
    document.documentElement.lang=l; document.documentElement.dir=(l==='he')?'rtl':'ltr';
    document.querySelectorAll('[data-he]').forEach(function(el){var t=el.getAttribute('data-'+l); if(t!==null) el.textContent=t;});
    document.getElementById('langToggle').textContent=(l==='he')?'EN':'עב';
    document.title=(l==='he')?'קולות | כתוביות, תרגום ודיבוב לסרטוני הדרכה ושיווק':'Kolot | Captions, translation and dubbing for tutorial and marketing videos';
    try{localStorage.setItem(KEY,l);}catch(e){}
  }
  var init=(new URLSearchParams(location.search).get('lang'))||(function(){try{return localStorage.getItem(KEY)}catch(e){return null}})()||'he';
  setLang(init==='en'?'en':'he');
  document.getElementById('langToggle').addEventListener('click',function(){setLang(document.documentElement.lang==='he'?'en':'he');});
  document.getElementById('yr').textContent=new Date().getFullYear();
  var f=document.getElementById('leadForm'), msg=document.getElementById('formMsg');
  f.addEventListener('submit',function(ev){
    ev.preventDefault(); if(f._gotcha && f._gotcha.value) return;
    var he=document.documentElement.lang==='he', d=new FormData(f), ep=f.getAttribute('data-endpoint');
    var utm=new URLSearchParams(location.search); ['utm_source','utm_medium','utm_campaign'].forEach(function(k){if(utm.get(k)) d.append(k,utm.get(k));});
    if(ep){
      fetch(ep,{method:'POST',body:d,headers:{'Accept':'application/json'}}).then(function(r){
        msg.textContent=r.ok?(he?'תודה! נחזור אליכם תוך יום עסקים.':'Thanks! We\'ll reply within one business day.'):(he?'משהו השתבש. כתבו לנו ישירות במייל.':'Something went wrong. Please email us directly.');
        if(r.ok) f.reset();
      }).catch(function(){msg.textContent=he?'משהו השתבש. כתבו לנו ישירות במייל.':'Something went wrong. Please email us directly.';});
    } else {
      var body=['Name: '+d.get('name'),'Email: '+d.get('email'),'Company: '+d.get('company'),'Video: '+d.get('video'),'Direction: '+d.get('direction'),'UTM: '+(utm.get('utm_source')||'-')+'/'+(utm.get('utm_campaign')||'-')].join('\n');
      location.href='mailto:'+f.getAttribute('data-mailto')+'?subject='+encodeURIComponent('Free sample request / בקשת דוגמה - '+(d.get('company')||d.get('name')))+'&body='+encodeURIComponent(body);
      msg.textContent=he?'נפתחה תוכנת המייל שלכם. שלחו את ההודעה ונחזור אליכם.':'Your email app opened. Send the message and we\'ll get back to you.';
    }
  });
  // ---- GoatCounter click events (conversion tracking) ----
  function gcEvent(path,title){ if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({path: path, title: title, event: true}); }
  document.querySelectorAll('a[href="#contact"]').forEach(function(a){ a.addEventListener('click',function(){ gcEvent('kolot-sample-cta','Kolot free sample CTA: '+a.textContent.trim()); }); });
  f.addEventListener('submit',function(){ if(!(f._gotcha && f._gotcha.value)) gcEvent('kolot-sample-submit','Kolot free sample form submit'); });
  document.querySelectorAll('a[href^="https://paypal.me/"]').forEach(function(a){
    var m=a.getAttribute('href').match(/\/(\d+)[A-Z]{3}$/), amt=m?m[1]:'invoice';
    a.addEventListener('click',function(){ gcEvent('kolot-paypal-'+amt,'Kolot PayPal '+amt); });
  });
})();
