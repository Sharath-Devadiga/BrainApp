interface Inputprops {
  placeholder: string;
  ref?: any;
  type?: string;
}

export function Input({ ref, placeholder, type = "text" }: Inputprops) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      ref={ref}
    />
  );
}