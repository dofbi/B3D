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

function getBalise_sexylightbox($p,$nombal){
	// Transforme l'ecriture du deuxieme param {truc=chose,machin=chouette} en
	// {truc=chose}{machin=chouette}... histoire de simplifier l'ecriture pour
	// le webmestre : #MODELE{emb}{autostart=true,truc=1,chose=chouette}
	list($maj, $min, $rev) = explode(".", $GLOBALS['spip_version_affichee']);
	$version=$maj*1000000+$min*1000+$rev;
	if ($version<=2000008) 
	{
		if ($p->param[0]) {
			while (count($p->param[0])>2){
				$p->param[]=array(0=>NULL,1=>array_pop($p->param[0]));
			}
		}
		$champ = phraser_arguments_inclure($p, true); 
		$code_contexte = argumenter_inclure($champ, $p->descr, $p->boucles, $p->id_boucle, false);
	} 
	else
	{
		$code_contexte = argumenter_inclure($p->param, true, $p->descr, $p->boucles, $p->id_boucle, false);
	} 
	// Reserver la cle primaire de la boucle courante
	if ($primary = $p->boucles[$p->id_boucle]->primary) {
		$id = champ_sql($primary, $p);
		$code_contexte[] = "'$primary='.".$id;
	}
	
	$p->code = "( ((\$recurs=(isset(\$Pile[0]['recurs'])?\$Pile[0]['recurs']:0))<5)?
	recuperer_fond('modeles/" . $nombal ."',
		creer_contexte_de_modele(array(".join(',', $code_contexte).",'recurs='.(++\$recurs), \$GLOBALS['spip_lang']))):'')";
	
	$p->interdire_scripts = false;
	return $p;
}
 
function balise_SEXYLIGHTBOXGALLERY($p) {
	return getBalise_sexylightbox($p,'sexylightboxgallery');
}

function balise_SEXYLIGHTBOX($p) {
	return getBalise_sexylightbox($p,'sexylightbox');
}


function balise_GETLAYOUT($p) {
	$searchFile = interprete_argument_balise (1, $p);
	$p->code = "get_cheminPluginSLB($searchFile)";
	return $p;
}

function get_cheminPluginSLB($file="") {
	return find_in_path(_DIR_PLUGIN_SEXYLIGHTBOX . $file);	
}







?>
