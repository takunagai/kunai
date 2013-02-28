#!/usr/bin/perl

#┌─────────────────────────────────
#│ FullPath Checker v1.4 (2003/09/22)
#│ Copyright (c) KentWeb
#│ webmaster@kent-web.com
#│ http://www.kent-web.com/
#│ ---
#│ Special Thanks:
#│    HiRO-さん、てっちゃん
#└─────────────────────────────────
$ver = 'FullPath Checker v1.4';
#┌─────────────────────────────────
#│ [注意事項]
#│ 1. このスクリプトはフリーソフトです。このスクリプトを使用した
#│    いかなる損害に対して作者は一切の責任を負いません。
#│ 2. 設置に関する質問はサポート掲示板にお願いいたします。
#│    直接メールによる質問は一切お受けいたしておりません。
#└─────────────────────────────────

# 第１チェック
eval{ $path1 = `pwd`; };
if ($@ || !$path1) { $path1 = 'unknown'; }

# 第２チェック
if ($0 =~ /^(.*[\\\/])/) { $path2 = $1; }
else { $path2 = 'unknown'; }

# 第３チェック：スクリプトまでのフルパス
$path3 = $ENV{'SCRIPT_FILENAME'};
$path3 ||= 'unknown';

print "Content-type: text/html\n\n";
print <<"EOM";
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="ja">
<head>
<META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=Shift_JIS">
<title>$ver</title></head>
<body bgcolor="#FFFFFF" text="#000000">
<h3>この「ディレクトリ」のフルパスチェックの結果は以下のとおりです。</h3>
- 「unknown」と出る場合には取得に失敗した場合です -
<P>
<DL>
<DT>第1チェック
<DD><font color="#DD0000" size="+1"><tt>$path1</tt></font><br><br>
<DT>第2チェック
<DD><font color="#DD0000" size="+1"><tt>$path2</tt></font><br><br>
<DT>第3チェック：スクリプトまでのフルパス
<DD><font color="#DD0000" size="+1"><tt>$path3</tt></font>
</DL>
<!-- 著作権表\示（削除不可）-->
<P><div align="right" style="font-family:Verdana,Helvetica,Arial;font-size:11px">
<b>$ver</b><br>
Copyright (c) <a href="http://www.kent-web.com/">KentWeb</a>
</div>
</body>
</html>
EOM

exit;


__END__

