import React from 'react';
import {Card} from "@/components/ui/card";
import {MessageCircle, Send} from "lucide-react";
import {CommentForDetailedPrediction} from "@/types/predictionTypes";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import PredictionComment from "@/components/predictionPage/3-analysis/comments/PredictionComment";


const CommentsBlock = ({comments}: { comments: CommentForDetailedPrediction[] }) => {

  if (!comments || comments.length === 0) return null

  return (
    <Card className="border p-4 sm:p-6 glassmorphism">
      <h2 className="flex items-center gap-2 mb-4 sm:mb-6 text-base sm:text-lg">
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Комментарии сообщества ({comments.length})</span>
      </h2>

      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-muted/30 rounded-lg">
        <Textarea
          className="dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 shadow-none md:text-sm mb-3 text-sm resize-none placeholder:text-muted-foreground"
          placeholder="Поделитесь своим мнением о прогнозе..."/>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 gap-2 w-full sm:w-auto">
          <Send className="h-3 w-3 sm:h-4 sm:w-4"/>
          <span className="text-sm">Отправить комментарий</span>
        </Button>
      </div>
      <ul className="space-y-4">
        {
          comments.map((comment, i) => <PredictionComment key={i} comment={comment}/>)
        }
      </ul>
    </Card>
  );
};

export default CommentsBlock;