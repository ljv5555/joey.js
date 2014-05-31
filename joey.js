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
  
  return rtn;
})();
