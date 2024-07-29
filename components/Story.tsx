import { Story as StoryType } from "@/types/stories";

interface StoryProps {
  story: StoryType;
}

const Story = ({ story }: StoryProps) => {
  return <div>Story</div>;
};

export default Story;
