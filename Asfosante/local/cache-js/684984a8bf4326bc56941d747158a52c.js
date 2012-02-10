/* compact [
	../prive/javascript/jquery.form.js
	../prive/javascript/ajaxCallback.js
	../prive/javascript/jquery.cookie.js
	../prive/javascript/layer.js
	../prive/javascript/presentation.js
	../prive/javascript/gadgets.js
	../extensions/porte_plume/javascript/xregexp-min.js
	../extensions/porte_plume/javascript/jquery.markitup_pour_spip.js
	../extensions/porte_plume/javascript/jquery.previsu_spip.js
	page=porte_plume_start.js(lang=fr)
	../extensions/porte_plume/javascript/porte_plume_forcer_hauteur.js
] 64% */

/* ../prive/javascript/jquery.form.js */

;(function($){
$.fn.ajaxSubmit=function(options){
if(!this.length){
log('ajaxSubmit: skipping submit process - no element selected');
return this}
if(typeof options=='function')
options={success:options};
var url=$.trim(this.attr('action'));
if(url){
url=(url.match(/^([^#]+)/)||[])[1]}
url=url||window.location.href||'';
options=$.extend({
url:url,
type:this.attr('method')||'GET',
iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'
},options||{});
var veto={};
this.trigger('form-pre-serialize',[this,options,veto]);
if(veto.veto){
log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
return this}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){
log('ajaxSubmit: submit aborted via beforeSerialize callback');
return this}
var a=this.formToArray(options.semantic);
if(options.data){
options.extraData=options.data;
for(var n in options.data){
if(options.data[n]instanceof Array){
for(var k in options.data[n])
a.push({name:n,value:options.data[n][k]})}
else
a.push({name:n,value:options.data[n]})}
}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){
log('ajaxSubmit: submit aborted via beforeSubmit callback');
return this}
this.trigger('form-submit-validate',[a,this,options,veto]);
if(veto.veto){
log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
return this}
var q=$.param(a);
if(options.type.toUpperCase()=='GET'){
options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;
options.data=null}
else
options.data=q;
var $form=this,callbacks=[];
if(options.resetForm)callbacks.push(function(){$form.resetForm()});
if(options.clearForm)callbacks.push(function(){$form.clearForm()});
if(!options.dataType&&options.target){
var oldSuccess=options.success||function(){};
callbacks.push(function(data){
$(options.target).html(data).each(oldSuccess,arguments)})}
else if(options.success)
callbacks.push(options.success);
options.success=function(data,status){
for(var i=0,max=callbacks.length;i<max;i++)
callbacks[i].apply(options,[data,status,$form])};
var files=$('input:file',this).fieldValue();
var found=false;
for(var j=0;j<files.length;j++)
if(files[j])
found=true;
var multipart=false;
if((files.length&&options.iframe!==false)||options.iframe||found||multipart){
if(options.closeKeepAlive)
$.get(options.closeKeepAlive,fileUpload);
else
fileUpload()}
else
$.ajax(options);
this.trigger('form-submit-notify',[this,options]);
return this;
function fileUpload(){
var form=$form[0];
if($(':input[name=submit]',form).length){
alert('Error: Form elements must not be named "submit".');
return}
var opts=$.extend({},$.ajaxSettings,options);
var s=$.extend(true,{},$.extend(true,{},$.ajaxSettings),opts);
var id='jqFormIO'+(new Date().getTime());
var $io=$('<iframe id="'+id+'" name="'+id+'" src="'+opts.iframeSrc+'" />');
var io=$io[0];
$io.css({position:'absolute',top:'-1000px',left:'-1000px'});
var xhr={
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:'n/a',
getAllResponseHeaders:function(){},
getResponseHeader:function(){},
setRequestHeader:function(){},
abort:function(){
this.aborted=1;
$io.attr('src',opts.iframeSrc)}
};
var g=opts.global;
if(g&&!$.active++)$.event.trigger("ajaxStart");
if(g)$.event.trigger("ajaxSend",[xhr,opts]);
if(s.beforeSend&&s.beforeSend(xhr,s)===false){
s.global&&$.active--;
return}
if(xhr.aborted)
return;
var cbInvoked=0;
var timedOut=0;
var sub=form.clk;
if(sub){
var n=sub.name;
if(n&&!sub.disabled){
options.extraData=options.extraData||{};
options.extraData[n]=sub.value;
if(sub.type=="image"){
options.extraData[name+'.x']=form.clk_x;
options.extraData[name+'.y']=form.clk_y}
}
}
setTimeout(function(){
var t=$form.attr('target'),a=$form.attr('action');
form.setAttribute('target',id);
if(form.getAttribute('method')!='POST')
form.setAttribute('method','POST');
if(form.getAttribute('action')!=opts.url)
form.setAttribute('action',opts.url);
if(!options.skipEncodingOverride){
$form.attr({
encoding:'multipart/form-data',
enctype:'multipart/form-data'
})}
if(opts.timeout)
setTimeout(function(){timedOut=true;cb()},opts.timeout);
var extraInputs=[];
try{
if(options.extraData)
for(var n in options.extraData)
extraInputs.push(
$('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
.appendTo(form)[0]);
$io.appendTo('body');
io.attachEvent?io.attachEvent('onload',cb):io.addEventListener('load',cb,false);
form.submit()}
finally{
form.setAttribute('action',a);
t?form.setAttribute('target',t):$form.removeAttr('target');
$(extraInputs).remove()}
},10);
var domCheckCount=50;
function cb(){
if(cbInvoked++)return;
io.detachEvent?io.detachEvent('onload',cb):io.removeEventListener('load',cb,false);
var ok=true;
try{
if(timedOut)throw'timeout';
var data,doc;
doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;
var isXml=opts.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);
log('isXml='+isXml);
if(!isXml&&(doc.body==null||doc.body.innerHTML=='')){
if(--domCheckCount){
cbInvoked=0;
setTimeout(cb,100);
return}
log('Could not access iframe DOM after 50 tries.');
return}
xhr.responseText=doc.body?doc.body.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(header){
var headers={'content-type':opts.dataType};
return headers[header]};
if(opts.dataType=='json'||opts.dataType=='script'){
var ta=doc.getElementsByTagName('textarea')[0];
if(ta)
xhr.responseText=ta.value;
else{
var pre=doc.getElementsByTagName('pre')[0];
if(pre)
xhr.responseText=pre.innerHTML}
}
else if(opts.dataType=='xml'&&!xhr.responseXML&&xhr.responseText!=null){
xhr.responseXML=toXml(xhr.responseText)}
data=$.httpData(xhr,opts.dataType)}
catch(e){
ok=false;
$.handleError(opts,xhr,'error',e)}
if(ok){
opts.success(data,'success');
if(g)$.event.trigger("ajaxSuccess",[xhr,opts])}
if(g)$.event.trigger("ajaxComplete",[xhr,opts]);
if(g&&!--$.active)$.event.trigger("ajaxStop");
if(opts.complete)opts.complete(xhr,ok?'success':'error');
setTimeout(function(){
$io.remove();
xhr.responseXML=null},100)};
function toXml(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject('Microsoft.XMLDOM');
doc.async='false';
doc.loadXML(s)}
else
doc=(new DOMParser()).parseFromString(s,'text/xml');
return(doc&&doc.documentElement&&doc.documentElement.tagName!='parsererror')?doc:null}}};
$.fn.ajaxForm=function(options){
return this.ajaxFormUnbind().bind('submit.form-plugin',function(){
$(this).ajaxSubmit(options);
return false}).bind('click.form-plugin',function(e){
var target=e.target;
var $el=$(target);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(':submit');
if(t.length==0)
return;
target=t[0]}
var form=this;
form.clk=target;
if(target.type=='image'){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY}else if(typeof $.fn.offset=='function'){
var offset=$el.offset();
form.clk_x=e.pageX-offset.left;
form.clk_y=e.pageY-offset.top}else{
form.clk_x=e.pageX-target.offsetLeft;
form.clk_y=e.pageY-target.offsetTop}
}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null},100)})};
$.fn.ajaxFormUnbind=function(){
return this.unbind('submit.form-plugin click.form-plugin')};
$.fn.formToArray=function(semantic){
var a=[];
if(this.length==0)return a;
var form=this[0];
var els=semantic?form.getElementsByTagName('*'):form.elements;
if(!els)return a;
for(var i=0,max=els.length;i<max;i++){
var el=els[i];
var n=el.name;
if(!n)continue;
if(semantic&&form.clk&&el.type=="image"){
if(!el.disabled&&form.clk==el){
a.push({name:n,value:$(el).val()});
a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y})}
continue}
var v=$.fieldValue(el,true);
if(v&&v.constructor==Array){
for(var j=0,jmax=v.length;j<jmax;j++)
a.push({name:n,value:v[j]})}
else if(v!==null&&typeof v!='undefined')
a.push({name:n,value:v})}
if(!semantic&&form.clk){
var $input=$(form.clk),input=$input[0],n=input.name;
if(n&&!input.disabled&&input.type=='image'){
a.push({name:n,value:$input.val()});
a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y})}
}
return a};
$.fn.formSerialize=function(semantic){
return $.param(this.formToArray(semantic))};
$.fn.fieldSerialize=function(successful){
var a=[];
this.each(function(){
var n=this.name;
if(!n)return;
var v=$.fieldValue(this,successful);
if(v&&v.constructor==Array){
for(var i=0,max=v.length;i<max;i++)
a.push({name:n,value:v[i]})}
else if(v!==null&&typeof v!='undefined')
a.push({name:this.name,value:v})});
return $.param(a)};
$.fn.fieldValue=function(successful){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,successful);
if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length))
continue;
v.constructor==Array?$.merge(val,v):val.push(v)}
return val};
$.fieldValue=function(el,successful){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(typeof successful=='undefined')successful=true;
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||
(t=='checkbox'||t=='radio')&&!el.checked||
(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||
tag=='select'&&el.selectedIndex==-1))
return null;
if(tag=='select'){
var index=el.selectedIndex;
if(index<0)return null;
var a=[],ops=el.options;
var one=(t=='select-one');
var max=(one?index+1:ops.length);
for(var i=(one?index:0);i<max;i++){
var op=ops[i];
if(op.selected){
var v=op.value;
if(!v)
v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;
if(one)return v;
a.push(v)}
}
return a}
return el.value};
$.fn.clearForm=function(){
return this.each(function(){
$('input,select,textarea',this).clearFields()})};
$.fn.clearFields=$.fn.clearInputs=function(){
return this.each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=='text'||t=='password'||tag=='textarea')
this.value='';
else if(t=='checkbox'||t=='radio')
this.checked=false;
else if(tag=='select')
this.selectedIndex=-1})};
$.fn.resetForm=function(){
return this.each(function(){
if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType))
this.reset()})};
$.fn.enable=function(b){
if(b==undefined)b=true;
return this.each(function(){
this.disabled=!b})};
$.fn.selected=function(select){
if(select==undefined)select=true;
return this.each(function(){
var t=this.type;
if(t=='checkbox'||t=='radio')
this.checked=select;
else if(this.tagName.toLowerCase()=='option'){
var $sel=$(this).parent('select');
if(select&&$sel[0]&&$sel[0].type=='select-one'){
$sel.find('option').selected(false)}
this.selected=select}
})};
function log(){
if($.fn.ajaxSubmit.debug&&window.console&&window.console.log)
window.console.log('[jquery.form] '+Array.prototype.join.call(arguments,''))}})(jQuery);


