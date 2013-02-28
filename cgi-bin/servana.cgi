#!/usr/bin/perl
##############################################################################
# サーバーアナライザー Ver 1.2
# Copyright(C) futomi 2003 - 2005
# http://www.futomi.com/
###############################################################################
use strict;
use CGI;
my $q = new CGI;
my $cgiversion = '1.2';
my $this_file_name = 'servana.cgi';


$| = 1;

my $html = '
<html>
<head>
<meta http-equiv="Content-Language" content="ja">
<meta http-equiv="Content-Type" content="text/html; charset=shift_jis">
<title>futomi\'s CGI Cafe - サーバーアナライザー __CGIVERSION__</title>
<style type="text/css">
	table	{ font-size: 12px; }
	a:hover { color: red;}
	tt { font-size: 12px; }
	.size1	{ font-size: 8px }
	.size2	{ font-size: 10px }
	.size3	{ font-size: 12px }
	.size4	{ font-size: 16px }
	.header	{
		BACKGROUND: #999999;
		BORDER-BOTTOM: #666666 2px solid;
		BORDER-LEFT: 0px solid;
		BORDER-RIGHT: 0px solid;
		BORDER-TOP: 0px solid;
		COLOR: #FFFFFF;
		PADDING-LEFT: 2px;
	}
	.title	{
		BACKGROUND: #A0A0A0;
		BORDER-BOTTOM: #999999 1px solid;
		BORDER-LEFT: 0px solid;
		BORDER-RIGHT: 0px solid;
		BORDER-TOP: #DDDDDD 1px solid;
		COLOR: #FFFFFF;
		PADDING-LEFT: 2px;
	}
	.pmtitle	{
		BACKGROUND: #B0B0B0;
		BORDER-BOTTOM: #999999 1px solid;
		BORDER-LEFT: #DDDDDD 1px solid;
		BORDER-RIGHT: #999999 1px solid;
		BORDER-TOP: #DDDDDD 1px solid;
		COLOR: #FFFFFF;
		PADDING-LEFT: 2px;
	}
</style>
<script language="JavaScript">
<!--//
	function help(target){
		var SWA
		SWA = window.open(target,"detail","WIDTH=500,HEIGHT=200,toolbar=no,location=no,status=no,menubar=no,directories=no,scrollbars=yes");
		SWA.focus();
	}
//-->
</script>
</head>
<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table border="0" width="100%" cellspacing="0" cellpadding="5" class="header">
  <tr>
    <td><a href="http://www.futomi.com/" target="_blank"><font color="#FFFFFF" class="size4">サーバーアナライザー Ver __CGIVERSION__</font></a></td>  
    <td align="right"><a href="http://www.futomi.com/" target="_blank"><font color="#FFFFFF" class="size3">futomi\'s CGI Cafe</font></a></td>
  </tr>
</table>
<br>
<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ サーバ情報</td>
  </tr>
</table>
<br>
<blockquote>
<table border="0" cellspacing="1" cellpadding="1"><tr><td bgcolor="#999999">
<table border="0" cellspacing="1" cellpadding="3">
  <tr>
    <td bgcolor="#DDDDDD">ホスト名</td>
    <td bgcolor="#FFFFFF"><tt>__NODENAME__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">マシン</td>
    <td bgcolor="#FFFFFF"><tt>__MACHINE__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">システム名</td>
    <td bgcolor="#FFFFFF"><tt>__SYSNAME__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">リリース</td>
    <td bgcolor="#FFFFFF"><tt>__RELEASE__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">バージョン</td>
    <td bgcolor="#FFFFFF"><tt>__VERSION__</tt></td>
  </tr>
</table>
</td></tr></table>
</blockquote>
<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ Perl 情報</td>
  </tr>
</table>
<br>
<blockquote>
<table border="0" cellspacing="1" cellpadding="1"><tr><td bgcolor="#999999">
<table border="0" cellspacing="1" cellpadding="3">
  <tr>
    <td bgcolor="#DDDDDD">Perl バージョン</td>
    <td bgcolor="#FFFFFF"><tt>__PERLVERSION__</tt></td> 
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">Perl パス</td>
    <td bgcolor="#FFFFFF"><tt>__PERLPATH__</tt></td> 
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">モジュール検索対象ディレクトリ</td>
    <td bgcolor="#FFFFFF"><tt>__INC__</tt></td> 
  </tr>
