/*
**    Created by: Jeff Todnem (http://www.todnem.com/)
**    Created on: 2007-08-14
**    Modified by: Ted Tschopp (http://tschopp.net)
**    Last modified: 2012-10-24
**
**    License Information:
**    -------------------------------------------------------------------------
**    Portions Copyright (C) 2007 Jeff Todnem
**    Portions Copyright (C) 2012 Ted Tschopp
**
**    This program is free software; you can redistribute it and/or modify it
**    under the terms of the GNU General Public License as published by the
**    Free Software Foundation; either version 2 of the License, or (at your
**    option) any later version.
**    
**    This program is distributed in the hope that it will be useful, but
**    WITHOUT ANY WARRANTY; without even the implied warranty of
**    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
**    General Public License for more details.
**    
**    You should have received a copy of the GNU General Public License along
**    with this program; if not, write to the Free Software Foundation, Inc.,
**    59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
**    
*/

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		};
	}
}

function $() {
	var arrElms = [];
	for (var i=0; i < arguments.length; i++) {
		var elm = arguments[i];
		if (typeof(elm == "string")) { elm = document.getElementById(elm); }
		if (arguments.length == 1) { return elm; }
		arrElms.push(elm);
	}
	return arrElms;
}

String.prototype.strReverse = function() {
	var newstring = "";
	for (var s=0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
	//strOrig = ' texttotrim ';
	//strReversed = strOrig.revstring();
};

function chkPass(pwd) {
	var oScorebar = $("scorebar");
	var oScore = $("score");
	var oComplexity = $("complexity");
	var oBits = $("bits");
	var oSpeed = $("speed");
	var oSpeedA = $("speedA");
	var oSpeedP = $("speedP");
	var oNotes = $("notes");
	var oHash = $("hash");
	var oMask = $("mask");
	var oDisplayNumberAttempts = $("DisplayNumberAttempts");
	var oDisplayNumberTimeouts = $("DisplayNumberTimeouts");
	var oDisplayNumberLockouts = $("DisplayNumberLockouts");
	var oDisplayLockoutTime = $("DisplayLockoutTime");
	var osupportTimeOut = $("supportTimeOut");
	var oTimeout = $("Timeout");
	var oAttempts = $("Attempts");
	var oLockout = $("Lockout");
	var oLockOutTime = $("LockOutTime");
	var osupportLockOut = $("supportLockOut");

	var odiv_nContainsCommonPassword = $("div_nContainsCommonPassword");
	var onContainsCommonPassword = $("nContainsCommonPassword");
	var onContainsCommonPasswordBonus = $("nContainsCommonPasswordBonus");
	var odiv_nCommonPassword = $("div_nCommonPassword");
	var oCommonPassword = $("nCommonPassword");
	var onCommonPasswordBonus = $("nCommonPasswordBonus");

	var odiv_nContainsDictionary = $("div_nContainsDictionary");
	var onContainsDictionary = $("nContainsDictionary");
	var onContainsDictionaryBonus = $("nContainsDictionaryBonus");
	var odiv_nDictionary = $("div_nDictionary");
	var onDictionary = $("nDictionary");
	var onDictionaryBonus = $("nDictionaryBonus");

	var odiv_nContainsHacked_passwords = $("div_nContainsHacked_passwords");
	var onContainsHacked_passwords = $("nContainsHacked_passwords");
	var onContainsHacked_passwordsBonus = $("nContainsHacked_passwordsBonus");
	var odiv_nHacked_passwords = $("div_nHacked_passwords");
	var onHacked_passwords = $("nHacked_passwords");
	var onHacked_passwordsBonus = $("nHacked_passwordsBonus");


	// Reset the values of the dictionary / password lookup
	odiv_nContainsCommonPassword.className = "pass";
	onContainsCommonPassword.innerHTML = "0";
	onContainsCommonPasswordBonus.innerHTML = "0";
	onContainsCommonPasswordBonus.parentNode.className = "pass";

	odiv_nCommonPassword.className = "pass";
	oCommonPassword.innerHTML = "0";
	onCommonPasswordBonus.innerHTML = "0";
	onCommonPasswordBonus.parentNode.className = "pass";

	odiv_nContainsDictionary.className = "pass";
	onContainsDictionary.innerHTML = "0";
	onContainsDictionaryBonus.innerHTML = "0";
	onContainsDictionaryBonus.parentNode.className = "pass";

	odiv_nDictionary.className = "pass";
	onDictionary.innerHTML = "0";
	onDictionaryBonus.innerHTML = "0";
	onDictionaryBonus.parentNode.className = "pass";

	odiv_nContainsHacked_passwords.className = "pass";
	onContainsHacked_passwords.innerHTML = "0";
	onContainsHacked_passwordsBonus.innerHTML = "0";
	onContainsHacked_passwordsBonus.parentNode.className = "pass";

	odiv_nHacked_passwords.className = "pass";
	onHacked_passwords.innerHTML = "0";
	onHacked_passwordsBonus.innerHTML = "0";
	onHacked_passwordsBonus.parentNode.className = "pass";



	
	// Simultaneous variable declaration and value assignment aren't supported in IE apparently
	// so I'm forced to assign the same value individually per var to support a crappy browser *sigh* 

	var upper                     = false; 
	var lower                     = false;
	var numeric                   = false;
	var special                   = false;
	var indictionary              = false;
	var incommon_password         = false;
	var inhacked_passwords        = false;
	var whereindictionary         = 0;
	var whereincommon_password    = 0;
	var whereinhacked_passwords   = 0;
	var contains_common_password  = false;
	var contains_dictionary       = false;
	var contains_hacked_passwords = false;
	var bit_base                  = 0;
	var bits_per_length           = 0;
	var total_bits                = 0;
	var whereindictionary         = 0;
	var whereincommon_password    = 0;
	var whereinhacked_passwords   = 0;

	var nScore=0, nLength=0, nRLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0;
	var nMultRepChar=1, nMultConsecSymbol=1;
	var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
	var nMultLength=4, nMultNumber=4;
	var nMultSymbol=6;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
	var sAlphaUC="0", sAlphaLC="0", sNumber="0", sSymbol="0", sMidChar="0", sRequirements="0", sAlphasOnly="0", sNumbersOnly="0", sRepChar="0", sConsecAlphaUC="0", sConsecAlphaLC="0", sConsecNumber="0", sSeqAlpha="0", sSeqNumber="0", sSeqSymbol="0";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "01234567890";
	var sSymbols = "~!@#$%^&*()";
	var sComplexity = "Too Short";
	var sStandards = "Below";
	var Notes_to_User = "";
	var pwd_mask = "";
	var pwd_part_mask = "";
	var check_me = "";
	var nMinPwdLen = 8;
	var aAlphabet=new Array();
	var additional_seconds_timeout = 0;
	var additional_seconds_timeout = 0;


	for (var a=0; a < 255; a++) {
		aAlphabet[a]=0;	
	}

	if (document.all) { var nd = 0; } else { var nd = 1; }
	if (pwd) {
		
		if (oMask.checked) { 
			for (var i=0; i < pwd.length; i++) {
				pwd_mask = pwd_mask + "&bull;";
			}
		} else {
			pwd_mask = pwd;
		}
		nScore = parseInt(pwd.length * nMultLength);
		nLength = pwd.length;
		var arrPwd = pwd.replace(/\s+/g,"").split(/\s*/);
		var arrPwdLen = arrPwd.length;
		
		/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
		for (var a=0; a < arrPwdLen; a++) {
			aAlphabet[(arrPwd[a]).charCodeAt(0)]++;
			/*Upper Case */
			if (arrPwd[a].match(/[A-Z]/g)) {
				if (nTmpAlphaUC !== "") { if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; nConsecCharType++; } }
				nTmpAlphaUC = a;
				nAlphaUC++;
				upper=true;
				}
			/*Lower Case */
			else if (arrPwd[a].match(/[a-z]/g)) { 
				if (nTmpAlphaLC !== "") { if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; nConsecCharType++; } }
				nTmpAlphaLC = a;
				nAlphaLC++;
				lower=true;
			}
			/*Numbers */
			else if (arrPwd[a].match(/[0-9]/g)) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
				nTmpNumber = a;
				nNumber++;
				numeric=true;
			}
			/*Letters and Numbers */
			else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpSymbol !== "") { if ((nTmpSymbol + 1) == a) { nConsecSymbol++; nConsecCharType++; } }
				nTmpSymbol = a;
				nSymbol++;
				special=true;
			}
			/* Internal loop through password to check for repeat characters */
			var bCharExists = false;
			for (var b=0; b < arrPwdLen; b++) {
				if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
					bCharExists = true;
					/* 
					Calculate icrement deduction based on proximity to identical characters
					Deduction is incremented each time a new match is discovered
					Deduction amount is based on total password length divided by the
					difference of distance between currently selected match
					*/
					nRepInc += Math.abs(arrPwdLen/(b-a));
				}
			}
			if (bCharExists) { 
				nRepChar++; 
				nUnqChar = arrPwdLen-nRepChar;
				nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
			}
		}
		
		/* Check for sequential alpha string patterns (forward and reverse) */
		for (var s=0; s < 23; s++) {
			var sFwd = sAlphas.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
		}
		
		/* Check for sequential numeric string patterns (forward and reverse) */
		for (var s=0; s < 8; s++) {
			var sFwd = sNumerics.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
		}
		
		/* Check for sequential symbol string patterns (forward and reverse) */
		for (var s=0; s < 8; s++) {
			var sFwd = sSymbols.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqSymbol++; nSeqChar++;}
		}

		/* Find the Real Length removing duplicate letters as duplicates do not add to the enthropy */
		for (var a=0; a < 255; a++) {
			if ( aAlphabet[a] > 0 ) {
				nRLength++;
			}
		}

		/* General point assignment */
		$("nLengthBonus").innerHTML = "+ " + nScore; 
		if (nAlphaUC > 0 && nAlphaUC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
			sAlphaUC = "+ " + parseInt((nLength - nAlphaUC) * 2); 
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2)); 
			sAlphaLC = "+ " + parseInt((nLength - nAlphaLC) * 2);
		}
		if (nNumber > 0 && nNumber < nLength) {	
			nScore = parseInt(nScore + (nNumber * nMultNumber));
			sNumber = "+ " + parseInt(nNumber * nMultNumber);
		}
		if (nSymbol > 0) {	
			nScore = parseInt(nScore + (nSymbol * nMultSymbol));
			sSymbol = "+ " + parseInt(nSymbol * nMultSymbol);
		}
		if (nMidChar > 0) {	
			nScore = parseInt(nScore + (nMidChar * nMultMidChar));
			sMidChar = "+ " + parseInt(nMidChar * nMultMidChar);
		}
		$("nAlphaUCBonus").innerHTML = sAlphaUC; 
		$("nAlphaLCBonus").innerHTML = sAlphaLC;
		$("nNumberBonus").innerHTML = sNumber;
		$("nSymbolBonus").innerHTML = sSymbol;
		$("nMidCharBonus").innerHTML = sMidChar;
		
		/*Point deductions for poor practices */
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
			nScore = parseInt(nScore - nLength);
			nAlphasOnly = nLength;
			sAlphasOnly = "- " + nLength;
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
			nScore = parseInt(nScore - nLength); 
			nNumbersOnly = nLength;
			sNumbersOnly = "- " + nLength;
		}
		if (nRepChar > 0) {  // Same character exists more than once
			nScore = parseInt(nScore - nRepInc);
			sRepChar = "- " + nRepInc;
		}
		if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC)); 
			sConsecAlphaUC = "- " + parseInt(nConsecAlphaUC * nMultConsecAlphaUC);
		}
		if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
			sConsecAlphaLC = "- " + parseInt(nConsecAlphaLC * nMultConsecAlphaLC);
		}
		if (nConsecNumber > 0) {  // Consecutive Numbers exist
			nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
			sConsecNumber = "- " + parseInt(nConsecNumber * nMultConsecNumber);
		}
		if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqAlpha * nMultSeqAlpha)); 
			sSeqAlpha = "- " + parseInt(nSeqAlpha * nMultSeqAlpha);
		}
		if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqNumber * nMultSeqNumber)); 
			sSeqNumber = "- " + parseInt(nSeqNumber * nMultSeqNumber);
		}
		if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqSymbol * nMultSeqSymbol)); 
			sSeqSymbol = "- " + parseInt(nSeqSymbol * nMultSeqSymbol);
		}


		$("nAlphasOnlyBonus").innerHTML = sAlphasOnly; 
		$("nNumbersOnlyBonus").innerHTML = sNumbersOnly; 
		$("nRepCharBonus").innerHTML = sRepChar; 
		$("nConsecAlphaUCBonus").innerHTML = sConsecAlphaUC; 
		$("nConsecAlphaLCBonus").innerHTML = sConsecAlphaLC; 
		$("nConsecNumberBonus").innerHTML = sConsecNumber;
		$("nSeqAlphaBonus").innerHTML = sSeqAlpha; 
		$("nSeqNumberBonus").innerHTML = sSeqNumber; 
		$("nSeqSymbolBonus").innerHTML = sSeqSymbol; 

		/* Determine if mandatory requirements have been met and set image indicators accordingly */
		var arrChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
		var arrCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrCharsIds[c] == "nLength") { var minVal = parseInt(nMinPwdLen - 1); } else { var minVal = 0; }
			if (arrChars[c] == parseInt(minVal + 1)) { nReqChar++; oImg.className = "pass"; oBonus.parentNode.className = "pass"; }
			else if (arrChars[c] > parseInt(minVal + 1)) { nReqChar++; oImg.className = "exceed"; oBonus.parentNode.className = "exceed"; }
			else { oImg.className = "fail"; oBonus.parentNode.className = "fail"; }
		}
		nRequirements = nReqChar;
		if (pwd.length >= nMinPwdLen) { var nMinReqChars = 3; } else { var nMinReqChars = 4; }
		if (nRequirements > nMinReqChars) {  // One or more required characters exist
			nScore = parseInt(nScore + (nRequirements * 2)); 
			sRequirements = "+ " + parseInt(nRequirements * 2);
		}
		$("nRequirementsBonus").innerHTML = sRequirements;

		/* Determine if additional bonuses need to be applied and set image indicators accordingly */
		var arrChars = [nMidChar,nRequirements];
		var arrCharsIds = ["nMidChar","nRequirements"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrCharsIds[c] == "nRequirements") { var minVal = nMinReqChars; } else { var minVal = 0; }
			if (arrChars[c] == parseInt(minVal + 1)) { oImg.className = "pass"; oBonus.parentNode.className = "pass"; }
			else if (arrChars[c] > parseInt(minVal + 1)) { oImg.className = "exceed"; oBonus.parentNode.className = "exceed"; }
			else { oImg.className = "fail"; oBonus.parentNode.className = "fail"; }
		}

		/* Determine if suggested requirements have been met and set image indicators accordingly */
		var arrChars = [nAlphasOnly,nNumbersOnly,nRepChar,nConsecAlphaUC,nConsecAlphaLC,nConsecNumber,nSeqAlpha,nSeqNumber,nSeqSymbol];
		var arrCharsIds = ["nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nSeqAlpha","nSeqNumber","nSeqSymbol"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrChars[c] > 0) { oImg.className = "warn"; oBonus.parentNode.className = "warn"; }
			else { oImg.className = "pass"; oBonus.parentNode.className = "pass"; }
		}
		
		/*Display the password for our weakness notes*/
		if ( $("passwordTxt").className == "hide") {
			Notes_to_User = Notes_to_User + "'<span id='password_notes'>"+pwd_mask+"</span>': <ul>";
		} else {
			Notes_to_User = Notes_to_User + "'<span id='password_notes'>"+pwd_mask+"</span>': <ul>";
		}
		/* Display Bits of Enthropy */