/* ../prive/javascript/ajaxCallback.js */
if(!jQuery.load_handlers){
jQuery.load_handlers=new Array();
function onAjaxLoad(f){
jQuery.load_handlers.push(f)};
function triggerAjaxLoad(root){
for(var i=0;i<jQuery.load_handlers.length;i++)
jQuery.load_handlers[i].apply(root)};
jQuery.fn._ACBload=jQuery.fn.load;
jQuery.fn.load=function(url,params,callback){
callback=callback||function(){};
if(params){
if(params.constructor==Function){
callback=params;
params=null}
}
var callback2=function(res,status){triggerAjaxLoad(this);callback.call(this,res,status)};
return this._ACBload(url,params,callback2)};
jQuery._ACBajax=jQuery.ajax;
jQuery.ajax=function(type){
var s=jQuery.extend(true,{},jQuery.ajaxSettings,type);
var callbackContext=s.context||s;
if(jQuery.ajax.caller==jQuery.fn._load)return jQuery._ACBajax(type);
var orig_complete=s.complete||function(){};
type.complete=function(res,status){
var dataType=type.dataType;
var ct=(res&&(typeof res.getResponseHeader=='function'))
?res.getResponseHeader("content-type"):'';
var xml=!dataType&&ct&&ct.indexOf("xml")>=0;
orig_complete.call(callbackContext,res,status);
if(!dataType&&!xml||dataType=="html")triggerAjaxLoad(document)};
return jQuery._ACBajax(type)}}
jQuery.fn.animeajax=function(end){
this.children().css('opacity',0.5);
if(typeof ajax_image_searching!='undefined'){
var i=(this).find('.image_loading');
if(i.length)i.eq(0).html(ajax_image_searching);
else this.prepend('<span class="image_loading">'+ajax_image_searching+'</span>')}
return this}
jQuery.fn.positionner=function(force){
var offset=jQuery(this).offset();
var hauteur=parseInt(jQuery(this).css('height'));
var scrolltop=self['pageYOffset']||
jQuery.boxModel&&document.documentElement['scrollTop']||
document.body['scrollTop'];
var h=jQuery(window).height();
var scroll=0;
if(force||offset['top']-5<=scrolltop)
scroll=offset['top']-5;
else if(offset['top']+hauteur-h+5>scrolltop)
scroll=Math.min(offset['top']-5,offset['top']+hauteur-h+15);
if(scroll)
jQuery('html,body')
.animate({scrollTop:scroll},300);
jQuery(jQuery('*',this).filter('input[type=text],textarea')[0]).focus();
return this}
var virtualbuffer_id='spip_virtualbufferupdate';
function initReaderBuffer(){
if(jQuery('#'+virtualbuffer_id).length)return;
jQuery('body').append('<p style="float:left;width:0;height:0;position:absolute;left:-5000;top:-5000;"><input type="hidden" name="'+virtualbuffer_id+'" id="'+virtualbuffer_id+'" value="0" /></p>')}
function updateReaderBuffer(){
var i=jQuery('#'+virtualbuffer_id);
if(!i.length)return;
i.attr('value',parseInt(i.attr('value'))+1)}
jQuery.fn.formulaire_dyn_ajax=function(target){
if(this.length)
initReaderBuffer();
return this.each(function(){
var cible=target||this;
jQuery('form:not(.noajax,.bouton_action_post)',this).each(function(){
var leform=this;
var leclk,leclk_x,leclk_y;
jQuery(this).prepend("<input type='hidden' name='var_ajax' value='form' />")
.ajaxForm({
beforeSubmit:function(){
leclk=leform.clk;
if(leclk){
var n=leclk.name;
if(n&&!leclk.disabled&&leclk.type=="image"){
leclk_x=leform.clk_x;
leclk_y=leform.clk_y}
}
jQuery(cible).addClass('loading').animeajax()},
success:function(c){
if(c=='noajax'){
jQuery("input[name=var_ajax]",leform).remove();
if(leclk){
var n=leclk.name;
if(n&&!leclk.disabled){
jQuery(leform).prepend("<input type='hidden' name='"+n+"' value='"+leclk.value+"' />");
if(leclk.type=="image"){
jQuery(leform).prepend("<input type='hidden' name='"+n+".x' value='"+leform.clk_x+"' />");
jQuery(leform).prepend("<input type='hidden' name='"+n+".y' value='"+leform.clk_y+"' />")}
}
}
jQuery(leform).ajaxFormUnbind().submit()}
else{
var recu=jQuery('<div><\/div>').html(c);
var d=jQuery('div.ajax',recu);
if(d.length)
c=d.html();
jQuery(cible)
.removeClass('loading')
.html(c);
var a=jQuery('a:first',recu).eq(0);
if(a.length
&&a.is('a[name=ajax_ancre]')
&&jQuery(a.attr('href'),cible).length){
a=a.attr('href');
if(jQuery(a,cible).length)
setTimeout(function(){
jQuery(a,cible).positionner(true)},10)}
else{
jQuery(cible).positionner(false);
if(a.length&&a.is('a[name=ajax_redirect]')){
a=a.attr('href');
jQuery(cible).addClass('loading').animeajax();
setTimeout(function(){
document.location.replace(a)},10)}
}
triggerAjaxLoad(cible);
updateReaderBuffer()}
},
iframe:jQuery.browser.msie
})
.addClass('noajax')})})}
var ajax_confirm=true;
var ajax_confirm_date=0;
var spip_confirm=window.confirm;
function _confirm(message){
ajax_confirm=spip_confirm(message);
if(!ajax_confirm){
var d=new Date();
ajax_confirm_date=d.getTime()}
return ajax_confirm}
window.confirm=_confirm;
var preloaded_urls={};
var ajaxbloc_selecteur;
jQuery.fn.ajaxbloc=function(){
if(this.length)
initReaderBuffer();
return this.each(function(){
jQuery('div.ajaxbloc',this).ajaxbloc();var blocfrag=jQuery(this);
var on_pagination=function(c){
jQuery(blocfrag)
.html(c)
.removeClass('loading');
var a=jQuery('a:first',jQuery(blocfrag)).eq(0);
if(a.length
&&a.is('a[name=ajax_ancre]')
&&jQuery(a.attr('href'),blocfrag).length){
a=a.attr('href')
setTimeout(function(){
jQuery(a,blocfrag).positionner(true)},10)}
else{
jQuery(blocfrag).positionner(false)}
updateReaderBuffer()}
var ajax_env=(""+blocfrag.attr('class')).match(/env-([^ ]+)/);
if(!ajax_env||ajax_env==undefined)return;
ajax_env=ajax_env[1];
if(ajaxbloc_selecteur==undefined)
ajaxbloc_selecteur='.pagination a,a.ajax';
jQuery(ajaxbloc_selecteur,this).not('.noajax').each(function(){
var url=this.href.split('#');
url[0]+=(url[0].indexOf("?")>0?'&':'?')+'var_ajax=1&var_ajax_env='+encodeURIComponent(ajax_env);
if(url[1])
url[0]+="&var_ajax_ancre="+url[1];
if(jQuery(this).is('.preload')&&!preloaded_urls[url[0]]){
jQuery.ajax({"url":url[0],"success":function(r){preloaded_urls[url[0]]=r}})}
jQuery(this).click(function(){
if(!ajax_confirm){
ajax_confirm=true;
var d=new Date();
if((d.getTime()-ajax_confirm_date)<=2)
return false}
jQuery(blocfrag)
.animeajax()
.addClass('loading');
if(preloaded_urls[url[0]]){
on_pagination(preloaded_urls[url[0]]);
triggerAjaxLoad(document)}else{
jQuery.ajax({
url:url[0],
success:function(c){
on_pagination(c);
preloaded_urls[url[0]]=c}
})}
return false})}).addClass('noajax');jQuery('form.bouton_action_post.ajax:not(.noajax)',this).each(function(){
var leform=this;
var url=jQuery(this).attr('action').split('#');
jQuery(this)
.prepend("<input type='hidden' name='var_ajax' value='1' /><input type='hidden' name='var_ajax_env' value='"+(ajax_env)+"' />"+(url[1]?"<input type='hidden' name='var_ajax_ancre' value='"+url[1]+"' />":""))
.ajaxForm({
beforeSubmit:function(){
jQuery(blocfrag).addClass('loading').animeajax()},
success:function(c){
on_pagination(c);
preloaded_urls={};jQuery(blocfrag)
.ajaxbloc()},
iframe:jQuery.browser.msie
})
.addClass('noajax')})})};
jQuery(function(){
jQuery('form:not(.bouton_action_post)').parents('div.ajax')
.formulaire_dyn_ajax();
jQuery('div.ajaxbloc').ajaxbloc()});
onAjaxLoad(function(){
if(jQuery){
jQuery('form:not(.bouton_action_post)',this).parents('div.ajax')
.formulaire_dyn_ajax();
jQuery('div.ajaxbloc',this)
.ajaxbloc()}
});


