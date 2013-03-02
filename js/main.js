var _doc = _doc;// _docオブジェクトをキャッシュさせて高速化

// --------------------------------------
//   各ページで使う共通のスクリプト（</body>直前）
//   要jQueryのものが多い
// -------------------------------------

// ・目次が自動で生成される
// ・このページの最上部に戻るリンクは、.pagetop a
// ・1つのa子要素を含む親要素に .clickable クラスを付加すると、親要素クリックでリンクできる
// ・テーブルの奇数行に oddクラスが付加される
// ・フォーカスしているフォームのラベルには labelfocusクラスが付加される


// ★PC・スマートフォンからのアクセスでCSS切替え（メディアクエリは別にする）
// 参考：http://blog.webcreativepark.net/2012/04/19-120731.html

// ・PCでアクセスした場合、PC用のCSSを読み込む
// ・スマートフォンでアクセスした場合、スマートフォン用のCSSを読み込む
// ・スマートフォンでのアクセス時、「PCサイト表示」ボタンを表示。
// 　それがクリックされると、スマートフォンでPC用のCSSを適用させる。
// ・PC用のサイトをスマートフォンで見た場合のみ、「スマートフォン表示」ボタンを表示。
// 　これがクリックされるとスマートフォン用のCSSを適用させる。


// !!目次の生成。引数に目次にしたい要素を指定できる（※ページ内スムーススクロール スクリプトの前に記述すること）
// ★改良案：スムーススクロール スクリプトの後でも機能するように On()使う
// 参考：http://www.jankoatwarpspeed.com/examples/table-of-contents/demo1.html#title3


var generateTableOfContents = function(headers){
  headers = headers || $('.article_body > section > h2');//デフォルト値
  if(headers.size() > 0){
  var elm = $('<ul />');
  headers.each(function(i){
    var current = $(this);
    current.attr('id', 'chapter_' + i);
    elm.append('<li><a href="#chapter_' + i + '">' + current.html() + '</a></li>');
  });
  if($('#pages_of_reference').size() > 0){
    elm.append('<li><a href="#pages_of_reference">参考させていただいたサイト様</a></li>');
  }
  $('#table_of_contents')
    .append('<h1>このページの目次 <small>クリックで該当箇所に移動</small></h1>')
    .append(elm);
  return false;
  }
  else {
    $('#table_of_contents').css('display', 'none');
  }
};
$(function(){
  generateTableOfContents();//目次にしたい要素を指定。デフォルトは .article_body > section > h2
});