//		counter=0;
//		for (var a=0; a<pwd.length;a++){
//			counter++;
//			/*Upper Case */
//			if (pwd[a].match(/[A-Z]/g)) {
//				Notes_to_User = Notes_to_User + string2Bin(pwd[a])+"- 4 bits entropy<br>";
//				}
//			/*Lower Case */
//			else if (pwd[a].match(/[a-z]/g)) { 
//				Notes_to_User = Notes_to_User + string2Bin(pwd[a])+"- 4 bits entropy<br>";
//			}
//			/*Numbers */
//			else if (pwd[a].match(/[0-9]/g)) { 
//				Notes_to_User = Notes_to_User + string2Bin(pwd[a])+"- 3 bits entropy<br>";
//			}
//			/*Letters and Numbers */
//			else if (pwd[a].match(/[^a-zA-Z0-9_]/g)) { 
//				Notes_to_User = Notes_to_User + string2Bin(pwd[a])+"- 4 bits entropy<br>";
//			}
//
//		}
		/* Determine if the password is one from the most common passwords */
		
		if (common_passwords.indexOf(pwd.toLowerCase()) >= 1 ||
		    common_passwords.indexOf(pwd.toLowerCase().strReverse()) >= 1
		) {
			Notes_to_User = Notes_to_User + "<li class='danger'>is a common password</li>";
			nScore = 0;
			incommon_password = true;
			whereincommon_password = ( common_passwords.indexOf(pwd.toLowerCase()) > 
									   common_passwords.indexOf(pwd.toLowerCase().strReverse()) ) ? common_passwords.indexOf(pwd.toLowerCase()) :common_passwords.indexOf(pwd.toLowerCase().strReverse());

			odiv_nCommonPassword.className = "fail";
			oCommonPassword.innerHTML = "1";
			onCommonPasswordBonus.innerHTML = "-100";
			onCommonPasswordBonus.parentNode.className = "fail";
		}
		/* Determine if the password is one from the dictionary words */
		if (dictionary.indexOf(pwd.toLowerCase()) >= 1 ||
		    dictionary.indexOf(pwd.toLowerCase().strReverse()) >= 1
		) {
			Notes_to_User = Notes_to_User + "<li class='danger'>is a common word</li>";
			nScore = 0;
			indictionary = true;
			whereindictionary = ( dictionary.indexOf(pwd.toLowerCase()) > 
								  dictionary.indexOf(pwd.toLowerCase().strReverse()) ) ? dictionary.indexOf(pwd.toLowerCase()) : dictionary.indexOf(pwd.toLowerCase().strReverse());



			odiv_nDictionary.className = "fail";
			onDictionary.innerHTML = "1";
			onDictionaryBonus.innerHTML = "-100";
			onDictionaryBonus.parentNode.className = "fail";
		}
		/* Determine if the password is one from the hacked passwords */
		if (hacked_passwords.indexOf(pwd.toLowerCase()) >= 1 ||
		    hacked_passwords.indexOf(pwd.toLowerCase().strReverse()) >= 1
		) {
			Notes_to_User = Notes_to_User + "<li class='danger'>is a known compromised password</li>";
			nScore = 0;
			inhacked_passwords = true;
			whereinhacked_passwords = ( hacked_passwords.indexOf(pwd.toLowerCase()) > 
								  hacked_passwords.indexOf(pwd.toLowerCase().strReverse()) ) ? hacked_passwords.indexOf(pwd.toLowerCase()) : dictionary.indexOf(pwd.toLowerCase().strReverse());



			odiv_nHacked_passwords.className = "fail";
			onHacked_passwords.innerHTML = "1";
			onHacked_passwordsBonus.innerHTML = "-100";
			onHacked_passwordsBonus.parentNode.className = "fail";
		}

		/*Check to see if a common password is in the password typed */
		if (incommon_password == false) {
			for (var i=1; i < common_passwords.length; i++)	{
				if (pwd.toLowerCase().indexOf(common_passwords[i].toLowerCase()) >-1) {
					contains_common_password = true;
					common_password_output = common_passwords[i].toLowerCase();
					i = common_passwords.length+1;
				}
			}	
			if (contains_common_password == true ){
				for (var j=0; j < common_password_output.length; j++) {
					pwd_part_mask = pwd_part_mask + "&bull;";
				}
				if (oMask.checked) { 
					Notes_to_User = Notes_to_User + "<li class='warning' id='Contains_Common_PWD_mask'>contains a common password: "+pwd_part_mask+"</li>";
					Notes_to_User = Notes_to_User + "<li class='warning hide' id='Contains_Common_PWD'>contains a common password: "+common_password_output+"</li>";
				} else {
					Notes_to_User = Notes_to_User + "<li class='warning hide' id='Contains_Common_PWD_mask'>contains a common password: "+pwd_part_mask+"</li>";
					Notes_to_User = Notes_to_User + "<li class='warning' id='Contains_Common_PWD_mask'>contains a common password: "+common_password_output+"</li>";
				}
	
				odiv_nContainsCommonPassword.className = "warn";
				onContainsCommonPassword.innerHTML = "1";
				onContainsCommonPasswordBonus.innerHTML = "-1";
				onContainsCommonPasswordBonus.parentNode.className = "warn";
			};
		}


		/*Check to see if a common dictionary word is in the password typed */
		if (indictionary == false) {
			for (var i=1; i < dictionary.length; i++)	{
				if (pwd.toLowerCase().indexOf(dictionary[i].toLowerCase()) >-1) {
					contains_dictionary = true;
					dictionary_output = dictionary[i].toLowerCase();
					i = dictionary.length+1;
				}
			}	
			if (contains_dictionary == true ){
				for (var j=0; j < dictionary_output.length; j++) {
					pwd_part_mask = pwd_part_mask + "&bull;";
				}
				if (oMask.checked) { 
					Notes_to_User = Notes_to_User + "<li class='warning' id='Contains_Common_Word_mask'>contains a common word: "+pwd_part_mask+"</li>";
					Notes_to_User = Notes_to_User + "<li class='warning hide' id='Contains_Common_Word'>contains a common word: "+dictionary_output+"</li>";
				} else {
					Notes_to_User = Notes_to_User + "<li class='warning hide' id='Contains_Common_Word_mask'>contains a common word: "+pwd_part_mask+"</li>";
					Notes_to_User = Notes_to_User + "<li class='warning' id='Contains_Common_Word'>contains a common word: "+dictionary_output+"</li>";
				}
	
				odiv_nContainsDictionary.className = "warn";
				onContainsDictionary.innerHTML = "1";
				onContainsDictionaryBonus.innerHTML = "-1";
				onContainsDictionaryBonus.parentNode.className = "warn";
			};
		}
		/*Check to see if a hacked password is in the password typed */
		if (inhacked_passwords == false) {
			for (var i=1; i < hacked_passwords.length; i++)	{
				if (pwd.toLowerCase().indexOf(hacked_passwords[i].toLowerCase()) >-1) {
					contains_hacked_passwords = true;
					hacked_passwords_output = hacked_passwords[i].toLowerCase();
					i = hacked_passwords.length+1;
				}
			}	
			if (contains_hacked_passwords == true ){
				for (var j=0; j < hacked_passwords_output.length; j++) {
					pwd_part_mask = pwd_part_mask + "&bull;";
				}
				if (oMask.checked) { 
					Notes_to_User = Notes_to_User + "<li class='warning' id='Contains_Hacked_Password_mask'>contains a hacked password: "+pwd_part_mask+"</li>";
					Notes_to_User = Notes_to_User + "<li class='warning hide' id='Contains_Hacked_Password'>contains a hacked password: "+hacked_passwords_output+"</li>";
				} else {
					Notes_to_User = Notes_to_User + "<li class='warning hide' id='Contains_Hacked_Password_mask'>contains a hacked password: "+pwd_part_mask+"</li>";
					Notes_to_User = Notes_to_User + "<li class='warning' id='Contains_Hacked_Password'>contains a hacked password: "+hacked_passwords_output+"</li>";
				}
	
				odiv_nContainsHacked_passwords.className = "warn";
				onContainsHacked_passwords.innerHTML = "1";
				onContainsHacked_passwordsBonus.innerHTML = "-1";
				onContainsHacked_passwordsBonus.parentNode.className = "warn";
			};
		}
		Notes_to_User = Notes_to_User + "</ul>";

		/* Determine complexity based on overall score */
		if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }
		if (nScore >= 0 && nScore < 20) { sComplexity = "Very Weak"; }
		else if (nScore >= 20 && nScore < 40) { sComplexity = "Weak"; }
		else if (nScore >= 40 && nScore < 60) { sComplexity = "Good"; }
		else if (nScore >= 60 && nScore < 80) { sComplexity = "Strong"; }
		else if (nScore >= 80 && nScore <= 100) { sComplexity = "Very Strong"; }

	
		/* Display updated score criteria to client */
		oScorebar.style.backgroundPosition = "-" + parseInt(nScore * 4) + "px";
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
		
		/* Display the bits to the client */
		if (numeric) {
			bit_base = bit_base + 10
		}
		if (lower) {
			bit_base = bit_base + 26
		}
		if (upper) {
			bit_base = bit_base + 26
		}
		if (special) {
			bit_base = bit_base + 32
		}
		bits_per_length = (Math.log(bit_base))/(Math.log(2));
		
	
		total_bits = bits_per_length * nRLength;
		oBits.innerHTML = parseInt(total_bits)+" bits";
		
		/* Display the speed of cracking to the client */
		var seconds = 0;
		var calcs_per_second = 166927.9537*1000;
		var calcs_per_second_A = 13144654.63*1000;
		var calcs_per_second_P = 17042497.3*1000;
		
		
		/* if they are not a common passwored or in the dictionary then the time will be in right*/

		if (!(incommon_password || indictionary || inhacked_passwords)) {
			seconds = (Math.pow(2,total_bits)); 
		} else {
		
			if (indictionary) {
				/* First try all the common passwords, then try the hacked_passwords, then try the dictionary. */
				seconds = common_passwords.length + hacked_passwords.length + whereindictionary; 
			} 
			if (inhacked_passwords) {
				/* First try all the common passwords, then try the hacked_passwords. */
				seconds = common_passwords.length + whereinhacked_passwords; 
			}
			if (incommon_password) {
				/* First try all the common passwords, then try the hacked_passwords, then try the dictionary. */
				seconds = whereincommon_password; 
			}
		}

		/* TODO Fix Lockout and Timeout */

		/* Support Lockout */
		if (osupportLockOut.checked) {
			additional_seconds_lockout = (seconds / oLockout.value) * oLockOutTime.value * 60;
		} else {
			additional_seconds_lockout = 0;
		}
		/* Support Timeout */
		if (osupportTimeOut.checked) {
			additional_seconds_timeout = (seconds / oAttempts.value) * oTimeout.value;
		} else {
			additional_seconds_timeout = 0;
		
		}
 		



		/* Add additional time if the attacker doesn't have access to the machine */
		if (oHash.checked) { 
			oSpeed.innerHTML  = secondsToTime(seconds/calcs_per_second);
			oSpeedA.innerHTML = secondsToTime(seconds/calcs_per_second_A);
			oSpeedP.innerHTML = secondsToTime(seconds/calcs_per_second_P);
		} else { 
			oSpeed.innerHTML  = secondsToTime(seconds + additional_seconds_lockout + additional_seconds_timeout);
			oSpeedA.innerHTML = secondsToTime(seconds + additional_seconds_lockout + additional_seconds_timeout);
			oSpeedP.innerHTML = secondsToTime(seconds + additional_seconds_lockout + additional_seconds_timeout);
		}
		oNotes.innerHTML = Notes_to_User;
		
	}
	else {
		/* Display default score criteria to client */
		initPwdChk();
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
	}
}

