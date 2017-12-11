// PR Pal - WebExtension for ignoring whitespace in diffs and such.
//
// Written by Brigham Toskin <brigham@ionoclast.com>
//
// Copyright © 2017 Ionoclast Laboratories, LLC.
// For usage and redistribution terms, see the included LICENSE file, or:
// <https://github.com/IonoclastBrigham/pr-pal/blob/master/LICENSE>
////////////////////////////////////////////////////////////////////////////////


package com.ionoclast.prpal

import kotlin.browser.*


const val WHITESPACE_PARAM = "w=1"

fun redirectIfNeeded() {
	window.location.takeIf { !it.search.contains(WHITESPACE_PARAM) } ?.let {
		console.log("PR Pal - adding ignore-whitespace param")
		it.search += WHITESPACE_PARAM
	}
}
