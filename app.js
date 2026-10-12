
(function(){
'use strict';
var pages=['home','culture','shop','bespoke','partners','account','trial'];
var names={home:'首页',culture:'红艾文化',shop:'礼遇甄选',bespoke:'企业定制',partners:'品牌共建',account:'我的红艾',trial:'艾礼试用所'};
var cart={};var scenario='节令员工福利';var quantity=100;var giftTier='premium';var unit=328;var toastTimer;
var products=[
{id:'classic',name:'岭南红艾 · 传家温灸礼盒',price:388},
{id:'scent',name:'归元温阳 · 古法香篆礼盒',price:218},
{id:'neck',name:'岁岁安康 · 草木护颈带',price:158},
{id:'sachet',name:'端阳福艾 · 刺绣香囊',price:99},
{id:'moxa',name:'地道纯绒 · 陈艾条',price:188}
];
function byId(id){return document.getElementById(id)}

/* Demo identity is only a UI state. No credentials, phone, full address, orders or server requests. */
var demoKey='lingnan-red-mugwort-demo-v1';
var member={signedIn:false,nickname:'艾礼体验官',region:''};
var favorites=[];
function loadDemo(){
  try{
    var data=JSON.parse(localStorage.getItem(demoKey)||'null');
    if(!data||typeof data!=='object')return;
    member.signedIn=data.signedIn===true;
    if(typeof data.nickname==='string'&&data.nickname.length<=16&&data.nickname.trim())member.nickname=data.nickname;
    if(['广州','佛山','韶关','其他地区'].indexOf(data.region)>=0)member.region=data.region;
    if(Array.isArray(data.favorites))favorites=data.favorites.filter(function(id){return products.some(function(p){return p.id===id})}).slice(0,products.length);
    if(data.cart&&typeof data.cart==='object'&&!Array.isArray(data.cart))products.forEach(function(p){
      var amount=data.cart[p.id];if(Number.isInteger(amount)&&amount>0&&amount<=30)cart[p.id]=amount;
    });
  }catch(_error){/* Private mode or old invalid demo data: continue without persistence. */}
}
function saveDemo(){
  try{localStorage.setItem(demoKey,JSON.stringify({signedIn:member.signedIn,nickname:member.nickname,region:member.region,favorites:favorites,cart:cart}));}
  catch(_error){/* Demo remains functional when storage is restricted. */}
}
function refreshMember(){
  byId('member-name').textContent=member.signedIn?member.nickname:'岭南访客';
  byId('member-state').textContent=member.signedIn?'演示会员 · 仅本机体验':'未进入演示身份';
  byId('member-region').textContent=member.region?'偏好城市：'+member.region+' · 非收货地址':'尚未选择 · 不采集真实收货地址';
  var cta=byId('member-cta');
  cta.setAttribute('data-action',member.signedIn?'edit-profile':'demo-login');
  cta.textContent=member.signedIn?'编辑演示资料 ↗':'进入演示会员身份 ↗';
  var total=Object.keys(cart).reduce(function(n,id){return n+(cart[id]||0)},0);
  byId('account-wish-count').textContent=String(total);
  byId('account-fav-count').textContent=String(favorites.length);
  byId('header-avatar').textContent=member.signedIn?member.nickname.slice(0,1):'艾';
  byId('member-avatar').textContent=member.signedIn?member.nickname.slice(0,1):'艾';
  document.querySelectorAll('[data-action="favorite"]').forEach(function(btn){
    var active=favorites.indexOf(btn.getAttribute('data-id'))>=0;
    btn.classList.toggle('liked',active);btn.setAttribute('aria-pressed',String(active));btn.textContent=active?'♥':'♡';
  });
}
function showFavorites(){
  var items=products.filter(function(product){return favorites.indexOf(product.id)>=0});
  if(!items.length){
    modal('我的收藏','<p>还没有收藏的岭南艾礼。心动的礼物，可以先留在这里。</p>','<button class="btn full" data-go="shop" data-action="dismiss">去看看礼物 →</button>');
    return;
  }
  var body='<div class="cart-list">'+items.map(function(p){
    return '<div class="cart-row"><div><strong>'+escapeHTML(p.name)+'</strong><div class="muted">演示参考价 ¥'+p.price+'</div></div><button data-unfavorite="'+p.id+'">取消收藏</button></div>';
  }).join('')+'</div><p>收藏仅保存在当前浏览器，不与真实用户账号同步。</p>';
  modal('我的收藏 · '+items.length+' 件',body,'<button class="btn full" data-go="shop" data-action="dismiss">继续挑选好礼 →</button>');
}
function profileDialog(){
  if(!member.signedIn){modal('演示个人资料','<p>请先点击「进入演示会员身份」。这不是实际注册或验证。</p>','<button class="btn full" data-action="demo-login">进入演示身份</button>');return;}
  modal('我的演示资料',
    '<p>这里只需设置一个虚构昵称。无需手机号、真实姓名或密码。</p>'+
    '<form id="member-profile-form"><div class="field"><label for="member-alias">展示昵称</label>'+
    '<input id="member-alias" name="alias" maxlength="16" required autocomplete="off" value="'+escapeHTML(member.nickname)+'" placeholder="例如：岭南艾礼人"></div>'+
    '<button class="btn full" type="submit">保存到此浏览器</button></form>',
    '<button class="btn ghost full" data-action="dismiss">返回我的红艾</button>');
}
function regionDialog(){
  var choices=['广州','佛山','韶关','其他地区'];
  modal('礼赠城市偏好','<p>用于展示地域偏好的轻量交互，不是收货地址，也不会用于物流或营销。</p>'+
    '<div class="region-options">'+choices.map(function(r){return '<button class="region-option'+(member.region===r?' active':'')+'" data-demo-region="'+r+'">'+r+'</button>'}).join('')+
    '</div><p class="small muted">请勿填写真实详细地址。</p>',
    '<button class="btn ghost full" data-action="dismiss">关闭</button>');
}
function settingsDialog(){
  modal('演示资料与隐私','<p>当前仅在此浏览器保存演示昵称、城市偏好、心愿单和收藏。没有真实登录、密码、订单、收货地址或服务器同步。</p>'+
    '<p>使用公共设备时，可以清空本地演示数据。</p>',
    (member.signedIn?'<button class="btn full" data-action="demo-logout">退出演示会员身份</button>':'')+
    '<button class="btn ghost full" data-action="clear-demo">清空本地演示数据</button><button class="btn ghost full" data-action="dismiss">关闭</button>');
}
function clearDemo(){
  member={signedIn:false,nickname:'艾礼体验官',region:''};
  favorites=[];cart={};giftTier='premium';quantity=100;
  try{localStorage.removeItem(demoKey)}catch(_error){}
  refreshCart();refreshMember();estimate();selectCollection('premium');
}

function toast(message){var e=byId('toast');e.textContent=message;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){e.classList.remove('show')},3100)}
function pageFromHash(){var p=(location.hash||'#/home').replace(/^#\/?/,'').split('?')[0];return pages.indexOf(p)>=0?p:'home'}
function go(p,scroll){if(pages.indexOf(p)<0)p='home';document.querySelectorAll('[data-page]').forEach(function(e){var active=e.getAttribute('data-page')===p;e.classList.toggle('active',active);e.setAttribute('aria-hidden',String(!active))});document.querySelectorAll('[data-go]').forEach(function(e){var active=e.getAttribute('data-go')===p||(p==='trial'&&e.classList.contains('tab')&&e.getAttribute('data-go')==='shop');e.classList.toggle('active',active);if(e.classList.contains('tab')){e.setAttribute('aria-current',active?'page':'false')}});document.title=names[p]+' · 岭南红艾｜交互原型';if(byId('desktop-current'))byId('desktop-current').textContent=names[p];if(scroll!==false)byId('viewport').scrollTop=0;if(location.hash!=='#/'+p)history.replaceState(null,'','#/'+p)}
function modal(title,body,actions){byId('modal-title').textContent=title;byId('modal-body').innerHTML=body||'';byId('modal-actions').innerHTML=actions||'<button class="btn full" data-action="dismiss">我知道了</button>';byId('dialog').showModal()}
function refreshCart(){var count=Object.keys(cart).reduce(function(n,k){return n+cart[k]},0);document.querySelectorAll('[data-cart-count]').forEach(function(e){e.textContent=count});refreshMember();}
function cartDialog(){var list=Object.keys(cart).filter(function(id){return cart[id]>0});var sum=0;var body='<div class="cart-list">';if(!list.length)body+='<p>礼盒清单还是空的。去挑一件有温度的好礼吧。</p>';list.forEach(function(id){var item=products.find(function(p){return p.id===id});if(!item)return;sum+=item.price*cart[id];body+='<div class="cart-row"><div><b>'+item.name+'</b><div class="muted">¥'+item.price+' × '+cart[id]+'</div></div><button data-remove="'+id+'">移除</button></div>'});body+='</div><div class="row between mt"><strong>演示合计</strong><strong class="red">¥'+sum.toLocaleString('zh-CN')+'</strong></div><p>订单与价格仅供演示，未连接支付或库存系统。</p>';modal('礼盒心愿清单',body,'<button class="btn full" data-action="checkout">继续模拟结缘流程</button>')}
function estimate(){var addon=0;document.querySelectorAll('[data-addon]:checked').forEach(function(e){addon+=Number(e.value)});unit=(giftTier==='premium'?328:98)+addon;var discount=quantity>=2000?.79:quantity>=500?.86:quantity>=100?.92:1;unit=Math.round(unit*discount);byId('price-unit').textContent='¥'+unit;byId('price-total').textContent='¥'+(unit*quantity).toLocaleString('zh-CN');byId('price-qty').textContent=quantity.toLocaleString('zh-CN')+' 套';}
function quoteText(){return '岭南红艾 · 定制方案演示\n产品线：'+(giftTier==='premium'?'商务珍藏礼':'节令安康礼')+'\n场景：'+scenario+'\n数量：'+quantity+' 套\n参考单价：¥'+unit+'\n预算估算：¥'+(unit*quantity).toLocaleString('zh-CN')+'\n注：数据仅为交互原型预估，并非正式报价，未发送至任何服务端。'}
function selectCollection(collection){var group=collection==='seasonal'?'seasonal':'premium';document.querySelectorAll('[data-line-filter]').forEach(function(b){var active=b.getAttribute('data-line-filter')===group;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-gift-collection]').forEach(function(p){p.hidden=p.getAttribute('data-gift-collection')!==group});document.querySelector('.shop-hero').hidden=group==='seasonal';document.querySelector('.shop-seasonal-feature').hidden=group!=='seasonal'}

/* Sponsored samples are display-only concepts. This prototype never charges shipping or creates applications. */
var trialSamples={
  scent:{name:'岭南草木香氛 · 试香小样',brand:'示例品牌 A',shipping:8},
  cream:{name:'草本润手霜 · 便携体验装',brand:'示例品牌 B',shipping:6}
};
function sampleDetail(sampleId){
  var sample=trialSamples[sampleId];
  if(!sample)return;
  var body='<div class="trial-modal-summary"><span class="trial-sponsored">广告 · '+escapeHTML(sample.brand)+'</span>'+
    '<h3>'+escapeHTML(sample.name)+'</h3>'+
    '<div class="trial-modal-cost"><div><span>小样费用</span><strong>¥0</strong></div>'+
    '<div><span>参考配送费用（演示）</span><strong>¥'+sample.shipping+'</strong></div>'+
    '<div class="trial-modal-total"><span>试用所示例应付</span><strong>¥'+sample.shipping+'</strong></div></div></div>'+
    '<p>样品由广告主提供，用户承担配送费。以上金额、品牌及库存均为<strong>UI 示意</strong>，不构成可申领活动、实际运费或真实广告合作。</p>'+
    '<p>正式申领前应明确配送范围、物流方式、限领规则与售后责任。</p>';
  modal('小样申领 · 费用说明',body,
    '<button class="btn full" data-action="sample-apply-demo">预览申领反馈 →</button>'+
    '<button class="btn ghost full" data-action="dismiss">暂不申领</button>');
}
function sampleRecords(){
  modal('我的试用记录','<div class="member-empty-symbol">✧</div><p style="text-align:center">暂无试用记录</p>'+
    '<p>这是没有真实订单、支付或发货能力的页面原型；试用记录、配送状态与售后流程将在正式接入时展示。</p>',
    '<button class="btn full" data-go="trial">探索试用所 →</button>');
}

function downloadQuote(){var blob=new Blob([quoteText()],{type:'text/plain;charset=utf-8'});var link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='岭南红艾-定制方案演示.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(link.href)},800);toast('已生成本地演示方案')}
document.addEventListener('click',function(event){
var nav=event.target.closest('[data-go]');if(nav){event.preventDefault();var target=nav.getAttribute('data-go');if(byId('dialog').open&&byId('dialog').contains(nav))byId('dialog').close();location.hash='#/'+target;go(target);if(target==='shop'&&nav.hasAttribute('data-line'))selectCollection(nav.getAttribute('data-line'));return}
var collection=event.target.closest('[data-line-filter]');if(collection){selectCollection(collection.getAttribute('data-line-filter'));return}
var tier=event.target.closest('[data-gift-tier]');if(tier){giftTier=tier.getAttribute('data-gift-tier');document.querySelectorAll('[data-gift-tier]').forEach(function(x){var active=x===tier;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});estimate();return}
var choice=event.target.closest('[data-quantity],[data-scenario]');if(choice){var field=choice.hasAttribute('data-quantity')?'data-quantity':'data-scenario';document.querySelectorAll('['+field+']').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false')});choice.classList.add('active');choice.setAttribute('aria-pressed','true');if(field==='data-quantity')quantity=Number(choice.getAttribute(field));else scenario=choice.getAttribute(field);estimate();return}
var remove=event.target.closest('[data-remove]');if(remove){delete cart[remove.getAttribute('data-remove')];saveDemo();refreshCart();cartDialog();return}
var unfavorite=event.target.closest('[data-unfavorite]');if(unfavorite){favorites=favorites.filter(function(id){return id!==unfavorite.getAttribute('data-unfavorite')});saveDemo();refreshMember();showFavorites();return}
var region=event.target.closest('[data-demo-region]');if(region){member.region=region.getAttribute('data-demo-region');saveDemo();refreshMember();byId('dialog').close();toast('已更新演示城市偏好');return}
var action=event.target.closest('[data-action]');if(!action)return;
switch(action.getAttribute('data-action')){
case 'dismiss':byId('dialog').close();break;
case 'cart':cartDialog();break;
case 'sample-detail':sampleDetail(action.getAttribute('data-trial-id'));break;
case 'sample-apply-demo':modal('申领流程演示','<p>您已查看申领反馈的设计示意。</p><p><strong>当前未扣运费、未申请试用品、未生成订单，也不会收集收货地址。</strong></p>','<button class="btn full" data-go="trial">继续逛试用所 →</button>');break;
case 'sample-records':sampleRecords();break;
case 'sample-sponsor':modal('品牌试用合作 · 设计预览','<p>这是一处面向广告主的赞助活动展示位。合作品牌可提供样品与广告投放预算，申领用户在确认费用后承担配送费。</p><p>当前仅展示广告位置与交互样式，不接收招商资料，也不存在已确认合作的品牌。</p>');break;
case 'add':var id=action.getAttribute('data-id');if(!products.some(function(p){return p.id===id}))break;cart[id]=Math.min(30,(cart[id]||0)+1);saveDemo();refreshCart();toast('已加入心愿清单 · 演示');break;
case 'favorite':var favoriteId=action.getAttribute('data-id');if(!products.some(function(p){return p.id===favoriteId}))break;
if(favorites.indexOf(favoriteId)>=0){favorites=favorites.filter(function(x){return x!==favoriteId});toast('已取消收藏');}
else{favorites.push(favoriteId);toast('已加入我的收藏');}saveDemo();refreshMember();break;

case 'checkout':modal('确认演示订单','<p>真实产品将在这里进入地址确认、优惠权益、支付及订单跟踪。</p><p><strong>当前未创建任何订单，也未扣款。</strong></p>');break;
case 'verify':var code=byId('verify-code').value.trim();if(!code){toast('请先输入盒身防伪码');return}modal('一盒一码 · 防伪溯源','<p>输入的防伪码：<b>'+escapeHTML(code)+'</b></p><p>这是一段流程预览：真实版本需由品牌溯源系统返回批次、产地、生产记录和防伪验证结果。</p><p><strong>本演示不宣称该编码真实或有效。</strong></p>');break;
case 'quote':modal('您的专属定制预案','<div class="quote" style="white-space:pre-line;font:12px/2 var(--sans)">'+escapeHTML(quoteText())+'</div><p>这是可调整的参考测算，不是正式报价。</p>','<button class="btn full" data-action="download-quote">下载预案文字</button><button class="btn ghost full" data-action="dismiss">继续浏览</button>');break;
case 'download-quote':downloadQuote();break;
case 'apply':modal('成为品牌共建伙伴','<p>真实产品将在这里收集机构资质、合作范围与联系人资料，并由运营审核。</p><p>目前仅为提案示意，没有提交或审核功能。</p>');break;

case 'demo-login':member.signedIn=true;saveDemo();refreshMember();if(byId('dialog').open)byId('dialog').close();toast('已进入演示会员身份 · 非真实登录');break;
case 'demo-logout':member.signedIn=false;member.nickname='艾礼体验官';saveDemo();refreshMember();byId('dialog').close();toast('已退出演示会员身份');break;
case 'edit-profile':profileDialog();break;
case 'show-favorites':showFavorites();break;
case 'show-orders':modal('我的礼赠订单','<div class="member-empty-symbol">◇</div><p style="text-align:center">暂无礼赠订单</p><p>此演示没有订单创建、支付、配送或订单状态接口，因此不会制造虚构订单记录。</p>','<button class="btn full" data-go="shop" data-action="dismiss">去甄选艾礼 →</button>');break;
case 'demo-region':regionDialog();break;
case 'demo-settings':settingsDialog();break;
case 'clear-demo':modal('清空本地演示数据？','<p>这将清除本浏览器保存的演示身份、昵称、城市偏好、心愿单与收藏。不会影响任何真实账号。</p>','<button class="btn full" data-action="confirm-clear-demo">确认清空</button><button class="btn ghost full" data-action="demo-settings">返回</button>');break;
case 'confirm-clear-demo':clearDemo();byId('dialog').close();toast('本地演示数据已清空');break;
case 'share':var url=location.href; if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(url).then(function(){toast('当前原型链接已复制')},function(){toast('请从地址栏复制分享链接')})}else toast('请从地址栏复制分享链接');break;
case 'intro':modal('品牌故事 · 岭南红艾','<p>源于岭南草本文化，以新中式设计语言连接非遗内容、节令礼盒、政企定制与公益共建。</p><p>当前为供客户讨论的交互提案，图片与企业案例等内容需在正式商用前确认授权及真实性。</p>');break;
case 'reset':clearDemo();toast('演示状态已重置');go('home');break;
}
});
function escapeHTML(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
document.querySelectorAll('[data-addon]').forEach(function(e){e.addEventListener('change',estimate)});
document.addEventListener('submit',function(event){
  if(!event.target.matches('#member-profile-form'))return;
  event.preventDefault();
  var alias=byId('member-alias').value.trim();
  if(!alias||alias.length>16){toast('请输入 1～16 个字的演示昵称');return;}
  member.nickname=alias;saveDemo();refreshMember();byId('dialog').close();toast('演示昵称已保存到此浏览器');
});
byId('inquiry').addEventListener('submit',function(event){event.preventDefault();if(!this.reportValidity())return;modal('预约流程演示完成','<p>我们已经演示了企业采购的资料填写与提交反馈。</p><p><strong>这份表单没有发送，也没有保存您的姓名、电话或地址。</strong></p><p>后续接入服务端后，才会开放真实申请。</p>')});
window.addEventListener('hashchange',function(){go(pageFromHash())});loadDemo();selectCollection('premium');estimate();refreshCart();refreshMember();go(pageFromHash(),false);
})();
