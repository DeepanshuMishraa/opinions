import OpinionCard from "@/components/OpinionCard";
import { DialogThing } from "@/components/popover";
import { Button } from "@/components/ui/button";

const fakeOpinions = [
  {
    id: 1,
    opinion: "I believe remote work should be the standard for tech companies. It improves work-life balance and reduces unnecessary commuting.",
    user: {
      name: "Alex Chen"
    },
    upvotes: 142,
    downvotes: 23
  },
  {
    id: 2,
    opinion: "Coffee is overrated. Tea provides a more sustainable energy boost without the crash.",
    user: {
      name: "Jamie Wilson"
    },
    upvotes: 87,
    downvotes: 65
  },
  {
    id: 3,
    opinion: "Social media has become more harmful than beneficial to society. We need better regulations.",
    user: {
      name: "Morgan Taylor"
    },
    upvotes: 231,
    downvotes: 42
  },
  {
    id: 4,
    opinion: "Audiobooks are just as valuable as reading physical books. The content matters more than the medium.",
    user: {
      name: "Riley Johnson"
    },
    upvotes: 112,
    downvotes: 38
  },
  {
    id: 5,
    opinion: "Pineapple absolutely belongs on pizza. The sweet and savory combination is culinary genius.",
    user: {
      name: "Jordan Smith"
    },
    upvotes: 76,
    downvotes: 104
  }
]

export default function Opinions() {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-8">Trending Opinions</h1>
        <DialogThing />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fakeOpinions.map(opinion => (
          <OpinionCard key={opinion.id} opinion={opinion} />
        ))}
      </div>
    </div>
  )
}
