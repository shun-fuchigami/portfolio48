export function textNewLine(text){
    return text.split('\n').map( (t,index) =>{
        return ( <span key={index}> {t} <br/> </span>)
    })
}

