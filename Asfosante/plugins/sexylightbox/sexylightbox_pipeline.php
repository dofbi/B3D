<?php
/**
 * plugin sexylightbox
 * Diaporama
 *
 * Auteur :
 * Franck Ruzzin
 * le 07/06/2010
 *
 **/

	if (!defined('_DIR_PLUGIN_SEXYLIGHTBOX')){
		$p=explode(basename(_DIR_PLUGINS)."/",str_replace('\\','/',realpath(dirname(__FILE__))));
		define('_DIR_PLUGIN_SEXYLIGHTBOX',(_DIR_PLUGINS.end($p))."/");
	}

	function sexylightbox_insert_head($flux){	
		$flux .= "<script src='" . _DIR_PLUGIN_SEXYLIGHTBOX . "javascript/jquery.easing.1.3.pack.js' type='text/javascript'></script>\n";
		$flux .= "<script src='" . _DIR_PLUGIN_SEXYLIGHTBOX . "javascript/sexylightbox.v2.3.jquery.min.js' type='text/javascript'></script>\n";
		$flux .= "<link rel='stylesheet' href='" . _DIR_PLUGIN_SEXYLIGHTBOX . "css/sexylightbox.css' type='text/css' media='all' />\n";
		$flux .= "<link rel='stylesheet' href='" . _DIR_PLUGIN_SEXYLIGHTBOX . "css/sexylightbox_spip.css' type='text/css' media='all' />\n";
		return $flux;
	}
	
	function sexylightbox_header_prive($flux){
		$flux .= "<script src='" . _DIR_PLUGIN_SEXYLIGHTBOX . "javascript/jquery.easing.1.3.pack.js' type='text/javascript'></script>\n";
		$flux .= "<script src='" . _DIR_PLUGIN_SEXYLIGHTBOX . "javascript/sexylightbox.v2.3.jquery.min.js' type='text/javascript'></script>\n";
		$flux .= "<link rel='stylesheet' href='" . _DIR_PLUGIN_SEXYLIGHTBOX . "css/sexylightbox.css' type='text/css' media='all' />\n";
		$flux .= "<link rel='stylesheet' href='" . _DIR_PLUGIN_SEXYLIGHTBOX . "css/sexylightbox_spip.css' type='text/css' media='all' />\n";
		return $flux;
	}
	
?>