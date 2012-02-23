/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2008 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Plugin to insert "SpipDocs" in the editor,
 *                  "SpipImgs" in the editor.
 */

// Register the related command.
FCKCommands.RegisterCommand( 'SpipImg', new FCKDialogCommand( 'SpipImg', FCKLang.SpipImgDlgTitle, FCKPlugins.Items['spipdoc'].Path + 'fck_spipimg.html', 340, 320 ) ) ;
FCKCommands.RegisterCommand( 'SpipDoc', new FCKDialogCommand( 'SpipDoc', FCKLang.SpipDocDlgTitle, FCKPlugins.Items['spipdoc'].Path + 'fck_spipdoc.html', 340, 315 ) ) ;

FCKCommands.RegisterCommand( 'SpipLink', new FCKDialogCommand( 'SpipLink', FCKLang.SpipLinkDlgTitle, FCKPlugins.Items['spipdoc'].Path + 'fck_spiplink.html', 440, 245 ) ) ;

// Create the "Plaholder" toolbar button.
var oSpipImgItem = new FCKToolbarButton( 'SpipImg', FCKLang.SpipImgBtn ) ;
oSpipImgItem.IconPath = FCKPlugins.Items['spipdoc'].Path + 'spipimg.png' ;
FCKToolbarItems.RegisterItem( 'SpipImg', oSpipImgItem ) ;

var oSpipDocItem = new FCKToolbarButton( 'SpipDoc', FCKLang.SpipDocBtn ) ;
oSpipDocItem.IconPath = FCKPlugins.Items['spipdoc'].Path + 'spipdoc.png' ;
FCKToolbarItems.RegisterItem( 'SpipDoc', oSpipDocItem ) ;

var oSpipLinkItem = new FCKToolbarButton( 'SpipLink', FCKLang.SpipLinkBtn ) ;
oSpipLinkItem.IconPath = FCKPlugins.Items['spipdoc'].Path + 'spiplink.png' ;
FCKToolbarItems.RegisterItem( 'SpipLink', oSpipLinkItem ) ;


// The object used for all SpipImg operations.
var FCKSpipImgs = new Object() ;
FCKSpipImgs.docs = FCKConfig.docs ;
FCKSpipImgs.SiteSPIPImg = FCKConfig.SiteSPIPImg ;

// The object used for all SpipDoc operations.
var FCKSpipDocs = new Object() ;
FCKSpipDocs.docs = FCKConfig.docs ;
FCKSpipDocs.vignettes = FCKConfig.vignettes ;
FCKSpipDocs.SiteSPIPImg = FCKConfig.SiteSPIPImg ;

// The object used for all SpipLink operations.
var FCKSpipLinks = new Object() ;
FCKSpipLinks.SiteSPIP = FCKConfig.SiteSPIP ;

// Add a new spipimg at the actual selection.
FCKSpipImgs.Add = function( name, w, h, align )
{
	var oImg = FCK.EditorDocument.createElement ( 'img' ) ;
	var oSpan= FCK.InsertElement( 'span') ;
	oSpan.appendChild(oImg) ;
	this.SetupImg( oSpan, oImg, name, w, h, align ) ;
}

FCKSpipImgs.SetupImg = function( span, img, name, w, h, align )
{
	img.src = FCKConfig.SiteSPIPImg + name ;
	if (w>0) {
		img.width = w ;
	}
	if (h>0) { 
		img.height = h ;
	}
	switch (align) {
		case 'left':
			span.className = 'spip_documents spip_documents_left' ;
			break ;
		case 'right':
			span.className = 'spip_documents spip_documents_right' ;
			break ;
		default:
			span.className = 'spip_documents spip_documents_center' ;
			break ;
	}
}

// Add a new spipdoc at the actual selection.
FCKSpipDocs.Add = function( name, align )
{
	var oImg = FCK.EditorDocument.createElement ( 'img' ) ;
	var oA = FCK.EditorDocument.createElement ('a' ) ;
	oA.appendChild(oImg) ;
	var oSpan= FCK.InsertElement( 'span') ;
	oSpan.appendChild(oA) ;
	var oText= FCK.EditorDocument.createElement ( 'span' ) ;
	oA.appendChild(oText) ;
	this.SetupDoc( oSpan, oImg, oA, oText, name, align ) ;
}

FCKSpipDocs.SetupDoc = function( span, img, a, text, name, align )
{	

	var regex = /^.*\/(.*)$/ ;
	text.innerHTML = '<br/>'+name.replace(regex, "$1") ;
	a.href = FCKConfig.SiteSPIPImg+name ;
	a.title = name ;
	regex = /^.*\.(\w*)$/ ;
	img.src = FCKConfig.vignettes + name.replace(regex, "$1") + '.png' ;

	switch (align) {
		case 'left':
			span.className = 'spip_documents spip_documents_left' ;
			break ;
		case 'right':
			span.className = 'spip_documents spip_documents_right' ;
			break ;
		default:
			span.className = 'spip_documents spip_documents_center' ;
			break ;
	}
}

FCKSpipLinks.AddLink = function(defaulttext, link, text) {
	var elA = FCK.InsertElement('a') ;
	elA.href = link ;
	elA.title = defaulttext ;
	if (text) {
		elA.innerHTML = text ;
	} else {
		elA.innerHTML = defaulttext ;
	}
}

