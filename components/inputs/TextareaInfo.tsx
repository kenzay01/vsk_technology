interface TextareaInfoProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  error?: string;
}

export function TextareaInfo({
  label,
  required = false,
  placeholder = "",
  value,
  onChange,
  name,
  error,
}: TextareaInfoProps) {
  return (
    <div className="mb-4 sm:mb-5 md:mb-6 w-full">
      <label className="block text-base sm:text-base md:text-lg mb-1 sm:mb-2 font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        className={`w-full p-2 sm:p-3 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-amber-500 text-sm sm:text-base md:text-base ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
      />
      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
