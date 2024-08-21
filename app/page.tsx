import Chatbot from '@/components/Chatbot';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Chatbot />;
    </div>
  );
}