</table>
</td></tr></table>
</blockquote>
<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ CGI 実行環境</td>
  </tr>
</table>
<br>
<blockquote>
<table border="0" cellspacing="1" cellpadding="1"><tr><td bgcolor="#999999">
<table border="0" cellspacing="1" cellpadding="3">
  <tr>
    <td bgcolor="#DDDDDD">CGI の実行権限</td>
    <td bgcolor="#FFFFFF"><tt>__EXEC__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">このファイルの所有者ユーザ名（uid）</td>
    <td bgcolor="#FFFFFF"><tt>__OWNERNAME__ (__OWNERUID__)</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">CGI を実行するユーザ名（uid）</td>
    <td bgcolor="#FFFFFF"><tt>__EXECNAME__ (__EXECUID__)</tt></td>
  </tr>
</table>
</td></tr></table>
</blockquote>
<p></p>
<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ コマンドパス</td>
  </tr>
</table>
<br>
<blockquote>
<table border="0" cellspacing="1" cellpadding="1"><tr><td bgcolor="#999999">
<table border="0" cellspacing="1" cellpadding="3">
  <tr>
    <td bgcolor="#DDDDDD">perl</td>
    <td bgcolor="#FFFFFF"><tt>__PERL__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">php</td>
    <td bgcolor="#FFFFFF"><tt>__PHP__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">sendmail</td>
    <td bgcolor="#FFFFFF"><tt>__SENDMAIL__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">sh</td>
    <td bgcolor="#FFFFFF"><tt>__SH__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">uuencode</td>
    <td bgcolor="#FFFFFF"><tt>__UUENCODE__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">uudecode</td>
    <td bgcolor="#FFFFFF"><tt>__UUDECODE__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">nkf</td>
    <td bgcolor="#FFFFFF"><tt>__NKF__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">gzip</td>
    <td bgcolor="#FFFFFF"><tt>__GZIP__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD">gunzip</td>
    <td bgcolor="#FFFFFF"><tt>__GUNZIP__</tt></td>
  </tr>
</table>
</td></tr></table>
</blockquote>


<p></p>
<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ DNS逆引き</td>
  </tr>
</table>
<br>
<blockquote>
<table border="0" cellspacing="1" cellpadding="1"><tr><td bgcolor="#999999">
<table border="0" cellspacing="1" cellpadding="3">
  <tr>
    <td bgcolor="#DDDDDD">環境変数 <tt>$ENV{REMOTE_HOST}</tt></td>
    <td bgcolor="#FFFFFF"><tt>__ENV_REMOTE_HOST__</tt></td>
  </tr>
  <tr>
    <td bgcolor="#DDDDDD"><tt>gethostbyaddr</tt>関数</td>
    <td bgcolor="#FFFFFF"><tt>__GETHOSTBYADDR__</tt></td>
  </tr>
</table>
</td></tr></table>
</blockquote>

<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ 環境変数</td>  
  </tr>
</table>
<br>
<blockquote>
__ENV__
</blockquote>
<table border="0" width="100%" cellspacing="0" cellpadding="3" class="title">
  <tr>
    <td width="100%">■ インストールされている Perl モジュール</td>
  </tr>
</table>
<br>
<blockquote>
__MODULE__
</blockquote>
<hr>
<a href="http://www.futomi.com/" target="_blank" class="size3">futomi\'s CGI Cafe</a>
<br>
<br>
</body>
</html>

';

my $mod_detail_html = '
<html>
<head>
<meta http-equiv="Content-Language" content="ja">
<meta http-equiv="Content-Type" content="text/html; charset=shift_jis">
<title>futomi\'s CGI Cafe - サーバーアナライザー __CGIVERSION__</title>
<style type="text/css">
	table	{ font-size: 12px; }
	a:hover { color: red;}
	tt { font-size: 12px; }
	.size1	{ font-size: 8px }
	.size2	{ font-size: 10px }
	.size3	{ font-size: 12px }
	.size4	{ font-size: 16px }
	.pmtitle	{
		BACKGROUND: #B0B0B0;
		BORDER-BOTTOM: #999999 1px solid;
		BORDER-LEFT: #DDDDDD 1px solid;
		BORDER-RIGHT: #999999 1px solid;
		BORDER-TOP: #DDDDDD 1px solid;
		COLOR: #FFFFFF;
		PADDING-LEFT: 2px;
	}
