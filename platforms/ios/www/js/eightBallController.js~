$(function(){
    var eightBallController = {
        __name : 'jp.co.nssol.demo.ball.eightBallController',

        _shakeController : jp.co.nssol.demo.ball.ShakeController,
        eightBallLogic : jp.co.nssol.demo.ball.eightBallLogic,

        _$fortuneWindow : null,
        _waterSound : null,


        __ready : function(){
            this.eightBallLogic.init();
            this._$fortuneWindow = this.$find('.fortuneWindow');
            this._$ballContainer = this.$find('.ballContainer');
        },
        '.ball touchend' : function(context, $el){
            this.$find('.ball').each(function(){
                $(this).toggleClass('flipped');
            });
        },

        '{rootElement} shake' : function (context, $el) {
            this.eightBallLogic.playAudio();
            var fortune = this.eightBallLogic.getFortune();
            this._$fortuneWindow.html(
                $('<div class="fortune"></div>')
                .text(fortune)
                .css(
                    {'opacity':0, 'top' : "55%"})
            ).promise().done(function(){
                $('.fortune').delay(400).animate(
                    {'opacity':1, 'top' : "50%"},{'duration': 800,'easing':'swing'}
                );
            });
        },
        '{rootElement} move' : function (context, $el) {
            var ac = context.evArg;

            var x = ac.x;
            var y = ac.y;

            var xCss = {'transform' : 'translateX(' + x + '%)'
             + ' translateY(' + y + '%)'}
            this._$ballContainer.css(xCss);
        },
        '{document} deviceready' : function (context, $el) {
            this._waterSound = new Media('res/sound/water.wav');
        }
    };
    h5.core.controller('#eightBallContents', eightBallController);
    h5.core.expose(eightBallController);
});
