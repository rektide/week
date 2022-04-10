#!/usr/bin/env node
import { sep} from "path"
import readOrExecute from "read-or-execute"
import xdgBasedir from "xdg-basedir"

import parseDate from "./parse-date.js"
import since from "./since.js"

async function xdgConfig(){
	try {
		const stream= await readOrExecute( xdgBasedir.config+ sep+ "weekssince"+ sep+ "weekssince.json")
		const buf= []
		for await( const b of stream){
			buf.push( b);
		}

		const val= buf.join("");
		return JSON.parse( val)
	}catch( e){
		return {}
	}
}

function deNow( t){
	if ( t=== "now"){
		return "" // nullish won't override this, parseDate will see this
	}else if( t=== ""){
		return undefined // nullish will override this, parseDate will see latter
	}
	return t
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

	from= deNow( from)?? deNow( process.argv[2])?? deNow( config.from)
	to= deNow(to)?? deNow( process.argv[3])?? deNow( config.to)

	from= parseDate( from)
	to= parseDate( to)
	fn= fn|| since

	var val= fn( from, to)
	return val
}
export default main

if( import.meta.url=== `file://${process.argv[ 1]}`){
	(async () => console.log(await main()))();
}
