//Calculating track duration in minutes and seconds format
export const getTimeTrack = (value) => {
  let minutes = Math.trunc(value / 60);
  let seconds = Math.trunc(value % 60);
  return leadingZero(minutes) + ':' + leadingZero(seconds);
};

//Decorating the timer for better readability
const leadingZero = (value) =>{
  const num = isNaN(value) ? 0 : value;
  if(num < 10){
    return '0' + num
  }
  return num;
};