var ideasLogic = {

  __name: 'ideasLogic',

  adjectives: [
  'かわいい',
  '卑猥な',
  '乾いた',
  '腐った',
  'きらきらした',
  '真面目な',
  '美しい',
  'ぶっちゃけた',
  '透き通った',
  '面白い'
  ],

  nouns: [
  'いぬ',
  'ねこ',
  'カメラ',
  'りんご',
  '俳優',
  'ビール',
  'めがね',
  'ひよこ',
  'スマホ',
  'ビスケット',
  'ペンギン'
  ],

  _getRandomArbitary: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  getIdea: function(){
    var adjIdx = Math.floor(this._getRandomArbitary(0, this.adjectives.length));
    var nounIdx = Math.floor(this._getRandomArbitary(0, this.nouns.length));
    return this.adjectives[adjIdx] + this.nouns[nounIdx];
  }
}
