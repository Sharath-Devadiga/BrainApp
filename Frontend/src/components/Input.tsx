interface Inputprops{
  placeholder: string;
  ref?: any
}

export function Input({ ref, placeholder }:Inputprops ) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={ref}
      />
    );
  }