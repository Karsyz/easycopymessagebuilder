import React from 'react'

export default function savedMessage(props) {

    function removeFromLocalStorage(propId) {
        let storage =  JSON.parse( localStorage.getItem('messages') )
        let loc = storage.findIndex(x => x.id === propId)
        storage.splice(loc, loc + 1)
        localStorage.setItem('messages', JSON.stringify(storage))
        props.updateMessages(JSON.parse(localStorage.getItem('messages')))
    }

   return (
        <div className='boxes'>
            <h3>{`${props.title}`}</h3>
            <p className="text" id={`ID:${props.id}`}>{props.messageOutput}</p>
            <div className='buttonCont'>
                <button type='button' onClick={()=>props.clipBoardCopy(`ID:${props.id}`)}>Copy</button>
                <button type='button' onClick={()=>removeFromLocalStorage(`${props.id}`)}>Delete</button>
            </div>
        </div>
   )

}