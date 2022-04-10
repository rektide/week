var isNum= /^\d+$/

export default function( val){
	if( val instanceof Date){
		return val
	}
	if( typeof( val)=== "string"){
		if( val=== ""){
			val= undefined
		}else if( isNum.test( val)){
			const n= Number.parseInt( val)
			// assume first minute of time to mean years, not epoch
			if (n> 60000){
				val= n
			}
		}
	}
	return val!== undefined? new Date( val): new Date()
}
