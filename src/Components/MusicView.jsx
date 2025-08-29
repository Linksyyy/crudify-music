import { ChevronLeft } from 'lucide-react';
import StarRating from './StarRating';
import CommentSection from './CommentSection';
import ReactPlayer from 'react-player';

export default function MusicView({ music, onBack, onGetComments, onAddComment, onRateMusic, onDeleteComment }) {
  return (
    <div className='overflow-y-auto'>
      <button onClick={onBack} className="mb-4 flex items-center gap-2 text-zinc-400 hover:text-zinc-100">
        <ChevronLeft />
        Back
      </button>
      <div className="flex flex-row gap-8">
        <div className="w-1/3 flex flex-col">
          <h1 className="text-4xl font-bold">{music.title}</h1>
          <h2 className="text-xl text-zinc-400 mb-4">{music.artist}</h2>
          <div className='mt-auto'>
            <StarRating
              initialRating={music.starRating}
              onRate={(rating) => onRateMusic(music.id, rating)}
            />
          </div>
        </div>
        <div className="w-2/3">
          <ReactPlayer src={music.url} width='100%' height='340px' controls />
        </div>
      </div>
      <div className="mt-8">
        <CommentSection
          musicID={music.id}
          initialComments={music.comments}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          onGetComments={onGetComments}
        />
      </div>
    </div>
  );
}