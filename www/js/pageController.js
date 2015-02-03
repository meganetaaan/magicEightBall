$(function(){
    var pageController = {
        __name : 'jp.co.nssol.demo.ball.pageController',
        _eightBallController : jp.co.nssol.demo.ball.eightBallController,

        _$navbar : null,
        __ready : function(){
            this._$navbar = this.$find('.navbar');
        },

        '.langButton click' : function(context, $el){ //TODO: iosではtouchendイベントを使うようにする
            this.log.debug($el.text(), this.__name);
            this._eightBallController.changeLang($el.text());
            if(this.$find('.navbar-toggle').is(":hidden")){
              } else {
                  this.$find('.navbar-toggle').click();
              }
        },

        '.navbar .externalLink li>a click' : function(context, $el){
            this.log.debug($el);
            context.event.preventDefault();
            var url = $el.attr("href");
            var ref = window.open(url, '_blank','location=yes');
        },

        '.navbar-toggle click' : function(context, $el){
            this._$navbar.toggleClass("shadow-z-1");
            this._$navbar.toggleClass("shadow-z-5");
        }
    };

    h5.core.controller('body', pageController);
});
