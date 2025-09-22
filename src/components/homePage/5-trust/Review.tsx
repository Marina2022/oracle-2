import React from 'react';
import {Card} from "@/components/ui/card";
import {ReviewType} from "@/types/review";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import Rating from "@/components/shared/Rating";
import {Badge} from "@/components/ui/badge";
import {Quote} from "lucide-react";
import {getInitials} from "@/utils/common";


const Review = ({review}: { review: ReviewType }) => {

  return (
    <li>
      <Card className="glassmorphism p-6 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-start space-x-4">
          <div className="flex items-start space-x-4  w-full">
            <Avatar className="w-12 h-12">
              {
                review.avatar && <AvatarImage src={review.avatar} alt="avatar"/>
              }
              <AvatarFallback
                className="w-12 h-12 bg-primary text-primary-foreground">{getInitials(review.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 ">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{review.name}</h4>
                <Rating rating={review.rating}/>
              </div>
              <div className="text-sm text-muted-foreground">{review.profession}</div>
              <Badge className="bg-accent/20 text-accent text-xs mt-1">{review.badgeText}</Badge>
            </div>
          </div>
        </div>
        <div className="relative">
          <Quote className="absolute top-0 left-0 w-8 h-8 text-muted-foreground/20"/>
          <p className="text-sm leading-relaxed pl-10 italic">&quot;{review.content}&quot;</p>
        </div>
      </Card>
    </li>
  )
}

export default Review;