/**
 * Convert number of seconds into time object
 *
 * @param integer secs Number of seconds to convert
 * @return object
 */
function secondsToTime(secs) {

	var   years = Math.floor(secs / (60 * 60 * 24 * 7 * 52));
	
	var   divisor_for_weeks = secs % (60 * 60 * 24 * 7 *  52);	
	var               weeks = Math.floor(divisor_for_weeks / (60 * 60 * 24 * 7)); 

	var    divisor_for_days = secs % (60 * 60 * 24 * 7);	
	var                days = Math.floor(divisor_for_days / (60 * 60 * 24)); 

	var   divisor_for_hours = divisor_for_days % (60 * 60 * 24);	
	var               hours = Math.floor(divisor_for_hours / (60 * 60));

	var divisor_for_minutes = divisor_for_hours % (60 * 60);	
	var             minutes = Math.floor(divisor_for_minutes / 60);

	var divisor_for_seconds = divisor_for_minutes % 60;
	var             seconds = Math.ceil(divisor_for_seconds);

	var string_to_return = "";
	
	if (years > 0) {
		if (years == 1) {
			string_to_return = years + " year<br />"; 
		} else {
			string_to_return = addCommas(years) + " years<br />"; 
		}
	} else {
		string_to_return = "<br />"; 
	}
	
	if (weeks > 0) {
		if (weeks == 1) {
			string_to_return = string_to_return + weeks + " week<br />"; 
		} else {
			string_to_return = string_to_return + weeks + " weeks<br />"; 
		}
	} else {
		string_to_return = string_to_return + "<br />"; 
	}
	
	if (days > 0) {
		if (days == 1) {
			string_to_return = string_to_return + days + " day<br />"; 
		} else {
			string_to_return = string_to_return + days + " days<br />"; 
		}
	} else {
		string_to_return = string_to_return + "<br />"; 
	}

	if (hours > 0) {
		if (hours == 1) {
			string_to_return = string_to_return + hours + " hour<br />"; 
		} else {
			string_to_return = string_to_return + hours + " hours<br />";
		}
	} else {
		string_to_return = string_to_return + "<br />"; 
	}
	
	if (minutes > 0) {
		if (minutes == 1) {
			string_to_return = string_to_return + minutes + " minute<br />"; 
		} else {
			string_to_return = string_to_return + minutes + " minutes<br />";
		}
	} else {
		string_to_return = string_to_return + "<br />"; 
	}

	if (seconds > 0) {
		if (seconds == 1) {
			string_to_return = string_to_return + seconds + " second<br />"; 
		} else {
			string_to_return = string_to_return + seconds + " seconds<br />"; 
		}
	} else {
		string_to_return = string_to_return + "<br />"; 
	}

   return string_to_return;
}


