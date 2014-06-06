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
  var getXsS = function(url,donotpreventcache)
  {
    if(donotpreventcache){donotpreventcache=true;}else{donotpreventcache=false;}
    var ss = 's' + 'cr' + 'ip' + 't';
    var cst = document.getElementsByTagName(ss)[document.getElementsByTagName(ss).length-1];
    var tsstr = '';
    if(donotpreventcache===false)
    {
      var ts = (new Date()).getTime();
      tsstr = '_ts1_='+ts;
      if((''+url).indexOf('?')==-1){tsstr='?'+tsstr;}else{tsstr='&'+tsstr;}
    }
    var url2 = url+tsstr;
    var e=document.createElement(ss);
    e.src=url2;
    cst.parentElement.appendChild(e,cst);
  };
  rtn.getXsS=getXsS;

  return rtn;
})();


//
//	/**
//	 * 
//	 * @returns
//	 */
//    var getUrlParams = function() {
//        var query = window.location.search;
//        var re = /([^&=]+)=?([^&]*)/g;
//        var decode = function(str){return decodeURIComponent(str.replace(/\+/g, ' '));};
//        var params = {}, e;
//        if (query) {
//            if (query.substr(0, 1) == '?') {
//                query = query.substr(1);
//            }
//
//            while (e = re.exec(query)) {
//                var k = decode(e[1]);
//                var v = decode(e[2]);
//                if (params[k] !== undefined) {
//                    if (!jQuery.isArray(params[k])) {
//                        params[k] = [params[k]];
//                    }
//                    params[k].push(v);
//                } else {
//                    params[k] = v;
//                }
//            }
//        }
//        return params;
//    };
//
//
//    var getIdsFromUrl = function()
//    {
//        var rtn = [];
//        var urlp = getUrlParams();
//        if(urlp.state)
//        {
//            var state=JSON.parse(urlp.state);
//            if(state.ids){ rtn=state.ids; }
//        }
//        return rtn;
//    };
//    
//    var filterFoldersShown = function()
//    {
//    	jQuery("*[data-folder-ids]").slideUp(1); 
//    	_.each(getIdsFromUrl(),function(e){jQuery("*[data-folder-ids*='"+e+"']").slideDown().attr('data-folder-filter-result','1');});
//    };
//    /**
//     * 
//     * @param o
//     * @returns
//     */
//	var log = function(o) {
//		try {
//			console.log(o);
//		} catch (e) {
//		}
//	};
//
//	var atoken = null;
//	if (access_token) {
//		atoken = accessToken;
//		jQuery('.token').text(atoken);
//	}
//
//	/**
//	 * 
//	 */
//	this.getToken = function() {
//		return atoken;
//	}
//	/**
//	 * 
//	 */
//	this.setToken = function(t) {
//		atoken = t;
//		jQuery('.token').text(atoken);
//	}
//
//	/**
//	 * 
//	 * @param url
//	 * @param callback
//	 * @param errorCallback
//	 * @param requestParameters
//	 * @param doNotSend
//	 * @returns
//	 */
//	var getRequest = function(url, callback, errorCallback, requestParameters, doNotSend) {
//		var xhr = new XMLHttpRequest();
//		if (requestParameters) {
//			if (url.indexOf('?') == -1) {
//				url = url + '?';
//			} else {
//				url = url + '&';
//			}
//			url = url + jQuery.param(requestParameters);
//		}
//		xhr.open('GET', url);
//		xhr.setRequestHeader('Authorization', 'Bearer ' + atoken);
//		xhr.onload = function() {
//			callback(xhr.responseText);
//		};
//		if (errorCallback) {
//			xhr.onerror = function(p) {
//				errorCallback(p);
//			};
//		} else {
//			xhr.onerror = function(p) {
//				alert('Request error: \n' + url + '\nSee console log.');
//				try {
//					console.log(p);
//				} catch (ex) {
//				}
//			};
//		}
//		if( !doNotSend ){xhr.send();}
//		return xhr;
//	};
//
//	/**
//	 * 
//	 * @param url
//	 * @param callback
//	 * @param errorCallback
//	 * @param requestParameters
//	 * @param doNotSend
//	 * @returns
//	 */
//	var getJSON = function(url, callback, errorCallback, requestParameters, doNotSend) 
//	{
//		return getRequest(url, function(e){callback(JSON.parse(e))}, errorCallback, requestParameters, doNotSend);
//	};
//
//	/**
//	 * Synchronous get request
//	 * @param urlToGet
//	 * @param parametersToUse
//	 * @returns
//	 */
//	var sGetRequest = function( urlToGet, parametersToUse )
//	{
//		if( !parametersToUse ){ parametersToUse = {}; }
//		var rtn = '';
//		try{
//		log('running sGetRequest("'+urlToGet+'",'+JSON.stringify(parametersToUse)+");");
//		rtn = jQuery.ajax({
//		   url:urlToGet,
//		   data:parametersToUse,
//		   async:false,
//		   headers:{'Authorization': ('Bearer ' + gapi.auth.getToken().access_token)}
//		   }).responseText;
//		   log('returning: ');
//		   log(''+rtn);
//		}catch(e)
//		{
//			//if(error){error('Error: '+e.message);}
//			log('Error: ');
//			log(''+e.message);
//		}
//		return rtn;
//	};
//	var sGetJSON = function(urlToGet, parametersToUse)
//	{ 
//		return JSON.parse(sGetRequest( urlToGet, parametersToUse ) );
//	};
