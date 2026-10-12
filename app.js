
(function(){
'use strict';
var pages=['home','culture','shop','bespoke','partners'];
var names={home:'首页',culture:'红艾文化',shop:'礼遇甄选',bespoke:'企业定制',partners:'品牌共建'};
var cart={};var scenario='节令员工福利';var quantity=100;var giftTier='premium';var unit=328;var toastTimer;
var products=[
{id:'classic',name:'岭南红艾 · 传家温灸礼盒',price:388},
{id:'scent',name:'归元温阳 · 古法香篆礼盒',price:218},
{id:'neck',name:'岁岁安康 · 草木护颈带',price:158},
{id:'sachet',name:'端阳福艾 · 刺绣香囊',price:99},
{id:'moxa',name:'地道纯绒 · 陈艾条',price:188}
];
function byId(id){return document.getElementById(id)}
function toast(message){var e=byId('toast');e.textContent=message;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){e.classList.remove('show')},3100)}
function pageFromHash(){var p=(location.hash||'#/home').replace(/^#\/?/,'').split('?')[0];return pages.indexOf(p)>=0?p:'home'}
function go(p,scroll){if(pages.indexOf(p)<0)p='home';document.querySelectorAll('[data-page]').forEach(function(e){var active=e.getAttribute('data-page')===p;e.classList.toggle('active',active);e.setAttribute('aria-hidden',String(!active))});document.querySelectorAll('[data-go]').forEach(function(e){var active=e.getAttribute('data-go')===p;e.classList.toggle('active',active);if(e.classList.contains('tab')){e.setAttribute('aria-current',active?'page':'false')}});document.title=names[p]+' · 岭南红艾｜交互原型';if(byId('desktop-current'))byId('desktop-current').textContent=names[p];if(scroll!==false)byId('viewport').scrollTop=0;if(location.hash!=='#/'+p)history.replaceState(null,'','#/'+p)}
function modal(title,body,actions){byId('modal-title').textContent=title;byId('modal-body').innerHTML=body||'';byId('modal-actions').innerHTML=actions||'<button class="btn full" data-action="dismiss">我知道了</button>';byId('dialog').showModal()}
function refreshCart(){var count=Object.keys(cart).reduce(function(n,k){return n+cart[k]},0);document.querySelectorAll('[data-cart-count]').forEach(function(e){e.textContent=count});}
function cartDialog(){var list=Object.keys(cart).filter(function(id){return cart[id]>0});var sum=0;var body='<div class="cart-list">';if(!list.length)body+='<p>礼盒清单还是空的。去挑一件有温度的好礼吧。</p>';list.forEach(function(id){var item=products.find(function(p){return p.id===id});if(!item)return;sum+=item.price*cart[id];body+='<div class="cart-row"><div><b>'+item.name+'</b><div class="muted">¥'+item.price+' × '+cart[id]+'</div></div><button data-remove="'+id+'">移除</button></div>'});body+='</div><div class="row between mt"><strong>演示合计</strong><strong class="red">¥'+sum.toLocaleString('zh-CN')+'</strong></div><p>订单与价格仅供演示，未连接支付或库存系统。</p>';modal('礼盒心愿清单',body,'<button class="btn full" data-action="checkout">继续模拟结缘流程</button>')}
function estimate(){var addon=0;document.querySelectorAll('[data-addon]:checked').forEach(function(e){addon+=Number(e.value)});unit=(giftTier==='premium'?328:98)+addon;var discount=quantity>=2000?.79:quantity>=500?.86:quantity>=100?.92:1;unit=Math.round(unit*discount);byId('price-unit').textContent='¥'+unit;byId('price-total').textContent='¥'+(unit*quantity).toLocaleString('zh-CN');byId('price-qty').textContent=quantity.toLocaleString('zh-CN')+' 套';}
function quoteText(){return '岭南红艾 · 定制方案演示\n产品线：'+(giftTier==='premium'?'商务珍藏礼':'节令安康礼')+'\n场景：'+scenario+'\n数量：'+quantity+' 套\n参考单价：¥'+unit+'\n预算估算：¥'+(unit*quantity).toLocaleString('zh-CN')+'\n注：数据仅为交互原型预估，并非正式报价，未发送至任何服务端。'}
function selectCollection(collection){var group=collection==='seasonal'?'seasonal':'premium';document.querySelectorAll('[data-line-filter]').forEach(function(b){var active=b.getAttribute('data-line-filter')===group;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-gift-collection]').forEach(function(p){p.hidden=p.getAttribute('data-gift-collection')!==group});document.querySelector('.shop-hero').hidden=group==='seasonal';document.querySelector('.shop-seasonal-feature').hidden=group!=='seasonal'}
function downloadQuote(){var blob=new Blob([quoteText()],{type:'text/plain;charset=utf-8'});var link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='岭南红艾-定制方案演示.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(link.href)},800);toast('已生成本地演示方案')}
document.addEventListener('click',function(event){
var nav=event.target.closest('[data-go]');if(nav){event.preventDefault();var target=nav.getAttribute('data-go');location.hash='#/'+target;go(target);if(target==='shop'&&nav.hasAttribute('data-line'))selectCollection(nav.getAttribute('data-line'));return}
var collection=event.target.closest('[data-line-filter]');if(collection){selectCollection(collection.getAttribute('data-line-filter'));return}
var tier=event.target.closest('[data-gift-tier]');if(tier){giftTier=tier.getAttribute('data-gift-tier');document.querySelectorAll('[data-gift-tier]').forEach(function(x){var active=x===tier;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});estimate();return}
var choice=event.target.closest('[data-quantity],[data-scenario]');if(choice){var field=choice.hasAttribute('data-quantity')?'data-quantity':'data-scenario';document.querySelectorAll('['+field+']').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false')});choice.classList.add('active');choice.setAttribute('aria-pressed','true');if(field==='data-quantity')quantity=Number(choice.getAttribute(field));else scenario=choice.getAttribute(field);estimate();return}
var remove=event.target.closest('[data-remove]');if(remove){delete cart[remove.getAttribute('data-remove')];refreshCart();cartDialog();return}
var action=event.target.closest('[data-action]');if(!action)return;
switch(action.getAttribute('data-action')){
case 'dismiss':byId('dialog').close();break;
case 'cart':cartDialog();break;
case 'add':var id=action.getAttribute('data-id');cart[id]=(cart[id]||0)+1;refreshCart();toast('已加入心愿清单 · 演示');break;
case 'favorite':action.classList.toggle('liked');action.textContent=action.classList.contains('liked')?'♥':'♡';toast(action.classList.contains('liked')?'已收藏':'已取消收藏');break;

case 'checkout':modal('确认演示订单','<p>真实产品将在这里进入地址确认、优惠权益、支付及订单跟踪。</p><p><strong>当前未创建任何订单，也未扣款。</strong></p>');break;
case 'verify':var code=byId('verify-code').value.trim();if(!code){toast('请先输入盒身防伪码');return}modal('一盒一码 · 防伪溯源','<p>输入的防伪码：<b>'+escapeHTML(code)+'</b></p><p>这是一段流程预览：真实版本需由品牌溯源系统返回批次、产地、生产记录和防伪验证结果。</p><p><strong>本演示不宣称该编码真实或有效。</strong></p>');break;
case 'quote':modal('您的专属定制预案','<div class="quote" style="white-space:pre-line;font:12px/2 var(--sans)">'+escapeHTML(quoteText())+'</div><p>这是可调整的参考测算，不是正式报价。</p>','<button class="btn full" data-action="download-quote">下载预案文字</button><button class="btn ghost full" data-action="dismiss">继续浏览</button>');break;
case 'download-quote':downloadQuote();break;
case 'apply':modal('成为品牌共建伙伴','<p>真实产品将在这里收集机构资质、合作范围与联系人资料，并由运营审核。</p><p>目前仅为提案示意，没有提交或审核功能。</p>');break;

case 'share':var url=location.href; if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(url).then(function(){toast('当前原型链接已复制')},function(){toast('请从地址栏复制分享链接')})}else toast('请从地址栏复制分享链接');break;
case 'intro':modal('品牌故事 · 岭南红艾','<p>源于岭南草本文化，以新中式设计语言连接非遗内容、节令礼盒、政企定制与公益共建。</p><p>当前为供客户讨论的交互提案，图片与企业案例等内容需在正式商用前确认授权及真实性。</p>');break;
case 'reset':cart={};giftTier='premium';quantity=100;refreshCart();estimate();selectCollection('premium');toast('演示状态已重置');go('home');break;
}
});
function escapeHTML(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
document.querySelectorAll('[data-addon]').forEach(function(e){e.addEventListener('change',estimate)});
byId('inquiry').addEventListener('submit',function(event){event.preventDefault();if(!this.reportValidity())return;modal('预约流程演示完成','<p>我们已经演示了企业采购的资料填写与提交反馈。</p><p><strong>这份表单没有发送，也没有保存您的姓名、电话或地址。</strong></p><p>后续接入服务端后，才会开放真实申请。</p>')});
window.addEventListener('hashchange',function(){go(pageFromHash())});selectCollection('premium');estimate();refreshCart();go(pageFromHash(),false);
})();
