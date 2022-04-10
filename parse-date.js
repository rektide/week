var isNum= /^\d+$/

export default function( val){
	if( val instanceof Date){
		return val
	}
	if( typeof( val)=== "string"){
		if( isNum.test( val)){
			val= Number.parseFloat( val)
		}
	}
	return val!== undefined? new Date( val): new Date()
}