/* ../prive/javascript/jquery.cookie.js */

jQuery.cookie=function(name,value,options){
if(typeof value!='undefined'){options=options||{};
if(value===null){
value='';
options.expires=-1}
var expires='';
if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){
var date;
if(typeof options.expires=='number'){
date=new Date();
date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{
date=options.expires}
expires='; expires='+date.toUTCString()}
var path=options.path?'; path='+(options.path):'';
var domain=options.domain?'; domain='+(options.domain):'';
var secure=options.secure?'; secure':'';
document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;
if(document.cookie&&document.cookie!=''){
var cookies=document.cookie.split(';');
for(var i=0;i<cookies.length;i++){
var cookie=jQuery.trim(cookies[i]);
if(cookie.substring(0,name.length+1)==(name+'=')){
cookieValue=decodeURIComponent(cookie.substring(name.length+1));
break}
}
}
return cookieValue}
};


/* ../prive/javascript/layer.js */
var memo_obj=new Array();
var url_chargee=new Array();
var xhr_actifs={};
function findObj_test_forcer(n,forcer){
var p,i,x;
if(memo_obj[n]&&!forcer){
return memo_obj[n]}
var d=document;
if((p=n.indexOf("?"))>0&&parent.frames.length){
d=parent.frames[n.substring(p+1)].document;
n=n.substring(0,p)}
if(!(x=d[n])&&d.all){
x=d.all[n]}
for(i=0;!x&&i<d.forms.length;i++){
if(d.forms[i][n]){
if(d.forms[i][n].id==n)
x=d.forms[i][n]}
}
for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=findObj(n,d.layers[i].document);
if(!x&&document.getElementById)x=document.getElementById(n);
if(!forcer)memo_obj[n]=x;
return x}
function findObj(n){
return findObj_test_forcer(n,false)}
function findObj_forcer(n){
return findObj_test_forcer(n,true)}
function hide_obj(obj){
var element;
if(element=findObj(obj)){
jQuery(element).css("visibility","hidden")}
}
jQuery.fn.showother=function(cible){
var me=this;
if(me.is('.replie')){
me.addClass('deplie').removeClass('replie');
jQuery(cible)
.slideDown('fast',
function(){
jQuery(me)
.addClass('blocdeplie')
.removeClass('blocreplie')
.removeClass('togglewait')}
).trigger('deplie')}
return this}
jQuery.fn.hideother=function(cible){
var me=this;
if(!me.is('.replie')){
me.addClass('replie').removeClass('deplie');
jQuery(cible)
.slideUp('fast',
function(){
jQuery(me)
.addClass('blocreplie')
.removeClass('blocdeplie')
.removeClass('togglewait')}
).trigger('replie')}
return this}
jQuery.fn.toggleother=function(cible){
if(this.is('.deplie'))
return this.hideother(cible);
else
return this.showother(cible)}
jQuery.fn.depliant=function(cible){
if(!this.is('.depliant')){
var time=400;
var me=this;
this
.addClass('depliant');
if(!me.is('.deplie')){
me.addClass('hover')
.addClass('togglewait');
var t=setTimeout(function(){
me.toggleother(cible);
t=null},time)}
me
.hover(function(e){
me
.addClass('hover');
if(!me.is('.deplie')){
me.addClass('togglewait');
if(t){clearTimeout(t);t=null}
t=setTimeout(function(){
me.toggleother(cible);
t=null},time)}
}
,function(e){
if(t){clearTimeout(t);t=null}
me
.removeClass('hover')})
.end()}
return this}
jQuery.fn.depliant_clicancre=function(cible){
var me=this.parent();
if(me.is('.togglewait'))return false;
me.toggleother(cible);
return false}
function slide_horizontal(couche,slide,align,depart,etape){
var obj=findObj_forcer(couche);
if(!obj)return;
if(!etape){
if(align=='left')depart=obj.scrollLeft;
else depart=obj.firstChild.offsetWidth-obj.scrollLeft;
etape=0}
etape=Math.round(etape)+1;
pos=Math.round(depart)+Math.round(((slide-depart)/10)*etape);
if(align=='left')obj.scrollLeft=pos;
else obj.scrollLeft=obj.firstChild.offsetWidth-pos;
if(etape<10)setTimeout("slide_horizontal('"+couche+"', '"+slide+"', '"+align+"', '"+depart+"', '"+etape+"')",60)}
function changerhighlight(couche){
jQuery(couche)
.removeClass('off')
.siblings()
.not(couche)
.addClass('off')}
function aff_selection(arg,idom,url,event){
noeud=findObj_forcer(idom);
if(noeud){
noeud.style.display="none";
charger_node_url(url+arg,noeud,'','',event)}
return false}
function aff_selection_titre(titre,id,idom,nid)
{
t=findObj_forcer('titreparent');
t.value=titre;
t=findObj_forcer(nid);
t.value=id;
jQuery(t).trigger('change');t=findObj_forcer(idom);
t.style.display='none';
p=$(t).parents('form');
if(p.is('.submit_plongeur'))p.get(p.length-1).submit()}
function admin_tech_selection_titre(titre,id,idom,nid)
{
nom=titre.replace(/\W+/g,'_');
findObj_forcer("znom_sauvegarde").value=nom;
findObj_forcer("nom_sauvegarde").value=nom;
aff_selection_titre(titre,id,idom,nid)}
function aff_selection_provisoire(id,racine,url,col,sens,informer,event)
{
charger_id_url(url.href,
racine+'_col_'+(col+1),
function(){
slide_horizontal(racine+'_principal',((col-1)*150),sens);
aff_selection(id,racine+"_selection",informer)},
event);
return false}
function onkey_rechercher(valeur,rac,url,img,nid,init){
var Field=findObj_forcer(rac);
if(!valeur.length){
init=findObj_forcer(init);
if(init&&init.href){charger_node_url(init.href,Field)}
}else{
charger_node_url(url+valeur,
Field,
function(){
var n=Field.childNodes.length-1;
if((n==1)){
noeud=Field.childNodes[n].firstChild;
if(noeud.title)
aff_selection_titre(noeud.firstChild.nodeValue,noeud.title,rac,nid)}
},
img)}
return false}
var verifForm_clicked=false;
function verifForm(racine){
if(!jQuery.browser.msie)
jQuery('form',racine||document)
.keypress(function(e){
if(
((e.ctrlKey&&(
(((e.charCode||e.keyCode)==115)||((e.charCode||e.keyCode)==83))
||(e.charCode==19&&e.keyCode==19)
)
)
||(e.keyCode==19&&jQuery.browser.opera))
&&!verifForm_clicked
){
verifForm_clicked=true;
jQuery(this).find('input[type=submit]')
.click();
return false}
});
else
jQuery('form',racine||document)
.keydown(function(e){
if(!e.charCode&&e.keyCode==119&&!verifForm_clicked){
verifForm_clicked=true;
jQuery(this).find('input[type=submit]')
.click();
return false}
})}
function AjaxSqueeze(trig,id,callback,event)
{
var target=jQuery('#'+id);
if(!target.size()){return true}
return!AjaxSqueezeNode(trig,target,callback,event)}
function AjaxSqueezeNode(trig,target,f,event)
{
var i,callback;
if(!f){
callback=function(){verifForm(this)}
}
else{
callback=function(res,status){
f.apply(this,[res,status]);
verifForm(this)}
}
valid=false;
if(typeof(window['_OUTILS_DEVELOPPEURS'])!='undefined'){
if(!(navigator.userAgent.toLowerCase().indexOf("firefox/1.0")))
valid=(typeof event=='object')&&(event.altKey||event.metaKey)}
if(typeof(trig)=='string'){
if(valid){
window.open(trig+'&transformer_xml=valider_xml')}else{
jQuery(target).animeajax()}
res=jQuery.ajax({
"url":trig,
"complete":function(r,s){
AjaxRet(r,s,target,callback)}
});
return res}
if(valid){
var doc=window.open("","valider").document;
doc.open();
doc.close();
target=doc.body}
else{
jQuery(target).animeajax()}
jQuery(trig).ajaxSubmit({
"target":target,
"success":function(res,status){
if(status=='error')return this.html('Erreur HTTP');
callback.apply(this,[res,status])},
"beforeSubmit":function(vars){
if(valid)
vars.push({"name":"transformer_xml","value":"valider_xml"});
return true}
});
return true}
function AjaxNamedSubmit(input){
jQuery('<input type="hidden" />')
.attr('name',input.name)
.attr('value',input.value)
.insertAfter(input);
return true}
function AjaxRet(res,status,target,callback){
if(res.aborted)return;
if(status=='error')return jQuery(target).html('HTTP Error');
jQuery(target)
.html(res.responseText)
.each(callback,[res.responseText,status])}
function charger_id_url(myUrl,myField,jjscript,event)
{
var Field=findObj_forcer(myField);
if(!Field)return true;
if(!myUrl){
jQuery(Field).empty();
retour_id_url(Field,jjscript);
return true}else return charger_node_url(myUrl,Field,jjscript,findObj_forcer('img_'+myField),event)}
function charger_node_url(myUrl,Field,jjscript,img,event)
{
if(url_chargee[myUrl]){
var el=jQuery(Field).html(url_chargee[myUrl])[0];
retour_id_url(el,jjscript);
triggerAjaxLoad(el);
return false}else{
if(img)img.style.visibility="visible";
if(xhr_actifs[Field]){xhr_actifs[Field].aborted=true;xhr_actifs[Field].abort()}
xhr_actifs[Field]=AjaxSqueezeNode(myUrl,
Field,
function(r){
xhr_actifs[Field]=undefined;
if(img)img.style.visibility="hidden";
url_chargee[myUrl]=r;
retour_id_url(Field,jjscript);
slide_horizontal($(Field).children().attr("id")+'_principal',$(Field).width(),$(Field).css("text-align"))},
event);
return false}
}
function retour_id_url(Field,jjscript)
{
jQuery(Field).css({'visibility':'visible','display':'block'});
if(jjscript)jjscript()}
function charger_node_url_si_vide(url,noeud,gifanime,jjscript,event){
if(noeud.style.display!='none'){
noeud.style.display='none'}
else{
if(noeud.innerHTML!=""){
noeud.style.visibility="visible";
noeud.style.display="block"}else{
charger_node_url(url,noeud,'',gifanime,event)}
}
return false}
function charger_id_url_si_vide(myUrl,myField,jjscript,event){
var Field=findObj_forcer(myField);if(!Field)return;
if(Field.innerHTML==""){
charger_id_url(myUrl,myField,jjscript,event)
}
else{
Field.style.visibility="visible";
Field.style.display="block"}
}


