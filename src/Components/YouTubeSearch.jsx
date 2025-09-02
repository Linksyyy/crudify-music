
import { Component } from 'react';
import { Search, X } from 'lucide-react';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export default class YouTubeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      isLoading: false,
      error: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const { query } = this.state;
    if (!query.trim()) return;

    this.setState({ isLoading: true, error: null });

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          this.setState({ results: data.items, isLoading: false });
        } else {
          this.setState({ error: 'Error fetching videos. Please check the API key and quota.', isLoading: false });
        }
      })
      .catch(error => {
        console.error('Error fetching from YouTube API:', error);
        this.setState({ error: 'An unexpected error occurred.', isLoading: false });
      });
  }

  handleSelectVideo(video) {
    const newMusic = {
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      cover: video.snippet.thumbnails.high.url,
    };
    this.props.onMusicAdd(newMusic);
  }

  render() {
    const { onCancel } = this.props;
    const { query, results, isLoading, error } = this.state;

    return (
        <div className="bg-zinc-800 p-6 rounded-lg space-y-4 w-full max-w-3xl h-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Search on YouTube</h2>
            <button onClick={onCancel} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={this.handleSearch} className="flex gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => this.setState({ query: e.target.value })}
              placeholder="Search for a song or artist..."
              className="flex-1 bg-zinc-700 p-2 rounded"
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2" disabled={isLoading}>
              <Search size={20} />
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {results.map(video => (
              <div
                key={video.id.videoId}
                onClick={() => this.handleSelectVideo(video)}
                className="flex items-center gap-4 p-2 rounded-md hover:bg-zinc-700 cursor-pointer"
              >
                <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex flex-col">
                  <p className="font-bold text-white">{video.snippet.title}</p>
                  <p className="text-sm text-zinc-400">{video.snippet.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
  }
}
