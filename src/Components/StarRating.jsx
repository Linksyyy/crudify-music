import { useState } from "react";
import { TiStar } from "react-icons/ti";

export default function StarRating({ initialRating, onRate }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex ml-5 items-center gap-1 py-4">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={starValue}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={starValue}
              onClick={() => {
                setRating(starValue);
                onRate(starValue);
              }}
            />
            <TiStar
              className="cursor-pointer"
              size={32}
              color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}
