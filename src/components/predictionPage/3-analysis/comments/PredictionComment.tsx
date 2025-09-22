import React from 'react';
import {CommentForDetailedPrediction} from "@/types/predictionTypes";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {getInitials} from '@/utils/common';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {MessageCircle, ThumbsUp} from "lucide-react";

const PredictionComment = ({comment}:{comment: CommentForDetailedPrediction}) => {

  return (
    <li className="flex gap-3 p-4 bg-muted/20 rounded-lg">
      <Avatar className="w-10 h-10">
        {
          comment.sender.avatar && <AvatarImage src={comment.sender.avatar} alt="avatar"/>
        }
        <AvatarFallback
          className="w-full h-full bg-gradient-to-br from-primary to-secondary text-primary-foreground">{getInitials(comment.sender.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">{comment.sender.name}</span>
          <Badge className="border px-2 py-0.5 font-medium text-foreground  text-xs bg-transparent border-border/50">Уровень {comment.sender.level}</Badge>
          <span className="text-xs text-muted-foreground">{comment.sendingTime}</span>
        </div>
        <p className="text-sm mb-2">{comment.message}</p>
        <div className="flex items-center gap-4">
          <Button className="bg-transparent text-foreground shadow-none font-medium shrink-0 outline-none hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md px-3 has-[>svg]:px-2.5 h-8 gap-1 text-xs">
            <ThumbsUp className="h-3 w-3" />
            <span>{comment.likes}</span>
          </Button>
          <Button className="bg-transparent text-foreground shadow-none font-medium shrink-0 outline-none hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md px-3 has-[>svg]:px-2.5 h-8 gap-1 text-xs">
            <MessageCircle className="h-3 w-3" />
            <span>Ответить</span>
          </Button>
        </div>
      </div>


    </li>
  );
};

export default PredictionComment;