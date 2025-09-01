import { Component } from "react";

export default class MusicBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musics: this.props.musics,
            search: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSearch(this.state.search)
    }

    render() {
        const { onCancel } = this.props
        const { search } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="bg-zinc-800 p-6 rounded-lg space-y-4 w-full h-1/5 max-w-md overflow-y-auto flex flex-col justify-center overflow-x-auto">
                <h2 className="text-2xl text-center font-bold">Search</h2>
                <input
                    autoFocus
                    required
                    name="search"
                    type="text"
                    value={search}
                    onChange={this.handleChange}
                    className="w-full bg-zinc-700 p-2 rounded mt-1"
                />
                <div className="flex gap-4 justify-end">
                    <button type="button" onClick={onCancel} className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}