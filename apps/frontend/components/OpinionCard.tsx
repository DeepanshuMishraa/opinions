import { Card } from "./ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Opinion {
  id: number;
  opinion: string;
  user: {
    name: string;
  };
  upvotes: number;
  downvotes: number;
}

export default function OpinionCard({ opinion }: { opinion: Opinion }) {
  return (
    <Card className="p-5 hover:bg-slate-50 transition-all border-slate-100">
      <p className="text-sm text-slate-700 leading-relaxed">
        {opinion.opinion}
      </p>

      <div className="flex items-center mt-4 pt-3 border-t border-slate-100">
        <span className="text-xs font-medium text-slate-500">
          {opinion.user.name}
        </span>
        <div className="flex gap-4 ml-auto">
          <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors">
            <ThumbsUp className="h-3.5 w-3.5" />
            {opinion.upvotes}
          </button>
          <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors">
            <ThumbsDown className="h-3.5 w-3.5" />
            {opinion.downvotes}
          </button>
        </div>
      </div>
    </Card>
  )
}
