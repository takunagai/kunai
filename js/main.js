/* -----------------------------------
  各ページで使う共通のスクリプト（</body>直前）
  要jQueryのものが多い
 ----------------------------------- */

/*
・目次が自動で生成される
・このページの最上部に戻るリンクは、.pagetop a
・1つのa子要素を含む親要素に .clickable クラスを付加すると、親要素クリックでリンクできる
・テーブルの奇数行に oddクラスが付加される
・フォーカスしているフォームのラベルには labelfocusクラスが付加される
*/

//★PC・スマートフォンからのアクセスでCSS切替え（メディアクエリは別にする）
//参考：http://blog.webcreativepark.net/2012/04/19-120731.html
/*
・PCでアクセスした場合、PC用のCSSを読み込む
・スマートフォンでアクセスした場合、スマートフォン用のCSSを読み込む
・スマートフォンでのアクセス時、「PCサイト表示」ボタンを表示。
　それがクリックされると、スマートフォンでPC用のCSSを適用させる。
・PC用のサイトをスマートフォンで見た場合のみ、「スマートフォン表示」ボタンを表示。
　これがクリックされるとスマートフォン用のCSSを適用させる。
*/

//Documentオブジェクトをキャッシュさせて高速化
var _doc = document;

// !目次の生成。引数に目次にしたい要素を指定できる（※ページ内スムーススクロール スクリプトの前に記述すること）
// ★改良案：スムーススクロール スクリプトの後でも機能するように On()使う
//参考：http://www.jankoatwarpspeed.com/examples/table-of-contents/demo1.html#title3
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
    .append('<h1>このページの目次 <small>クリックで該当箇所にスクロール</small></h1>')
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


