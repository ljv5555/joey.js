/* joey.js - (C) 2014 https://github.com/ljv5555/joey.js */
/* This software may be used under the terms of the LGPL2.1 - see http://ljv5555.github.io/joey.js/LICENSE */
window.joey=(function(){
  var rtn = {};
  var when=function(condition,callback,cbparams)
  {
      if("function"!=typeof(condition))
      {
        var conditionstr = ''+condition;
        condition=function(){return eval(conditionstr);}
      }
      if("function"!=typeof(callback))
      {
        var callbackstr = ''+callback;
        callback=function(){return eval(callbackstr);}
      }
      if(condition()){callback(cbparams);}
      else
      {
        setTimeout(function(){when(condition,callback,cbparams);},100);
      }
  };
  rtn.when=when;
  
  /**
   * adds script tag as the last element in the parent node of the last script tag
   * the script will load async. if a callback is provided, to load async. w/o callback, pass in 
   * an empty function as the callback:    getXsS(url,false,function(){});
   **/ 
  var getXsS = function(url,donotpreventcache,callback)
  {
    if(donotpreventcache){donotpreventcache=true;}else{donotpreventcache=false;}
    var ss = 's' + 'cr' + 'ip' + 't';
    var cst = document.getElementsByTagName(ss)[document.getElementsByTagName(ss).length-1];
    var e=document.createElement(ss);
    var tsstr = '';
    if(donotpreventcache===false)
    {
      var ts = (new Date()).getTime();
      tsstr = '_ts1_='+ts;
      if((''+url).indexOf('?')==-1){tsstr='?'+tsstr;}else{tsstr='&'+tsstr;}
    }
    var url2 = url+tsstr;
    if(callback && typeof(callback)=='function')
    {
      //e.innerHTML
      var v1="<"+ss+" async=\"async\" onload="
        +JSON.stringify(callback.name+"();")+" src="
        +JSON.stringify(url2)+"></"+ss+">";
      v1 = "document.write("+JSON.stringify(v1)+");";
      console.log('v1='+v1+'_________');
    }
    else
    {
      e.src=url2;
    }
    cst.parentElement.appendChild(e,cst);
  };
  rtn.getXsS=getXsS;

  return rtn;
})();
