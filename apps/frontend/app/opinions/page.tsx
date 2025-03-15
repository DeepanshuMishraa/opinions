'use client'

import OpinionCard from "@/components/OpinionCard";
import { DialogThing } from "@/components/popover";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";


interface Opinion {
  id: number;
  opinion: string;
  user: {
    name: string;
  };
  upvotes: number;
  downvotes: number;
}

export default function Opinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  async function getOpinions() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/all`, {
      headers: {
        'Content-Type': 'application ',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status !== 200) {
      return;
    }

    setOpinions(response.data);
  }

  useEffect(() => {
    getOpinions();
  }, []);

  if (opinions.length === 0) {
    return <div className="max-w-7xl mx-auto p-6 mt-6">No opinions found.</div>
  }
  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-8">Trending Opinions</h1>
        <DialogThing />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opinions.map(opinion => (
          <OpinionCard key={opinion.id} opinion={opinion} />
        ))}
      </div>
    </div>
  )
}