</style>
</head>
<body bgcolor="#FFFFFF">
<center>
<table border="0" cellspacing="1" cellpadding="1"><tr><td bgcolor="#999999">
<table border="0" cellspacing="1" cellpadding="3">
  <tr>
    <td class="pmtitle">モジュール名</td>
    <td bgcolor="#EEEEEE"><tt>__PMNAME__</tt></td>
  </tr>
  <tr>
    <td class="pmtitle">ファイル</td>
    <td bgcolor="#EEEEEE"><tt>__PMFILE__</tt></td>
  </tr>
  <tr>
    <td class="pmtitle">バージョン</td>
    <td bgcolor="#EEEEEE"><tt>__PMVERSION__</tt></td>
  </tr>
  <tr>
    <td class="pmtitle">マニュアル（POD）</td>
    <td bgcolor="#EEEEEE"><tt>__POD__</tt></td>
  </tr>
</table>
</td></tr></table>
<form>
  <input type="button" value="閉じる" onclick="window.close()">
</form>
</center>
</body>
</html>
';


#HTML変換処理（CGIバージョン情報）
$html =~ s/__CGIVERSION__/$cgiversion/g;

#処理分岐
my $action = $q->param('action');
my $mfile = $q->param('mfile');
my $mname = $q->param('mname');
if($action eq 'mod_detail') {
	&PrintModDetail($mname, $mfile);
} elsif($action eq 'pod') {
	&PrintPod($mfile);
}

#サーバ情報
my $os = $^O;
my($machine, $nodename, $release, $version, $sysname);
if($os =~ /MSWin32/i) {
	$sysname = `ver`;
	if($sysname eq '') {
		$sysname = $os;
	}
	my $net_config_server = `NET CONFIG SERVER`;
	my($first_line) = split("\n", $net_config_server);
	my @parts = split(/\s/, $first_line);
	$nodename = pop @parts;
} else {
	$machine = `uname -m`;
	$nodename = `uname -n`;
	$release = `uname -r`;
	$sysname = `uname -s`;
	$version = `uname -v`;
	if($sysname eq '') {
		$sysname = $os;
	}
}

if($machine eq '') {$machine = '<i><font color="#999999">unknown</font></i>';}
if($nodename eq '') {$nodename = '<i><font color="#999999">unknown</font></i>';}
if($release eq '') {$release = '<i><font color="#999999">unknown</font></i>';}
if($sysname eq '') {$sysname = '<i><font color="#999999">unknown</font></i>';}
if($version eq '') {$version = '<i><font color="#999999">unknown</font></i>';}
$html =~ s/__MACHINE__/$machine/;
$html =~ s/__NODENAME__/$nodename/;
$html =~ s/__RELEASE__/$release/;
$html =~ s/__SYSNAME__/$sysname/;
$html =~ s/__VERSION__/$version/;

#Perl情報
my @perl_pathes = &GetCommandPath('perl');
if($^O =~ /MSWin32/i) {
	@perl_pathes = &GetPerlPathForWin;
}
unless(@perl_pathes) {
	push(@perl_pathes, "$^X");
}
my $perl_path_html = join("<br>\n", @perl_pathes);
my $inc_path_html = join("<br>\n", @INC);
$html =~ s/__PERLPATH__/$perl_path_html/;
$html =~ s/__PERLVERSION__/$]/;
$html =~ s/__INC__/$inc_path_html/;

