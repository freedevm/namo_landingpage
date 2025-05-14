export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded bg-white text-black ${className}`}
      {...props}
    />
  );
}
