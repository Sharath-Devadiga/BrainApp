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
      className="w-full px-4 py-3.5 sm:py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:border-gray-300"
      ref={ref}
    />
  );
}