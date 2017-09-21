const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}
var playlist = [];
$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  console.log(musicInfo);
  $('.playlist').empty();
  playlist = [];
  musicInfo.map(term => {
	  term = term.replace(' ', '+');
	  fetch('https://itunes.apple.com/search?term=' + term +'&limit=10')
		.then(res => {
			if(res.ok) return res.json();
		})
		.then(json => {
			console.log(json);
			json.results.map(result => {
				playlist.push($('<div>').html(`
					<a href=` + result.previewUrl  + ` target="_blank">
						<img src=` + result.artworkUrl100 + `>
						<div class=row>
							<p>` + result.artistName + `</p>
							<small>` + result.trackName + `</small>
							<audio controls>
								<source src="` + result.previewUrl  + `">
							</audio>
						</div>
					</a>
				`));
			});
			return playlist;
		})
		.then(list => {
			list.map(item => {
				$('.playlist').append(item);
			});
		});
  });
  console.log('Testing Music Call');
});
