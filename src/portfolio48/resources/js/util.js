export function textNewLine(text){
    return text.split('\n').map( (t,index) =>{
        return ( <p key={index}>{t}</p>)
    })
}

