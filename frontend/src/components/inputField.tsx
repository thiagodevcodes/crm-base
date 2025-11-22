import { UseFormRegisterReturn } from "react-hook-form";

export function InputField({
  label,
  type = "text",
  error,
  registerReturn,
  placeholder,
}: {
  label: string;
  type?: string;
  error?: string | null;
  placeholder?: string;
  registerReturn: UseFormRegisterReturn;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...registerReturn}
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}