// !!ページ内スムーススクロール
// 参考元：http://www.coolwebwindow.com/weblife_column/coolweb/000301.php
$(function(){
  $('a[href^=#],area[href^=#]').click(function(){//#で始まるアンカー
  var speed = 400;//スクロールの速度（ミリ秒）
  var href= $(this).attr('href');//アンカーの値取得
  var target = $(href === '#' || href === '' ? 'html' : href);//移動先を取得
  var position = target.offset().top;//移動先を数値で取得

  //スムーススクロール。Safariの場合はbody、その他はhtml
  var ua = navigator.userAgent;
  var isSafari = /Safari/.test(ua);
  $(isSafari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');

  return false;
  });
});





// http://www.webcreatorbox.com/tech/jquery-tips20/ より
//------------------------------------------------------------

// !!ページTOPへスクロールで戻る
$(function(){
  $('.pagetop a').click(function(){
  $('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 'slow', 'swing');
  return false;
  });
});

// !!外部リンクに target="_blank" を追加 ★相対パスにしてから有効にする
//$(function(){
//  $("a[href^='http://']").attr("target","_blank");
//});

// !!画像リンクが切れてたら、代替え画像を表示　☆エラー
/*
$(function () {
  $('img').error(function(){
  $(this).attr({src:'common-images/missing.jpg',alt:'画像が見つかりません'});
  });
});
*/

// !!a要素（※1つのみ）を含む要素をクリックでリンクさせる（スマートフォンなどで有効）
// 1つのa子要素を含む親要素に .clickable クラスを付加
$(function(){
  $('.clickable').click(function(){
  window.location = $(this).find('a').attr('href');
  return false;
  });
});

// !!テーブルの奇数行にクラス付加→スタイリング
// CSSの nth-child で処理するなら不要
$(function(){
  $('tr:odd').addClass('odd');
});

// !!フォーカスしているフォームのラベルにクラス付加 ★スクリプトが遅くなると警告→修正
//$(function (){
//  $('form :input').focus(function() {
//  $('label[for="' + this.id + '"]').addClass('labelfocus');
//  });
//  $('form :input').blur(function() {
//  $('label[for="' + this.id + '"]').removeClass('labelfocus');
//  });
//});

// !!フォームにテキストを入れておき、フォーカスで消す（サンプル。適宜作成）
// ★クラス化
$(function(){
  $('.focus').focus(function(){
  if(this.value === 'キーワードを入力'){
    $(this).val('').css('color', '#000');
  }
  });
  $('.focus').blur(function(){
  if(this.value === ''){
    $(this).val('キーワードを入力').css('color', '#999');
  }
  });
});

// !!テキストエリアの入力文字数をカウント。最大値以上なら赤字（サンプル。適宜作成）
// ★クラス化
$(function(){
  $('textarea').keyup(function(){
  var counter = $(this).val().length;
  $('#countUp').text(counter);
  if(counter === 0){
    $("#countUp").text('0');
  }
  if(counter >= 10){
    $('#countUp').css('color', 'red');
  }
  else {
    $('#countUp').css('color', '#333');
  }
  });
});


// !!中央センター表示（モーダルウインドウなどで使用）
// -------------------------------------
//中央に表示（fixCenterMiddle('#foo','#header, #body');で実行）
var fixCenterMiddle = function(elm, wrapTarget){//中央表示させたい要素, 基準となる要素
  if (!(elm instanceof jQuery)) { elm = $(elm); }
  var windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
  var top  = Math.floor((windowHeight - elm.outerHeight()) / 2);
  //alert($(window).height() + ', ' + elm.outerHeight());//★iPhoneで、356-332=24pxになる。タテは480pxのはず
  var left = Math.floor(($(window).width() - elm.outerWidth()) / 2);
  elm.css({ 'top':top, 'left':left });
  //IE6で position:fixd 相当の処理
  if(typeof window.addEventListener === "undefined" && typeof _doc._docElement.style.maxHeight === "undefined"){
    $(wrapTarget).wrapAll('<div id="cover" />');//bodyタグ内側の固定する要素以外全てを包む要素。該当する要素を指定。IE6 で position:fixed 相当の処理をさせるために必要
    $('html, html body').css({
      'height': '100%',
      'overflow-y': 'hidden',
      'overflow-x': 'auto'
    });
    $('html #cover').css({
      'overflow': 'auto',
      'position': 'relative',
      'width': '100%',
      'height': '100%'
    });
    elm.css({ 'position': 'absolute' });
  }
};


// !!モーダルウインドウ（メニュー用、jQuery非使用）
// -------------------------------------
//★★Android対応、メニュー表示時にバックを visibilily: hidden; でいける？？
//本家チュートリアル：http://www.queness.com/post/77/simple-jquery-modal-window-tutorial
//functions.js、style.cssに記述
//上記の中央センター表示させる fixCenterMiddle() 関数を使う
//ドットシンタックスで最適化、変数にプレフィックス付けた。マスクがずれる不具合を解消した。EnterでなくESCキーでウインドウ閉じるようにした。
//モダンブラウザ、iPhone、IE8 O．K．★IE6はうまく機能しない→修正

// #menu_button
// #menu_modal_window_boxes
// #menu_modal_window_mask
// #menu_modal_window_dialog
// #menu_modal_window_window
// #menu_modal_window_close

$(function() {

  $('#menu_modal_window_button').click(function(e) {

    var elm = $('#menu_modal_window_dialog');

    //全体の高さとウインドウ幅を取得(1)
    var maskHeight = $(_doc).height();
    var maskWidth = $(window).width();

    //(1)を覆う#maskの設定、表示
    $('#menu_modal_window_mask')
      .css({ 'width':maskWidth, 'height':maskHeight })
      .fadeIn(1000)
      .fadeTo('slow', 0.8);

    //中央表示
    fixCenterMiddle(elm, '#container');

    //モーダルウインドウをセンター表示
    elm.fadeIn(2000);
    if (e.target) { e.preventDefault(); } else { return false; }

    //★★iScroll（options: http://cubiq.org/iscroll-4）Androidのみ
    var agent = navigator.userAgent;
    if(agent.search(/Android/) !== -1 && typeof(iScroll) !== "undefined") {
      $.each(
        elm,function(){//$('#menu_modal_window_dialog')
          new iScroll(this,{
            bounce: false,
            fixedScrollbar: true,
            lockDirection: true
            //,onBeforeScrollStart: function(){}
          });
        }
      );
    }

  });

  //閉じるボタン
  $('#menu_modal_window_close').click(function (e) {
    $('#menu_modal_window_mask, #menu_modal_window_dialog').hide();
    if (e.target) { e.preventDefault(); } else { return false; }
  });

  //モーダルウインドウ表示中、背景（#mask）をクリックで閉じる
  $('#menu_modal_window_mask').click(function () {
    $(this).hide();
    $('#menu_modal_window_dialog').hide();
  });

  //ウインドウリサイズ時に再計算
  $(window).resize(function () {
    var box = $('#menu_modal_window_dialog');

    var maskHeight = $(_doc).height();
    var maskWidth = $(window).width();
    var elmPadding = parseInt(box.css('padding'), 10);

    $('#menu_modal_window_mask').css({'width':maskWidth, 'height':maskHeight});

    //中央になる場合のx,y座標（ウインドウの高さと幅 - 要素自身の幅の半分）
    var topPoint = Math.floor(($(window).height() - box.height()) / 2 - elmPadding);
    var leftPoint = Math.floor(($(window).width() - box.width()) / 2 - elmPadding);

    //モーダルウインドウをセンター表示
    box.css({ 'top':topPoint, 'left':leftPoint });
  });

  //キー入力でモーダルウインドウ閉じる
  $(_doc).keyup(function(e) {
    if(e.keyCode === 27) {//13はESCキー（キー一覧：http://www.accessclub.jp/samplefile/help/help_154_1.htm）
      $('#menu_modal_window_dialog').hide();
    }
  });

});



// !!モーダルウインドウ（一般用、jQuery非使用）
// -------------------------------------
//本家チュートリアル：http://www.queness.com/post/77/simple-jquery-modal-window-tutorial
//functions.js、style.cssに記述
//上記の中央センター表示させる fixCenterMiddle() 関数を使
//ドットシンタックスで最適化、変数にプレフィックス付けた。マスクがずれる不具合を解消した。EnterでなくESCキーでウインドウ閉じるようにした。
//モダンブラウザ、iPhone、IE8 O．K．★IE6はうまく機能しない→修正

$(function() {

  $('a[name=modal]').click(function(e) {
    var id = $(this).attr('href');//Get the A tag
    var elm = $(id);//該当idの要素をjQueryオブジェクトに

    //全体の高さとウインドウ幅を取得(1)
    var maskHeight = $(_doc).height();
    var maskWidth = $(window).width();

    //(1)を覆う#maskの設定、表示
    $('#modal_window_mask')
      .css({ 'width':maskWidth, 'height':maskHeight })
      .fadeIn(1000)
      .fadeTo("slow", 0.8);

    //中央表示
    fixCenterMiddle(elm, '#container');

    //モーダルウインドウをセンター表示
    elm.fadeIn(2000);
    if (e.target) { e.preventDefault(); } else { return false; }
  });

  //閉じるボタン
  $('.modal_window_window .modal_window_close').click(function (e) {
    $('#modal_window_mask, .modal_window_window').hide();
    if (e.target) { e.preventDefault(); } else { return false; }
  });

  //モーダルウインドウ表示中、背景（#mask）をクリックで閉じる
  $('#modal_window_mask').click(function () {
    $(this).hide();
    $('.modal_window_window').hide();
  });

  //ウインドウリサイズ時に再計算
  $(window).resize(function () {
    var box = $('#modal_window_boxes .modal_window_window');

    var maskHeight = $(_doc).height();
    var maskWidth = $(window).width();
    var elmPadding = parseInt(box.css('padding'), 10);

    $('#modal_window_mask').css({'width':maskWidth, 'height':maskHeight});

    //中央になる場合のx,y座標（ウインドウの高さと幅 - 要素自身の幅の半分）
    var topPoint = Math.floor(($(window).height() - box.height()) / 2 - elmPadding);
    var leftPoint = Math.floor(($(window).width() - box.width()) / 2 - elmPadding);

    //モーダルウインドウをセンター表示
    box.css({ 'top':topPoint, 'left':leftPoint });
  });

  //キー入力でモーダルウインドウ閉じる
  $(_doc).keyup(function(e) {
    if(e.keyCode === 27) {//13はESCキー（キー一覧：http://www.accessclub.jp/samplefile/help/help_154_1.htm）
      $('#modal_window_mask, .modal_window_window').hide();
    }
  });

  //URLアクセス時に実行させたい場合
  //function launchWindow(id) {
  //  var maskHeight = $(_doc).height();
  //  var maskWidth = $(window).width();
  //
  //  $('#modal_window_mask')
  //    .css({'width':maskWidth,'height':maskHeight})
  //    .fadeIn(1000)
  //    .fadeTo("slow",0.8);
  //
  //  var winH = $(window).height();
  //  var winW = $(window).width();
  //
  //  $(id)
  //    .css('top',  winH/2-$(id).height())
  //    .css('left', winW/2-$(id).width()/2)
  //    .fadeIn(2000);
  //}
  ////実行
  //launchWindow('#modal_window_dialog2');//idは表示したいモーダルウインドウのID

  //他、Cookieを使って設定保存したりもできる
});


// !!メニュー表示/非表示 #sidebar（モバイル幅のみ表示）
// -------------------------------------
$(function(){
  var menuDisp = 0;

  $('#menu_button').click(function(){
    if(menuDisp === 0){
      $('#sidebar').show('fast');
      menuDisp = 1;
    }
    else {
      $('#sidebar').hide('fast');
      menuDisp = 0;
    }
  });

});



// !!Topページの画像スライドショー
// -------------------------------------
//元：http://snook.ca/archives/javascript/simplest-jquery-slideshow
$(function(){
  //設定
  var switchDelay = 6000;//表示時間（ミリ秒 = 1/1000秒） 7000くらいがいいか？
  var fadeSpeed = 3000;//切り替え速度（ミリ秒）
  var imgArea = $('#change_img_area');//切り替え画像を包む要素
  var images = imgArea.children('img');//切り替える画像を要素セットに（配列。これもjQueryオブジェクト）

  //中央センター表示させるためのマージンを計算し設定
  images
    .each(function(){
      $(this).css({
        //'top' : Math.floor((imgArea.height() - $(this).outerHeight()) / 2),//タテを包括要素の上辺に揃えたければこの行をコメントアウト
        'top' : '35px',
        'left': Math.floor((imgArea.width()  - $(this).outerWidth())  / 2)
      });
    });

    //最初の画像を表示（中央センター揃えの後に描かないと、初め0,0に表示されてしまう）
    imgArea.find('img:first-child').css('display','block');

    //ie対策 パッと変わるのを直すコード（試す）
    //$(".hogehoge").css("position", "static").fadeIn("normal", function(){
    //  $(".hogehoge").css("position", "relative");
    //});

  //実行
  setInterval(//一定時間ごとに実行
    function(){
      imgArea
        .find('img:first-child')//１番目の画像を
        .fadeOut(fadeSpeed)//フェードアウト（1番目の画像はDOMから消える）
        .next()//現在位置を次の兄弟要素へ移動
        .fadeIn(fadeSpeed)//フェードイン
        .end()//現在位置を元（DOMから消えた1番目の画像）へ戻して・・・
        .appendTo(imgArea);//imgAreaの最後（最後の画像の後）に付け足す → ループ
    }, switchDelay
  );
});



// !!印刷用 print.js
// -------------------------------------
/* ページ内の印刷ボタン（.printer）が押された時だけprint.cssを適応する */
/* 別途 print.css で印刷時の CSS を設定し、セットで使う */
/* 参照元：http://snippet-editor.com/2010/08/2way-print-css.html */
$(function(){
  $('.printer').click(function(){//.printer(印刷ボタン)が押されたら
  $('body').addClass('print');//body classに"print"を追加
  window.print();//印刷を実行
  //var timeout = setTimeout(function(){
  setTimeout(function(){
    $('body').removeClass('print');//1秒後に bodyタグの class "print" を削除
  }, 1000);
  return false;
  });
});


// !!納期表示
// -------------------------------------
/* 更新は php で */

  jQuery.ajax({
    url : "http://nigaoe-yui.com/cgi-bin/date_of_delivery/data.txt",
    type : "get",
    success : function(data){
      var data_sitei = parseInt(data,10) + 3;//指定日
      $('#date_of_delivery').text(data);
      $('#date_of_delivery2').text(data);
      $('#date_of_delivery_sitei').text(data_sitei);
    }
  });



//Tumblrボタン（本家サイトより http://platform.tumblr.com/v1/share.js）
// -------------------------------------------------------------
//投稿時リンク、引用、画像、動画のいずれかを指定ことも可能（JavaScript追加記述必要）
/*
$(function(){
  eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('6 8=C.8||{};(7(){8.G=7(A){6 c=A.g.m(/(D.)?r(\\.B)?(\\:\\d{2,4})?\\/y(.+)?/i);c=(c[4]!==15&&c[4].O>1);6 d=h,w=C,e=w.N,k=d.N,x=d.16,s=(e?e():(k)?k():(x?x.14().13:0)),f=\'Z://D.r.B/y\',l=d.11,e=12,p=\'?v=3&u=\'+e(l.g)+\'&t=\'+e(d.17)+\'&s=\'+e(s),u=f+p;5(c){u=A.g}M{5(!/^(.*\\.)?r[^.]*$/.9(l.18))1d(0);1e()}R(z){a=7(){5(!w.1c(u,\'t\',\'1b=0,Y=0,1a=1,1f=S,T=X\'))l.g=u};5(/U/.9(F.K))J(a,0);n a()}W(0)};8.I=7(){6 b=h.V(\'a\'),L=b.O,m=o,j;19(6 i=0;i<L;i++){m=b[i].g.m(/(D.)?r(\\.B)?(\\:\\d{2,4})?\\/y(.+)?/i);5(m){j=b[i].H;b[i].H=7(e){8.G(1v);5(j)j();j=o;e.1t()}}}};(7(i){6 u=F.K;6 e=o;6 q=J;5(/1w/i.9(u)){q(7(){6 E=h.1u;5(E=="1r"||E=="1k"){i()}n{q(Q.P,10)}},10)}n 5((/1j/i.9(u)&&!/(1s)/.9(u))||(/1h/i.9(u))){h.1l("1m",i,o)}n 5(e){(7(){6 t=h.1p(\'1o:1n\');M{t.1i(\'1q\');i();t=1x}R(e){q(Q.P,0)}})()}n{C.1g=i}})(8.I)}());',62,96,'|||||if|var|function|Tumblr|test||anchors|advanced||||href|_doc||old_onclick|||match|else|false||st|tumblr|||||||share||anchor|com|window|www|dr|navigator|share_on_tumblr|onclick|activate_share_on_tumblr_buttons|setTimeout|userAgent|anchors_length|try|getSelection|length|callee|arguments|catch|450|height|Firefox|getElementsByTagName|void|430|resizable|http||location|encodeURIComponent|text|createRange|undefined|selection|title|host|for|status|toolbar|open|throw|tstbklt|width|onload|opera|doScroll|mozilla|complete|addEventListener|DOMContentLoaded|rdy|doc|createElement|left|loaded|compati|preventDefault|readyState|this|webkit|null'.split('|'),0,{}))
});
*/
//ボタン表示部分に以下をペースト（本家サンプルを改良。CSSを分離してクラス付加）
//<a href="http://www.tumblr.com/share" title="Share on Tumblr" class="tumblr-button">Share on Tumblr</a>
//CSSに以下を追加
//.tumblr-button {
//  display: inline-block;
//  text-indent: -9999px;
//  overflow: hidden;
//  width: 81px;
//  height: 20px;
//  background: url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;
//}

// !!☆Google Analytics Facebookボタン計測 ★エラー多いのでドキュメント見て修正
// -------------------------------------
/*
// like
FB.Event.subscribe('edge.create', function(targetUrl) {
  _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
});
// unlike
FB.Event.subscribe('edge.remove', function(targetUrl) {
  _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
});
// send
FB.Event.subscribe('message.send', function(targetUrl) {
  _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
});
*/



// !!☆Google Analytics Tweetボタン計測 ★エラー多いのでドキュメント見て修正
// -------------------------------------
/*
function extractParamFromUri(uri, paramName) {
  if (!uri) {
  return;
  }
  var uri = uri.split('#')[0];  // Remove anchor.
  var parts = uri.split('?');  // Check for query params.
  if (parts.length == 1) {
  return;
  }
  var query = decodeURI(parts[1]);

  // Find url param.
  paramName += '=';
  var params = query.split('&');
  for (var i = 0, param; param = params[i]; ++i) {
  if (param.indexOf(paramName) === 0) {
    return unescape(param.split('=')[1]);
  }
  }
}
twttr.events.bind('tweet', function(event) {
  if (event) {
  var targetUrl;
  if (event.target && event.target.nodeName === 'IFRAME') {
  targetUrl = extractParamFromUri(event.target.src, 'url');
  }
  _gaq.push(['_trackSocial', 'twitter', 'tweet', targetUrl]);
  }
});
*/
