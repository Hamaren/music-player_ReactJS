const initialState = {
  songs: [
    {
      title: 'test 5',
      src: './music/test5.mp3'
    },
    {
      title: 'test 3',
      src: './music/test3.mp3'
    },
    {
      title: 'test',
      src: './music/test.mp3'
    },
    {
      title: 'test 4',
      src: './music/test4.mp3'
    },
  ]
};

function playList(state = initialState) {
  return state;
}

export default playList;