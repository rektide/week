#!/usr/bin/env node
import sep from "path"
import readOrExecute from "read-or-execute"
import xdgBasedir from "xdg-basedir"

import parseDate from "./parse-date.js"
import since from "./since.js"

async function xdgConfig(){
	var val
	try {
		val= await readOrExecute( xdgBasedir.config+ sep+ "weekssince"+ sep+ "weekssince.json")
	}catch( e){
		return {}
	}
	return JSON.parse( val)
}

function main( from, to, config= xdgConfig, fn){
	if( config=== undefined){
		config= xdgConfig
	}
	if( config instanceof Function){
		config= config()
	}
	if( config&& config.then){
		// becomes async
		return config.then( config=> main( from, to, config))
	}
	config= config|| {}

	from= parseDate( from|| process.argv[ 2]|| config.from)
	to= parseDate( to|| process.argv[ 3]|| config.to)
	fn= fn|| since

	var val= fn( from, to)
	return val
}
export default main

if( import.meta.url=== `file://${process.argv[ 1]}`){
	(async () => console.log(await main()))();
}