#CGI実行環境
if($os =~ /MSWin32/i) {
	$html =~ s/__OWNERNAME__/\-/;
	$html =~ s/__OWNERUID__/\-/;
	$html =~ s/__EXECNAME__/\-/;
	$html =~ s/__EXECUID__/\-/;
	$html =~ s/__EXEC__/\-/;
} else {
	my $execuid = $<;	#実UID
	my($execname) = getpwuid($execuid);
	if($execname eq '') {
		$execname = '<i><font color="#999999">unknown</font></i>';
	}
	$html =~ s/__EXECNAME__/$execname/;
	$html =~ s/__EXECUID__/$execuid/;

	my @path_array = split(/\//, $ENV{'SCRIPT_FILENAME'});
	my $auto_find_file_name = pop @path_array;
	if($auto_find_file_name) {
		$this_file_name = $auto_find_file_name;
	}
	my $owneruid = (stat($this_file_name))[4];
	my($ownername) = getpwuid($owneruid);
	if($ownername eq '') {
		$ownername = '<i><font color="#999999">unknown</font></i>';
	}
	$html =~ s/__OWNERNAME__/$ownername/;
	$html =~ s/__OWNERUID__/$owneruid/;
	if($execuid eq $owneruid) {
		$html =~ s/__EXEC__/owner 権限で実行/;
	} else {
		$html =~ s/__EXEC__/other 権限で実行/;
	}
}
#コマンドパス
#perl
$html =~ s/__PERL__/$perl_path_html/;
#php
my @php_pathes = &GetCommandPath('php');
my @php3_pathes = &GetCommandPath('php3');
my @php4_pathes = &GetCommandPath('php4');
push(@php_pathes, @php3_pathes, @php4_pathes);
if(scalar @php_pathes) {
	my $php_path_html = join("<br>\n", @php_pathes);
	$html =~ s/__PHP__/$php_path_html/;
} else {
	$html =~ s/__PHP__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#sendmail
my @sendmail_pathes = &GetCommandPath('sendmail');
if(scalar @sendmail_pathes) {
	my $sendmail_path_html = join("<br>\n", @sendmail_pathes);
	$html =~ s/__SENDMAIL__/$sendmail_path_html/;
} else {
	$html =~ s/__SENDMAIL__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#sh
my @sh_pathes = &GetCommandPath('sh');
if(scalar @sh_pathes) {
	my $sh_path_html = join("<br>\n", @sh_pathes);
	$html =~ s/__SH__/$sh_path_html/;
} else {
	$html =~ s/__SH__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#uuencode
my @uuencode_pathes = &GetCommandPath('uuencode');
if(scalar @uuencode_pathes) {
	my $uuencode_path_html = join("<br>\n", @uuencode_pathes);
	$html =~ s/__UUENCODE__/$uuencode_path_html/;
} else {
	$html =~ s/__UUENCODE__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#uudecode
my @uudecode_pathes = &GetCommandPath('uudecode');
if(scalar @uudecode_pathes) {
	my $uudecode_path_html = join("<br>\n", @uudecode_pathes);
	$html =~ s/__UUDECODE__/$uudecode_path_html/;
} else {
	$html =~ s/__UUDECODE__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#nkf
my @nkf_pathes = &GetCommandPath('nkf');
if(scalar @nkf_pathes) {
	my $nkf_path_html = join("<br>\n", @nkf_pathes);
	$html =~ s/__NKF__/$nkf_path_html/;
} else {
	$html =~ s/__NKF__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#gzip
my @gzip_pathes = &GetCommandPath('gzip');
if(scalar @gzip_pathes) {
	my $gzip_path_html = join("<br>\n", @gzip_pathes);
	$html =~ s/__GZIP__/$gzip_path_html/;
} else {
	$html =~ s/__GZIP__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#gunzip
my @gunzip_pathes = &GetCommandPath('gunzip');
if(scalar @gunzip_pathes) {
	my $gunzip_path_html = join("<br>\n", @gunzip_pathes);
	$html =~ s/__GUNZIP__/$gunzip_path_html/;
} else {
	$html =~ s/__GUNZIP__/<i><font color="#999999">unknown<\/font><\/i>/;
}
#DNS逆引き
if($ENV{'REMOTE_HOST'} =~ /[a-zA-Z]/) {
	$html =~ s/__ENV_REMOTE_HOST__/OK \($ENV{'REMOTE_HOST'}\)/;
} else {
	$html =~ s/__ENV_REMOTE_HOST__/NG \($ENV{'REMOTE_HOST'}\)/;
}
my $host_name = &GetRemoteHost;
if($host_name =~ /[a-zA-Z]/) {
	$html =~ s/__GETHOSTBYADDR__/OK \(${host_name}\)/;
} else {
	$html =~ s/__GETHOSTBYADDR__/NG \(${host_name}\)/;
}
#環境変数
my($env_html);
$env_html .= "<table border=\"0\" cellspacing=\"1\" cellpadding=\"1\"><tr><td bgcolor=\"#999999\">\n";
$env_html .= "<table border=\"0\" cellspacing=\"1\" cellpadding=\"3\">\n";
for my $key (sort keys %ENV) {
	my $value = $ENV{$key};
	$value = &SecureHtml($value);
	$env_html .= "  <tr>\n";
	$env_html .= "    <td bgcolor=\"#DDDDDD\"><tt>$key</tt></td>\n";
	$env_html .= "    <td bgcolor=\"#FFFFFF\"><tt>$value</tt></td>\n";
	$env_html .= "  </tr>\n";
}
$env_html .= "</table>\n";
$env_html .= "</td></tr></table>\n";
$html =~ s/__ENV__/$env_html/;

#利用可能なPerlモジュールを検索
my %modules = &GetModules;

#モジュールリストのHTMLを生成
my $module_html = &MakeModuleHtml(\%modules);
$html =~ s/__MODULE__/$module_html/;

#ページ出力
print "Content-type: text/html; charset=Shift_JIS\n";
print "\n";
print $html;
exit;


#### サブルーチン ####################################################

sub PrintPod {
	my($pmfile) = @_;
	if($pmfile =~ /[^a-zA-Z0-9\_\-\:\/\.]/) {
		&ErrorPrint("Invalid Request!!");
	}
	my $html;
	if(-e $pmfile && $pmfile =~ /\.pm$/) {
		my $pod2html = &FindPod2Html;
		if($pod2html eq '') {
			&ErrorPrint("コマンド pod2html がサーバにインストールされていないため、ドキュメントを表\示することが出来ませんでした。");
		}
   		$html = `$pod2html $pmfile`;
	} else {
		&ErrorPrint("Invalid Request!!");
	}
	#結果を出力
	print "Content-type: text/html; charset=Shift_JIS\n\n";
	print "$html";
	exit;
}

sub PrintModDetail {
	my($pmname, $pmfile) = @_;
	#バージョンを調べる
	my $pmversion = &GetModuleVersion($pmname);
	if($pmversion eq '') {
		$pmversion = '<i><font color="#999999">unknown</font></i>';
	}
	#HTMLを置換
	$mod_detail_html =~ s/__PMNAME__/$pmname/g;
	$mod_detail_html =~ s/__PMFILE__/$pmfile/g;
	$mod_detail_html =~ s/__PMVERSION__/$pmversion/g;
	$mod_detail_html =~ s/__CGIVERSION__/$cgiversion/g;
	#pod2htmlを探す
	my $pod2html = &FindPod2Html;
	if($pod2html eq '') {
		$mod_detail_html =~ s/__POD__/<i><font color=\"\#999999\">pod2html is not available\.<\/font><\/i>/;
	} else {
		$mod_detail_html =~ s/__POD__/<a href=\"$this_file_name?action=pod&mfile=$pmfile\" target=\"_blank\">開く<\/a>/;
	}
	#結果を出力
	print "Content-type: text/html; charset=Shift_JIS\n\n";
	print "$mod_detail_html";
	exit;
}

sub FindPod2Html {
	my $pod2html;
	if($^O =~ /MSWin32/i) {
		my @path_parts = split(/\\/, $^X);
		pop @path_parts;
		my $base_path = join("/", @path_parts);
		$pod2html = $base_path . '/pod2html.bat';
		unless(-e $pod2html) {
			$pod2html = '';
		}
	} else {
		my @pod2html_pathes = &GetCommandPath('pod2html');
		$pod2html = shift @pod2html_pathes;
	}
	return $pod2html;
}

sub GetModuleVersion {
	my($module) = @_;
	my $version;
	if($^O =~ /MSWin32/i) {
		$version = `$^X -m$module -e "print \$${module}::VERSION"`;
	} else {
		$version = `$^X -m$module -e 'print \$${module}::VERSION' 2>/dev/null`;
	}
	if($version !~ /[0-9]/) {
		$version = '';
	}
	return $version;
}

sub MakeModuleHtml {
	my($module_ref) = @_;
	my %pm_hash = %$module_ref;
	my %lc_pm_hash;
	for my $pm_name (keys %pm_hash) {
		my $lc_name = lc $pm_name;
		$lc_pm_hash{$lc_name} = $pm_name;
	}
	my $html;
	$html .= "<table border=\"0\" cellspacing=\"1\" cellpadding=\"1\"><tr><td bgcolor=\"#999999\">\n";
	$html .= "<table border=\"0\" cellspacing=\"1\" cellpadding=\"3\">\n";
	$html .= "  <tr>\n";
	$html .= "    <td class=\"pmtitle\">モジュール名</td>\n";
	$html .= "    <td class=\"pmtitle\">ファイル一覧</td>\n";
	$html .= "  </tr>\n";
	my $i = 0;
	for my $key (sort keys %lc_pm_hash) {
		my $pm_name = $lc_pm_hash{$key};
		my @tmp = split(/\t/, $pm_hash{$pm_name});
		my(@files);
		for my $key (@tmp) {
			if($key eq '') {next;}
			push(@files, $key);
		}
		my $files_html = join("<br>", @files);
		my $first_file = shift @files;
		my($bgcolor);
		if($i % 2 == 0) {
			$bgcolor = "#DDDDDD";
		} else {
			$bgcolor = "#EEEEEE";
		}
		my $detail_href = "javascript:help('${this_file_name}?action=mod_detail&amp;mname=${pm_name}&amp;mfile=${first_file}')";
		$html .= "  <tr>\n";
		$html .= "    <td bgcolor=\"$bgcolor\"><tt><a href=\"$detail_href\">$pm_name</a></tt></td>\n";
		$html .= "    <td bgcolor=\"$bgcolor\"><tt>$files_html</tt></td>\n";
		$html .= "  </tr>\n";
		$i ++;
	}
	$html .= "</table>\n";
	$html .= "</td></tr></table>\n";
	return $html;
}

sub GetModules {
	my(%all_modules, %inc_hash);
	for my $key (@INC) {
		$inc_hash{$key} ++;
	}
	for my $key (@INC) {
		if($key eq '.') {next;}
		for my $key2 (@INC) {
			if($key2 eq '.') {next;}
			if($key =~ /^${key2}.+/) {
				delete $inc_hash{$key};
				last;
			}
		}
	}
	for my $path (keys %inc_hash) {
		my %find_modules = &FindModules($path);
		for my $module (keys %find_modules) {
			$all_modules{$module} .= "$find_modules{$module}\t";
		}
	}
	return %all_modules;
}

sub FindModules {
	my($path) = @_;
	my(%modules);
	opendir(DIR, "$path");
	my @files = readdir(DIR);
	closedir(DIR);
	for my $file (@files) {
		if($file =~ /^\./) {next;}
		if(-d "$path/$file") {
			my %sub_modules = &FindModules("$path/$file");
			for my $key (keys %sub_modules) {
				$modules{$key} .= "$sub_modules{$key}\t";
			}
		} else {
			if($file =~ /\.pm$/) {
				if(open(PM, "$path/$file")) {
					while(<PM>) {
						if (/^\s*package\s+(\S+)\s*;/){
							my $module_name = $1;
							$modules{$module_name} .= "$path/$file\t";
							unless($file eq 'DB_File.pm') {
								last;
							}
						}
					}
					close(PM);
				}
			}
		}
	}
	return %modules;
}

sub GetCommandPath {
	my($command) = @_;
	my @pathes;
	if($command eq '') {return @pathes;}
	if($^O =~ /MSWin32/i) {
		return @pathes;
	}
	my @whereis_list = ('whereis', '/usr/bin/whereis', '/usr/ucb/whereis');
	for my $whereis (@whereis_list) {
		my $res = `$whereis $command`;
		if($res eq '') {
			next;
		} else {
			my @locations = split(/\s/, $res);
			for my $path (@locations) {
				if($path =~ /\/${command}$/) {
					push(@pathes, $path);
				}
			}
			last;
		}
	}
	my $num = scalar @pathes;
	unless($num) {
		my $path = `which $command`;
		if($path =~ /$command$/) {
			push(@pathes, $path);
		}
	}
	return @pathes;
}

sub GetPerlPathForWin {
	my $perl_path = $^X;
	$perl_path =~ s/\\/\//g;
	$perl_path =~ s/\.exe$//;
	return ($perl_path);
}

sub SecureHtml {
	my($html) = @_;
	$html =~ s/\&amp;/\&/g;
	$html =~ s/\&/&amp;/g;
	$html =~ s/\"/&quot;/g;
	$html =~ s/</&lt;/g;
	$html =~ s/>/&gt;/g;
	return $html;
}

sub GetRemoteHost {
	my @addr = split(/\./, $ENV{'REMOTE_ADDR'});
	my $packed_addr = pack("C4", $addr[0], $addr[1], $addr[2], $addr[3]);
	my($remote_host, $aliases, $addrtype, $length, @addrs);
	($remote_host, $aliases, $addrtype, $length, @addrs) = gethostbyaddr($packed_addr, 2);
	return $remote_host;
}

sub ErrorPrint {
	my($msg) = @_;
	print "Content-type: text/html; charset=Shift_JIS\n\n";
	print "$msg\n";
	exit;
}