function togPwdTimeOut() {
	var oPwd = $("passwordPwd");
	var osupportTimeOut = $("supportTimeOut");
	var oDisplayNumberAttempts = $("DisplayNumberAttempts");
	var oDisplayNumberTimeouts = $("DisplayNumberTimeouts");
	if (osupportTimeOut.checked) { 
		oDisplayNumberAttempts.className="";
		oDisplayNumberTimeouts.className="";
	} else { 
		oDisplayNumberAttempts.className="hide";
		oDisplayNumberTimeouts.className="hide";
	}
	chkPass(oPwd.value);
}

function togPwdLockOut() {
	var oPwd = $("passwordPwd");
	var osupportLockOut = $("supportLockOut");
	var oDisplayNumberLockouts = $("DisplayNumberLockouts");
	var oDisplayLockoutTime = $("DisplayLockoutTime");
	if (osupportLockOut.checked) { 
		oDisplayNumberLockouts.className="";
		oDisplayLockoutTime.className="";
	} else { 
		oDisplayNumberLockouts.className="hide";
		oDisplayLockoutTime.className="hide";
	}
	chkPass(oPwd.value);
}

function togPwdHash() {
	var oPwd = $("passwordPwd");
	var oHash = $("hash");
	var oDisplayTimeout = $("DisplayTimeout");
	var oDisplayLockout = $("DisplayLockout");
	if (oHash.checked) { 
		oDisplayTimeout.className="hide";
		oDisplayLockout.className="hide";
	} else { 
		oDisplayTimeout.className="";
		oDisplayLockout.className="";
	}
	chkPass(oPwd.value);
}

