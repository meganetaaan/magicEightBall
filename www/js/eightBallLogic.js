$(function(){
    var eightBallLogic = {
        __name : 'jp.co.nssol.demo.ball.eightBallLogic',

        _FORTUNE_JSON_PATH : "res/json/fortunes_en.json",
        _langPathHash : {
            'English' : "res/json/fortunes_en.json",
            '関西弁' : "res/json/fortunes_kan.json"
        },

        initialMsg : null,
        _fortunes : null,

        init : function(lang){
            var jsonPath = this._langPathHash[lang];
            if(typeof(jsonPath) === 'undefined'){
                jsonPath = this._FORTUNE_JSON_PATH;
            }
            var df = this.deferred();
            var that = this;
            $.ajax({
                url: jsonPath,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    that.initialMsg = data.initialMsg;
                    that._fortunes = data.fortunes;
                    df.resolve(that.todos);
                },
                error: function() {
                    console.log('サンプルデータの読み込みに失敗しました。');
                }
            });
            return df.promise();
        },

        _getRandomArbitary: function (min, max) {
            return Math.random() * (max - min) + min;
        },

        getFortune : function(){
            var i = Math.floor(this._getRandomArbitary(0, this._fortunes.length));
            return this._fortunes[i];
        },

        getInitialMsg : function(){
            return this.initialMsg;
        },
        playAudio : function() {
            var my_media = new Media('res/sound/water.wav',
                                     // success callback
                                     function () { console.log("playAudio():Audio Success"); },
                                     // error callback
                                     function (err) { console.log("playAudio():Audio Error: " + err); }
                                    );
                                    // Play audio
                                    my_media.play();
        },
        _getPhoneGapPath : function() {

            var path = window.location.pathname;
            path = path.substr( 0, path.length - 10 );
            return 'file://' + path;
        }
    };
    h5.core.expose(eightBallLogic);
});
