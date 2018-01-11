#!/usr/bin/env node
"use strict"

export default function( from, to) {
	var
	  diff= to- from,
	  weeks= diff/ 1000/ 60/ 60/ 24/ 7
	return weeks
}
