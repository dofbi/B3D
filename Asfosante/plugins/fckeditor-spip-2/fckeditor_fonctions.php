<?php

/* This code is release under the term of the GPVv2 Licence
 * You can find the text of the license here : http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Copyright : Frédéric Bonnaud <fred@lea-linux.org>
 */

if (!defined('_DIR_PLUGIN_FCKEDITOR')){
	$p=explode(basename(_DIR_PLUGINS)."/",str_replace('\\','/',realpath(dirname(__FILE__))));
	define('_DIR_PLUGIN_FCKEDITOR',(_DIR_PLUGINS.end($p)."/"));
}


define ('_FCKEDITOR_DEFAULT_CSS', 'span.spip_documents_left{float:left;margin-bottom:5px;margin-right:15px;}span.spip_documents_right{float:right;margin-bottom:5px;margin-left:15px;}span.spip_documents_center{clear:both;display:block;margin:1em auto;width:100%;}span.spip_documents{line-height:normal;text-align:center;}img{border:none;}') ;

include_once (_DIR_PLUGIN_FCKEDITOR."fckeditor/fckeditor.php") ;

function fckeditor_canonize_path($path) {
	$path = preg_replace("~/{2,}~","/", $path) ;
	$path = preg_replace(
		array(
			"~/[^/]+/\.\./~",
			"~^[^/]+/\.\./~",
			"~/[^/]+/\.\.$~"
		),
		array(
			"/",
			"",
			"/",
		),
		$path) ;
	$path = preg_replace(
		array(
			"~/\./~",
			"~^\./~",
			"~/\.$~"
		),
		array(
			"/",
			"",
			"/"
		),
		$path);
	return ($path?$path:'.') ;
}



function fckeditor_add_pointtexte($s) {
	return ".texte $s" ;
}

function fckeditor_get_css() {
	$css = lire_config('fckeditor/csseditor') ;
	$var = preg_split("~(\{.*?\}\s*)~s", preg_replace("~/\*.*?\*/~s",'',$css), -1, PREG_SPLIT_DELIM_CAPTURE) ;
	for($i = 0 ; $i < count($var) / 2 -1 ; $i++ ) { /* 1) on décompose suivant les différents style */
		$items = preg_split('/\s*,\s*/', $var[$i*2]) ; /* 2) on décompose suivant les différents tags auxquels s'applique chaque style */
		$var[$i*2] = join(', ', array_map("fckeditor_add_pointtexte", $items) ) ; /* on modifie les noms de tags pour qu'il ne s'applique que dans la zone modifiée par fckeditor */
	}
	return join('', $var) ;
}

function fckeditor_insert_head($flux) {
	return $flux."<style type='text/css'>\n/* FCKEditor's CSS */\n".fckeditor_get_css()."\n</style>" ;
}

function fckeditor_header_prive($flux) {
	return $flux."<style type='text/css'>\n/* FCKEditor's CSS */\n".fckeditor_get_css()."\n</style>" ;
}

function fckeditor_pre_edition($flux) {
	if (($_GET['editmode'] !== 'spip') && ($flux['args']['action'] === 'modifier') && ($flux['args']['type'] === 'article')) {
		// gestion des modèles SPIP (si on n'est pas en editmode === spip)
		$flux['data']['texte'] = preg_replace("~&lt;(\w+\d*\|.*?)&gt;~s", "<\\1>", $flux['data']['texte']) ;
	}
	return $flux ;
}