// !ページ内スムーススクロール
// 参考元：http://www.coolwebwindow.com/weblife_column/coolweb/000301.php
$(function(){
  $('a[href^=#],area[href^=#]').click(function(){//#で始まるアンカー
    var speed = 400;//スクロールの速度（ミリ秒）
    var href= $(this).attr('href');//アンカーの値取得
    var target = $(href === '#' || href === '' ? 'html' : href);//移動先を取得
    var position = target.offset().top;//移動先を数値で取得

    //スムーススクロール。Safariの場合はbody、その他はhtml
    //元：$($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');//
    var ua = navigator.userAgent;
    var isSafari = /Safari/.test(ua);
    $(isSafari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');

    return false;
  });
});

//タッチ（スマートフォン）、クリック（PC）でスクロール
$(function(){
  //現在の表示画面上橋のY座標を返す関数
  function getBodyTop(){
  if ((!_doc.all || window.opera) && _doc.getElementById){//IE以外
    return window.pageYOffset;
  }
  else if(_doc.getElementById && (_doc.compatMode === 'CSS1Compat')){//IE6標準モード
    return _doc.documentElement.scrollTop;
  }
  else {//IE6未満 or 互換モード
    return _doc.body.scrollTop;
  }
  }
  //$.fn.exScrollTop = function(){
  //  return this.attr('tagName')=='HTML' ? $(window).scrollTop() : this.scrollTop();
  //}

  //表示画面の高さ取得
  var bodyHeight;
  if((!_doc.all || window.opera) && _doc.getElementById){//IE以外
  bodyHeight = window.innerHeight;
  } else {//IE
  bodyHeight = _doc.getElementsByTagName('html')[0].clientHeight;
  }
  //ページ全体の高さ(非表示部分を含む)
  var wholeHeight = Math.max.apply(
  null,
  [_doc.body.clientHeight, _doc.body.scrollHeight, _doc.documentElement.scrollHeight, _doc.documentElement.clientHeight]
  );
  var yAtBottom = wholeHeight - bodyHeight;//最下部にスクロール時のy座標
  var speed = 700;//スクロールの速度
  var y = 0;//現在のy座標(表示中画面の上橋)

  //最上部へ
  $('#page-scroll-top').click(function(){
  y = 0;
  $($.browser.safari ? 'body' : 'html').animate({scrollTop:y}, speed, 'swing');
  return false;
  });
  //１画面上へ
  $('#page-scroll-up').click(function(){
  y = getBodyTop() - bodyHeight;
  //y -= bodyHeight;
  if(y < 0){y = 0;}
  $($.browser.safari ? 'body' : 'html').animate({scrollTop:y}, speed, 'swing');
  //window.scrollBy(0, -(bodyHeight));//スクロール無しの切替えの場合は上2行をコレに差し替え
  return false;
  });
  //１画面下へ
  $('#page-scroll-down').click(function(){
  y = getBodyTop() + bodyHeight - 30;//-30は少しスクロールを少なくして読みやすくするため
  if(y > yAtBottom){y = yAtBottom;}
  $($.browser.safari ? 'body' : 'html').animate({scrollTop:y}, speed, 'swing');
  //window.scrollBy(0, bodyHeight);
  return false;
  });
  //最下部へ
  $('#page-scroll-bottom').click(function(){
  y = yAtBottom;
  $($.browser.safari ? 'body' : 'html').animate({scrollTop:yAtBottom}, speed, 'swing');
  return false;
  });
});



// http://www.webcreatorbox.com/tech/jquery-tips20/ より
//------------------------------------------------------------

// !ページTOPへスクロールで戻る
$(function(){
  $('.pagetop a').click(function(){
  $('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 'slow', 'swing');
  return false;
  });
});

// !外部リンクに target="_blank" を追加 ★相対パスにしてから有効にする
//$(function(){
//  $("a[href^='http://']").attr("target","_blank");
//});

// !画像リンクが切れてたら、代替え画像を表示　☆エラー
/*
$(function () {
  $('img').error(function(){
  $(this).attr({src:'common-images/missing.jpg',alt:'画像が見つかりません'});
  });
});
*/

// !a要素（※1つのみ）を含む要素をクリックでリンクさせる（スマートフォンなどで有効）
// 1つのa子要素を含む親要素に .clickable クラスを付加
$(function(){
  $('.clickable').click(function(){
  window.location = $(this).find('a').attr('href');
  return false;
  });
});

// !テーブルの奇数行にクラス付加→スタイリング
// CSSの nth-child で処理するなら不要
$(function(){
  $('tr:odd').addClass('odd');
});

// !フォーカスしているフォームのラベルにクラス付加 ★スクリプトが遅くなると警告→修正
//$(function (){
//  $('form :input').focus(function() {
//  $('label[for="' + this.id + '"]').addClass('labelfocus');
//  });
//  $('form :input').blur(function() {
//  $('label[for="' + this.id + '"]').removeClass('labelfocus');
//  });
//});

// !フォームにテキストを入れておき、フォーカスで消す（サンプル。適宜作成）
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

// !テキストエリアの入力文字数をカウント。最大値以上なら赤字（サンプル。適宜作成）
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

// !高さを行ごとに揃える jquery.tile 実行（functions.js より前に jquery.tile.js 読み込むこと）
// 画像等を読み込んでから処理するため、あえて window.onload を使用
// デバイス幅768px以下の場合は、3段以下は1段、4段以上は2段
window.onload = function(){
  if($('body').width() >= 481){
    $('.col2 .col').tile(2);
    $('.col3 .col').tile(3);
    $('.col4 .col').tile(4);
    $('.col5 .col').tile(5);
    $('.col6 .col').tile(6);
  }
  else {
    $('.col4 .col').tile(2);
    $('.col5 .col').tile(2);
    $('.col6 .col').tile(2);
  }
};


// !中央センター表示（モーダルウインドウなどで使用）
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
  if(typeof window.addEventListener === "undefined" && typeof document.documentElement.style.maxHeight === "undefined"){
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
    var maskHeight = $(document).height();
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
            lockDirection: true,
            //onBeforeScrollStart: function(){}
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

    var maskHeight = $(document).height();
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
  //13はESCキー（キー一覧：http://www.accessclub.jp/samplefile/help/help_154_1.htm）
  /*
$(document).keyup(function(e) {
    if(e.keyCode === 27) {
      $('#menu_modal_window_dialog').hide();
    }
  });
*/

});



// !モーダルウインドウ（一般用、jQuery非使用）
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
    var maskHeight = $(document).height();
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

    var maskHeight = $(document).height();
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
  $(document).keyup(function(e) {
    if(e.keyCode === 27) {//13はESCキー（キー一覧：http://www.accessclub.jp/samplefile/help/help_154_1.htm）
      $('#modal_window_mask, .modal_window_window').hide();
    }
  });

  //URLアクセス時に実行させたい場合
  //function launchWindow(id) {
  //  var maskHeight = $(document).height();
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


// !メニュー表示/非表示 #sidebar（モバイル幅のみ表示）
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


// !印刷用 print.js
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



// !☆Google Analytics Facebookボタン計測 ★エラー多いのでドキュメント見て修正
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



// !☆Google Analytics Tweetボタン計測 ★エラー多いのでドキュメント見て修正
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


// !☆参考
// -------------------------------------

//はてなブックマーク数表示
//参考：http://blog.fkoji.com/
/*
function showHatenaBookmarkByPipes(json) {
  if (!json) {
  return false;
  }
  var items = json.value.items;
  for (var i = 0; i < items.length; i++) {
  // トップページは除く
  if (items[i].link == 'http://kumotori.net/') {
    continue;
  }
  // ブックマーク数100未満は表示しない
  //if (items[i]['hatena:bookmarkcount'] * 1 < 100) {
  //  break;
  //}

  var div = $('<div class="hatena_bookmark_popular_entry"></div>');
  div.append(
    $('<a></a>')
    .attr('href', items[i].link)
    .text(items[i].title.replace(/ - くもとりねっと$/, ''))
  ).append(' ').append(
    $('<a target="_blank" class="hatena_bookmark_count popular"></a>')
    .attr('href', 'http://b.hatena.ne.jp/entry/'+items[i].link)
    .text(items[i]['hatena:bookmarkcount']+' users')
  );

  $('#hatena_bookmark_popular_area').append(div);
  }
}
*/