function recalcPwd() {
	var oPwd = $("passwordPwd");
	chkPass(oPwd.value);
}


function togPwdMask() {
	var oPwd = $("passwordPwd");
	var oTxt = $("passwordTxt");
	var oMask = $("mask");
	var oContains_Hacked_Password_mask = $("Contains_Hacked_Password_mask");
	var oContains_Hacked_Password = $("Contains_Hacked_Password");
	var oContains_Common_Word_mask = $("Contains_Common_Word_mask");
	var oContains_Common_Word = $("Contains_Common_Word");
	var oContains_Common_PWD_mask = $("Contains_Common_PWD_mask");
	var oContains_Common_PWD = $("Contains_Common_PWD");
	
	var oPwd_note = $("password_notes");
	var oShowOrHide = $("ShowOrHide");

	pwd_mask = "";
	if (oMask.checked) { 
		for (var i=0; i < oTxt.value.length; i++) {
			pwd_mask = pwd_mask + "&bull;";
		}
		oPwd_note.innerHTML = pwd_mask;
		oPwd.value = oTxt.value;
		oPwd.className = ""; 
		oTxt.className = "hide"; 
		oShowOrHide.innerHTML = "hidden";
		
		if (oContains_Hacked_Password_mask == null) {
			/* Do Nothing */
		} else {
			oContains_Hacked_Password_mask.className = "warning";
			oContains_Hacked_Password.className = "hide";
			oContains_Common_Word_mask.className = "warning";
			oContains_Common_Word.className = "hide";;
			oContains_Common_PWD_mask.className = "warning";
			oContains_Common_PWD.className = "hide";
		}
	} 
	else { 
		oTxt.value = oPwd.value;
		oPwd_note.innerHTML = oPwd.value;
		oPwd.className = "hide"; 
		oTxt.className = "";
		oShowOrHide.innerHTML = "shown";
		if (oContains_Hacked_Password_mask == null) {
			/* Do Nothing */
		} else {
			oContains_Hacked_Password_mask.className = "hide";
			oContains_Hacked_Password.className = "warning";
			oContains_Common_Word_mask.className = "hide";
			oContains_Common_Word.className = "warning";
			oContains_Common_PWD_mask.className = "hide";
			oContains_Common_PWD.className = "warning";
		}
	}
}