function fckeditor_editer_contenu_objet($flux){
	include(_DIR_PLUGIN_FCKEDITOR."toolbars.defs.php") ;
	switch ($_GET['exec']) {
		case 'articles_edit':
			if (lire_config("fckeditor/fck_article")) {
				$request = 'exec=articles_edit&id_article='.$_GET['id_article'] ;
				$objet = 'article' ;
			} else {
				return $flux ;
			}
			break ;
		case 'rubriques_edit':
			if (lire_config("fckeditor/fck_rubrique")) {
				$request = 'exec=rubriques_edit&id_rubrique='.$_GET['id_rubrique'] ;
				$objet = 'rubrique' ;
			} else {
				return $flux ;
			}
			break ;
		case 'breves_edit':
			if (lire_config("fckeditor/fck_breve")) {
				$request = 'exec=breves_edit&id_breve='.$_GET['id_breve'] ;
				$objet = 'breve' ;
			} else {
				return $flux ;
			}
			break ;
		case 'mots_edit':
			if (lire_config("fckeditor/fck_mot")) {
				$request = 'exec=mots_edit&id_mot='.$_GET['id_mot'] ;
				$objet = 'mot' ;
			} else {
				return $flux ;
			}
			break ;
		default:
			return $flux ;
	}
	$confirm_text = "Vous voulez changer de mode d\\'édition.\\n\\nSi vous n\\'avez pas enregistré vos modifications, elles seront perdues.\\n\\nÊtes-vous sûr de vouloir changer de mode d\\'édition ?" ;
	if (preg_match("~^(.*)(<li class=(?:\"|')editer_texte.*?</label>)(.*?)(<\/li>.*)$~is",$flux['data'], $match)) {
		$start = $match[1].$match[2] ;
		$content = $match[3] ;
		$end = $match[4] ;
		$editexclu = lire_config("fckeditor/editexclu") ;
		($editmode = $_GET['editmode']) || ($editmode = lire_config('fckeditor/editmode')) || ($editmode = 'spip') ;
		if ($editmode == 'spip') {
			if (!$editexclu) 
				$start .= '<div style="padding-left:125px; padding-top:5px;">Mode d\'édition : <strong>[SPIP]</strong> | <a href="'.$_SERVER['SCRIPT_NAME'].'?'.$request."&editmode=wysiwyg\" onclick=\"javascript:return confirm('".$confirm_text."');\">visuel</a></div>" ;
			$htmlcontent = $content ;
		} else {
			// on modifie la CSS interne de fckeditor
			$fckeditor_css = preg_replace(array("~[\r\n]~s","~/\*.*?\*/~s"),"", _FCKEDITOR_DEFAULT_CSS.lire_config('fckeditor/csseditor')) ;
			$fckeditor_config_file = file_get_contents(_DIR_PLUGIN_FCKEDITOR.'fckconfig.js') ;
			$fckeditor_config_file = preg_replace("~\bFCKConfig\.EditorAreaStyles\s*=\s*'[^']*'\s*;\s*(/\*CFG:EDIT\*/)?~s","FCKConfig.EditorAreaStyles = '".$fckeditor_css."'; /*CFG:EDIT*/", $fckeditor_config_file) ;

			$barres = array() ;
			foreach(array_keys($fck_toolsbars) as $item) {
				$tb[$item] = lire_config("fckeditor/fck_tb_$item") ;
				if ($tb[$item] && ($tb[$item] != 'none')) {
					if ($barre = $fck_toolsbars[$item]['barres'][$tb[$item]]['barre']) {
						$barres[] = $barre ;
					}
				}
			}
			$fckeditor_config_file = preg_replace("~(// CFG:TOOLBAR:START)(\n|\r)+(.*)(// CFG:TOOLBAR:END)~s", "$1$2".join(",\n", $barres)."\n$4$5", $fckeditor_config_file) ;

			// on sauve le nouveau fckconfig.js
			$file = @fopen(_DIR_PLUGIN_FCKEDITOR.'fckconfig.js','w') ;
			if ($file) {
				fwrite($file, $fckeditor_config_file) ;
				fclose($file) ;
			}

			// on essaie de trouver les différents chemin d'accès à fckeditor
			if (lire_config('fckeditor/userfiles') == 'spip') {
				$FS_PATH = dirname($_SERVER['SCRIPT_FILENAME']) ;
				if ($FS_PATH == '/') { $FS_PATH = '' ; }
				define('FCKEDITOR_UserFilesAbsolutePath',fckeditor_canonize_path($FS_PATH.'/'.rtrim(_DIR_IMG,'/'))) ;
				$HTTP_PATH = dirname($_SERVER['SCRIPT_NAME']) ;
				if ($HTTP_PATH == '/') { $HTTP_PATH = '' ; }
				define('FCKEDITOR_UserFilesPath',fckeditor_canonize_path($HTTP_PATH.'/'.rtrim(_DIR_IMG,'/'))) ;
			} else {
				$FS_PATH = dirname($_SERVER['SCRIPT_FILENAME']) ;
				if ($FS_PATH == '/') { $FS_PATH = '' ; }
				define('FCKEDITOR_UserFilesAbsolutePath',fckeditor_canonize_path($FS_PATH.'/'._DIR_PLUGIN_FCKEDITOR.'userfiles')) ;
				$HTTP_PATH = dirname($_SERVER['SCRIPT_NAME']) ;
				if ($HTTP_PATH == '/') { $HTTP_PATH = '' ; }
				define('FCKEDITOR_UserFilesPath',fckeditor_canonize_path($HTTP_PATH.'/'._DIR_PLUGIN_FCKEDITOR.'userfiles')) ;
			}
			$file = @fopen(_DIR_PLUGIN_FCKEDITOR.'fckeditor_define.php','w') ;
			if ($file) {
				fwrite($file, "<?php\ndefine('FCKEDITOR_UserFilesAbsolutePath', '".FCKEDITOR_UserFilesAbsolutePath."');\n") ;
				fwrite($file, "define('FCKEDITOR_UserFilesPath', '".FCKEDITOR_UserFilesPath."');\n?>") ;
				fclose($file) ;
			} else {
				$start .= "<script language='javascript'>alert('Impossilble d\\'écrire "._DIR_PLUGIN_FCKEDITOR.'fckeditor_define.php'.". La gestion des images sera perturbée. Donnez les droits en écriture sur ce fichier à votre serveur http. Par exemple, sous Linux une commande du genre : chmod +w "._DIR_PLUGIN_FCKEDITOR.'fckeditor_define.php'." devrait remettre les choses dans l\\'ordre.');</script>\n" ;
				
			}
			if (!$editexclu) 
				$start .= '<div style="padding-left:125px; padding-top:5px;">Mode d\'édition : <a href="'.$_SERVER['SCRIPT_NAME'].'?'.$request.'&editmode=spip" onclick="javascript:return confirm(\''.$confirm_text.'\');">SPIP</a> | <strong>[visuel]</strong></div>' ;
			if (preg_match("~<textarea[^>]*>(.*?)</textarea>~is", $content, $match)) {
				$htmlcontent = preg_replace("~&lt;(\w+\d*\|.*?)&gt;~s", "&amp;lt;\\1&amp;gt;", $match[1]) ;
				$htmlcontent = html_entity_decode($htmlcontent) ;
			} else {
				$htmlcontent = '' ;
			}
			$oFCKeditor = new FCKeditor('texte') ;
			$sBasePath = _DIR_PLUGIN_FCKEDITOR.'fckeditor/' ;
			$oFCKeditor->BasePath = $sBasePath ;
			$oFCKeditor->Config['AutoDetectLanguage'] = false;
			$oFCKeditor->Config['DefaultLanguage'] = $GLOBALS['auteur_session']['lang'] ; // spip language
			$oFCKeditor->Config['FirefoxSpellChecker'] = true;
			$oFCKeditor->Config['CustomConfigurationsPath'] = '../../fckconfig.js' ;
			// modif YATY multimédia
			// crée les chemins sans le nom de domaine
			$SiteSPIPBasePath = fckeditor_canonize_path($HTTP_PATH.'/'._DIR_RACINE) ;
			$SiteSPIPBasePath = preg_replace("~/$~",'', $SiteSPIPBasePath) ;
			$oFCKeditor->Config['SiteSPIP'] = $SiteSPIPBasePath ;
			$oFCKeditor->Config['SiteSPIPImg'] = fckeditor_canonize_path($SiteSPIPBasePath.'/ecrire/'._DIR_IMG) ;
			$oFCKeditor->Config['vignettes'] = fckeditor_canonize_path($SiteSPIPBasePath.'/prive/vignettes/') ;
			// code d'origine :
			//$oFCKeditor->Config['SiteSPIP'] = $flux['args']['contexte']['config']['adresse_site'] ;
			//$oFCKeditor->Config['SiteSPIPImg'] = $flux['args']['contexte']['config']['adresse_site'].fckeditor_canonize_path('/ecrire/'._DIR_IMG) ;
			//$oFCKeditor->Config['vignettes'] = $flux['args']['contexte']['config']['adresse_site'].'/prive/vignettes/' ;			
			$q = spip_query("SELECT fichier FROM spip_documents LEFT JOIN spip_documents_liens USING (id_document)  WHERE id_objet = '".$_GET['id_'.$objet]."' AND objet = '".$objet."'") ;
			$fichiers = array() ;
			while($r = spip_fetch_array($q)) {
				$fichiers[] = $r['fichier'] ;
			}
			$oFCKeditor->Config['docs'] = join('|',$fichiers) ;

			$toolbar = lire_config("fckeditor/barre_outils") ;
			$toolbar = ($toolbar?$toolbar:'Default') ;
			$oFCKeditor->ToolbarSet = $toolbar ;
			$skin = lire_config("fckeditor/skin") ;
			$skin = ($skin?$skin:'default') ;
			$oFCKeditor->Config['SkinPath'] = fckeditor_canonize_path('skins/'.$skin.'/') ;
			$oFCKeditor->Height = ($taille = lire_config('fckeditor/taille'))?$taille:500 ;
			$oFCKeditor->Value = $htmlcontent ;
			$htmlcontent = $oFCKeditor->CreateHtml() ;
		}
		$flux['data'] = $start.$htmlcontent.$end ;
	}
	return $flux;
}

?>
