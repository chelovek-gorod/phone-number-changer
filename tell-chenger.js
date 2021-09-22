(function($) {
    $.fn.changeData = function(options) {
        var settings = {
            urlParam: null,
            nameCookie: null,
            paramList: null,
            newText: null,
            newHref: null
        };

        return this.each(function() {
            if (options) {
                $.extend(settings, options);
            }

            function getCookie(name) {
                var cookie = " " + document.cookie;
                var search = " " + name + "=";
                var setStr = null;
                var offset = 0;
                var end = 0;
                if (cookie.length > 0) {
                    offset = cookie.indexOf(search);
                    if (offset != -1) {
                        offset += search.length;
                        end = cookie.indexOf(";", offset);
                        if (end == -1) {
                            end = cookie.length;
                        }
                        setStr = unescape(cookie.substring(offset, end));
                    }
                }
                return(setStr);
            }

            function setCookie(name, valCookie) {
                document.cookie = name+"=; expires=; path=/";
                expires = new Date();
                expires.setTime(expires.getTime() + 622229959999);
                document.cookie = name+"=" + valCookie + "; expires=" + expires.toGMTString() + "; path=/"
            }

            function parseGetParams(peremennya) {
                var getURl = window.location.search.substring(1);
                var peremennii = getURl.split("&");
                for (var i=0; i<peremennii.length; i++) {
                    var pair = peremennii[i].split("=");
                    if (pair[0] == peremennya) {
                        return pair[1];
                    }
                }
                return(false);
            }

            var param = parseGetParams(settings.urlParam);

            if (settings.paramList.indexOf(param)!=-1) {
                setCookie(settings.nameCookie, param);
            }
            var param_cookie = getCookie(settings.nameCookie);
            for(var i=0; i<settings.paramList.length; i++){
                if ((param_cookie == settings.paramList[i]) || (param == settings.paramList[i])) {
                    $(this).text(settings.newText[i]);
                    $(this).attr("href", settings.newHref[i]);
                }
            }
        })
    };
})(jQuery);

$(function() {

     $('#phone').changeData({
         urlParam: 'utm_campaign',
         nameCookie: 'utm_campaign_change',
         paramList: [
             '1',
             '2',
             '3',
             '4'
         ],
         newText: [
            '+375 (29) 111 - 11 - 11',
            '+375 (29) 222 - 22 - 22',
            '+375 (29) 333 - 33 - 33',
            '+375 (29) 444 - 44 - 44' 
         ],
         newHref: [
            'tel:+375 (29) 111 - 11 - 11',
            'tel:+375 (29) 222 - 22 - 22',
            'tel:+375 (29) 333 - 33 - 33',
            'tel:+375 (29) 444 - 44 - 44' 
         ]
    });
//alert('телефоны заменены');
});

/*
   //проверяем содержимое контейнера PHONE
    var stringPhone = document.getElementById("str-phone");
    alert('Switch запущен');
    switch (stringPhone) {
    
        case '+375 (29) 111 - 11 - 11' : document.getElementById("hr-phone").href = 'tel: +375 (29) 111 - 11 - 11'; alert('1'); break;
        case '+375 (29) 222 - 22 - 22' : document.getElementById("hr-phone").href = 'tel: +375 (29) 222 - 22 - 22'; alert('2'); break;
        case '+375 (29) 333 - 33 - 33' : document.getElementById("hr-phone").href = 'tel: +375 (29) 333 - 33 - 33'; alert('3'); break;
        case '+375 (29) 444 - 44 - 44' : document.getElementById("hr-phone").href = 'tel: +375 (29) 444 - 44 - 44'; alert('4'); break;
        
        default : document.getElementById("hr-phone").href = 'tel: +375 (29) 000 - 00 - 00'; alert('0');
    
    }
*/