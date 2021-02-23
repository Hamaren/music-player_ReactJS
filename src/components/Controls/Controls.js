
function Controls(props){
  return(
    <div className="controls">
      {/*<button onClick={()=> props.next()}>Reverse</button>*/}
      <button onClick={()=> props.prev()}>Prev</button>
      <button onClick={()=> props.play()}>Play</button>
      <button onClick={()=> props.next()}>Next</button>
      {/*<button onClick={(e)=> props.forward(e)}>Forward</button>*/}
    </div>
  )
}

export default Controls;