/* ../prive/javascript/presentation.js */

$.fn.hoverClass=function(c){
return this.each(function(){
$(this).hover(
function(){$(this).addClass(c)},
function(){$(this).removeClass(c)}
)})};
var bandeau_elements=false;
var dir_page=$("html").attr("dir");
function getBiDiOffset(el){
var offset=el.offsetLeft;
if(dir_page=="rtl")
offset=(window.innerWidth||el.offsetParent.clientWidth)-(offset+el.offsetWidth);
return offset}
function decaleSousMenu(){
var sousMenu=$("div.bandeau_sec",this).css({visibility:'hidden',display:'block'});
if(!sousMenu.length)return;
var left;
if($.browser.msie){
if(sousMenu.bgIframe)sousMenu.bgIframe();
left=getBiDiOffset(sousMenu[0].parentNode)+getBiDiOffset($("#bandeau-principal div")[0])}else left=getBiDiOffset(sousMenu[0]);
if(left>0){
var demilargeur=Math.floor(sousMenu[0].offsetWidth/2);
var gauche=left-demilargeur
+Math.floor(largeur_icone/2);
if(gauche<0)gauche=0;
sousMenu.css(dir_page=="rtl"?"right":"left",gauche+"px")}
sousMenu.css({display:'',visibility:''})}
function changestyle(id_couche,element,style){
if(!bandeau_elements){
bandeau_elements=$('#haut-page div.bandeau')}
var select=$(bandeau_elements).not('#'+id_couche);
if(id_couche=='garder-recherche')select.not('#bandeaurecherche');
select.css({'visibility':'hidden','display':'none'});
if(element)
$('#'+id_couche).css({element:style});
else
$('#'+id_couche).css({'visibility':'visible','display':'block'})}
var accepter_change_statut=false;
function selec_statut(id,type,decal,puce,script){
node=findObj('imgstatut'+type+id);
if(!accepter_change_statut)
accepter_change_statut=confirm(confirm_changer_statut);
if(!accepter_change_statut||!node)return;
$('#statutdecal'+type+id)
.css('marginLeft',decal+'px')
.removeClass('on');
$.get(script,function(c){
if(!c)
node.src=puce;
else{
r=window.open();
r.document.write(c);
r.document.close()}
})}
function prepare_selec_statut(nom,type,id,action)
{
$('#'+nom+type+id)
.hoverClass('on')
.addClass('on')
.load(action+'&type='+type+'&id='+id)}
function changeclass(objet,myClass){
objet.className=myClass}
function hauteurFrame(nbCol){
hauteur=$(window).height()-40;
hauteur=hauteur-$('#haut-page').height();
if(findObj('brouteur_hierarchie'))
hauteur=hauteur-$('#brouteur_hierarchie').height();
for(i=0;i<nbCol;i++){
$('#iframe'+i)
.height(hauteur+'px')}
}
function changeVisible(input,id,select,nonselect){
if(input){
element=findObj_forcer(id);
if(element.style.display!=select)element.style.display=select}else{
element=findObj_forcer(id);
if(element.style.display!=nonselect)element.style.display=nonselect}
}
var antifocus=false;
var antifocus_mots=new Array();
function puce_statut(selection){
if(selection=="publie"){
return"puce-verte.gif"}
if(selection=="prepa"){
return"puce-blanche.gif"}
if(selection=="prop"){
return"puce-orange.gif"}
if(selection=="refuse"){
return"puce-rouge.gif"}
if(selection=="poubelle"){
return"puce-poubelle.gif"}
}


/* ../prive/javascript/gadgets.js */
function init_gadgets(url_toutsite,url_navrapide,url_agenda,html_messagerie){
jQuery('#boutonbandeautoutsite')
.one('mouseover',function(event){
if((typeof(window['_OUTILS_DEVELOPPEURS'])=='undefined')||((event.altKey||event.metaKey)!=true)){
changestyle('bandeautoutsite');
jQuery('#gadget-rubriques')
.load(url_toutsite)}else{window.open(url_toutsite+'&transformer_xml=valider_xml')}
})
.one('focus',function(){jQuery(this).mouseover()});
jQuery('#boutonbandeaunavrapide')
.one('mouseover',function(event){
if((typeof(window['_OUTILS_DEVELOPPEURS'])=='undefined')||((event.altKey||event.metaKey)!=true)){
changestyle('bandeaunavrapide');
jQuery('#gadget-navigation')
.load(url_navrapide)}else{window.open(url_navrapide+'&transformer_xml=valider_xml')}
})
.one('focus',function(){jQuery(this).mouseover()});
jQuery('#boutonbandeauagenda')
.one('mouseover',function(event){
if((typeof(window['_OUTILS_DEVELOPPEURS'])=='undefined')||((event.altKey||event.metaKey)!=true)){
changestyle('bandeauagenda');
jQuery('#gadget-agenda')
.load(url_agenda)}else{window.open(url_agenda+'&transformer_xml=valider_xml')}
})
.one('focus',function(){jQuery(this).mouseover()});
jQuery('#gadget-messagerie')
.html(html_messagerie);
jQuery('#form_recherche')
.one('click',function(){this.value=''})}


/* ../extensions/porte_plume/javascript/xregexp-min.js */

