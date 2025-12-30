export function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-900 rounded-full animate-spin" />
    </div>
  );
}