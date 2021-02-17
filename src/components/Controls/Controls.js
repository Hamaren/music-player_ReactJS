
function Controls(props){
  return(
    <div className="controls">
      <button onClick={()=> props.prev()}>Prev</button>
      <button onClick={()=> props.play()}>Play</button>
      <button onClick={()=> props.next()}>Next</button>
    </div>
  )
}

export default Controls;