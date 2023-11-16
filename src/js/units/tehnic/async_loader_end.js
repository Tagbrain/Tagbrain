const { gEBI } = require("../compress_f");

let Loader = function () { }
Loader.prototype = {
    require: function (script00s_L_obj00s, callback) {
        this.loadCount      = 0;
        this.totalRequired  = script00s_L_obj00s.length;
        this.callback       = callback;
        for (let i = 0; i < script00s_L_obj00s.length; i++) {
            if(gEBI(script00s_L_obj00s[i].id) == false){
                this.writeScript(script00s_L_obj00s[i]);
            } else {
                gEBI(script00s_L_obj00s[i].id).remove();
                this.writeScript(script00s_L_obj00s[i]);
            }
        }
    },
    loaded: function (evt) {
        this.loadCount++;
        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function (script_L_obj) {
        let self = this;
        let s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = script_L_obj.path;
        s.id = script_L_obj.id;
        s.addEventListener('load', function (e) { 
            self.loaded(e); 
        }, false);
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}

module.exports = Loader;
