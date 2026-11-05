'use strict';
(() => {
  const menu = document.getElementById('main-nav');
  const toggle = document.querySelector('.nav-toggle');
  const closeMenu = () => { menu?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); menu?.classList.toggle('open',open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu?.classList.contains('open')) {closeMenu();toggle.focus();} });
  document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    const filter=button.dataset.filter;let count=0;
    document.querySelectorAll('[data-category]').forEach(card=>{const show=filter==='all'||card.dataset.category.split(' ').includes(filter);card.hidden=!show;if(show)count++;});
    const output=document.getElementById('results-count');if(output)output.textContent=`${count} ${count===1?'project':'projects'} shown`;
  }));

  const scenarios={
    overview:{title:'Production overview',sub:'A clear view of the process, from one screen.',kpis:[['PROCESS HEALTH','94 / 100','Illustrative score'],['THROUGHPUT','128','Units per minute'],['ACTIVE NOTICES','01','One item to review']],chart:'Process stability · last 60 minutes',note:'A small drift is detected in the final quarter. An operator can review the trend before taking action.',points:[72,69,70,64,67,62,66,61,60,66,59,63,61,60,56,58,57,50,56,51,53,48,51,49,53,47,49,43,48,47],reference:60},
    maintenance:{title:'Equipment health',sub:'See an emerging pattern before investigating the cause.',kpis:[['ASSET','P-203','Illustrative pump'],['VIBRATION','4.2','mm/s · example'],['REVIEW STATUS','Watch','Rising trend']],chart:'Vibration trend · example sensor history',note:'The example vibration signal is trending upwards. Review load, sensor quality and maintenance history; this is not a failure prediction.',points:[98,99,96,98,94,95,89,94,89,88,85,84,77,81,73,75,69,65,70,58,61,50,53,47,38,44,34,29,32,21],reference:51},
    batch:{title:'Batch performance',sub:'Compare process behaviour with a reference profile.',kpis:[['BATCH','B-1042','Example batch'],['TEMPERATURE','72.4','°C · example'],['CURRENT PHASE','Hold','Operator supervised']],chart:'Temperature profile · example batch cycle',note:'The process approaches the reference temperature and enters the hold phase. Any real setpoint change requires engineering validation.',points:[125,122,115,110,102,95,83,76,65,59,49,43,39,36,41,37,39,36,38,37,39,37,38,36,38,37,39,38,37,38],reference:38}
  };
  const demo=document.getElementById('demo-panel');
  const chartPath=points=>points.map((y,i)=>`${i?'L':'M'}${10+i*(640/(points.length-1))},${y}`).join(' ');
  function setScenario(key){
    if(!demo)return;const s=scenarios[key];if(!s)return;
    demo.querySelector('[data-demo-title]').textContent=s.title;
    demo.querySelector('[data-demo-sub]').textContent=s.sub;
    demo.querySelectorAll('.demo-kpi').forEach((el,i)=>{el.querySelector('small').textContent=s.kpis[i][0];el.querySelector('strong').textContent=s.kpis[i][1];el.querySelector('em').textContent=s.kpis[i][2];});
    demo.querySelector('[data-chart-title]').textContent=s.chart;
    demo.querySelector('[data-demo-note]').textContent=s.note;
    const path=chartPath(s.points);demo.querySelector('[data-chart-line]').setAttribute('d',path);
    demo.querySelector('[data-chart-fill]').setAttribute('d',path+' L650,155 L10,155 Z');
    demo.querySelector('[data-chart-reference]').setAttribute('d',`M10,${s.reference} L650,${s.reference}`);
    demo.querySelector('[data-chart-description]').textContent=s.chart+'. '+s.note;
    document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===key)));
  }
  document.querySelectorAll('[data-scenario]').forEach(button=>button.addEventListener('click',()=>setScenario(button.dataset.scenario)));

  const form=document.getElementById('enquiry-form');
  if(form){
    form.querySelector('[type="submit"]').disabled=false;
    const subject=new URLSearchParams(location.search).get('interest');
    const allowed=[...form.elements.interest.options].map(o=>o.value);
    if(subject&&allowed.includes(subject))form.elements.interest.value=subject;
    form.addEventListener('submit',event=>{
      event.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form);
      const name=String(data.get('name')||'').trim(),email=String(data.get('email')||'').trim();
      const company=String(data.get('company')||'').trim(),interest=String(data.get('interest')||'Project enquiry');
      const text=`Hello Juliet,\n\nI would like to discuss ${interest.toLowerCase()}.\n\n${String(data.get('message')||'').trim()}\n\nName: ${name}\nEmail: ${email}${company?'\nCompany: '+company:''}\n\nKind regards,\n${name}`;
      const result=document.getElementById('draft-result');result.hidden=false;
      document.getElementById('draft-preview').textContent=text;
      document.getElementById('open-draft').href='mailto:uzoeshijuliet@gmail.com?subject='+encodeURIComponent('SmartOpsTech — '+interest)+'&body='+encodeURIComponent(text);
      document.getElementById('draft-status').textContent='Your draft is ready. Review it, then open your email app or copy the text.';
      document.getElementById('draft-title').focus();
    });
    document.getElementById('copy-draft')?.addEventListener('click',async()=>{
      const output=document.getElementById('draft-status');
      try{await navigator.clipboard.writeText(document.getElementById('draft-preview').textContent);output.textContent='Draft copied. Paste it into an email to uzoeshijuliet@gmail.com.';}
      catch{output.textContent='Please select and copy the draft text below, or use Open email app.';}
    });
  }
})();