function togReqMask() {
	var oReqs = $("requirements");
	var oTxt = $("passwordTxt");
	var oReq = $("req");
	if (oReq.checked) { 
		oReqs.className = ""; 
	} 
	else { 
		oReqs.className = "hide"; 
	}
}
function togScoreMask() {
	var oScore = $("tablePwdStatus");
	var oTxt = $("passwordTxt");
	var oScore_details = $("score_details");
	if (oScore_details.checked) { 
		oScore.className = ""; 
		oTxt.className = "hide"; 
	} 
	else { 
		oScore.className = "hide"; 
	}
}



function initPwdChk(restart) {
	/* Reset all form values to their default */
	var arrZeros = ["nLength",
					"nAlphaUC",
					"nAlphaLC",
					"nNumber",
					"nSymbol",
					"nMidChar",
					"nRequirements",
					"nAlphasOnly",
					"nNumbersOnly",
					"nRepChar",
					"nConsecAlphaUC",
					"nConsecAlphaLC",
					"nConsecNumber",
					"nSeqAlpha",
					"nSeqNumber",
					"nSeqSymbol",
					"nLengthBonus",
					"nAlphaUCBonus",
					"nAlphaLCBonus",
					"nNumberBonus",
					"nSymbolBonus",
					"nMidCharBonus",
					"nRequirementsBonus",
					"nAlphasOnlyBonus",
					"nNumbersOnlyBonus",
					"nRepCharBonus",
					"nConsecAlphaUCBonus",
					"nConsecAlphaLCBonus",
					"nConsecNumberBonus",
					"nSeqAlphaBonus",
					"nSeqNumberBonus",
					"nSeqSymbolBonus",
					"nContainsDictionaryBonus",
					"nDictionaryBonus",
					"nContainsCommonPasswordBonus",
					"nCommonPasswordBonus",
					"nContainsDictionary",
					"nDictionary",
					"nContainsHacked_passwords",
					"nHacked_passwords",
					"nContainsCommonPassword",
					"nCommonPassword"
					];
	var arrPassPars = ["nAlphasOnlyBonus",
					   "nNumbersOnlyBonus",
					   "nRepCharBonus",
					   "nConsecAlphaUCBonus",
					   "nConsecAlphaLCBonus",
					   "nConsecNumberBonus",
					   "nSeqAlphaBonus",
					   "nSeqNumberBonus",
					   "nSeqSymbolBonus", 
					   "nContainsDictionaryBonus", 
					   "nDictionaryBonus", 
					   "nContainsHacked_passwordsBonus", 
					   "nHacked_passwordsBonus", 
					   "nContainsCommonPasswordBonus", 
					   "nCommonPasswordBonus"];
	var arrPassDivs = ["div_nAlphasOnly",
					   "div_nNumbersOnly",
					   "div_nRepChar",
					   "div_nConsecAlphaUC",
					   "div_nConsecAlphaLC",
					   "div_nConsecNumber",
					   "div_nSeqAlpha",
					   "div_nSeqNumber",
					   "div_nSeqSymbol"];
	var arrFailPars = ["nLengthBonus",
					   "nAlphaUCBonus",
					   "nAlphaLCBonus",
					   "nNumberBonus",
					   "nSymbolBonus",
					   "nMidCharBonus",
					   "nRequirementsBonus"
					   ];
	var arrFailDivs = ["div_nLength",
					   "div_nAlphaUC",
					   "div_nAlphaLC",
					   "div_nNumber",
					   "div_nSymbol",
					   "div_nMidChar",
					   "div_nRequirements"
					   ];
	for (var i in arrZeros) { $(arrZeros[i]).innerHTML = "0"; }
	for (var i in arrPassPars) { $(arrPassPars[i]).parentNode.className = "pass"; }
	for (var i in arrPassDivs) { $(arrPassDivs[i]).className = "pass"; }
	for (var i in arrFailPars) { $(arrFailPars[i]).parentNode.className = "fail"; }
	for (var i in arrFailDivs) { $(arrFailDivs[i]).className = "fail"; }
	$("passwordPwd").value = "";
	$("passwordTxt").value = "";
	$("scorebar").style.backgroundPosition = "0";
	if (restart) {
		$("passwordPwd").className = "";
		$("passwordTxt").className = "hide";
		$("mask").checked = true;
	}
}

String.prototype.trim = function () {
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x2 = x.length > 1 ? '.' + x[1] : '';

	var rgx = /(\d+)(\d{3})/;

	while (rgx.test(x[0])) {
		x[0] = x[0].replace(rgx, '$1' + ',' + '$2');
	}
	return x[0] + x2;
}


addLoadEvent(function() { initPwdChk(1); });


if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
} 



function string2Bin(s) {
	var b = new Array();
	var last = s.length;
	for (var i = 0; i < last; i++) {
		var d = s.charCodeAt(i);
		if (d < 128) {
			b[i] = dec2Bin(d);
		} else {
			var c = s.charAt(i);
			b[i] = -1;
		}
	}
	return b;
}

function dec2Bin(d) {
	var b = '';
	for (var i = 0; i < 8; i++) {
		b = (d%2) + b;
		d = Math.floor(d/2);
	}
	return b;
}

Number.prototype.integer = function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
}