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
   **/ 
  var getXsS = function(url,donotpreventcache)
  {
    if(donotpreventcache){donotpreventcache=true;}else{donotpreventcache=false;}
    var ss = 's' + 'cr' + 'ip' + 't';
    var cst = document.getElementsByTagName(ss)[document.getElementsByTagName(ss).length-1];
    var e = document.createElement(ss);
    e.async='async';
    var tsstr = '';
    if(donotpreventcache===false)
    {
      var ts = (new Date()).getTime();
      tsstr = '_ts1_='+ts;
      if((''+url).indexOf('?')==-1){tsstr='?'+tsstr;}else{tsstr='&'+tsstr;}
    }
    var url2 = url+tsstr;
    e.src=url2;
    cst.parentNode.parentElement.appendChild(e);
  };

  return rtn;
})();
