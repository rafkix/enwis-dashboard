export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page not found</p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition"
      >
        Go Home
      </a>
    </div>
  );
}
