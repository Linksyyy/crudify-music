import { Component } from 'react';

export default class MusicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.music ? this.props.music.title : '',
      artist: this.props.music ? this.props.music.artist : '',
      cover: this.props.music ? this.props.music.cover : '',
      url: this.props.music ? this.props.music.url : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.music && this.props.music !== prevProps.music) {
      this.setState({
        title: this.props.music.title,
        artist: this.props.music.artist,
        cover: this.props.music.cover,
        url: this.props.music.url,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({ ...this.props.music, ...this.state });
  }

  render() {
    const { onCancel, music } = this.props;
    const { title, artist, url, cover } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="bg-zinc-800 p-6 rounded-lg space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-bold">{music ? 'Edit Album' : 'Add Album'}</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-300">Title</label>
          <input
            autoFocus
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={this.handleChange}
            className="w-full bg-zinc-700 p-2 rounded mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-zinc-300">Artist</label>
          <input
            id="artist"
            name="artist"
            type="text"
            value={artist}
            onChange={this.handleChange}
            className="w-full bg-zinc-700 p-2 rounded mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-zinc-300">URL of video</label>
          <input
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={this.handleChange}
            className="w-full bg-zinc-700 p-2 rounded mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-zinc-300">URL of cover</label>
          <input
            id="cover"
            name="cover"
            type="text"
            value={cover}
            onChange={this.handleChange}
            className="w-full bg-zinc-700 p-2 rounded mt-1"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    );
  }
}