var XRegExp;if(!XRegExp){(function(){XRegExp=function(r,l){if(XRegExp.isRegExp(r)){if(l!==undefined){throw TypeError("can't supply flags when constructing one RegExp from another")}return r.addFlags("")}if(h){throw Error("can't call the XRegExp constructor within token definition functions")}var l=l||"",k=[],s=0,p=XRegExp.OUTSIDE_CLASS,m={hasNamedCapture:false,captureNames:[],hasFlag:function(u){if(u.length>1){throw SyntaxError("flag can't be more than one character")}return l.indexOf(u)>-1}},n,q,o,t;while(s<r.length){n=j(r,s,p,m);if(n){k.push(n.output);s+=Math.max(n.matchLength,1)}else{o=r.charAt(s);if(q=i.exec.call(f[p],r.slice(s))){k.push(q[0]);s+=q[0].length}else{if(o==="["){p=XRegExp.INSIDE_CLASS}else{if(o==="]"){p=XRegExp.OUTSIDE_CLASS}}k.push(o);s++}}}t=RegExp(k.join(""),i.replace.call(l,e,""));t._xregexp={source:r,captureNames:m.hasNamedCapture?m.captureNames:null};return t};var b=/\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,e=/[^gimy]+|(.)(?=[\s\S]*\1)/g,a=/()??/.exec("")[1]===undefined,c=function(){var k=/^/g;k.test("");return!k.lastIndex}(),d=function(){var k=/x/g;"x".replace(k,"");return!k.lastIndex}(),i={exec:RegExp.prototype.exec,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split,test:RegExp.prototype.test},j=function(s,n,r,q){var p=g.length,l,o,k;h=true;while(p--){o=g[p];if((r&o.scope)&&(!o.trigger||o.trigger.call(q))){o.pattern.lastIndex=n;k=o.pattern.exec(s);if(k&&k.index===n){l={output:o.handler.call(q,k,r),matchLength:k[0].length};break}}}h=false;return l},h=false,f={},g=[];XRegExp.INSIDE_CLASS=1;XRegExp.OUTSIDE_CLASS=2;f[XRegExp.INSIDE_CLASS]=/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;f[XRegExp.OUTSIDE_CLASS]=/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;XRegExp.addToken=function(n,m,l,k){g.push({pattern:XRegExp(n).addFlags("g"),handler:m,scope:l||XRegExp.OUTSIDE_CLASS,trigger:k||null})};RegExp.prototype.exec=function(o){var m=i.exec.apply(this,arguments),l,k;if(m){if(!a&&m.length>1&&XRegExp._indexOf(m,"")>-1){k=RegExp("^"+this.source+"$(?!\\s)",XRegExp._getNativeFlags(this));i.replace.call(m[0],k,function(){for(var p=1;p<arguments.length-2;p++){if(arguments[p]===undefined){m[p]=undefined}}})}if(this._xregexp&&this._xregexp.captureNames){for(var n=1;n<m.length;n++){l=this._xregexp.captureNames[n-1];if(l){m[l]=m[n]}}}if(!c&&this.global&&this.lastIndex>(m.index+m[0].length)){this.lastIndex--}}return m};if(!c){RegExp.prototype.test=function(l){var k=i.exec.call(this,l);if(k&&this.global&&this.lastIndex>(k.index+k[0].length)){this.lastIndex--}return!!k}}String.prototype.match=function(l){if(!XRegExp.isRegExp(l)){l=RegExp(l)}if(l.global){var k=i.match.apply(this,arguments);l.lastIndex=0;return k}return l.exec(this)};String.prototype.replace=function(m,n){var o=XRegExp.isRegExp(m),l,k,p;if(o&&typeof n.valueOf()==="string"&&n.indexOf("${")===-1&&d){return i.replace.apply(this,arguments)}if(!o){m=m+""}else{if(m._xregexp){l=m._xregexp.captureNames}}if(typeof n==="function"){k=i.replace.call(this,m,function(){if(l){arguments[0]=new String(arguments[0]);for(var q=0;q<l.length;q++){if(l[q]){arguments[0][l[q]]=arguments[q+1]}}}if(o&&m.global){m.lastIndex=arguments[arguments.length-2]+arguments[0].length}return n.apply(null,arguments)})}else{p=this+"";k=i.replace.call(p,m,function(){var q=arguments;return i.replace.call(n,b,function(s,r,v){if(r){switch(r){case"$":return"$";case"&":return q[0];case"`":return q[q.length-1].slice(0,q[q.length-2]);case"'":return q[q.length-1].slice(q[q.length-2]+q[0].length);default:var t="";r=+r;if(!r){return s}while(r>q.length-3){t=String.prototype.slice.call(r,-1)+t;r=Math.floor(r/10)}return(r?q[r]||"":"$")+t}}else{var u=+v;if(u<=q.length-3){return q[u]}u=l?XRegExp._indexOf(l,v):-1;return u>-1?q[u+1]:s}})})}if(o&&m.global){m.lastIndex=0}return k};String.prototype.split=function(o,k){if(!XRegExp.isRegExp(o)){return i.split.apply(this,arguments)}var q=this+"",m=[],p=0,n,l;if(k===undefined||+k<0){k=Infinity}else{k=Math.floor(+k);if(!k){return[]}}o=o.addFlags("g");while(n=o.exec(q)){if(o.lastIndex>p){m.push(q.slice(p,n.index));if(n.length>1&&n.index<q.length){Array.prototype.push.apply(m,n.slice(1))}l=n[0].length;p=o.lastIndex;if(m.length>=k){break}}if(!n[0].length){o.lastIndex++}}if(p===q.length){if(!i.test.call(o,"")||l){m.push("")}}else{m.push(q.slice(p))}return m.length>k?m.slice(0,k):m}})();RegExp.prototype.addFlags=function(b){var c=XRegExp(this.source,(b||"")+XRegExp._getNativeFlags(this)),a=this._xregexp;if(a){c._xregexp={source:a.source,captureNames:a.captureNames?a.captureNames.slice(0):null}}return c};RegExp.prototype.apply=function(b,a){return this.exec(a[0])};RegExp.prototype.call=function(a,b){return this.exec(b)};RegExp.prototype.forEachExec=function(e,f,c){var d=this.addFlags("g"),b=-1,a;while(a=d.exec(e)){f.call(c,a,++b,e,d);if(!a[0].length){d.lastIndex++}}if(this.global){this.lastIndex=0}};RegExp.prototype.validate=function(b){var a=RegExp("^(?:"+this.source+")$(?!\\s)",XRegExp._getNativeFlags(this));if(this.global){this.lastIndex=0}return b.search(a)===0};XRegExp.cache=function(c,a){var b="/"+c+"/"+(a||"");return XRegExp.cache[b]||(XRegExp.cache[b]=XRegExp(c,a))};XRegExp.escape=function(a){return a.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,"\\$&")};XRegExp.freezeTokens=function(){XRegExp.addToken=null};XRegExp.isRegExp=function(a){return Object.prototype.toString.call(a)==="[object RegExp]"};XRegExp.matchWithinChain=function(e,a,b){var c;function d(g,l){var j=a[l].addFlags("g"),f=[],k,h;for(h=0;h<g.length;h++){if(b){k=[];j.forEachExec(g[h][0],function(i){i.index+=g[h].index;k.push(i)})}else{k=g[h].match(j)}if(k){f.push(k)}}f=Array.prototype.concat.apply([],f);if(a[l].global){a[l].lastIndex=0}return l===a.length-1?f:d(f,l+1)}if(b){c={"0":e,index:0}}return d([b?c:e],0)};XRegExp._getNativeFlags=function(a){return(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":"")};XRegExp._indexOf=function(d,b,c){for(var a=c||0;a<d.length;a++){if(d[a]===b){return a}}return-1};(function(){var a=/^(?:[?*+]|{\d+(?:,\d*)?})\??/;XRegExp.addToken(/\(\?#[^)]*\)/,function(b){return a.test(b.input.slice(b.index+b[0].length))?"":"(?:)"});XRegExp.addToken(/\((?!\?)/,function(){this.captureNames.push(null);return"("});XRegExp.addToken(/\(\?<([$\w]+)>/,function(b){this.captureNames.push(b[1]);this.hasNamedCapture=true;return"("});XRegExp.addToken(/\\k<([\w$]+)>/,function(c){var b=XRegExp._indexOf(this.captureNames,c[1]);return b>-1?"\\"+(b+1)+(isNaN(c.input.charAt(c.index+c[0].length))?"":"(?:)"):c[0]});XRegExp.addToken(/\[\^?]/,function(b){return b[0]==="[]"?"\\b\\B":"[\\s\\S]"});XRegExp.addToken(/(?:\s+|#.*)+/,function(b){return a.test(b.input.slice(b.index+b[0].length))?"":"(?:)"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("x")});XRegExp.addToken(/\./,function(){return"[\\s\\S]"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("s")})})();XRegExp.version="1.2.0"};


/* ../extensions/porte_plume/javascript/jquery.markitup_pour_spip.js */

;(function($){
$.fn.markItUp=function(settings,extraSettings){
var options,ctrlKey,shiftKey,altKey;
ctrlKey=shiftKey=altKey=false;
options={id:'',
nameSpace:'',
root:'',
lang:'',
previewInWindow:'',previewAutoRefresh:true,
previewPosition:'after',
previewTemplatePath:'~/templates/preview.html',
previewParserPath:'',
previewParserVar:'data',
resizeHandle:true,
beforeInsert:'',
afterInsert:'',
onEnter:{},
onShiftEnter:{},
onCtrlEnter:{},
onTab:{},
markupSet:[{}]
};
$.extend(options,settings,extraSettings);
if(!options.root){
$('script').each(function(a,tag){
miuScript=$(tag).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/);
if(miuScript!==null){
options.root=miuScript[1]}
})}
return this.each(function(){
var $$,textarea,levels,scrollPosition,caretPosition,caretEffectivePosition,
clicked,hash,header,footer,previewWindow,template,iFrame,abort,
before,after;
$$=$(this);
textarea=this;
levels=[];
abort=false;
scrollPosition=caretPosition=0;
options.previewParserPath=localize(options.previewParserPath);
options.previewTemplatePath=localize(options.previewTemplatePath);
function localize(data,inText){
if(inText){
return data.replace(/("|')~\//g,"$1"+options.root)}
return data.replace(/^~\//,options.root)}
function init(){
id='';nameSpace='';
if(options.id){
id='id="'+options.id+'"'}else if($$.attr("id")){
id='id="markItUp'+($$.attr("id").substr(0,1).toUpperCase())+($$.attr("id").substr(1))+'"'}
if(options.nameSpace){
nameSpace='class="'+options.nameSpace+'"'}
$$.wrap('<div '+nameSpace+'></div>');
$$.wrap('<div '+id+' class="markItUp"></div>');
$$.wrap('<div class="markItUpContainer"></div>');
$$.addClass("markItUpEditor");
header=$('<div class="markItUpHeader"></div>').insertBefore($$);
$(dropMenus(options.markupSet)).appendTo(header);
$(header).find("li.markItUpDropMenu ul:empty").parent().remove();
footer=$('<div class="markItUpFooter"></div>').insertAfter($$);
if(options.resizeHandle===true&&$.browser.safari!==true){
resizeHandle=$('<div class="markItUpResizeHandle"></div>')
.insertAfter($$)
.bind("mousedown",function(e){
var h=$$.height(),y=e.clientY,mouseMove,mouseUp;
mouseMove=function(e){
$$.css("height",Math.max(20,e.clientY+h-y)+"px");
return false};
mouseUp=function(e){
$("html").unbind("mousemove",mouseMove).unbind("mouseup",mouseUp);
return false};
$("html").bind("mousemove",mouseMove).bind("mouseup",mouseUp)});
footer.append(resizeHandle)}
$$.keydown(keyPressed).keyup(keyPressed);
$$.bind("insertion",function(e,settings){
if(settings.target!==false){
get()}
if(textarea===$.markItUp.focused){
markup(settings)}
});
$$.focus(function(){
$.markItUp.focused=this})}
function dropMenus(markupSet){
var ul=$('<ul></ul>'),i=0;
var lang=($$.attr('lang')||options.lang);
$('li:hover > ul',ul).css('display','block');
$.each(markupSet,function(){
var button=this,t='',title,li,j;
if((!lang||!button.lang||($.inArray(lang,button.lang)!=-1))
&&(!button.lang_not||($.inArray(lang,button.lang_not)==-1))){
title=(button.key)?(button.name||'')+' [Ctrl+'+button.key+']':(button.name||'');
key=(button.key)?'accesskey="'+button.key+'"':'';
if(button.separator){
li=$('<li class="markItUpSeparator">'+(button.separator||'')+'</li>').appendTo(ul)}else{
i++;
for(j=levels.length-1;j>=0;j--){
t+=levels[j]+"-"}
li=$('<li class="markItUpButton markItUpButton'+t+(i)+' '+(button.className||'')+'"><a href="" '+key+' title="'+title+'"><b>'+(button.name||'')+'</b></a></li>')
.bind("contextmenu",function(){return false}).click(function(){
return false}).focusin(function(){
$$.focus()}).mousedown(function(){
if(button.call){
eval(button.call)()}
setTimeout(function(){markup(button)},1);
return false}).hover(function(){
$('> ul',this).show();
$(document).one('click',function(){$('ul ul',header).hide()}
)},function(){
$('> ul',this).hide()}
).appendTo(ul);
if(button.dropMenu){
levels.push(i);
$(li).addClass('markItUpDropMenu').append(dropMenus(button.dropMenu))}
}
}
});
levels.pop();
return ul}
function magicMarkups(string){
if(string){
string=string.toString();
string=string.replace(/\(\!\(([\s\S]*?)\)\!\)/g,
function(x,a){
var b=a.split('|!|');
if(altKey===true){
return(b[1]!==undefined)?b[1]:b[0]}else{
return(b[1]===undefined)?"":b[0]}
}
);
string=string.replace(/\[\!\[([\s\S]*?)\]\!\]/g,
function(x,a){
var b=a.split(':!:');
if(abort===true){
return false}
value=prompt(b[0],(b[1])?b[1]:'');
if(value===null){
abort=true}
return value}
);
return string}
return""}
function prepare(action){
if($.isFunction(action)){
action=action(hash)}
return magicMarkups(action)}
function build(string){
openWith=prepare(clicked.openWith);
placeHolder=prepare(clicked.placeHolder);
replaceWith=prepare(clicked.replaceWith);
closeWith=prepare(clicked.closeWith);
if(replaceWith!==""){
block=openWith+replaceWith+closeWith}else if(selection===''&&placeHolder!==''){
block=openWith+placeHolder+closeWith}else{
block=openWith+(string||selection)+closeWith}
return{block:block,
openWith:openWith,
replaceWith:replaceWith,
placeHolder:placeHolder,
closeWith:closeWith
}}
function selectWord(){
selectionBeforeAfter(/\s|[.,;:!¡?¿()]/);
selectionSave()}
function selectLine(){
selectionBeforeAfter(/\r?\n/);
selectionSave()}
function selectionRemoveLast(pattern){
if(!pattern)pattern=/\s/;
last=selection[selection.length-1];
if(last&&last.match(pattern)){
set(caretPosition,selection.length-1);
get();
$.extend(hash,{caretPosition:caretPosition,scrollPosition:scrollPosition})}
}
function selectionBeforeAfter(pattern){
if(!pattern)pattern=/\s/;
before=textarea.value.substring(0,caretEffectivePosition);
after=textarea.value.substring(caretEffectivePosition+selection.length-fixIeBug(selection));
before=before.split(pattern);
after=after.split(pattern)}
function selectionSave(){
nb_before=before?before[before.length-1].length:0;
nb_after=after?after[0].length:0;
nb=nb_before+selection.length+nb_after-fixIeBug(selection);
caretPosition=caretPosition-nb_before;
set(caretPosition,nb);
get();
$.extend(hash,{selection:selection,caretPosition:caretPosition,scrollPosition:scrollPosition})}
function markup(button){
var len,j,n,i;
hash=clicked=button;
get();
$.extend(hash,{line:"",
root:options.root,
textarea:textarea,
selection:(selection||''),
caretPosition:caretPosition,
ctrlKey:ctrlKey,
shiftKey:shiftKey,
altKey:altKey
}
);
if(button.selectionType){
if(button.selectionType=="word"){
if(!selection){
selectWord()}else{
selectionRemoveLast(/\s/)}
}
if(button.selectionType=="line"){
selectLine()}
if(button.selectionType=="return"){
selectionBeforeAfter(/\r?\n/);
before_last=before[before.length-1];
after='';
if(r=before_last.match(/^-([*#]+) ?(.*)$/)){
if(r[2]){
button.replaceWith="\n-"+r[1]+' ';
before_last=''}else{
button.replaceWith="\n"}
}else{
before_last='';
button.replaceWith="\n"}
before[before.length-1]=before_last;
selectionSave()}
}
prepare(options.beforeInsert);
prepare(clicked.beforeInsert);
if(ctrlKey===true&&shiftKey===true){
prepare(clicked.beforeMultiInsert)}
$.extend(hash,{line:1});
if((button.forceMultiline===true&&selection.length)
||(ctrlKey===true&&shiftKey===true)){
lines=selection.split(/\r?\n/);
for(j=0,n=lines.length,i=0;i<n;i++){
if($.trim(lines[i])!==''){
$.extend(hash,{line:++j,selection:lines[i]});
lines[i]=build(lines[i]).block}else{
lines[i]=""}
}
string={block:lines.join('\n')};
start=caretPosition;
len=string.block.length+(($.browser.opera)?n-1:0)}else if(ctrlKey===true){
string=build(selection);
start=caretPosition+string.openWith.length;
len=string.block.length-string.openWith.length-string.closeWith.length;
len-=fixIeBug(string.block)}else if(shiftKey===true){
string=build(selection);
start=caretPosition;
len=string.block.length;
len-=fixIeBug(string.block)}else{
string=build(selection);
start=caretPosition+string.block.length;
len=0;
start-=fixIeBug(string.block)}
if(selection===''){
start+=fixOperaBug(string.replaceWith)}
$.extend(hash,{caretPosition:caretPosition,scrollPosition:scrollPosition});
if(string.block!==selection&&abort===false){
insert(string.block);
set(start,len)}
get();
$.extend(hash,{line:'',selection:selection});
if((button.forceMultiline===true)
||(ctrlKey===true&&shiftKey===true)){
prepare(clicked.afterMultiInsert)}
prepare(clicked.afterInsert);
prepare(options.afterInsert);
if(previewWindow&&options.previewAutoRefresh){
refreshPreview()}
shiftKey=altKey=ctrlKey=abort=false}
function fixOperaBug(string){
if($.browser.opera){
return string.length-string.replace(/\n*/g,'').length}
return 0}
function fixIeBug(string){
if($.browser.msie){
return string.length-string.replace(/\r*/g,'').length}
return 0}
function insert(block){
if(document.selection){
var newSelection=document.selection.createRange();
newSelection.text=block}else{
textarea.value=textarea.value.substring(0,caretEffectivePosition)+block+textarea.value.substring(caretEffectivePosition+selection.length,textarea.value.length)}
}
function set(start,len){
if(textarea.createTextRange){
range=textarea.createTextRange();
range.collapse(true);
range.moveStart('character',start);
range.moveEnd('character',len);
range.select()}else if(textarea.setSelectionRange){
textarea.setSelectionRange(start,start+len)}
textarea.scrollTop=scrollPosition;
textarea.focus()}
function get(){
textarea.focus();
scrollPosition=textarea.scrollTop;
if(document.selection){
selection=document.selection.createRange().text;
if($.browser.msie){var range=document.selection.createRange(),rangeCopy=range.duplicate();
rangeCopy.moveToElementText(textarea);
caretPosition=-1;
while(rangeCopy.inRange(range)){
rangeCopy.moveStart('character');
caretPosition++}
caretEffectivePosition=caretPosition}else{caretPosition=textarea.selectionStart;
lenSelection=selection.length;
set(0,caretPosition);
opBefore=document.selection.createRange().text;
caretEffectivePosition=opBefore.length-fixOperaBug(opBefore);
set(caretPosition,lenSelection);
selection=document.selection.createRange().text}
}else{caretPosition=textarea.selectionStart;
caretEffectivePosition=caretPosition;
selection=textarea.value.substring(caretPosition,textarea.selectionEnd)}
return selection}
function preview(){
if(!previewWindow||previewWindow.closed){
if(options.previewInWindow){
previewWindow=window.open('','preview',options.previewInWindow);
$(window).unload(function(){
previewWindow.close()})}else{
iFrame=$('<iframe class="markItUpPreviewFrame"></iframe>');
if(options.previewPosition=='after'){
iFrame.insertAfter(footer)}else{
iFrame.insertBefore(header)}
previewWindow=iFrame[iFrame.length-1].contentWindow||frame[iFrame.length-1]}
}else if(altKey===true){
if(iFrame){
iFrame.remove()}else{
previewWindow.close()}
previewWindow=iFrame=false}
if(!options.previewAutoRefresh){
refreshPreview()}
if(options.previewInWindow){
previewWindow.focus()}
}
function refreshPreview(){
renderPreview()}
function renderPreview(){
var phtml;
if(options.previewParserPath!==''){
$.ajax({
type:'POST',
url:options.previewParserPath,
data:options.previewParserVar+'='+encodeURIComponent($$.val()),
success:function(data){
writeInPreview(localize(data,1))}
})}else{
if(!template){
$.ajax({
url:options.previewTemplatePath,
success:function(data){
writeInPreview(localize(data,1).replace(/<!-- content -->/g,$$.val()))}
})}
}
return false}
function writeInPreview(data){
if(previewWindow.document){
try{
sp=previewWindow.document.documentElement.scrollTop
}catch(e){
sp=0}
previewWindow.document.open();
previewWindow.document.write(data);
previewWindow.document.close();
previewWindow.document.documentElement.scrollTop=sp}
}
function keyPressed(e){
if(e.type==='keydown'){
if(e.which===18){e.altKey=true}if(e.which===17){e.ctrlKey=true}if(e.which===16){e.shiftKey=true}}
shiftKey=e.shiftKey;
altKey=e.altKey;
ctrlKey=(!(e.altKey&&e.ctrlKey))?e.ctrlKey:false;
if(e.type==='keydown'){
if(ctrlKey===true){
li=$("a[accesskey="+String.fromCharCode(e.which)+"]",header).parent('li');
if(li.length!==0){
ctrlKey=false;
setTimeout(function(){
li.triggerHandler('mousedown')},1);
return false}
}
if(!$.browser.opera){
if(e.which===13||e.which===10){if(ctrlKey===true){ctrlKey=false;
markup(options.onCtrlEnter);
return options.onCtrlEnter.keepDefault}else if(shiftKey===true){shiftKey=false;
markup(options.onShiftEnter);
return options.onShiftEnter.keepDefault}else{markup(options.onEnter);
return options.onEnter.keepDefault}
}
if(e.which===9){if(shiftKey==true||ctrlKey==true||altKey==true){
return false}
markup(options.onTab);
return options.onTab.keepDefault}
}
}
}
init()})};
$.fn.markItUpRemove=function(){
return this.each(function(){
var $$=$(this).unbind().removeClass('markItUpEditor');
$$.parent('div').parent('div.markItUp').parent('div').replaceWith($$)}
)};
$.markItUp=function(settings){
var options={target:false};
$.extend(options,settings);
if(options.target){
return $(options.target).each(function(){
$(this).focus();
$(this).trigger('insertion',[options])})}else{
$('textarea').trigger('insertion',[options])}
}})(jQuery);


/* ../extensions/porte_plume/javascript/jquery.previsu_spip.js */
;(function($){
$.fn.previsu_spip=function(settings){
var options;
options={
previewParserPath:'',
previewParserVar:'data',
textEditer:'Editer',
textVoir:'Voir'
};
$.extend(options,settings);
return this.each(function(){
var $$,textarea,tabs,preview;
$$=$(this);
textarea=this;
function init(){
$$.addClass("pp_previsualisation");
tabs=$('<div class="markItUpTabs"></div>').prependTo($$.parent());
$(tabs).append(
'<a href="#previsuVoir" class="previsuVoir">'+options.textVoir+'</a>'+
'<a href="#previsuEditer" class="previsuEditer on">'+options.textEditer+'</a>'
);
preview=$('<div class="markItUpPreview"></div>').insertAfter(tabs);
preview.hide();
$('.previsuVoir').click(function(){
mark=$(this).parent().parent();
objet=mark.parents('.formulaire_spip')[0].className.match(/formulaire_editer_(\w+)/);
champ=mark.parents('li')[0].className.match(/editer_(\w+)/);
$(mark).find('.markItUpPreview').height(
$(mark).find('.markItUpHeader').height()
+$(mark).find('.markItUpEditor').height()
+$(mark).find('.markItUpFooter').height()
);
$(mark).find('.markItUpHeader').hide();
$(mark).find('.markItUpEditor').hide();
$(mark).find('.markItUpFooter').hide();
$(this).addClass('on').next().removeClass('on');
$(mark).find('.markItUpPreview').show()
.addClass('ajaxLoad')
.html(renderPreview(
$(mark).find('textarea.pp_previsualisation').val(),
champ[1].toUpperCase(),
objet[1])
)
.removeClass('ajaxLoad');
return false});
$('.previsuEditer').click(function(){
mark=$(this).parent().parent();
$(mark).find('.markItUpPreview').hide();
$(mark).find('.markItUpHeader').show();
$(mark).find('.markItUpEditor').show();
$(mark).find('.markItUpFooter').show();
$(this).addClass('on').prev().removeClass('on');
return false})}
function renderPreview(val,champ,objet){
var phtml;
if(options.previewParserPath!==''){
$.ajax({
type:'POST',
async:false,
url:options.previewParserPath,
data:'champ='+champ
+'&objet='+objet
+'&'+options.previewParserVar+'='+encodeURIComponent(val),
success:function(data){
phtml=data}
})}
return phtml}
init()})}})(jQuery);


/* page=porte_plume_start.js(lang=fr) */
barre_outils_edition={"nameSpace":"edition","previewAutoRefresh":false,"onEnter":{"keepDefault":false,"selectionType":"return","replaceWith":"\n"}
,"onShiftEnter":{"keepDefault":false,"replaceWith":"\n_ "}
,"onCtrlEnter":{"keepDefault":false,"replaceWith":"\n\n"}
,"markupSet":[{"name":"Transformer en {{{intertitre}}}","key":"H","className":"outil_header1","openWith":"\n{{{","closeWith":"}}}\n","selectionType":"line"}
,{"name":"Mettre en {{gras}}","key":"B","className":"outil_bold","replaceWith":function(h){return espace_si_accolade(h,'{{','}}')},"selectionType":"word"}
,{"name":"Mettre en {italique}","key":"I","className":"outil_italic","replaceWith":function(h){return espace_si_accolade(h,'{','}')},"selectionType":"word"}
,{"name":"Mettre en liste","className":"outil_liste_ul","replaceWith":function(h){return outil_liste(h,'*')},"selectionType":"line","forceMultiline":true,"dropMenu":[{"id":"liste_ol","name":"Mettre en liste numérotée","className":"outil_liste_ol","replaceWith":function(h){return outil_liste(h,'#')},"display":true,"selectionType":"line","forceMultiline":true}
,{"id":"desindenter","name":"Désindenter une liste","className":"outil_desindenter","replaceWith":function(h){return outil_desindenter(h)},"display":true,"selectionType":"line","forceMultiline":true}
,{"id":"indenter","name":"Indenter une liste","className":"outil_indenter","replaceWith":function(h){return outil_indenter(h)},"display":true,"selectionType":"line","forceMultiline":true}
]
}
,{"separator":"---------------"}
,{"name":"Transformer en [lien hypertexte->http://...]","key":"L","className":"outil_link","openWith":"[","closeWith":"->[![Veuillez indiquer l'adresse de votre lien (vous pouvez indiquer une adresse Internet sous la forme http://www.monsite.com, une adresse courriel, ou simplement indiquer le numéro d'un article de ce site.]!]]"}
,{"name":"Transformer en [[Note de bas de page]]","className":"outil_notes","openWith":"[[","closeWith":"]]","selectionType":"word"}
,{"separator":"---------------"}
,{"name":"<quote>Citer un message</quote>","key":"Q","className":"outil_quote","openWith":"\n<quote>","closeWith":"</quote>\n","selectionType":"word"}
,{"name":"Entourer de « guillemets »","className":"outil_guillemets","openWith":"«","closeWith":"»","lang":["fr","eo","cpf","ar","es"]
,"selectionType":"word"}
,{"name":"Entourer de “guillemets de second niveau”","className":"outil_guillemets_simples","openWith":"“","closeWith":"”","lang":["fr","eo","cpf","ar","es"]
,"selectionType":"word"}
,{"name":"Entourer de « guillemets »","className":"outil_guillemets_de","openWith":"„","closeWith":"“","lang":["bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"name":"Entourer de “guillemets de second niveau”","className":"outil_guillemets_de_simples","openWith":"&sbquo;","closeWith":"‘","lang":["bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"name":"Entourer de « guillemets »","className":"outil_guillemets_simples","openWith":"“","closeWith":"”","lang_not":["fr","eo","cpf","ar","es","bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"name":"Entourer de “guillemets de second niveau”","className":"outil_guillemets_uniques","openWith":"‘","closeWith":"’","lang_not":["fr","eo","cpf","ar","es","bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"separator":"---------------"}
,{"name":"Insérer des caractères spécifiques","className":"outil_caracteres","dropMenu":[{"id":"A_grave","name":"Insérer un A accent grave majuscule","className":"outil_a_maj_grave","replaceWith":"À","display":true,"lang":["fr","eo","cpf"]
}
,{"id":"E_aigu","name":"Insérer un E accent aigu majuscule","className":"outil_e_maj_aigu","replaceWith":"É","display":true,"lang":["fr","eo","cpf"]
}
,{"id":"E_grave","name":"Insérer un E majuscule accent grave","className":"outil_e_maj_grave","replaceWith":"È","display":true,"lang":["fr","eo","cpf"]
}
,{"id":"aelig","name":"Insérer un E dans l'A","className":"outil_aelig","replaceWith":"æ","display":true,"lang":["fr","eo","cpf"]
}
,{"id":"AElig","name":"Insérer un E dans l'A majuscule","className":"outil_aelig_maj","replaceWith":"Æ","display":true,"lang":["fr","eo","cpf"]
}
,{"id":"oe","name":"Insérer un E dans l'O","className":"outil_oe","replaceWith":"œ","display":true,"lang":["fr"]
}
,{"id":"OE","name":"Insérer un E dans l'O majuscule","className":"outil_oe_maj","replaceWith":"Œ","display":true,"lang":["fr"]
}
,{"id":"Ccedil","name":"Insérer un C cédille majuscule","className":"outil_ccedil_maj","replaceWith":"Ç","display":true,"lang":["fr","eo","cpf"]
}
,{"id":"uppercase","name":"Passer en majuscules","className":"outil_uppercase","replaceWith":function(markitup){return markitup.selection.toUpperCase()},"display":true,"lang":["fr","en"]
}
,{"id":"lowercase","name":"Passer en minuscules","className":"outil_lowercase","replaceWith":function(markitup){return markitup.selection.toLowerCase()},"display":true,"lang":["fr","en"]
}
]
}
]
}
function outil_liste(h,c){
if((s=h.selection)&&(r=s.match(/^-([*#]+) (.*)$/))){
r[1]=r[1].replace(/[#*]/g,c);
s='-'+r[1]+' '+r[2]}else{
s='-'+c+' '+s}
return s}
function outil_indenter(h){
if(s=h.selection){
if(s.substr(0,2)=='-*'){
s='-**'+s.substr(2)}else if(s.substr(0,2)=='-#'){
s='-##'+s.substr(2)}else{
s='-* '+s}
}
return s}
function outil_desindenter(h){
if(s=h.selection){
if(s.substr(0,3)=='-**'){
s='-*'+s.substr(3)}else if(s.substr(0,3)=='-* '){
s=s.substr(3)}else if(s.substr(0,3)=='-##'){
s='-#'+s.substr(3)}else if(s.substr(0,3)=='-# '){
s=s.substr(3)}
}
return s}
function espace_si_accolade(h,openWith,closeWith){
if(s=h.selection){
if(s.charAt(0)=='{'){
return openWith+' '+s+' '+closeWith}
else if(c=h.textarea.selectionStart){
if(h.textarea.value.charAt(c-1)=='{'){
return' '+openWith+s+closeWith+' '}
}
}
return openWith+s+closeWith}
barre_outils_forum={"nameSpace":"forum","previewAutoRefresh":false,"onEnter":{"keepDefault":false,"selectionType":"return","replaceWith":"\n"}
,"onShiftEnter":{"keepDefault":false,"replaceWith":"\n_ "}
,"onCtrlEnter":{"keepDefault":false,"replaceWith":"\n\n"}
,"markupSet":[{"name":"Mettre en {{gras}}","key":"B","className":"outil_bold","replaceWith":function(h){return espace_si_accolade(h,'{{','}}')},"selectionType":"word"}
,{"name":"Mettre en {italique}","key":"I","className":"outil_italic","replaceWith":function(h){return espace_si_accolade(h,'{','}')},"selectionType":"word"}
,{"separator":"---------------"}
,{"name":"Transformer en [lien hypertexte->http://...]","key":"L","className":"outil_link","openWith":"[","closeWith":"->[![Veuillez indiquer l'adresse de votre lien (vous pouvez indiquer une adresse Internet sous la forme http://www.monsite.com, une adresse courriel, ou simplement indiquer le numéro d'un article de ce site.]!]]"}
,{"separator":"---------------"}
,{"name":"<quote>Citer un message</quote>","key":"Q","className":"outil_quote","openWith":"\n<quote>","closeWith":"</quote>\n","selectionType":"word"}
,{"name":"Entourer de « guillemets »","className":"outil_guillemets","openWith":"«","closeWith":"»","lang":["fr","eo","cpf","ar","es"]
,"selectionType":"word"}
,{"name":"Entourer de “guillemets de second niveau”","className":"outil_guillemets_simples","openWith":"“","closeWith":"”","lang":["fr","eo","cpf","ar","es"]
,"selectionType":"word"}
,{"name":"Entourer de « guillemets »","className":"outil_guillemets_de","openWith":"„","closeWith":"“","lang":["bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"name":"Entourer de “guillemets de second niveau”","className":"outil_guillemets_de_simples","openWith":"&sbquo;","closeWith":"‘","lang":["bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"name":"Entourer de « guillemets »","className":"outil_guillemets_simples","openWith":"“","closeWith":"”","lang_not":["fr","eo","cpf","ar","es","bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"name":"Entourer de “guillemets de second niveau”","className":"outil_guillemets_uniques","openWith":"‘","closeWith":"’","lang_not":["fr","eo","cpf","ar","es","bg","de","pl","hr","src"]
,"selectionType":"word"}
,{"separator":"---------------"}
]
}
function outil_liste(h,c){
if((s=h.selection)&&(r=s.match(/^-([*#]+) (.*)$/))){
r[1]=r[1].replace(/[#*]/g,c);
s='-'+r[1]+' '+r[2]}else{
s='-'+c+' '+s}
return s}
function outil_indenter(h){
if(s=h.selection){
if(s.substr(0,2)=='-*'){
s='-**'+s.substr(2)}else if(s.substr(0,2)=='-#'){
s='-##'+s.substr(2)}else{
s='-* '+s}
}
return s}
function outil_desindenter(h){
if(s=h.selection){
if(s.substr(0,3)=='-**'){
s='-*'+s.substr(3)}else if(s.substr(0,3)=='-* '){
s=s.substr(3)}else if(s.substr(0,3)=='-##'){
s='-#'+s.substr(3)}else if(s.substr(0,3)=='-# '){
s=s.substr(3)}
}
return s}
function espace_si_accolade(h,openWith,closeWith){
if(s=h.selection){
if(s.charAt(0)=='{'){
return openWith+' '+s+' '+closeWith}
else if(c=h.textarea.selectionStart){
if(h.textarea.value.charAt(c-1)=='{'){
return' '+openWith+s+closeWith+' '}
}
}
return openWith+s+closeWith}
;(function($){
$.fn.barre_outils=function(nom,settings){
options={
lang:'fr'
};
$.extend(options,settings);
return $(this)
.not('.markItUpEditor, .no_barre')
.markItUp(eval('barre_outils_'+nom),{lang:options.lang})};
$.fn.barre_previsualisation=function(settings){
options={
previewParserPath:"index.php?action=porte_plume_previsu",textEditer:"&Eacute;diter",
textVoir:"Voir"
};
$.extend(options,settings);
return $(this)
.not('.pp_previsualisation, .no_previsualisation')
.previsu_spip(options)};
$(window).load(function(){
function barrebouilles(){
$('.formulaire_spip textarea.inserer_barre_forum').barre_outils('forum');
$('.formulaire_spip textarea.inserer_barre_edition').barre_outils('edition');
$('.formulaire_spip textarea.inserer_previsualisation').barre_previsualisation();
$('textarea.textarea_forum').barre_outils('forum');
$('.formulaire_forum textarea[name=texte]').barre_outils('forum');
$('.formulaire_spip textarea[name=texte]')
.barre_outils('edition')
.barre_previsualisation()}
barrebouilles();
onAjaxLoad(barrebouilles)})})(jQuery);


/* ../extensions/porte_plume/javascript/porte_plume_forcer_hauteur.js */
function barre_forcer_hauteur(){
jQuery(".markItUpEditor").each(function(){
var hauteur_min=jQuery(this).height();
var hauteur_max=parseInt(jQuery(window).height())-200;
var hauteur=hauteur_min;
var signes=jQuery(this).val().length;
if(signes){
var hauteur_signes=Math.round(signes/4)+50;
if(hauteur_signes>hauteur_min&&hauteur_signes<hauteur_max)
hauteur=hauteur_signes;
else
if(hauteur_signes>hauteur_max)
hauteur=hauteur_max;
jQuery(this).height(hauteur)}
})}
jQuery(window).bind("load",function(){
barre_forcer_hauteur()});


