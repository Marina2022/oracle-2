import { Star } from 'lucide-react';
import React from 'react';

const Rating = ({rating}: {rating: number}) => {
  return (
    <div className="flex space-x-1">
      {
        new Array(rating).fill(0).map((_, i) => <Star key={i} className="h-4 fill-yellow-400 text-yellow-400"/>)
      }
    </div>
  );
};

export default Rating;