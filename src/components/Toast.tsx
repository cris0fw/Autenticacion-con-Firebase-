import { useEffect, useState } from "react";

interface Props {
  message: string;
}

export default function ToastExample({ message }: Props) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // 5 segundos
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in">
          {message}
        </div>
      )}
    </div>
  );
}
