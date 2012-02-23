/* compact [
	../prive/javascript/jquery.js
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
] 62.3% */

/* ../prive/javascript/jquery.js */

(function(window,undefined){
var document=window.document;
var jQuery=(function(){
var jQuery=function(selector,context){
return new jQuery.fn.init(selector,context)},
_jQuery=window.jQuery,
_$=window.$,
rootjQuery,
quickExpr=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
isSimple=/^.[^:#\[\.,]*$/,
rnotwhite=/\S/,
rwhite=/\s/,
trimLeft=/^\s+/,
trimRight=/\s+$/,
rnonword=/\W/,
rdigit=/\d/,
rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,
rvalidchars=/^[\],:{}\s]*$/,
rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,
rwebkit=/(webkit)[ \/]([\w.]+)/,
ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,
rmsie=/(msie) ([\w.]+)/,
rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,
userAgent=navigator.userAgent,
browserMatch,
readyBound=false,
readyList=[],
DOMContentLoaded,
toString=Object.prototype.toString,
hasOwn=Object.prototype.hasOwnProperty,
push=Array.prototype.push,
slice=Array.prototype.slice,
trim=String.prototype.trim,
indexOf=Array.prototype.indexOf,
class2type={};
jQuery.fn=jQuery.prototype={
init:function(selector,context){
var match,elem,ret,doc;
if(!selector){
return this}
if(selector.nodeType){
this.context=this[0]=selector;
this.length=1;
return this}
if(selector==="body"&&!context&&document.body){
this.context=document;
this[0]=document.body;
this.selector="body";
this.length=1;
return this}
if(typeof selector==="string"){
match=quickExpr.exec(selector);
if(match&&(match[1]||!context)){
if(match[1]){
doc=(context?context.ownerDocument||context:document);
ret=rsingleTag.exec(selector);
if(ret){
if(jQuery.isPlainObject(context)){
selector=[document.createElement(ret[1])];
jQuery.fn.attr.call(selector,context,true)}else{
selector=[doc.createElement(ret[1])]}
}else{
ret=jQuery.buildFragment([match[1]],[doc]);
selector=(ret.cacheable?ret.fragment.cloneNode(true):ret.fragment).childNodes}
return jQuery.merge(this,selector)}else{
elem=document.getElementById(match[2]);
if(elem&&elem.parentNode){
if(elem.id!==match[2]){
return rootjQuery.find(selector)}
this.length=1;
this[0]=elem}
this.context=document;
this.selector=selector;
return this}
}else if(!context&&!rnonword.test(selector)){
this.selector=selector;
this.context=document;
selector=document.getElementsByTagName(selector);
return jQuery.merge(this,selector)}else if(!context||context.jquery){
return(context||rootjQuery).find(selector)}else{
return jQuery(context).find(selector)}
}else if(jQuery.isFunction(selector)){
return rootjQuery.ready(selector)}
if(selector.selector!==undefined){
this.selector=selector.selector;
this.context=selector.context}
return jQuery.makeArray(selector,this)},
selector:"",
jquery:"1.4.4",
length:0,
size:function(){
return this.length},
toArray:function(){
return slice.call(this,0)},
get:function(num){
return num==null?
this.toArray():
(num<0?this.slice(num)[0]:this[num])},
pushStack:function(elems,name,selector){
var ret=jQuery();
if(jQuery.isArray(elems)){
push.apply(ret,elems)}else{
jQuery.merge(ret,elems)}
ret.prevObject=this;
ret.context=this.context;
if(name==="find"){
ret.selector=this.selector+(this.selector?" ":"")+selector}else if(name){
ret.selector=this.selector+"."+name+"("+selector+")"}
return ret},
each:function(callback,args){
return jQuery.each(this,callback,args)},
ready:function(fn){
jQuery.bindReady();
if(jQuery.isReady){
fn.call(document,jQuery)}else if(readyList){
readyList.push(fn)}
return this},
eq:function(i){
return i===-1?
this.slice(i):
this.slice(i,+i+1)},
first:function(){
return this.eq(0)},
last:function(){
return this.eq(-1)},
slice:function(){
return this.pushStack(slice.apply(this,arguments),
"slice",slice.call(arguments).join(","))},
map:function(callback){
return this.pushStack(jQuery.map(this,function(elem,i){
return callback.call(elem,i,elem)}))},
end:function(){
return this.prevObject||jQuery(null)},
push:push,
sort:[].sort,
splice:[].splice
};
jQuery.fn.init.prototype=jQuery.fn;
jQuery.extend=jQuery.fn.extend=function(){
var options,name,src,copy,copyIsArray,clone,
target=arguments[0]||{},
i=1,
length=arguments.length,
deep=false;
if(typeof target==="boolean"){
deep=target;
target=arguments[1]||{};
i=2}
if(typeof target!=="object"&&!jQuery.isFunction(target)){
target={}}
if(length===i){
target=this;
--i}
for(;i<length;i++){
if((options=arguments[i])!=null){
for(name in options){
src=target[name];
copy=options[name];
if(target===copy){
continue}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){
if(copyIsArray){
copyIsArray=false;
clone=src&&jQuery.isArray(src)?src:[]}else{
clone=src&&jQuery.isPlainObject(src)?src:{}}
target[name]=jQuery.extend(deep,clone,copy)}else if(copy!==undefined){
target[name]=copy}
}
}
}
return target};
jQuery.extend({
noConflict:function(deep){
window.$=_$;
if(deep){
window.jQuery=_jQuery}
return jQuery},
isReady:false,
readyWait:1,
ready:function(wait){
if(wait===true){
jQuery.readyWait--}
if(!jQuery.readyWait||(wait!==true&&!jQuery.isReady)){
if(!document.body){
return setTimeout(jQuery.ready,1)}
jQuery.isReady=true;
if(wait!==true&&--jQuery.readyWait>0){
return}
if(readyList){
var fn,
i=0,
ready=readyList;
readyList=null;
while((fn=ready[i++])){
fn.call(document,jQuery)}
if(jQuery.fn.trigger){
jQuery(document).trigger("ready").unbind("ready")}
}
}
},
bindReady:function(){
if(readyBound){
return}
readyBound=true;
if(document.readyState==="complete"){
return setTimeout(jQuery.ready,1)}
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
window.addEventListener("load",jQuery.ready,false)}else if(document.attachEvent){
document.attachEvent("onreadystatechange",DOMContentLoaded);
window.attachEvent("onload",jQuery.ready);
var toplevel=false;
try{
toplevel=window.frameElement==null}catch(e){}
if(document.documentElement.doScroll&&toplevel){
doScrollCheck()}
}
},
isFunction:function(obj){
return jQuery.type(obj)==="function"},
isArray:Array.isArray||function(obj){
return jQuery.type(obj)==="array"},
isWindow:function(obj){
return obj&&typeof obj==="object"&&"setInterval"in obj},
isNaN:function(obj){
return obj==null||!rdigit.test(obj)||isNaN(obj)},
type:function(obj){
return obj==null?
String(obj):
class2type[toString.call(obj)]||"object"},
isPlainObject:function(obj){
if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){
return false}
if(obj.constructor&&
!hasOwn.call(obj,"constructor")&&
!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){
return false}
var key;
for(key in obj){}
return key===undefined||hasOwn.call(obj,key)},
isEmptyObject:function(obj){
for(var name in obj){
return false}
return true},
error:function(msg){
throw msg},
parseJSON:function(data){
if(typeof data!=="string"||!data){
return null}
data=jQuery.trim(data);
if(rvalidchars.test(data.replace(rvalidescape,"@")
.replace(rvalidtokens,"]")
.replace(rvalidbraces,""))){
return window.JSON&&window.JSON.parse?
window.JSON.parse(data):
(new Function("return "+data))()}else{
jQuery.error("Invalid JSON: "+data)}
},
noop:function(){},
globalEval:function(data){
if(data&&rnotwhite.test(data)){
var head=document.getElementsByTagName("head")[0]||document.documentElement,
script=document.createElement("script");
script.type="text/javascript";
if(jQuery.support.scriptEval){
script.appendChild(document.createTextNode(data))}else{
script.text=data}
head.insertBefore(script,head.firstChild);
head.removeChild(script)}
},
nodeName:function(elem,name){
return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase()},
each:function(object,callback,args){
var name,i=0,
length=object.length,
isObj=length===undefined||jQuery.isFunction(object);
if(args){
if(isObj){
for(name in object){
if(callback.apply(object[name],args)===false){
break}
}
}else{
for(;i<length;){
if(callback.apply(object[i++],args)===false){
break}
}
}
}else{
if(isObj){
for(name in object){
if(callback.call(object[name],name,object[name])===false){
break}
}
}else{
for(var value=object[0];
i<length&&callback.call(value,i,value)!==false;value=object[++i]){}
}
}
return object},
trim:trim?
function(text){
return text==null?
"":
trim.call(text)}:
function(text){
return text==null?
"":
text.toString().replace(trimLeft,"").replace(trimRight,"")},
makeArray:function(array,results){
var ret=results||[];
if(array!=null){
var type=jQuery.type(array);
if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){
push.call(ret,array)}else{
jQuery.merge(ret,array)}
}
return ret},
inArray:function(elem,array){
if(array.indexOf){
return array.indexOf(elem)}
for(var i=0,length=array.length;i<length;i++){
if(array[i]===elem){
return i}
}
return-1},
merge:function(first,second){
var i=first.length,
j=0;
if(typeof second.length==="number"){
for(var l=second.length;j<l;j++){
first[i++]=second[j]}
}else{
while(second[j]!==undefined){
first[i++]=second[j++]}
}
first.length=i;
return first},
grep:function(elems,callback,inv){
var ret=[],retVal;
inv=!!inv;
for(var i=0,length=elems.length;i<length;i++){
retVal=!!callback(elems[i],i);
if(inv!==retVal){
ret.push(elems[i])}
}
return ret},
map:function(elems,callback,arg){
var ret=[],value;
for(var i=0,length=elems.length;i<length;i++){
value=callback(elems[i],i,arg);
if(value!=null){
ret[ret.length]=value}
}
return ret.concat.apply([],ret)},
guid:1,
proxy:function(fn,proxy,thisObject){
if(arguments.length===2){
if(typeof proxy==="string"){
thisObject=fn;
fn=thisObject[proxy];
proxy=undefined}else if(proxy&&!jQuery.isFunction(proxy)){
thisObject=proxy;
proxy=undefined}
}
if(!proxy&&fn){
proxy=function(){
return fn.apply(thisObject||this,arguments)}}
if(fn){
proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++}
return proxy},
access:function(elems,key,value,exec,fn,pass){
var length=elems.length;
if(typeof key==="object"){
for(var k in key){
jQuery.access(elems,k,key[k],exec,fn,value)}
return elems}
if(value!==undefined){
exec=!pass&&exec&&jQuery.isFunction(value);
for(var i=0;i<length;i++){
fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass)}
return elems}
return length?fn(elems[0],key):undefined},
now:function(){
return(new Date()).getTime()},
uaMatch:function(ua){
ua=ua.toLowerCase();
var match=rwebkit.exec(ua)||
ropera.exec(ua)||
rmsie.exec(ua)||
ua.indexOf("compatible")<0&&rmozilla.exec(ua)||
[];
return{browser:match[1]||"",version:match[2]||"0"}},
browser:{}
});
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){
class2type["[object "+name+"]"]=name.toLowerCase()});
browserMatch=jQuery.uaMatch(userAgent);
if(browserMatch.browser){
jQuery.browser[browserMatch.browser]=true;
jQuery.browser.version=browserMatch.version}
if(jQuery.browser.webkit){
jQuery.browser.safari=true}
if(indexOf){
jQuery.inArray=function(elem,array){
return indexOf.call(array,elem)}}
if(!rwhite.test("\xA0")){
trimLeft=/^[\s\xA0]+/;
trimRight=/[\s\xA0]+$/}
rootjQuery=jQuery(document);
if(document.addEventListener){
DOMContentLoaded=function(){
document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
jQuery.ready()}}else if(document.attachEvent){
DOMContentLoaded=function(){
if(document.readyState==="complete"){
document.detachEvent("onreadystatechange",DOMContentLoaded);
jQuery.ready()}
}}
function doScrollCheck(){
if(jQuery.isReady){
return}
try{
document.documentElement.doScroll("left")}catch(e){
setTimeout(doScrollCheck,1);
return}
jQuery.ready()}
return(window.jQuery=window.$=jQuery)})();
(function(){
jQuery.support={};
var root=document.documentElement,
script=document.createElement("script"),
div=document.createElement("div"),
id="script"+jQuery.now();
div.style.display="none";
div.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var all=div.getElementsByTagName("*"),
a=div.getElementsByTagName("a")[0],
select=document.createElement("select"),
opt=select.appendChild(document.createElement("option"));
if(!all||!all.length||!a){
return}
jQuery.support={
leadingWhitespace:div.firstChild.nodeType===3,
tbody:!div.getElementsByTagName("tbody").length,
htmlSerialize:!!div.getElementsByTagName("link").length,
style:/red/.test(a.getAttribute("style")),
hrefNormalized:a.getAttribute("href")==="/a",
opacity:/^0.55$/.test(a.style.opacity),
cssFloat:!!a.style.cssFloat,
checkOn:div.getElementsByTagName("input")[0].value==="on",
optSelected:opt.selected,
deleteExpando:true,
optDisabled:false,
checkClone:false,
scriptEval:false,
noCloneEvent:true,
boxModel:null,
inlineBlockNeedsLayout:false,
shrinkWrapBlocks:false,
reliableHiddenOffsets:true
};
select.disabled=true;
jQuery.support.optDisabled=!opt.disabled;
script.type="text/javascript";
try{
script.appendChild(document.createTextNode("window."+id+"=1;"))}catch(e){}
root.insertBefore(script,root.firstChild);
if(window[id]){
jQuery.support.scriptEval=true;
delete window[id]}
try{
delete script.test}catch(e){
jQuery.support.deleteExpando=false}
root.removeChild(script);
if(div.attachEvent&&div.fireEvent){
div.attachEvent("onclick",function click(){
jQuery.support.noCloneEvent=false;
div.detachEvent("onclick",click)});
div.cloneNode(true).fireEvent("onclick")}
div=document.createElement("div");
div.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";
var fragment=document.createDocumentFragment();
fragment.appendChild(div.firstChild);
jQuery.support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;
jQuery(function(){
var div=document.createElement("div");
div.style.width=div.style.paddingLeft="1px";
document.body.appendChild(div);
jQuery.boxModel=jQuery.support.boxModel=div.offsetWidth===2;
if("zoom"in div.style){
div.style.display="inline";
div.style.zoom=1;
jQuery.support.inlineBlockNeedsLayout=div.offsetWidth===2;
div.style.display="";
div.innerHTML="<div style='width:4px;'></div>";
jQuery.support.shrinkWrapBlocks=div.offsetWidth!==2}
div.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
var tds=div.getElementsByTagName("td");
jQuery.support.reliableHiddenOffsets=tds[0].offsetHeight===0;
tds[0].style.display="";
tds[1].style.display="none";
jQuery.support.reliableHiddenOffsets=jQuery.support.reliableHiddenOffsets&&tds[0].offsetHeight===0;
div.innerHTML="";
document.body.removeChild(div).style.display="none";
div=tds=null});
var eventSupported=function(eventName){
var el=document.createElement("div");
eventName="on"+eventName;
var isSupported=(eventName in el);
if(!isSupported){
el.setAttribute(eventName,"return;");
isSupported=typeof el[eventName]==="function"}
el=null;
return isSupported};
jQuery.support.submitBubbles=eventSupported("submit");
jQuery.support.changeBubbles=eventSupported("change");
root=script=div=all=a=null})();
var windowData={},
rbrace=/^(?:\{.*\}|\[.*\])$/;
jQuery.extend({
cache:{},
uuid:0,
expando:"jQuery"+jQuery.now(),
noData:{
"embed":true,
"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
"applet":true
},
data:function(elem,name,data){
if(!jQuery.acceptData(elem)){
return}
elem=elem==window?
windowData:
elem;
var isNode=elem.nodeType,
id=isNode?elem[jQuery.expando]:null,
cache=jQuery.cache,thisCache;
if(isNode&&!id&&typeof name==="string"&&data===undefined){
return}
if(!isNode){
cache=elem}else if(!id){
elem[jQuery.expando]=id=++jQuery.uuid}
if(typeof name==="object"){
if(isNode){
cache[id]=jQuery.extend(cache[id],name)}else{
jQuery.extend(cache,name)}
}else if(isNode&&!cache[id]){
cache[id]={}}
thisCache=isNode?cache[id]:cache;
if(data!==undefined){
thisCache[name]=data}
return typeof name==="string"?thisCache[name]:thisCache},
removeData:function(elem,name){
if(!jQuery.acceptData(elem)){
return}
elem=elem==window?
windowData:
elem;
var isNode=elem.nodeType,
id=isNode?elem[jQuery.expando]:elem,
cache=jQuery.cache,
thisCache=isNode?cache[id]:id;
if(name){
if(thisCache){
delete thisCache[name];
if(isNode&&jQuery.isEmptyObject(thisCache)){
jQuery.removeData(elem)}
}
}else{
if(isNode&&jQuery.support.deleteExpando){
delete elem[jQuery.expando]}else if(elem.removeAttribute){
elem.removeAttribute(jQuery.expando)}else if(isNode){
delete cache[id]}else{
for(var n in elem){
delete elem[n]}
}
}
},
acceptData:function(elem){
if(elem.nodeName){
var match=jQuery.noData[elem.nodeName.toLowerCase()];
if(match){
return!(match===true||elem.getAttribute("classid")!==match)}
}
return true}
});
jQuery.fn.extend({
data:function(key,value){
var data=null;
if(typeof key==="undefined"){
if(this.length){
var attr=this[0].attributes,name;
data=jQuery.data(this[0]);
for(var i=0,l=attr.length;i<l;i++){
name=attr[i].name;
if(name.indexOf("data-")===0){
name=name.substr(5);
dataAttr(this[0],name,data[name])}
}
}
return data}else if(typeof key==="object"){
return this.each(function(){
jQuery.data(this,key)})}
var parts=key.split(".");
parts[1]=parts[1]?"."+parts[1]:"";
if(value===undefined){
data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);
if(data===undefined&&this.length){
data=jQuery.data(this[0],key);
data=dataAttr(this[0],key,data)}
return data===undefined&&parts[1]?
this.data(parts[0]):
data}else{
return this.each(function(){
var $this=jQuery(this),
args=[parts[0],value];
$this.triggerHandler("setData"+parts[1]+"!",args);
jQuery.data(this,key,value);
$this.triggerHandler("changeData"+parts[1]+"!",args)})}
},
removeData:function(key){
return this.each(function(){
jQuery.removeData(this,key)})}
});
function dataAttr(elem,key,data){
if(data===undefined&&elem.nodeType===1){
data=elem.getAttribute("data-"+key);
if(typeof data==="string"){
try{
data=data==="true"?true:
data==="false"?false:
data==="null"?null:
!jQuery.isNaN(data)?parseFloat(data):
rbrace.test(data)?jQuery.parseJSON(data):
data}catch(e){}
jQuery.data(elem,key,data)}else{
data=undefined}
}
return data}
jQuery.extend({
queue:function(elem,type,data){
if(!elem){
return}
type=(type||"fx")+"queue";
var q=jQuery.data(elem,type);
if(!data){
return q||[]}
if(!q||jQuery.isArray(data)){
q=jQuery.data(elem,type,jQuery.makeArray(data))}else{
q.push(data)}
return q},
dequeue:function(elem,type){
type=type||"fx";
var queue=jQuery.queue(elem,type),
fn=queue.shift();
if(fn==="inprogress"){
fn=queue.shift()}
if(fn){
if(type==="fx"){
queue.unshift("inprogress")}
fn.call(elem,function(){
jQuery.dequeue(elem,type)})}
}
});
jQuery.fn.extend({
queue:function(type,data){
if(typeof type!=="string"){
data=type;
type="fx"}
if(data===undefined){
return jQuery.queue(this[0],type)}
return this.each(function(i){
var queue=jQuery.queue(this,type,data);
if(type==="fx"&&queue[0]!=="inprogress"){
jQuery.dequeue(this,type)}
})},
dequeue:function(type){
return this.each(function(){
jQuery.dequeue(this,type)})},
delay:function(time,type){
time=jQuery.fx?jQuery.fx.speeds[time]||time:time;
type=type||"fx";
return this.queue(type,function(){
var elem=this;
setTimeout(function(){
jQuery.dequeue(elem,type)},time)})},
clearQueue:function(type){
return this.queue(type||"fx",[])}
});
var rclass=/[\n\t]/g,
rspaces=/\s+/,
rreturn=/\r/g,
rspecialurl=/^(?:href|src|style)$/,
rtype=/^(?:button|input)$/i,
rfocusable=/^(?:button|input|object|select|textarea)$/i,
rclickable=/^a(?:rea)?$/i,
rradiocheck=/^(?:radio|checkbox)$/i;
jQuery.props={
"for":"htmlFor",
"class":"className",
readonly:"readOnly",
maxlength:"maxLength",
cellspacing:"cellSpacing",
rowspan:"rowSpan",
colspan:"colSpan",
tabindex:"tabIndex",
usemap:"useMap",
frameborder:"frameBorder"
};
jQuery.fn.extend({
attr:function(name,value){
return jQuery.access(this,name,value,true,jQuery.attr)},
removeAttr:function(name,fn){
return this.each(function(){
jQuery.attr(this,name,"");
if(this.nodeType===1){
this.removeAttribute(name)}
})},
addClass:function(value){
if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this);
self.addClass(value.call(this,i,self.attr("class")))})}
if(value&&typeof value==="string"){
var classNames=(value||"").split(rspaces);
for(var i=0,l=this.length;i<l;i++){
var elem=this[i];
if(elem.nodeType===1){
if(!elem.className){
elem.className=value}else{
var className=" "+elem.className+" ",
setClass=elem.className;
for(var c=0,cl=classNames.length;c<cl;c++){
if(className.indexOf(" "+classNames[c]+" ")<0){
setClass+=" "+classNames[c]}
}
elem.className=jQuery.trim(setClass)}
}
}
}
return this},
removeClass:function(value){
if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this);
self.removeClass(value.call(this,i,self.attr("class")))})}
if((value&&typeof value==="string")||value===undefined){
var classNames=(value||"").split(rspaces);
for(var i=0,l=this.length;i<l;i++){
var elem=this[i];
if(elem.nodeType===1&&elem.className){
if(value){
var className=(" "+elem.className+" ").replace(rclass," ");
for(var c=0,cl=classNames.length;c<cl;c++){
className=className.replace(" "+classNames[c]+" "," ")}
elem.className=jQuery.trim(className)}else{
elem.className=""}
}
}
}
return this},
toggleClass:function(value,stateVal){
var type=typeof value,
isBool=typeof stateVal==="boolean";
if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this);
self.toggleClass(value.call(this,i,self.attr("class"),stateVal),stateVal)})}
return this.each(function(){
if(type==="string"){
var className,
i=0,
self=jQuery(this),
state=stateVal,
classNames=value.split(rspaces);
while((className=classNames[i++])){
state=isBool?state:!self.hasClass(className);
self[state?"addClass":"removeClass"](className)}
}else if(type==="undefined"||type==="boolean"){
if(this.className){
jQuery.data(this,"__className__",this.className)}
this.className=this.className||value===false?"":jQuery.data(this,"__className__")||""}
})},
hasClass:function(selector){
var className=" "+selector+" ";
for(var i=0,l=this.length;i<l;i++){
if((" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){
return true}
}
return false},
val:function(value){
if(!arguments.length){
var elem=this[0];
if(elem){
if(jQuery.nodeName(elem,"option")){
var val=elem.attributes.value;
return!val||val.specified?elem.value:elem.text}
if(jQuery.nodeName(elem,"select")){
var index=elem.selectedIndex,
values=[],
options=elem.options,
one=elem.type==="select-one";
if(index<0){
return null}
for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){
var option=options[i];
if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&
(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){
value=jQuery(option).val();
if(one){
return value}
values.push(value)}
}
return values}
if(rradiocheck.test(elem.type)&&!jQuery.support.checkOn){
return elem.getAttribute("value")===null?"on":elem.value}
return(elem.value||"").replace(rreturn,"")}
return undefined}
var isFunction=jQuery.isFunction(value);
return this.each(function(i){
var self=jQuery(this),val=value;
if(this.nodeType!==1){
return}
if(isFunction){
val=value.call(this,i,self.val())}
if(val==null){
val=""}else if(typeof val==="number"){
val+=""}else if(jQuery.isArray(val)){
val=jQuery.map(val,function(value){
return value==null?"":value+""})}
if(jQuery.isArray(val)&&rradiocheck.test(this.type)){
this.checked=jQuery.inArray(self.val(),val)>=0}else if(jQuery.nodeName(this,"select")){
var values=jQuery.makeArray(val);
jQuery("option",this).each(function(){
this.selected=jQuery.inArray(jQuery(this).val(),values)>=0});
if(!values.length){
this.selectedIndex=-1}
}else{
this.value=val}
})}
});
jQuery.extend({
attrFn:{
val:true,
css:true,
html:true,
text:true,
data:true,
width:true,
height:true,
offset:true
},
attr:function(elem,name,value,pass){
if(!elem||elem.nodeType===3||elem.nodeType===8){
return undefined}
if(pass&&name in jQuery.attrFn){
return jQuery(elem)[name](value)}
var notxml=elem.nodeType!==1||!jQuery.isXMLDoc(elem),
set=value!==undefined;
name=notxml&&jQuery.props[name]||name;
var special=rspecialurl.test(name);
if(name==="selected"&&!jQuery.support.optSelected){
var parent=elem.parentNode;
if(parent){
parent.selectedIndex;
if(parent.parentNode){
parent.parentNode.selectedIndex}
}
}
if((name in elem||elem[name]!==undefined)&&notxml&&!special){
if(set){
if(name==="type"&&rtype.test(elem.nodeName)&&elem.parentNode){
jQuery.error("type property can't be changed")}
if(value===null){
if(elem.nodeType===1){
elem.removeAttribute(name)}
}else{
elem[name]=value}
}
if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){
return elem.getAttributeNode(name).nodeValue}
if(name==="tabIndex"){
var attributeNode=elem.getAttributeNode("tabIndex");
return attributeNode&&attributeNode.specified?
attributeNode.value:
rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?
0:
undefined}
return elem[name]}
if(!jQuery.support.style&&notxml&&name==="style"){
if(set){
elem.style.cssText=""+value}
return elem.style.cssText}
if(set){
elem.setAttribute(name,""+value)}
if(!elem.attributes[name]&&(elem.hasAttribute&&!elem.hasAttribute(name))){
return undefined}
var attr=!jQuery.support.hrefNormalized&&notxml&&special?
elem.getAttribute(name,2):
elem.getAttribute(name);
return attr===null?undefined:attr}
});
var rnamespaces=/\.(.*)$/,
rformElems=/^(?:textarea|input|select)$/i,
rperiod=/\./g,
rspace=/ /g,
rescape=/[^\w\s.|`]/g,
fcleanup=function(nm){
return nm.replace(rescape,"\\$&")},
focusCounts={focusin:0,focusout:0};
jQuery.event={
add:function(elem,types,handler,data){
if(elem.nodeType===3||elem.nodeType===8){
return}
if(jQuery.isWindow(elem)&&(elem!==window&&!elem.frameElement)){
elem=window}
if(handler===false){
handler=returnFalse}else if(!handler){
return}
var handleObjIn,handleObj;
if(handler.handler){
handleObjIn=handler;
handler=handleObjIn.handler}
if(!handler.guid){
handler.guid=jQuery.guid++}
var elemData=jQuery.data(elem);
if(!elemData){
return}
var eventKey=elem.nodeType?"events":"__events__",
events=elemData[eventKey],
eventHandle=elemData.handle;
if(typeof events==="function"){
eventHandle=events.handle;
events=events.events}else if(!events){
if(!elem.nodeType){
elemData[eventKey]=elemData=function(){}}
elemData.events=events={}}
if(!eventHandle){
elemData.handle=eventHandle=function(){
return typeof jQuery!=="undefined"&&!jQuery.event.triggered?
jQuery.event.handle.apply(eventHandle.elem,arguments):
undefined}}
eventHandle.elem=elem;
types=types.split(" ");
var type,i=0,namespaces;
while((type=types[i++])){
handleObj=handleObjIn?
jQuery.extend({},handleObjIn):
{handler:handler,data:data};
if(type.indexOf(".")>-1){
namespaces=type.split(".");
type=namespaces.shift();
handleObj.namespace=namespaces.slice(0).sort().join(".")}else{
namespaces=[];
handleObj.namespace=""}
handleObj.type=type;
if(!handleObj.guid){
handleObj.guid=handler.guid}
var handlers=events[type],
special=jQuery.event.special[type]||{};
if(!handlers){
handlers=events[type]=[];
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){
if(elem.addEventListener){
elem.addEventListener(type,eventHandle,false)}else if(elem.attachEvent){
elem.attachEvent("on"+type,eventHandle)}
}
}
if(special.add){
special.add.call(elem,handleObj);
if(!handleObj.handler.guid){
handleObj.handler.guid=handler.guid}
}
handlers.push(handleObj);
jQuery.event.global[type]=true}
elem=null},
global:{},
remove:function(elem,types,handler,pos){
if(elem.nodeType===3||elem.nodeType===8){
return}
if(handler===false){
handler=returnFalse}
var ret,type,fn,j,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,
eventKey=elem.nodeType?"events":"__events__",
elemData=jQuery.data(elem),
events=elemData&&elemData[eventKey];
if(!elemData||!events){
return}
if(typeof events==="function"){
elemData=events;
events=events.events}
if(types&&types.type){
handler=types.handler;
types=types.type}
if(!types||typeof types==="string"&&types.charAt(0)==="."){
types=types||"";
for(type in events){
jQuery.event.remove(elem,type+types)}
return}
types=types.split(" ");
while((type=types[i++])){
origType=type;
handleObj=null;
all=type.indexOf(".")<0;
namespaces=[];
if(!all){
namespaces=type.split(".");
type=namespaces.shift();
namespace=new RegExp("(^|\\.)"+
jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)")}
eventType=events[type];
if(!eventType){
continue}
if(!handler){
for(j=0;j<eventType.length;j++){
handleObj=eventType[j];
if(all||namespace.test(handleObj.namespace)){
jQuery.event.remove(elem,origType,handleObj.handler,j);
eventType.splice(j--,1)}
}
continue}
special=jQuery.event.special[type]||{};
for(j=pos||0;j<eventType.length;j++){
handleObj=eventType[j];
if(handler.guid===handleObj.guid){
if(all||namespace.test(handleObj.namespace)){
if(pos==null){
eventType.splice(j--,1)}
if(special.remove){
special.remove.call(elem,handleObj)}
}
if(pos!=null){
break}
}
}
if(eventType.length===0||pos!=null&&eventType.length===1){
if(!special.teardown||special.teardown.call(elem,namespaces)===false){
jQuery.removeEvent(elem,type,elemData.handle)}
ret=null;
delete events[type]}
}
if(jQuery.isEmptyObject(events)){
var handle=elemData.handle;
if(handle){
handle.elem=null}
delete elemData.events;
delete elemData.handle;
if(typeof elemData==="function"){
jQuery.removeData(elem,eventKey)}else if(jQuery.isEmptyObject(elemData)){
jQuery.removeData(elem)}
}
},
trigger:function(event,data,elem){
var type=event.type||event,
bubbling=arguments[3];
if(!bubbling){
event=typeof event==="object"?
event[jQuery.expando]?event:
jQuery.extend(jQuery.Event(type),event):
jQuery.Event(type);
if(type.indexOf("!")>=0){
event.type=type=type.slice(0,-1);
event.exclusive=true}
if(!elem){
event.stopPropagation();
if(jQuery.event.global[type]){
jQuery.each(jQuery.cache,function(){
if(this.events&&this.events[type]){
jQuery.event.trigger(event,data,this.handle.elem)}
})}
}
if(!elem||elem.nodeType===3||elem.nodeType===8){
return undefined}
event.result=undefined;
event.target=elem;
data=jQuery.makeArray(data);
data.unshift(event)}
event.currentTarget=elem;
var handle=elem.nodeType?
jQuery.data(elem,"handle"):
(jQuery.data(elem,"__events__")||{}).handle;
if(handle){
handle.apply(elem,data)}
var parent=elem.parentNode||elem.ownerDocument;
try{
if(!(elem&&elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()])){
if(elem["on"+type]&&elem["on"+type].apply(elem,data)===false){
event.result=false;
event.preventDefault()}
}
}catch(inlineError){}
if(!event.isPropagationStopped()&&parent){
jQuery.event.trigger(event,data,parent,true)}else if(!event.isDefaultPrevented()){
var old,
target=event.target,
targetType=type.replace(rnamespaces,""),
isClick=jQuery.nodeName(target,"a")&&targetType==="click",
special=jQuery.event.special[targetType]||{};
if((!special._default||special._default.call(elem,event)===false)&&
!isClick&&!(target&&target.nodeName&&jQuery.noData[target.nodeName.toLowerCase()])){
try{
if(target[targetType]){
old=target["on"+targetType];
if(old){
target["on"+targetType]=null}
jQuery.event.triggered=true;
target[targetType]()}
}catch(triggerError){}
if(old){
target["on"+targetType]=old}
jQuery.event.triggered=false}
}
},
handle:function(event){
var all,handlers,namespaces,namespace_re,events,
namespace_sort=[],
args=jQuery.makeArray(arguments);
event=args[0]=jQuery.event.fix(event||window.event);
event.currentTarget=this;
all=event.type.indexOf(".")<0&&!event.exclusive;
if(!all){
namespaces=event.type.split(".");
event.type=namespaces.shift();
namespace_sort=namespaces.slice(0).sort();
namespace_re=new RegExp("(^|\\.)"+namespace_sort.join("\\.(?:.*\\.)?")+"(\\.|$)")}
event.namespace=event.namespace||namespace_sort.join(".");
events=jQuery.data(this,this.nodeType?"events":"__events__");
if(typeof events==="function"){
events=events.events}
handlers=(events||{})[event.type];
if(events&&handlers){
handlers=handlers.slice(0);
for(var j=0,l=handlers.length;j<l;j++){
var handleObj=handlers[j];
if(all||namespace_re.test(handleObj.namespace)){
event.handler=handleObj.handler;
event.data=handleObj.data;
event.handleObj=handleObj;
var ret=handleObj.handler.apply(this,args);
if(ret!==undefined){
event.result=ret;
if(ret===false){
event.preventDefault();
event.stopPropagation()}
}
if(event.isImmediatePropagationStopped()){
break}
}
}
}
return event.result},
props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(event){
if(event[jQuery.expando]){
return event}
var originalEvent=event;
event=jQuery.Event(originalEvent);
for(var i=this.props.length,prop;i;){
prop=this.props[--i];
event[prop]=originalEvent[prop]}
if(!event.target){
event.target=event.srcElement||document}
if(event.target.nodeType===3){
event.target=event.target.parentNode}
if(!event.relatedTarget&&event.fromElement){
event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement}
if(event.pageX==null&&event.clientX!=null){
var doc=document.documentElement,
body=document.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}
if(event.which==null&&(event.charCode!=null||event.keyCode!=null)){
event.which=event.charCode!=null?event.charCode:event.keyCode}
if(!event.metaKey&&event.ctrlKey){
event.metaKey=event.ctrlKey}
if(!event.which&&event.button!==undefined){
event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))}
return event},
guid:1E8,
proxy:jQuery.proxy,
special:{
ready:{
setup:jQuery.bindReady,
teardown:jQuery.noop
},
live:{
add:function(handleObj){
jQuery.event.add(this,
liveConvert(handleObj.origType,handleObj.selector),
jQuery.extend({},handleObj,{handler:liveHandler,guid:handleObj.handler.guid}))},
remove:function(handleObj){
jQuery.event.remove(this,liveConvert(handleObj.origType,handleObj.selector),handleObj)}
},
beforeunload:{
setup:function(data,namespaces,eventHandle){
if(jQuery.isWindow(this)){
this.onbeforeunload=eventHandle}
},
teardown:function(namespaces,eventHandle){
if(this.onbeforeunload===eventHandle){
this.onbeforeunload=null}
}
}
}
};
jQuery.removeEvent=document.removeEventListener?
function(elem,type,handle){
if(elem.removeEventListener){
elem.removeEventListener(type,handle,false)}
}:
function(elem,type,handle){
if(elem.detachEvent){
elem.detachEvent("on"+type,handle)}
};
jQuery.Event=function(src){
if(!this.preventDefault){
return new jQuery.Event(src)}
if(src&&src.type){
this.originalEvent=src;
this.type=src.type}else{
this.type=src}
this.timeStamp=jQuery.now();
this[jQuery.expando]=true};
function returnFalse(){
return false}
function returnTrue(){
return true}
jQuery.Event.prototype={
preventDefault:function(){
this.isDefaultPrevented=returnTrue;
var e=this.originalEvent;
if(!e){
return}
if(e.preventDefault){
e.preventDefault()}else{
e.returnValue=false}
},
stopPropagation:function(){
this.isPropagationStopped=returnTrue;
var e=this.originalEvent;
if(!e){
return}
if(e.stopPropagation){
e.stopPropagation()}
e.cancelBubble=true},
stopImmediatePropagation:function(){
this.isImmediatePropagationStopped=returnTrue;
this.stopPropagation()},
isDefaultPrevented:returnFalse,
isPropagationStopped:returnFalse,
isImmediatePropagationStopped:returnFalse
};
var withinElement=function(event){
var parent=event.relatedTarget;
try{
while(parent&&parent!==this){
parent=parent.parentNode}
if(parent!==this){
event.type=event.data;
jQuery.event.handle.apply(this,arguments)}
}catch(e){}
},
delegate=function(event){
event.type=event.data;
jQuery.event.handle.apply(this,arguments)};
jQuery.each({
mouseenter:"mouseover",
mouseleave:"mouseout"
},function(orig,fix){
jQuery.event.special[orig]={
setup:function(data){
jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig)},
teardown:function(data){
jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement)}
}});
if(!jQuery.support.submitBubbles){
jQuery.event.special.submit={
setup:function(data,namespaces){
if(this.nodeName.toLowerCase()!=="form"){
jQuery.event.add(this,"click.specialSubmit",function(e){
var elem=e.target,
type=elem.type;
if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){
e.liveFired=undefined;
return trigger("submit",this,arguments)}
});
jQuery.event.add(this,"keypress.specialSubmit",function(e){
var elem=e.target,
type=elem.type;
if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){
e.liveFired=undefined;
return trigger("submit",this,arguments)}
})}else{
return false}
},
teardown:function(namespaces){
jQuery.event.remove(this,".specialSubmit")}
}}
if(!jQuery.support.changeBubbles){
var changeFilters,
getVal=function(elem){
var type=elem.type,val=elem.value;
if(type==="radio"||type==="checkbox"){
val=elem.checked}else if(type==="select-multiple"){
val=elem.selectedIndex>-1?
jQuery.map(elem.options,function(elem){
return elem.selected}).join("-"):
""}else if(elem.nodeName.toLowerCase()==="select"){
val=elem.selectedIndex}
return val},
testChange=function testChange(e){
var elem=e.target,data,val;
if(!rformElems.test(elem.nodeName)||elem.readOnly){
return}
data=jQuery.data(elem,"_change_data");
val=getVal(elem);
if(e.type!=="focusout"||elem.type!=="radio"){
jQuery.data(elem,"_change_data",val)}
if(data===undefined||val===data){
return}
if(data!=null||val){
e.type="change";
e.liveFired=undefined;
return jQuery.event.trigger(e,arguments[1],elem)}
};
jQuery.event.special.change={
filters:{
focusout:testChange,
beforedeactivate:testChange,
click:function(e){
var elem=e.target,type=elem.type;
if(type==="radio"||type==="checkbox"||elem.nodeName.toLowerCase()==="select"){
return testChange.call(this,e)}
},
keydown:function(e){
var elem=e.target,type=elem.type;
if((e.keyCode===13&&elem.nodeName.toLowerCase()!=="textarea")||
(e.keyCode===32&&(type==="checkbox"||type==="radio"))||
type==="select-multiple"){
return testChange.call(this,e)}
},
beforeactivate:function(e){
var elem=e.target;
jQuery.data(elem,"_change_data",getVal(elem))}
},
setup:function(data,namespaces){
if(this.type==="file"){
return false}
for(var type in changeFilters){
jQuery.event.add(this,type+".specialChange",changeFilters[type])}
return rformElems.test(this.nodeName)},
teardown:function(namespaces){
jQuery.event.remove(this,".specialChange");
return rformElems.test(this.nodeName)}
};
changeFilters=jQuery.event.special.change.filters;
changeFilters.focus=changeFilters.beforeactivate}
function trigger(type,elem,args){
args[0].type=type;
return jQuery.event.handle.apply(elem,args)}
if(document.addEventListener){
jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){
jQuery.event.special[fix]={
setup:function(){
if(focusCounts[fix]++===0){
document.addEventListener(orig,handler,true)}
},
teardown:function(){
if(--focusCounts[fix]===0){
document.removeEventListener(orig,handler,true)}
}
};
function handler(e){
e=jQuery.event.fix(e);
e.type=fix;
return jQuery.event.trigger(e,null,e.target)}
})}
jQuery.each(["bind","one"],function(i,name){
jQuery.fn[name]=function(type,data,fn){
if(typeof type==="object"){
for(var key in type){
this[name](key,data,type[key],fn)}
return this}
if(jQuery.isFunction(data)||data===false){
fn=data;
data=undefined}
var handler=name==="one"?jQuery.proxy(fn,function(event){
jQuery(this).unbind(event,handler);
return fn.apply(this,arguments)}):fn;
if(type==="unload"&&name!=="one"){
this.one(type,data,fn)}else{
for(var i=0,l=this.length;i<l;i++){
jQuery.event.add(this[i],type,handler,data)}
}
return this}});
jQuery.fn.extend({
unbind:function(type,fn){
if(typeof type==="object"&&!type.preventDefault){
for(var key in type){
this.unbind(key,type[key])}
}else{
for(var i=0,l=this.length;i<l;i++){
jQuery.event.remove(this[i],type,fn)}
}
return this},
delegate:function(selector,types,data,fn){
return this.live(types,data,fn,selector)},
undelegate:function(selector,types,fn){
if(arguments.length===0){
return this.unbind("live")}else{
return this.die(types,null,fn,selector)}
},
trigger:function(type,data){
return this.each(function(){
jQuery.event.trigger(type,data,this)})},
triggerHandler:function(type,data){
if(this[0]){
var event=jQuery.Event(type);
event.preventDefault();
event.stopPropagation();
jQuery.event.trigger(event,data,this[0]);
return event.result}
},
toggle:function(fn){
var args=arguments,
i=1;
while(i<args.length){
jQuery.proxy(fn,args[i++])}
return this.click(jQuery.proxy(fn,function(event){
var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;
jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);
event.preventDefault();
return args[lastToggle].apply(this,arguments)||false}))},
hover:function(fnOver,fnOut){
return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)}
});
var liveMap={
focus:"focusin",
blur:"focusout",
mouseenter:"mouseover",
mouseleave:"mouseout"
};
jQuery.each(["live","die"],function(i,name){
jQuery.fn[name]=function(types,data,fn,origSelector){
var type,i=0,match,namespaces,preType,
selector=origSelector||this.selector,
context=origSelector?this:jQuery(this.context);
if(typeof types==="object"&&!types.preventDefault){
for(var key in types){
context[name](key,data,types[key],selector)}
return this}
if(jQuery.isFunction(data)){
fn=data;
data=undefined}
types=(types||"").split(" ");
while((type=types[i++])!=null){
match=rnamespaces.exec(type);
namespaces="";
if(match){
namespaces=match[0];
type=type.replace(rnamespaces,"")}
if(type==="hover"){
types.push("mouseenter"+namespaces,"mouseleave"+namespaces);
continue}
preType=type;
if(type==="focus"||type==="blur"){
types.push(liveMap[type]+namespaces);
type=type+namespaces}else{
type=(liveMap[type]||type)+namespaces}
if(name==="live"){
for(var j=0,l=context.length;j<l;j++){
jQuery.event.add(context[j],"live."+liveConvert(type,selector),
{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType})}
}else{
context.unbind("live."+liveConvert(type,selector),fn)}
}
return this}});
function liveHandler(event){
var stop,maxLevel,related,match,handleObj,elem,j,i,l,data,close,namespace,ret,
elems=[],
selectors=[],
events=jQuery.data(this,this.nodeType?"events":"__events__");
if(typeof events==="function"){
events=events.events}
if(event.liveFired===this||!events||!events.live||event.button&&event.type==="click"){
return}
if(event.namespace){
namespace=new RegExp("(^|\\.)"+event.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")}
event.liveFired=this;
var live=events.live.slice(0);
for(j=0;j<live.length;j++){
handleObj=live[j];
if(handleObj.origType.replace(rnamespaces,"")===event.type){
selectors.push(handleObj.selector)}else{
live.splice(j--,1)}
}
match=jQuery(event.target).closest(selectors,event.currentTarget);
for(i=0,l=match.length;i<l;i++){
close=match[i];
for(j=0;j<live.length;j++){
handleObj=live[j];
if(close.selector===handleObj.selector&&(!namespace||namespace.test(handleObj.namespace))){
elem=close.elem;
related=null;
if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){
event.type=handleObj.preType;
related=jQuery(event.relatedTarget).closest(handleObj.selector)[0]}
if(!related||related!==elem){
elems.push({elem:elem,handleObj:handleObj,level:close.level})}
}
}
}
for(i=0,l=elems.length;i<l;i++){
match=elems[i];
if(maxLevel&&match.level>maxLevel){
break}
event.currentTarget=match.elem;
event.data=match.handleObj.data;
event.handleObj=match.handleObj;
ret=match.handleObj.origHandler.apply(match.elem,arguments);
if(ret===false||event.isPropagationStopped()){
maxLevel=match.level;
if(ret===false){
stop=false}
if(event.isImmediatePropagationStopped()){
break}
}
}
return stop}
function liveConvert(type,selector){
return(type&&type!=="*"?type+".":"")+selector.replace(rperiod,"`").replace(rspace,"&")}
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+
"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+
"change select submit keydown keypress keyup error").split(" "),function(i,name){
jQuery.fn[name]=function(data,fn){
if(fn==null){
fn=data;
data=null}
return arguments.length>0?
this.bind(name,data,fn):
this.trigger(name)};
if(jQuery.attrFn){
jQuery.attrFn[name]=true}
});
if(window.attachEvent&&!window.addEventListener){
jQuery(window).bind("unload",function(){
for(var id in jQuery.cache){
if(jQuery.cache[id].handle){
try{
jQuery.event.remove(jQuery.cache[id].handle.elem)}catch(e){}
}
}
})}
(function(){
var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
done=0,
toString=Object.prototype.toString,
hasDuplicate=false,
baseHasDuplicate=true;
[0,0].sort(function(){
baseHasDuplicate=false;
return 0});
var Sizzle=function(selector,context,results,seed){
results=results||[];
context=context||document;
var origContext=context;
if(context.nodeType!==1&&context.nodeType!==9){
return[]}
if(!selector||typeof selector!=="string"){
return results}
var m,set,checkSet,extra,ret,cur,pop,i,
prune=true,
contextXML=Sizzle.isXML(context),
parts=[],
soFar=selector;
do{
chunker.exec("");
m=chunker.exec(soFar);
if(m){
soFar=m[3];
parts.push(m[1]);
if(m[2]){
extra=m[3];
break}
}
}while(m);
if(parts.length>1&&origPOS.exec(selector)){
if(parts.length===2&&Expr.relative[parts[0]]){
set=posProcess(parts[0]+parts[1],context)}else{
set=Expr.relative[parts[0]]?
[context]:
Sizzle(parts.shift(),context);
while(parts.length){
selector=parts.shift();
if(Expr.relative[selector]){
selector+=parts.shift()}
set=posProcess(selector,set)}
}
}else{
if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&
Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){
ret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?
Sizzle.filter(ret.expr,ret.set)[0]:
ret.set[0]}
if(context){
ret=seed?
{expr:parts.pop(),set:makeArray(seed)}:
Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);
set=ret.expr?
Sizzle.filter(ret.expr,ret.set):
ret.set;
if(parts.length>0){
checkSet=makeArray(set)}else{
prune=false}
while(parts.length){
cur=parts.pop();
pop=cur;
if(!Expr.relative[cur]){
cur=""}else{
pop=parts.pop()}
if(pop==null){
pop=context}
Expr.relative[cur](checkSet,pop,contextXML)}
}else{
checkSet=parts=[]}
}
if(!checkSet){
checkSet=set}
if(!checkSet){
Sizzle.error(cur||selector)}
if(toString.call(checkSet)==="[object Array]"){
if(!prune){
results.push.apply(results,checkSet)}else if(context&&context.nodeType===1){
for(i=0;checkSet[i]!=null;i++){
if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){
results.push(set[i])}
}
}else{
for(i=0;checkSet[i]!=null;i++){
if(checkSet[i]&&checkSet[i].nodeType===1){
results.push(set[i])}
}
}
}else{
makeArray(checkSet,results)}
if(extra){
Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results)}
return results};
Sizzle.uniqueSort=function(results){
if(sortOrder){
hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);
if(hasDuplicate){
for(var i=1;i<results.length;i++){
if(results[i]===results[i-1]){
results.splice(i--,1)}
}
}
}
return results};
Sizzle.matches=function(expr,set){
return Sizzle(expr,null,null,set)};
Sizzle.matchesSelector=function(node,expr){
return Sizzle(expr,null,null,[node]).length>0};
Sizzle.find=function(expr,context,isXML){
var set;
if(!expr){
return[]}
for(var i=0,l=Expr.order.length;i<l;i++){
var match,
type=Expr.order[i];
if((match=Expr.leftMatch[type].exec(expr))){
var left=match[1];
match.splice(1,1);
if(left.substr(left.length-1)!=="\\"){
match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);
if(set!=null){
expr=expr.replace(Expr.match[type],"");
break}
}
}
}
if(!set){
set=context.getElementsByTagName("*")}
return{set:set,expr:expr}};
Sizzle.filter=function(expr,set,inplace,not){
var match,anyFound,
old=expr,
result=[],
curLoop=set,
isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);
while(expr&&set.length){
for(var type in Expr.filter){
if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){
var found,item,
filter=Expr.filter[type],
left=match[1];
anyFound=false;
match.splice(1,1);
if(left.substr(left.length-1)==="\\"){
continue}
if(curLoop===result){
result=[]}
if(Expr.preFilter[type]){
match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);
if(!match){
anyFound=found=true}else if(match===true){
continue}
}
if(match){
for(var i=0;(item=curLoop[i])!=null;i++){
if(item){
found=filter(item,match,i,curLoop);
var pass=not^!!found;
if(inplace&&found!=null){
if(pass){
anyFound=true}else{
curLoop[i]=false}
}else if(pass){
result.push(item);
anyFound=true}
}
}
}
if(found!==undefined){
if(!inplace){
curLoop=result}
expr=expr.replace(Expr.match[type],"");
if(!anyFound){
return[]}
break}
}
}
if(expr===old){
if(anyFound==null){
Sizzle.error(expr)}else{
break}
}
old=expr}
return curLoop};
Sizzle.error=function(msg){
throw"Syntax error, unrecognized expression: "+msg};
var Expr=Sizzle.selectors={
order:["ID","NAME","TAG"],
match:{
ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
},
leftMatch:{},
attrMap:{
"class":"className",
"for":"htmlFor"
},
attrHandle:{
href:function(elem){
return elem.getAttribute("href")}
},
relative:{
"+":function(checkSet,part){
var isPartStr=typeof part==="string",
isTag=isPartStr&&!/\W/.test(part),
isPartStrNotTag=isPartStr&&!isTag;
if(isTag){
part=part.toLowerCase()}
for(var i=0,l=checkSet.length,elem;i<l;i++){
if((elem=checkSet[i])){
while((elem=elem.previousSibling)&&elem.nodeType!==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?
elem||false:
elem===part}
}
if(isPartStrNotTag){
Sizzle.filter(part,checkSet,true)}
},
">":function(checkSet,part){
var elem,
isPartStr=typeof part==="string",
i=0,
l=checkSet.length;
if(isPartStr&&!/\W/.test(part)){
part=part.toLowerCase();
for(;i<l;i++){
elem=checkSet[i];
if(elem){
var parent=elem.parentNode;
checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false}
}
}else{
for(;i<l;i++){
elem=checkSet[i];
if(elem){
checkSet[i]=isPartStr?
elem.parentNode:
elem.parentNode===part}
}
if(isPartStr){
Sizzle.filter(part,checkSet,true)}
}
},
"":function(checkSet,part,isXML){
var nodeCheck,
doneName=done++,
checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){
part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck}
checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)},
"~":function(checkSet,part,isXML){
var nodeCheck,
doneName=done++,
checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){
part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck}
checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)}
},
find:{
ID:function(match,context,isXML){
if(typeof context.getElementById!=="undefined"&&!isXML){
var m=context.getElementById(match[1]);
return m&&m.parentNode?[m]:[]}
},
NAME:function(match,context){
if(typeof context.getElementsByName!=="undefined"){
var ret=[],
results=context.getElementsByName(match[1]);
for(var i=0,l=results.length;i<l;i++){
if(results[i].getAttribute("name")===match[1]){
ret.push(results[i])}
}
return ret.length===0?null:ret}
},
TAG:function(match,context){
return context.getElementsByTagName(match[1])}
},
preFilter:{
CLASS:function(match,curLoop,inplace,result,not,isXML){
match=" "+match[1].replace(/\\/g,"")+" ";
if(isXML){
return match}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){
if(elem){
if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(match)>=0)){
if(!inplace){
result.push(elem)}
}else if(inplace){
curLoop[i]=false}
}
}
return false},
ID:function(match){
return match[1].replace(/\\/g,"")},
TAG:function(match,curLoop){
return match[1].toLowerCase()},
CHILD:function(match){
if(match[1]==="nth"){
var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(
match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||
!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0}
match[0]=done++;
return match},
ATTR:function(match,curLoop,inplace,result,not,isXML){
var name=match[1].replace(/\\/g,"");
if(!isXML&&Expr.attrMap[name]){
match[1]=Expr.attrMap[name]}
if(match[2]==="~="){
match[4]=" "+match[4]+" "}
return match},
PSEUDO:function(match,curLoop,inplace,result,not){
if(match[1]==="not"){
if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){
match[3]=Sizzle(match[3],null,null,curLoop)}else{
var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);
if(!inplace){
result.push.apply(result,ret)}
return false}
}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){
return true}
return match},
POS:function(match){
match.unshift(true);
return match}
},
filters:{
enabled:function(elem){
return elem.disabled===false&&elem.type!=="hidden"},
disabled:function(elem){
return elem.disabled===true},
checked:function(elem){
return elem.checked===true},
selected:function(elem){
elem.parentNode.selectedIndex;
return elem.selected===true},
parent:function(elem){
return!!elem.firstChild},
empty:function(elem){
return!elem.firstChild},
has:function(elem,i,match){
return!!Sizzle(match[3],elem).length},
header:function(elem){
return(/h\d/i).test(elem.nodeName)},
text:function(elem){
return"text"===elem.type},
radio:function(elem){
return"radio"===elem.type},
checkbox:function(elem){
return"checkbox"===elem.type},
file:function(elem){
return"file"===elem.type},
password:function(elem){
return"password"===elem.type},
submit:function(elem){
return"submit"===elem.type},
image:function(elem){
return"image"===elem.type},
reset:function(elem){
return"reset"===elem.type},
button:function(elem){
return"button"===elem.type||elem.nodeName.toLowerCase()==="button"},
input:function(elem){
return(/input|select|textarea|button/i).test(elem.nodeName)}
},
setFilters:{
first:function(elem,i){
return i===0},
last:function(elem,i,match,array){
return i===array.length-1},
even:function(elem,i){
return i%2===0},
odd:function(elem,i){
return i%2===1},
lt:function(elem,i,match){
return i<match[3]-0},
gt:function(elem,i,match){
return i>match[3]-0},
nth:function(elem,i,match){
return match[3]-0===i},
eq:function(elem,i,match){
return match[3]-0===i}
},
filter:{
PSEUDO:function(elem,match,i,array){
var name=match[1],
filter=Expr.filters[name];
if(filter){
return filter(elem,i,match,array)}else if(name==="contains"){
return(elem.textContent||elem.innerText||Sizzle.getText([elem])||"").indexOf(match[3])>=0}else if(name==="not"){
var not=match[3];
for(var j=0,l=not.length;j<l;j++){
if(not[j]===elem){
return false}
}
return true}else{
Sizzle.error("Syntax error, unrecognized expression: "+name)}
},
CHILD:function(elem,match){
var type=match[1],
node=elem;
switch(type){
case"only":
case"first":
while((node=node.previousSibling)){
if(node.nodeType===1){
return false}
}
if(type==="first"){
return true}
node=elem;
case"last":
while((node=node.nextSibling)){
if(node.nodeType===1){
return false}
}
return true;
case"nth":
var first=match[2],
last=match[3];
if(first===1&&last===0){
return true}
var doneName=match[0],
parent=elem.parentNode;
if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){
var count=0;
for(node=parent.firstChild;node;node=node.nextSibling){
if(node.nodeType===1){
node.nodeIndex=++count}
}
parent.sizcache=doneName}
var diff=elem.nodeIndex-last;
if(first===0){
return diff===0}else{
return(diff%first===0&&diff/first>=0)}
}
},
ID:function(elem,match){
return elem.nodeType===1&&elem.getAttribute("id")===match},
TAG:function(elem,match){
return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match},
CLASS:function(elem,match){
return(" "+(elem.className||elem.getAttribute("class"))+" ")
.indexOf(match)>-1},
ATTR:function(elem,match){
var name=match[1],
result=Expr.attrHandle[name]?
Expr.attrHandle[name](elem):
elem[name]!=null?
elem[name]:
elem.getAttribute(name),
value=result+"",
type=match[2],
check=match[4];
return result==null?
type==="!=":
type==="="?
value===check:
type==="*="?
value.indexOf(check)>=0:
type==="~="?
(" "+value+" ").indexOf(check)>=0:
!check?
value&&result!==false:
type==="!="?
value!==check:
type==="^="?
value.indexOf(check)===0:
type==="$="?
value.substr(value.length-check.length)===check:
type==="|="?
value===check||value.substr(0,check.length+1)===check+"-":
false},
POS:function(elem,match,i,array){
var name=match[2],
filter=Expr.setFilters[name];
if(filter){
return filter(elem,i,match,array)}
}
}
};
var origPOS=Expr.match.POS,
fescape=function(all,num){
return"\\"+(num-0+1)};
for(var type in Expr.match){
Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape))}
var makeArray=function(array,results){
array=Array.prototype.slice.call(array,0);
if(results){
results.push.apply(results,array);
return results}
return array};
try{
Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(e){
makeArray=function(array,results){
var i=0,
ret=results||[];
if(toString.call(array)==="[object Array]"){
Array.prototype.push.apply(ret,array)}else{
if(typeof array.length==="number"){
for(var l=array.length;i<l;i++){
ret.push(array[i])}
}else{
for(;array[i];i++){
ret.push(array[i])}
}
}
return ret}}
var sortOrder,siblingCheck;
if(document.documentElement.compareDocumentPosition){
sortOrder=function(a,b){
if(a===b){
hasDuplicate=true;
return 0}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){
return a.compareDocumentPosition?-1:1}
return a.compareDocumentPosition(b)&4?-1:1}}else{
sortOrder=function(a,b){
var al,bl,
ap=[],
bp=[],
aup=a.parentNode,
bup=b.parentNode,
cur=aup;
if(a===b){
hasDuplicate=true;
return 0}else if(aup===bup){
return siblingCheck(a,b)}else if(!aup){
return-1}else if(!bup){
return 1}
while(cur){
ap.unshift(cur);
cur=cur.parentNode}
cur=bup;
while(cur){
bp.unshift(cur);
cur=cur.parentNode}
al=ap.length;
bl=bp.length;
for(var i=0;i<al&&i<bl;i++){
if(ap[i]!==bp[i]){
return siblingCheck(ap[i],bp[i])}
}
return i===al?
siblingCheck(a,bp[i],-1):
siblingCheck(ap[i],b,1)};
siblingCheck=function(a,b,ret){
if(a===b){
return ret}
var cur=a.nextSibling;
while(cur){
if(cur===b){
return-1}
cur=cur.nextSibling}
return 1}}
Sizzle.getText=function(elems){
var ret="",elem;
for(var i=0;elems[i];i++){
elem=elems[i];
if(elem.nodeType===3||elem.nodeType===4){
ret+=elem.nodeValue}else if(elem.nodeType!==8){
ret+=Sizzle.getText(elem.childNodes)}
}
return ret};
(function(){
var form=document.createElement("div"),
id="script"+(new Date()).getTime(),
root=document.documentElement;
form.innerHTML="<a name='"+id+"'/>";
root.insertBefore(form,root.firstChild);
if(document.getElementById(id)){
Expr.find.ID=function(match,context,isXML){
if(typeof context.getElementById!=="undefined"&&!isXML){
var m=context.getElementById(match[1]);
return m?
m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?
[m]:
undefined:
[]}
};
Expr.filter.ID=function(elem,match){
var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===match}}
root.removeChild(form);
root=form=null})();
(function(){
var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){
Expr.find.TAG=function(match,context){
var results=context.getElementsByTagName(match[1]);
if(match[1]==="*"){
var tmp=[];
for(var i=0;results[i];i++){
if(results[i].nodeType===1){
tmp.push(results[i])}
}
results=tmp}
return results}}
div.innerHTML="<a href='#'></a>";
if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&
div.firstChild.getAttribute("href")!=="#"){
Expr.attrHandle.href=function(elem){
return elem.getAttribute("href",2)}}
div=null})();
if(document.querySelectorAll){
(function(){
var oldSizzle=Sizzle,
div=document.createElement("div"),
id="__sizzle__";
div.innerHTML="<p class='TEST'></p>";
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){
return}
Sizzle=function(query,context,extra,seed){
context=context||document;
query=query.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!seed&&!Sizzle.isXML(context)){
if(context.nodeType===9){
try{
return makeArray(context.querySelectorAll(query),extra)}catch(qsaError){}
}else if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){
var old=context.getAttribute("id"),
nid=old||id;
if(!old){
context.setAttribute("id",nid)}
try{
return makeArray(context.querySelectorAll("#"+nid+" "+query),extra)}catch(pseudoError){
}finally{
if(!old){
context.removeAttribute("id")}
}
}
}
return oldSizzle(query,context,extra,seed)};
for(var prop in oldSizzle){
Sizzle[prop]=oldSizzle[prop]}
div=null})()}
(function(){
var html=document.documentElement,
matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector,
pseudoWorks=false;
try{
matches.call(document.documentElement,"[test!='']:sizzle")}catch(pseudoError){
pseudoWorks=true}
if(matches){
Sizzle.matchesSelector=function(node,expr){
expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!Sizzle.isXML(node)){
try{
if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){
return matches.call(node,expr)}
}catch(e){}
}
return Sizzle(expr,null,null,[node]).length>0}}
})();
(function(){
var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){
return}
div.lastChild.className="e";
if(div.getElementsByClassName("e").length===1){
return}
Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){
if(typeof context.getElementsByClassName!=="undefined"&&!isXML){
return context.getElementsByClassName(match[1])}
};
div=null})();
function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){
for(var i=0,l=checkSet.length;i<l;i++){
var elem=checkSet[i];
if(elem){
var match=false;
elem=elem[dir];
while(elem){
if(elem.sizcache===doneName){
match=checkSet[elem.sizset];
break}
if(elem.nodeType===1&&!isXML){
elem.sizcache=doneName;
elem.sizset=i}
if(elem.nodeName.toLowerCase()===cur){
match=elem;
break}
elem=elem[dir]}
checkSet[i]=match}
}
}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){
for(var i=0,l=checkSet.length;i<l;i++){
var elem=checkSet[i];
if(elem){
var match=false;
elem=elem[dir];
while(elem){
if(elem.sizcache===doneName){
match=checkSet[elem.sizset];
break}
if(elem.nodeType===1){
if(!isXML){
elem.sizcache=doneName;
elem.sizset=i}
if(typeof cur!=="string"){
if(elem===cur){
match=true;
break}
}else if(Sizzle.filter(cur,[elem]).length>0){
match=elem;
break}
}
elem=elem[dir]}
checkSet[i]=match}
}
}
if(document.documentElement.contains){
Sizzle.contains=function(a,b){
return a!==b&&(a.contains?a.contains(b):true)}}else if(document.documentElement.compareDocumentPosition){
Sizzle.contains=function(a,b){
return!!(a.compareDocumentPosition(b)&16)}}else{
Sizzle.contains=function(){
return false}}
Sizzle.isXML=function(elem){
var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false};
var posProcess=function(selector,context){
var match,
tmpSet=[],
later="",
root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){
later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"")}
selector=Expr.relative[selector]?selector+"*":selector;
for(var i=0,l=root.length;i<l;i++){
Sizzle(selector,root[i],tmpSet)}
return Sizzle.filter(later,tmpSet)};
jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.filters;
jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;
jQuery.isXMLDoc=Sizzle.isXML;
jQuery.contains=Sizzle.contains})();
var runtil=/Until$/,
rparentsprev=/^(?:parents|prevUntil|prevAll)/,
rmultiselector=/,/,
isSimple=/^.[^:#\[\.,]*$/,
slice=Array.prototype.slice,
POS=jQuery.expr.match.POS;
jQuery.fn.extend({
find:function(selector){
var ret=this.pushStack("","find",selector),
length=0;
for(var i=0,l=this.length;i<l;i++){
length=ret.length;
jQuery.find(selector,this[i],ret);
if(i>0){
for(var n=length;n<ret.length;n++){
for(var r=0;r<length;r++){
if(ret[r]===ret[n]){
ret.splice(n--,1);
break}
}
}
}
}
return ret},
has:function(target){
var targets=jQuery(target);
return this.filter(function(){
for(var i=0,l=targets.length;i<l;i++){
if(jQuery.contains(this,targets[i])){
return true}
}
})},
not:function(selector){
return this.pushStack(winnow(this,selector,false),"not",selector)},
filter:function(selector){
return this.pushStack(winnow(this,selector,true),"filter",selector)},
is:function(selector){
return!!selector&&jQuery.filter(selector,this).length>0},
closest:function(selectors,context){
var ret=[],i,l,cur=this[0];
if(jQuery.isArray(selectors)){
var match,selector,
matches={},
level=1;
if(cur&&selectors.length){
for(i=0,l=selectors.length;i<l;i++){
selector=selectors[i];
if(!matches[selector]){
matches[selector]=jQuery.expr.match.POS.test(selector)?
jQuery(selector,context||this.context):
selector}
}
while(cur&&cur.ownerDocument&&cur!==context){
for(selector in matches){
match=matches[selector];
if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){
ret.push({selector:selector,elem:cur,level:level})}
}
cur=cur.parentNode;
level++}
}
return ret}
var pos=POS.test(selectors)?
jQuery(selectors,context||this.context):null;
for(i=0,l=this.length;i<l;i++){
cur=this[i];
while(cur){
if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){
ret.push(cur);
break}else{
cur=cur.parentNode;
if(!cur||!cur.ownerDocument||cur===context){
break}
}
}
}
ret=ret.length>1?jQuery.unique(ret):ret;
return this.pushStack(ret,"closest",selectors)},
index:function(elem){
if(!elem||typeof elem==="string"){
return jQuery.inArray(this[0],
elem?jQuery(elem):this.parent().children())}
return jQuery.inArray(
elem.jquery?elem[0]:elem,this)},
add:function(selector,context){
var set=typeof selector==="string"?
jQuery(selector,context||this.context):
jQuery.makeArray(selector),
all=jQuery.merge(this.get(),set);
return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?
all:
jQuery.unique(all))},
andSelf:function(){
return this.add(this.prevObject)}
});
function isDisconnected(node){
return!node||!node.parentNode||node.parentNode.nodeType===11}
jQuery.each({
parent:function(elem){
var parent=elem.parentNode;
return parent&&parent.nodeType!==11?parent:null},
parents:function(elem){
return jQuery.dir(elem,"parentNode")},
parentsUntil:function(elem,i,until){
return jQuery.dir(elem,"parentNode",until)},
next:function(elem){
return jQuery.nth(elem,2,"nextSibling")},
prev:function(elem){
return jQuery.nth(elem,2,"previousSibling")},
nextAll:function(elem){
return jQuery.dir(elem,"nextSibling")},
prevAll:function(elem){
return jQuery.dir(elem,"previousSibling")},
nextUntil:function(elem,i,until){
return jQuery.dir(elem,"nextSibling",until)},
prevUntil:function(elem,i,until){
return jQuery.dir(elem,"previousSibling",until)},
siblings:function(elem){
return jQuery.sibling(elem.parentNode.firstChild,elem)},
children:function(elem){
return jQuery.sibling(elem.firstChild)},
contents:function(elem){
return jQuery.nodeName(elem,"iframe")?
elem.contentDocument||elem.contentWindow.document:
jQuery.makeArray(elem.childNodes)}
},function(name,fn){
jQuery.fn[name]=function(until,selector){
var ret=jQuery.map(this,fn,until);
if(!runtil.test(name)){
selector=until}
if(selector&&typeof selector==="string"){
ret=jQuery.filter(selector,ret)}
ret=this.length>1?jQuery.unique(ret):ret;
if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){
ret=ret.reverse()}
return this.pushStack(ret,name,slice.call(arguments).join(","))}});
jQuery.extend({
filter:function(expr,elems,not){
if(not){
expr=":not("+expr+")"}
return elems.length===1?
jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:
jQuery.find.matches(expr,elems)},
dir:function(elem,dir,until){
var matched=[],
cur=elem[dir];
while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){
if(cur.nodeType===1){
matched.push(cur)}
cur=cur[dir]}
return matched},
nth:function(cur,result,dir,elem){
result=result||1;
var num=0;
for(;cur;cur=cur[dir]){
if(cur.nodeType===1&&++num===result){
break}
}
return cur},
sibling:function(n,elem){
var r=[];
for(;n;n=n.nextSibling){
if(n.nodeType===1&&n!==elem){
r.push(n)}
}
return r}
});
function winnow(elements,qualifier,keep){
if(jQuery.isFunction(qualifier)){
return jQuery.grep(elements,function(elem,i){
var retVal=!!qualifier.call(elem,i,elem);
return retVal===keep})}else if(qualifier.nodeType){
return jQuery.grep(elements,function(elem,i){
return(elem===qualifier)===keep})}else if(typeof qualifier==="string"){
var filtered=jQuery.grep(elements,function(elem){
return elem.nodeType===1});
if(isSimple.test(qualifier)){
return jQuery.filter(qualifier,filtered,!keep)}else{
qualifier=jQuery.filter(qualifier,filtered)}
}
return jQuery.grep(elements,function(elem,i){
return(jQuery.inArray(elem,qualifier)>=0)===keep})}
var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,
rleadingWhitespace=/^\s+/,
rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
rtagName=/<([\w:]+)/,
rtbody=/<tbody/i,
rhtml=/<|&#?\w+;/,
rnocache=/<(?:script|object|embed|option|style)/i,
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,
raction=/\=([^="'>\s]+\/)>/g,
wrapMap={
option:[1,"<select multiple='multiple'>","</select>"],
legend:[1,"<fieldset>","</fieldset>"],
thead:[1,"<table>","</table>"],
tr:[2,"<table><tbody>","</tbody></table>"],
td:[3,"<table><tbody><tr>","</tr></tbody></table>"],
col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],
area:[1,"<map>","</map>"],
_default:[0,"",""]
};
wrapMap.optgroup=wrapMap.option;
wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;
if(!jQuery.support.htmlSerialize){
wrapMap._default=[1,"div<div>","</div>"]}
jQuery.fn.extend({
text:function(text){
if(jQuery.isFunction(text)){
return this.each(function(i){
var self=jQuery(this);
self.text(text.call(this,i,self.text()))})}
if(typeof text!=="object"&&text!==undefined){
return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))}
return jQuery.text(this)},
wrapAll:function(html){
if(jQuery.isFunction(html)){
return this.each(function(i){
jQuery(this).wrapAll(html.call(this,i))})}
if(this[0]){
var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){
wrap.insertBefore(this[0])}
wrap.map(function(){
var elem=this;
while(elem.firstChild&&elem.firstChild.nodeType===1){
elem=elem.firstChild}
return elem}).append(this)}
return this},
wrapInner:function(html){
if(jQuery.isFunction(html)){
return this.each(function(i){
jQuery(this).wrapInner(html.call(this,i))})}
return this.each(function(){
var self=jQuery(this),
contents=self.contents();
if(contents.length){
contents.wrapAll(html)}else{
self.append(html)}
})},
wrap:function(html){
return this.each(function(){
jQuery(this).wrapAll(html)})},
unwrap:function(){
return this.parent().each(function(){
if(!jQuery.nodeName(this,"body")){
jQuery(this).replaceWith(this.childNodes)}
}).end()},
append:function(){
return this.domManip(arguments,true,function(elem){
if(this.nodeType===1){
this.appendChild(elem)}
})},
prepend:function(){
return this.domManip(arguments,true,function(elem){
if(this.nodeType===1){
this.insertBefore(elem,this.firstChild)}
})},
before:function(){
if(this[0]&&this[0].parentNode){
return this.domManip(arguments,false,function(elem){
this.parentNode.insertBefore(elem,this)})}else if(arguments.length){
var set=jQuery(arguments[0]);
set.push.apply(set,this.toArray());
return this.pushStack(set,"before",arguments)}
},
after:function(){
if(this[0]&&this[0].parentNode){
return this.domManip(arguments,false,function(elem){
this.parentNode.insertBefore(elem,this.nextSibling)})}else if(arguments.length){
var set=this.pushStack(this,"after",arguments);
set.push.apply(set,jQuery(arguments[0]).toArray());
return set}
},
remove:function(selector,keepData){
for(var i=0,elem;(elem=this[i])!=null;i++){
if(!selector||jQuery.filter(selector,[elem]).length){
if(!keepData&&elem.nodeType===1){
jQuery.cleanData(elem.getElementsByTagName("*"));
jQuery.cleanData([elem])}
if(elem.parentNode){
elem.parentNode.removeChild(elem)}
}
}
return this},
empty:function(){
for(var i=0,elem;(elem=this[i])!=null;i++){
if(elem.nodeType===1){
jQuery.cleanData(elem.getElementsByTagName("*"))}
while(elem.firstChild){
elem.removeChild(elem.firstChild)}
}
return this},
clone:function(events){
var ret=this.map(function(){
if(!jQuery.support.noCloneEvent&&!jQuery.isXMLDoc(this)){
var html=this.outerHTML,
ownerDocument=this.ownerDocument;
if(!html){
var div=ownerDocument.createElement("div");
div.appendChild(this.cloneNode(true));
html=div.innerHTML}
return jQuery.clean([html.replace(rinlinejQuery,"")
.replace(raction,'="$1">')
.replace(rleadingWhitespace,"")],ownerDocument)[0]}else{
return this.cloneNode(true)}
});
if(events===true){
cloneCopyEvent(this,ret);
cloneCopyEvent(this.find("*"),ret.find("*"))}
return ret},
html:function(value){
if(value===undefined){
return this[0]&&this[0].nodeType===1?
this[0].innerHTML.replace(rinlinejQuery,""):
null}else if(typeof value==="string"&&!rnocache.test(value)&&
(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&
!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){
value=value.replace(rxhtmlTag,"<$1></$2>");
try{
for(var i=0,l=this.length;i<l;i++){
if(this[i].nodeType===1){
jQuery.cleanData(this[i].getElementsByTagName("*"));
this[i].innerHTML=value}
}
}catch(e){
this.empty().append(value)}
}else if(jQuery.isFunction(value)){
this.each(function(i){
var self=jQuery(this);
self.html(value.call(this,i,self.html()))})}else{
this.empty().append(value)}
return this},
replaceWith:function(value){
if(this[0]&&this[0].parentNode){
if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this),old=self.html();
self.replaceWith(value.call(this,i,old))})}
if(typeof value!=="string"){
value=jQuery(value).detach()}
return this.each(function(){
var next=this.nextSibling,
parent=this.parentNode;
jQuery(this).remove();
if(next){
jQuery(next).before(value)}else{
jQuery(parent).append(value)}
})}else{
return this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value)}
},
detach:function(selector){
return this.remove(selector,true)},
domManip:function(args,table,callback){
var results,first,fragment,parent,
value=args[0],
scripts=[];
if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){
return this.each(function(){
jQuery(this).domManip(args,table,callback,true)})}
if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this);
args[0]=value.call(this,i,table?self.html():undefined);
self.domManip(args,table,callback)})}
if(this[0]){
parent=value&&value.parentNode;
if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){
results={fragment:parent}}else{
results=jQuery.buildFragment(args,this,scripts)}
fragment=results.fragment;
if(fragment.childNodes.length===1){
first=fragment=fragment.firstChild}else{
first=fragment.firstChild}
if(first){
table=table&&jQuery.nodeName(first,"tr");
for(var i=0,l=this.length;i<l;i++){
callback.call(
table?
root(this[i],first):
this[i],
i>0||results.cacheable||this.length>1?
fragment.cloneNode(true):
fragment
)}
}
if(scripts.length){
jQuery.each(scripts,evalScript)}
}
return this}
});
function root(elem,cur){
return jQuery.nodeName(elem,"table")?
(elem.getElementsByTagName("tbody")[0]||
elem.appendChild(elem.ownerDocument.createElement("tbody"))):
elem}
function cloneCopyEvent(orig,ret){
var i=0;
ret.each(function(){
if(this.nodeName!==(orig[i]&&orig[i].nodeName)){
return}
var oldData=jQuery.data(orig[i++]),
curData=jQuery.data(this,oldData),
events=oldData&&oldData.events;
if(events){
delete curData.handle;
curData.events={};
for(var type in events){
for(var handler in events[type]){
jQuery.event.add(this,type,events[type][handler],events[type][handler].data)}
}
}
})}
jQuery.buildFragment=function(args,nodes,scripts){
var fragment,cacheable,cacheresults,
doc=(nodes&&nodes[0]?nodes[0].ownerDocument||nodes[0]:document);
if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&
!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){
cacheable=true;
cacheresults=jQuery.fragments[args[0]];
if(cacheresults){
if(cacheresults!==1){
fragment=cacheresults}
}
}
if(!fragment){
fragment=doc.createDocumentFragment();
jQuery.clean(args,doc,fragment,scripts)}
if(cacheable){
jQuery.fragments[args[0]]=cacheresults?fragment:1}
return{fragment:fragment,cacheable:cacheable}};
jQuery.fragments={};
jQuery.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
},function(name,original){
jQuery.fn[name]=function(selector){
var ret=[],
insert=jQuery(selector),
parent=this.length===1&&this[0].parentNode;
if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){
insert[original](this[0]);
return this}else{
for(var i=0,l=insert.length;i<l;i++){
var elems=(i>0?this.clone(true):this).get();
jQuery(insert[i])[original](elems);
ret=ret.concat(elems)}
return this.pushStack(ret,name,insert.selector)}
}});
jQuery.extend({
clean:function(elems,context,fragment,scripts){
context=context||document;
if(typeof context.createElement==="undefined"){
context=context.ownerDocument||context[0]&&context[0].ownerDocument||document}
var ret=[];
for(var i=0,elem;(elem=elems[i])!=null;i++){
if(typeof elem==="number"){
elem+=""}
if(!elem){
continue}
if(typeof elem==="string"&&!rhtml.test(elem)){
elem=context.createTextNode(elem)}else if(typeof elem==="string"){
elem=elem.replace(rxhtmlTag,"<$1></$2>");
var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),
wrap=wrapMap[tag]||wrapMap._default,
depth=wrap[0],
div=context.createElement("div");
div.innerHTML=wrap[1]+elem+wrap[2];
while(depth--){
div=div.lastChild}
if(!jQuery.support.tbody){
var hasBody=rtbody.test(elem),
tbody=tag==="table"&&!hasBody?
div.firstChild&&div.firstChild.childNodes:
wrap[1]==="<table>"&&!hasBody?
div.childNodes:
[];
for(var j=tbody.length-1;j>=0;--j){
if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){
tbody[j].parentNode.removeChild(tbody[j])}
}
}
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){
div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)}
elem=div.childNodes}
if(elem.nodeType){
ret.push(elem)}else{
ret=jQuery.merge(ret,elem)}
}
if(fragment){
for(i=0;ret[i];i++){
if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){
scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i])}else{
if(ret[i].nodeType===1){
ret.splice.apply(ret,[i+1,0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))))}
fragment.appendChild(ret[i])}
}
}
return ret},
cleanData:function(elems){
var data,id,cache=jQuery.cache,
special=jQuery.event.special,
deleteExpando=jQuery.support.deleteExpando;
for(var i=0,elem;(elem=elems[i])!=null;i++){
if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){
continue}
id=elem[jQuery.expando];
if(id){
data=cache[id];
if(data&&data.events){
for(var type in data.events){
if(special[type]){
jQuery.event.remove(elem,type)}else{
jQuery.removeEvent(elem,type,data.handle)}
}
}
if(deleteExpando){
delete elem[jQuery.expando]}else if(elem.removeAttribute){
elem.removeAttribute(jQuery.expando)}
delete cache[id]}
}
}
});
function evalScript(i,elem){
if(elem.src){
jQuery.ajax({
url:elem.src,
async:false,
dataType:"script"
})}else{
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")}
if(elem.parentNode){
elem.parentNode.removeChild(elem)}
}
var ralpha=/alpha\([^)]*\)/i,
ropacity=/opacity=([^)]*)/,
rdashAlpha=/-([a-z])/ig,
rupper=/([A-Z])/g,
rnumpx=/^-?\d+(?:px)?$/i,
rnum=/^-?\d/,
cssShow={position:"absolute",visibility:"hidden",display:"block"},
cssWidth=["Left","Right"],
cssHeight=["Top","Bottom"],
curCSS,
getComputedStyle,
currentStyle,
fcamelCase=function(all,letter){
return letter.toUpperCase()};
jQuery.fn.css=function(name,value){
if(arguments.length===2&&value===undefined){
return this}
return jQuery.access(this,name,value,true,function(elem,name,value){
return value!==undefined?
jQuery.style(elem,name,value):
jQuery.css(elem,name)})};
jQuery.extend({
cssHooks:{
opacity:{
get:function(elem,computed){
if(computed){
var ret=curCSS(elem,"opacity","opacity");
return ret===""?"1":ret}else{
return elem.style.opacity}
}
}
},
cssNumber:{
"zIndex":true,
"fontWeight":true,
"opacity":true,
"zoom":true,
"lineHeight":true
},
cssProps:{
"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"
},
style:function(elem,name,value,extra){
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){
return}
var ret,origName=jQuery.camelCase(name),
style=elem.style,hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;
if(value!==undefined){
if(typeof value==="number"&&isNaN(value)||value==null){
return}
if(typeof value==="number"&&!jQuery.cssNumber[origName]){
value+="px"}
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value))!==undefined){
try{
style[name]=value}catch(e){}
}
}else{
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){
return ret}
return style[name]}
},
css:function(elem,name,extra){
var ret,origName=jQuery.camelCase(name),
hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){
return ret}else if(curCSS){
return curCSS(elem,name,origName)}
},
swap:function(elem,options,callback){
var old={};
for(var name in options){
old[name]=elem.style[name];
elem.style[name]=options[name]}
callback.call(elem);
for(name in options){
elem.style[name]=old[name]}
},
camelCase:function(string){
return string.replace(rdashAlpha,fcamelCase)}
});
jQuery.curCSS=jQuery.css;
jQuery.each(["height","width"],function(i,name){
jQuery.cssHooks[name]={
get:function(elem,computed,extra){
var val;
if(computed){
if(elem.offsetWidth!==0){
val=getWH(elem,name,extra)}else{
jQuery.swap(elem,cssShow,function(){
val=getWH(elem,name,extra)})}
if(val<=0){
val=curCSS(elem,name,name);
if(val==="0px"&&currentStyle){
val=currentStyle(elem,name,name)}
if(val!=null){
return val===""||val==="auto"?"0px":val}
}
if(val<0||val==null){
val=elem.style[name];
return val===""||val==="auto"?"0px":val}
return typeof val==="string"?val:val+"px"}
},
set:function(elem,value){
if(rnumpx.test(value)){
value=parseFloat(value);
if(value>=0){
return value+"px"}
}else{
return value}
}
}});
if(!jQuery.support.opacity){
jQuery.cssHooks.opacity={
get:function(elem,computed){
return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?
(parseFloat(RegExp.$1)/100)+"":
computed?"1":""},
set:function(elem,value){
var style=elem.style;
style.zoom=1;
var opacity=jQuery.isNaN(value)?
"":
"alpha(opacity="+value*100+")",
filter=style.filter||"";
style.filter=ralpha.test(filter)?
filter.replace(ralpha,opacity):
style.filter+' '+opacity}
}}
if(document.defaultView&&document.defaultView.getComputedStyle){
getComputedStyle=function(elem,newName,name){
var ret,defaultView,computedStyle;
name=name.replace(rupper,"-$1").toLowerCase();
if(!(defaultView=elem.ownerDocument.defaultView)){
return undefined}
if((computedStyle=defaultView.getComputedStyle(elem,null))){
ret=computedStyle.getPropertyValue(name);
if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){
ret=jQuery.style(elem,name)}
}
return ret}}
if(document.documentElement.currentStyle){
currentStyle=function(elem,name){
var left,rsLeft,
ret=elem.currentStyle&&elem.currentStyle[name],
style=elem.style;
if(!rnumpx.test(ret)&&rnum.test(ret)){
left=style.left;
rsLeft=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;
style.left=name==="fontSize"?"1em":(ret||0);
ret=style.pixelLeft+"px";
style.left=left;
elem.runtimeStyle.left=rsLeft}
return ret===""?"auto":ret}}
curCSS=getComputedStyle||currentStyle;
function getWH(elem,name,extra){
var which=name==="width"?cssWidth:cssHeight,
val=name==="width"?elem.offsetWidth:elem.offsetHeight;
if(extra==="border"){
return val}
jQuery.each(which,function(){
if(!extra){
val-=parseFloat(jQuery.css(elem,"padding"+this))||0}
if(extra==="margin"){
val+=parseFloat(jQuery.css(elem,"margin"+this))||0}else{
val-=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0}
});
return val}
if(jQuery.expr&&jQuery.expr.filters){
jQuery.expr.filters.hidden=function(elem){
var width=elem.offsetWidth,
height=elem.offsetHeight;
return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&(elem.style.display||jQuery.css(elem,"display"))==="none")};
jQuery.expr.filters.visible=function(elem){
return!jQuery.expr.filters.hidden(elem)}}
var jsc=jQuery.now(),
rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
rselectTextarea=/^(?:select|textarea)/i,
rinput=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
rnoContent=/^(?:GET|HEAD)$/,
rbracket=/\[\]$/,
jsre=/\=\?(&|$)/,
rquery=/\?/,
rts=/([?&])_=[^&]*/,
rurl=/^(\w+:)?\/\/([^\/?#]+)/,
r20=/%20/g,
rhash=/#.*$/,
_load=jQuery.fn.load;
jQuery.fn.extend({
load:function(url,params,callback){
if(typeof url!=="string"&&_load){
return _load.apply(this,arguments)}else if(!this.length){
return this}
var off=url.indexOf(" ");
if(off>=0){
var selector=url.slice(off,url.length);
url=url.slice(0,off)}
var type="GET";
if(params){
if(jQuery.isFunction(params)){
callback=params;
params=null}else if(typeof params==="object"){
params=jQuery.param(params,jQuery.ajaxSettings.traditional);
type="POST"}
}
var self=this;
jQuery.ajax({
url:url,
type:type,
dataType:"html",
data:params,
complete:function(res,status){
if(status==="success"||status==="notmodified"){
self.html(selector?
jQuery("<div>")
.append(res.responseText.replace(rscript,""))
.find(selector):
res.responseText)}
if(callback){
self.each(callback,[res.responseText,status,res])}
}
});
return this},
serialize:function(){
return jQuery.param(this.serializeArray())},
serializeArray:function(){
return this.map(function(){
return this.elements?jQuery.makeArray(this.elements):this})
.filter(function(){
return this.name&&!this.disabled&&
(this.checked||rselectTextarea.test(this.nodeName)||
rinput.test(this.type))})
.map(function(i,elem){
var val=jQuery(this).val();
return val==null?
null:
jQuery.isArray(val)?
jQuery.map(val,function(val,i){
return{name:elem.name,value:val}}):
{name:elem.name,value:val}}).get()}
});
jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){
jQuery.fn[o]=function(f){
return this.bind(o,f)}});
jQuery.extend({
get:function(url,data,callback,type){
if(jQuery.isFunction(data)){
type=type||callback;
callback=data;
data=null}
return jQuery.ajax({
type:"GET",
url:url,
data:data,
success:callback,
dataType:type
})},
getScript:function(url,callback){
return jQuery.get(url,null,callback,"script")},
getJSON:function(url,data,callback){
return jQuery.get(url,data,callback,"json")},
post:function(url,data,callback,type){
if(jQuery.isFunction(data)){
type=type||callback;
callback=data;
data={}}
return jQuery.ajax({
type:"POST",
url:url,
data:data,
success:callback,
dataType:type
})},
ajaxSetup:function(settings){
jQuery.extend(jQuery.ajaxSettings,settings)},
ajaxSettings:{
url:location.href,
global:true,
type:"GET",
contentType:"application/x-www-form-urlencoded",
processData:true,
async:true,
xhr:function(){
return new window.XMLHttpRequest()},
accepts:{
xml:"application/xml, text/xml",
html:"text/html",
script:"text/javascript, application/javascript",
json:"application/json, text/javascript",
text:"text/plain",
_default:"*/*"
}
},
ajax:function(origSettings){
var s=jQuery.extend(true,{},jQuery.ajaxSettings,origSettings),
jsonp,status,data,type=s.type.toUpperCase(),noContent=rnoContent.test(type);
s.url=s.url.replace(rhash,"");
s.context=origSettings&&origSettings.context!=null?origSettings.context:s;
if(s.data&&s.processData&&typeof s.data!=="string"){
s.data=jQuery.param(s.data,s.traditional)}
if(s.dataType==="jsonp"){
if(type==="GET"){
if(!jsre.test(s.url)){
s.url+=(rquery.test(s.url)?"&":"?")+(s.jsonp||"callback")+"=?"}
}else if(!s.data||!jsre.test(s.data)){
s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"}
s.dataType="json"}
if(s.dataType==="json"&&(s.data&&jsre.test(s.data)||jsre.test(s.url))){
jsonp=s.jsonpCallback||("jsonp"+jsc++);
if(s.data){
s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")}
s.url=s.url.replace(jsre,"="+jsonp+"$1");
s.dataType="script";
var customJsonp=window[jsonp];
window[jsonp]=function(tmp){
if(jQuery.isFunction(customJsonp)){
customJsonp(tmp)}else{
window[jsonp]=undefined;
try{
delete window[jsonp]}catch(jsonpError){}
}
data=tmp;
jQuery.handleSuccess(s,xhr,status,data);
jQuery.handleComplete(s,xhr,status,data);
if(head){
head.removeChild(script)}
}}
if(s.dataType==="script"&&s.cache===null){
s.cache=false}
if(s.cache===false&&noContent){
var ts=jQuery.now();
var ret=s.url.replace(rts,"$1_="+ts);
s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"")}
if(s.data&&noContent){
s.url+=(rquery.test(s.url)?"&":"?")+s.data}
if(s.global&&jQuery.active++===0){
jQuery.event.trigger("ajaxStart")}
var parts=rurl.exec(s.url),
remote=parts&&(parts[1]&&parts[1].toLowerCase()!==location.protocol||parts[2].toLowerCase()!==location.host);
if(s.dataType==="script"&&type==="GET"&&remote){
var head=document.getElementsByTagName("head")[0]||document.documentElement;
var script=document.createElement("script");
if(s.scriptCharset){
script.charset=s.scriptCharset}
script.src=s.url;
if(!jsonp){
var done=false;
script.onload=script.onreadystatechange=function(){
if(!done&&(!this.readyState||
this.readyState==="loaded"||this.readyState==="complete")){
done=true;
jQuery.handleSuccess(s,xhr,status,data);
jQuery.handleComplete(s,xhr,status,data);
script.onload=script.onreadystatechange=null;
if(head&&script.parentNode){
head.removeChild(script)}
}
}}
head.insertBefore(script,head.firstChild);
return undefined}
var requestDone=false;
var xhr=s.xhr();
if(!xhr){
return}
if(s.username){
xhr.open(type,s.url,s.async,s.username,s.password)}else{
xhr.open(type,s.url,s.async)}
try{
if((s.data!=null&&!noContent)||(origSettings&&origSettings.contentType)){
xhr.setRequestHeader("Content-Type",s.contentType)}
if(s.ifModified){
if(jQuery.lastModified[s.url]){
xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url])}
if(jQuery.etag[s.url]){
xhr.setRequestHeader("If-None-Match",jQuery.etag[s.url])}
}
if(!remote){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")}
xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?
s.accepts[s.dataType]+", */*; q=0.01":
s.accepts._default)}catch(headerError){}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){
if(s.global&&jQuery.active--===1){
jQuery.event.trigger("ajaxStop")}
xhr.abort();
return false}
if(s.global){
jQuery.triggerGlobal(s,"ajaxSend",[xhr,s])}
var onreadystatechange=xhr.onreadystatechange=function(isTimeout){
if(!xhr||xhr.readyState===0||isTimeout==="abort"){
if(!requestDone){
jQuery.handleComplete(s,xhr,status,data)}
requestDone=true;
if(xhr){
xhr.onreadystatechange=jQuery.noop}
}else if(!requestDone&&xhr&&(xhr.readyState===4||isTimeout==="timeout")){
requestDone=true;
xhr.onreadystatechange=jQuery.noop;
status=isTimeout==="timeout"?
"timeout":
!jQuery.httpSuccess(xhr)?
"error":
s.ifModified&&jQuery.httpNotModified(xhr,s.url)?
"notmodified":
"success";
var errMsg;
if(status==="success"){
try{
data=jQuery.httpData(xhr,s.dataType,s)}catch(parserError){
status="parsererror";
errMsg=parserError}
}
if(status==="success"||status==="notmodified"){
if(!jsonp){
jQuery.handleSuccess(s,xhr,status,data)}
}else{
jQuery.handleError(s,xhr,status,errMsg)}
if(!jsonp){
jQuery.handleComplete(s,xhr,status,data)}
if(isTimeout==="timeout"){
xhr.abort()}
if(s.async){
xhr=null}
}
};
try{
var oldAbort=xhr.abort;
xhr.abort=function(){
if(xhr){
Function.prototype.call.call(oldAbort,xhr)}
onreadystatechange("abort")}}catch(abortError){}
if(s.async&&s.timeout>0){
setTimeout(function(){
if(xhr&&!requestDone){
onreadystatechange("timeout")}
},s.timeout)}
try{
xhr.send(noContent||s.data==null?null:s.data)}catch(sendError){
jQuery.handleError(s,xhr,null,sendError);
jQuery.handleComplete(s,xhr,status,data)}
if(!s.async){
onreadystatechange()}
return xhr},
param:function(a,traditional){
var s=[],
add=function(key,value){
value=jQuery.isFunction(value)?value():value;
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)};
if(traditional===undefined){
traditional=jQuery.ajaxSettings.traditional}
if(jQuery.isArray(a)||a.jquery){
jQuery.each(a,function(){
add(this.name,this.value)})}else{
for(var prefix in a){
buildParams(prefix,a[prefix],traditional,add)}
}
return s.join("&").replace(r20,"+")}
});
function buildParams(prefix,obj,traditional,add){
if(jQuery.isArray(obj)&&obj.length){
jQuery.each(obj,function(i,v){
if(traditional||rbracket.test(prefix)){
add(prefix,v)}else{
buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v,traditional,add)}
})}else if(!traditional&&obj!=null&&typeof obj==="object"){
if(jQuery.isEmptyObject(obj)){
add(prefix,"")}else{
jQuery.each(obj,function(k,v){
buildParams(prefix+"["+k+"]",v,traditional,add)})}
}else{
add(prefix,obj)}
}
jQuery.extend({
active:0,
lastModified:{},
etag:{},
handleError:function(s,xhr,status,e){
if(s.error){
s.error.call(s.context,xhr,status,e)}
if(s.global){
jQuery.triggerGlobal(s,"ajaxError",[xhr,s,e])}
},
handleSuccess:function(s,xhr,status,data){
if(s.success){
s.success.call(s.context,data,status,xhr)}
if(s.global){
jQuery.triggerGlobal(s,"ajaxSuccess",[xhr,s])}
},
handleComplete:function(s,xhr,status){
if(s.complete){
s.complete.call(s.context,xhr,status)}
if(s.global){
jQuery.triggerGlobal(s,"ajaxComplete",[xhr,s])}
if(s.global&&jQuery.active--===1){
jQuery.event.trigger("ajaxStop")}
},
triggerGlobal:function(s,type,args){
(s.context&&s.context.url==null?jQuery(s.context):jQuery.event).trigger(type,args)},
httpSuccess:function(xhr){
try{
return!xhr.status&&location.protocol==="file:"||
xhr.status>=200&&xhr.status<300||
xhr.status===304||xhr.status===1223}catch(e){}
return false},
httpNotModified:function(xhr,url){
var lastModified=xhr.getResponseHeader("Last-Modified"),
etag=xhr.getResponseHeader("Etag");
if(lastModified){
jQuery.lastModified[url]=lastModified}
if(etag){
jQuery.etag[url]=etag}
return xhr.status===304},
httpData:function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",
xml=type==="xml"||!type&&ct.indexOf("xml")>=0,
data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
jQuery.error("parsererror")}
if(s&&s.dataFilter){
data=s.dataFilter(data,type)}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=jQuery.parseJSON(data)}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){
jQuery.globalEval(data)}
}
return data}
});
if(window.ActiveXObject){
jQuery.ajaxSettings.xhr=function(){
if(window.location.protocol!=="file:"){
try{
return new window.XMLHttpRequest()}catch(xhrError){}
}
try{
return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(activeError){}
}}
jQuery.support.ajax=!!jQuery.ajaxSettings.xhr();
var elemdisplay={},
rfxtypes=/^(?:toggle|show|hide)$/,
rfxnum=/^([+\-]=)?([\d+.\-]+)(.*)$/,
timerId,
fxAttrs=[
["height","marginTop","marginBottom","paddingTop","paddingBottom"],
["width","marginLeft","marginRight","paddingLeft","paddingRight"],
["opacity"]
];
jQuery.fn.extend({
show:function(speed,easing,callback){
var elem,display;
if(speed||speed===0){
return this.animate(genFx("show",3),speed,easing,callback)}else{
for(var i=0,j=this.length;i<j;i++){
elem=this[i];
display=elem.style.display;
if(!jQuery.data(elem,"olddisplay")&&display==="none"){
display=elem.style.display=""}
if(display===""&&jQuery.css(elem,"display")==="none"){
jQuery.data(elem,"olddisplay",defaultDisplay(elem.nodeName))}
}
for(i=0;i<j;i++){
elem=this[i];
display=elem.style.display;
if(display===""||display==="none"){
elem.style.display=jQuery.data(elem,"olddisplay")||""}
}
return this}
},
hide:function(speed,easing,callback){
if(speed||speed===0){
return this.animate(genFx("hide",3),speed,easing,callback)}else{
for(var i=0,j=this.length;i<j;i++){
var display=jQuery.css(this[i],"display");
if(display!=="none"){
jQuery.data(this[i],"olddisplay",display)}
}
for(i=0;i<j;i++){
this[i].style.display="none"}
return this}
},
_toggle:jQuery.fn.toggle,
toggle:function(fn,fn2,callback){
var bool=typeof fn==="boolean";
if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){
this._toggle.apply(this,arguments)}else if(fn==null||bool){
this.each(function(){
var state=bool?fn:jQuery(this).is(":hidden");
jQuery(this)[state?"show":"hide"]()})}else{
this.animate(genFx("toggle",3),fn,fn2,callback)}
return this},
fadeTo:function(speed,to,easing,callback){
return this.filter(":hidden").css("opacity",0).show().end()
.animate({opacity:to},speed,easing,callback)},
animate:function(prop,speed,easing,callback){
var optall=jQuery.speed(speed,easing,callback);
if(jQuery.isEmptyObject(prop)){
return this.each(optall.complete)}
return this[optall.queue===false?"each":"queue"](function(){
var opt=jQuery.extend({},optall),p,
isElement=this.nodeType===1,
hidden=isElement&&jQuery(this).is(":hidden"),
self=this;
for(p in prop){
var name=jQuery.camelCase(p);
if(p!==name){
prop[name]=prop[p];
delete prop[p];
p=name}
if(prop[p]==="hide"&&hidden||prop[p]==="show"&&!hidden){
return opt.complete.call(this)}
if(isElement&&(p==="height"||p==="width")){
opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];
if(jQuery.css(this,"display")==="inline"&&
jQuery.css(this,"float")==="none"){
if(!jQuery.support.inlineBlockNeedsLayout){
this.style.display="inline-block"}else{
var display=defaultDisplay(this.nodeName);
if(display==="inline"){
this.style.display="inline-block"}else{
this.style.display="inline";
this.style.zoom=1}
}
}
}
if(jQuery.isArray(prop[p])){
(opt.specialEasing=opt.specialEasing||{})[p]=prop[p][1];
prop[p]=prop[p][0]}
}
if(opt.overflow!=null){
this.style.overflow="hidden"}
opt.curAnim=jQuery.extend({},prop);
jQuery.each(prop,function(name,val){
var e=new jQuery.fx(self,opt,name);
if(rfxtypes.test(val)){
e[val==="toggle"?hidden?"show":"hide":val](prop)}else{
var parts=rfxnum.exec(val),
start=e.cur()||0;
if(parts){
var end=parseFloat(parts[2]),
unit=parts[3]||"px";
if(unit!=="px"){
jQuery.style(self,name,(end||1)+unit);
start=((end||1)/e.cur())*start;
jQuery.style(self,name,start+unit)}
if(parts[1]){
end=((parts[1]==="-="?-1:1)*end)+start}
e.custom(start,end,unit)}else{
e.custom(start,val,"")}
}
});
return true})},
stop:function(clearQueue,gotoEnd){
var timers=jQuery.timers;
if(clearQueue){
this.queue([])}
this.each(function(){
for(var i=timers.length-1;i>=0;i--){
if(timers[i].elem===this){
if(gotoEnd){
timers[i](true)}
timers.splice(i,1)}
}
});
if(!gotoEnd){
this.dequeue()}
return this}
});
function genFx(type,num){
var obj={};
jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){
obj[this]=type});
return obj}
jQuery.each({
slideDown:genFx("show",1),
slideUp:genFx("hide",1),
slideToggle:genFx("toggle",1),
fadeIn:{opacity:"show"},
fadeOut:{opacity:"hide"},
fadeToggle:{opacity:"toggle"}
},function(name,props){
jQuery.fn[name]=function(speed,easing,callback){
return this.animate(props,speed,easing,callback)}});
jQuery.extend({
speed:function(speed,easing,fn){
var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{
complete:fn||!fn&&easing||
jQuery.isFunction(speed)&&speed,
duration:speed,
easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing
};
opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:
opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;
opt.old=opt.complete;
opt.complete=function(){
if(opt.queue!==false){
jQuery(this).dequeue()}
if(jQuery.isFunction(opt.old)){
opt.old.call(this)}
};
return opt},
easing:{
linear:function(p,n,firstNum,diff){
return firstNum+diff*p},
swing:function(p,n,firstNum,diff){
return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum}
},
timers:[],
fx:function(elem,options,prop){
this.options=options;
this.elem=elem;
this.prop=prop;
if(!options.orig){
options.orig={}}
}
});
jQuery.fx.prototype={
update:function(){
if(this.options.step){
this.options.step.call(this.elem,this.now,this)}
(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this)},
cur:function(){
if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){
return this.elem[this.prop]}
var r=parseFloat(jQuery.css(this.elem,this.prop));
return r&&r>-10000?r:0},
custom:function(from,to,unit){
var self=this,
fx=jQuery.fx;
this.startTime=jQuery.now();
this.start=from;
this.end=to;
this.unit=unit||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
function t(gotoEnd){
return self.step(gotoEnd)}
t.elem=this.elem;
if(t()&&jQuery.timers.push(t)&&!timerId){
timerId=setInterval(fx.tick,fx.interval)}
},
show:function(){
this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);
this.options.show=true;
this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());
jQuery(this.elem).show()},
hide:function(){
this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)},
step:function(gotoEnd){
var t=jQuery.now(),done=true;
if(gotoEnd||t>=this.options.duration+this.startTime){
this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
for(var i in this.options.curAnim){
if(this.options.curAnim[i]!==true){
done=false}
}
if(done){
if(this.options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){
var elem=this.elem,
options=this.options;
jQuery.each(["","X","Y"],function(index,value){
elem.style["overflow"+value]=options.overflow[index]})}
if(this.options.hide){
jQuery(this.elem).hide()}
if(this.options.hide||this.options.show){
for(var p in this.options.curAnim){
jQuery.style(this.elem,p,this.options.orig[p])}
}
this.options.complete.call(this.elem)}
return false}else{
var n=t-this.startTime;
this.state=n/this.options.duration;
var specialEasing=this.options.specialEasing&&this.options.specialEasing[this.prop];
var defaultEasing=this.options.easing||(jQuery.easing.swing?"swing":"linear");
this.pos=jQuery.easing[specialEasing||defaultEasing](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()}
return true}
};
jQuery.extend(jQuery.fx,{
tick:function(){
var timers=jQuery.timers;
for(var i=0;i<timers.length;i++){
if(!timers[i]()){
timers.splice(i--,1)}
}
if(!timers.length){
jQuery.fx.stop()}
},
interval:13,
stop:function(){
clearInterval(timerId);
timerId=null},
speeds:{
slow:600,
fast:200,
_default:400
},
step:{
opacity:function(fx){
jQuery.style(fx.elem,"opacity",fx.now)},
_default:function(fx){
if(fx.elem.style&&fx.elem.style[fx.prop]!=null){
fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit}else{
fx.elem[fx.prop]=fx.now}
}
}
});
if(jQuery.expr&&jQuery.expr.filters){
jQuery.expr.filters.animated=function(elem){
return jQuery.grep(jQuery.timers,function(fn){
return elem===fn.elem}).length}}
function defaultDisplay(nodeName){
if(!elemdisplay[nodeName]){
var elem=jQuery("<"+nodeName+">").appendTo("body"),
display=elem.css("display");
elem.remove();
if(display==="none"||display===""){
display="block"}
elemdisplay[nodeName]=display}
return elemdisplay[nodeName]}
var rtable=/^t(?:able|d|h)$/i,
rroot=/^(?:body|html)$/i;
if("getBoundingClientRect"in document.documentElement){
jQuery.fn.offset=function(options){
var elem=this[0],box;
if(options){
return this.each(function(i){
jQuery.offset.setOffset(this,options,i)})}
if(!elem||!elem.ownerDocument){
return null}
if(elem===elem.ownerDocument.body){
return jQuery.offset.bodyOffset(elem)}
try{
box=elem.getBoundingClientRect()}catch(e){}
var doc=elem.ownerDocument,
docElem=doc.documentElement;
if(!box||!jQuery.contains(docElem,elem)){
return box||{top:0,left:0}}
var body=doc.body,
win=getWindow(doc),
clientTop=docElem.clientTop||body.clientTop||0,
clientLeft=docElem.clientLeft||body.clientLeft||0,
scrollTop=(win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop),
scrollLeft=(win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft),
top=box.top+scrollTop-clientTop,
left=box.left+scrollLeft-clientLeft;
return{top:top,left:left}}}else{
jQuery.fn.offset=function(options){
var elem=this[0];
if(options){
return this.each(function(i){
jQuery.offset.setOffset(this,options,i)})}
if(!elem||!elem.ownerDocument){
return null}
if(elem===elem.ownerDocument.body){
return jQuery.offset.bodyOffset(elem)}
jQuery.offset.initialize();
var computedStyle,
offsetParent=elem.offsetParent,
prevOffsetParent=elem,
doc=elem.ownerDocument,
docElem=doc.documentElement,
body=doc.body,
defaultView=doc.defaultView,
prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,
top=elem.offsetTop,
left=elem.offsetLeft;
while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){
if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){
break}
computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;
top-=elem.scrollTop;
left-=elem.scrollLeft;
if(elem===offsetParent){
top+=elem.offsetTop;
left+=elem.offsetLeft;
if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){
top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0}
prevOffsetParent=offsetParent;
offsetParent=elem.offsetParent}
if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){
top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0}
prevComputedStyle=computedStyle}
if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){
top+=body.offsetTop;
left+=body.offsetLeft}
if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){
top+=Math.max(docElem.scrollTop,body.scrollTop);
left+=Math.max(docElem.scrollLeft,body.scrollLeft)}
return{top:top,left:left}}}
jQuery.offset={
initialize:function(){
var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.css(body,"marginTop"))||0,
html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});
container.innerHTML=html;
body.insertBefore(container,body.firstChild);
innerDiv=container.firstChild;
checkDiv=innerDiv.firstChild;
td=innerDiv.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(checkDiv.offsetTop!==5);
this.doesAddBorderForTableAndCells=(td.offsetTop===5);
checkDiv.style.position="fixed";
checkDiv.style.top="20px";
this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);
checkDiv.style.position=checkDiv.style.top="";
innerDiv.style.overflow="hidden";
innerDiv.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);
this.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==bodyMarginTop);
body.removeChild(container);
body=container=innerDiv=checkDiv=table=td=null;
jQuery.offset.initialize=jQuery.noop},
bodyOffset:function(body){
var top=body.offsetTop,
left=body.offsetLeft;
jQuery.offset.initialize();
if(jQuery.offset.doesNotIncludeMarginInBodyOffset){
top+=parseFloat(jQuery.css(body,"marginTop"))||0;
left+=parseFloat(jQuery.css(body,"marginLeft"))||0}
return{top:top,left:left}},
setOffset:function(elem,options,i){
var position=jQuery.css(elem,"position");
if(position==="static"){
elem.style.position="relative"}
var curElem=jQuery(elem),
curOffset=curElem.offset(),
curCSSTop=jQuery.css(elem,"top"),
curCSSLeft=jQuery.css(elem,"left"),
calculatePosition=(position==="absolute"&&jQuery.inArray('auto',[curCSSTop,curCSSLeft])>-1),
props={},curPosition={},curTop,curLeft;
if(calculatePosition){
curPosition=curElem.position()}
curTop=calculatePosition?curPosition.top:parseInt(curCSSTop,10)||0;
curLeft=calculatePosition?curPosition.left:parseInt(curCSSLeft,10)||0;
if(jQuery.isFunction(options)){
options=options.call(elem,i,curOffset)}
if(options.top!=null){
props.top=(options.top-curOffset.top)+curTop}
if(options.left!=null){
props.left=(options.left-curOffset.left)+curLeft}
if("using"in options){
options.using.call(elem,props)}else{
curElem.css(props)}
}
};
jQuery.fn.extend({
position:function(){
if(!this[0]){
return null}
var elem=this[0],
offsetParent=this.offsetParent(),
offset=this.offset(),
parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();
offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;
offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;
parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;
parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;
return{
top:offset.top-parentOffset.top,
left:offset.left-parentOffset.left
}},
offsetParent:function(){
return this.map(function(){
var offsetParent=this.offsetParent||document.body;
while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){
offsetParent=offsetParent.offsetParent}
return offsetParent})}
});
jQuery.each(["Left","Top"],function(i,name){
var method="scroll"+name;
jQuery.fn[method]=function(val){
var elem=this[0],win;
if(!elem){
return null}
if(val!==undefined){
return this.each(function(){
win=getWindow(this);
if(win){
win.scrollTo(
!i?val:jQuery(win).scrollLeft(),
i?val:jQuery(win).scrollTop()
)}else{
this[method]=val}
})}else{
win=getWindow(elem);
return win?("pageXOffset"in win)?win[i?"pageYOffset":"pageXOffset"]:
jQuery.support.boxModel&&win.document.documentElement[method]||
win.document.body[method]:
elem[method]}
}});
function getWindow(elem){
return jQuery.isWindow(elem)?
elem:
elem.nodeType===9?
elem.defaultView||elem.parentWindow:
false}
jQuery.each(["Height","Width"],function(i,name){
var type=name.toLowerCase();
jQuery.fn["inner"+name]=function(){
return this[0]?
parseFloat(jQuery.css(this[0],type,"padding")):
null};
jQuery.fn["outer"+name]=function(margin){
return this[0]?
parseFloat(jQuery.css(this[0],type,margin?"margin":"border")):
null};
jQuery.fn[type]=function(size){
var elem=this[0];
if(!elem){
return size==null?null:this}
if(jQuery.isFunction(size)){
return this.each(function(i){
var self=jQuery(this);
self[type](size.call(this,i,self[type]()))})}
if(jQuery.isWindow(elem)){
return elem.document.compatMode==="CSS1Compat"&&elem.document.documentElement["client"+name]||
elem.document.body["client"+name]}else if(elem.nodeType===9){
return Math.max(
elem.documentElement["client"+name],
elem.body["scroll"+name],elem.documentElement["scroll"+name],
elem.body["offset"+name],elem.documentElement["offset"+name]
)}else if(size===undefined){
var orig=jQuery.css(elem,type),
ret=parseFloat(orig);
return jQuery.isNaN(ret)?orig:ret}else{
return this.css(type,typeof size==="string"?size:size+"px")}
}})})(window);


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


