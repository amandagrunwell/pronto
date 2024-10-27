type labelProps = {
  value: string;
  cssClass: string;
  required?: boolean;
};

export default function Label({ value, cssClass, required }: labelProps) {
  return (
    <label htmlFor={value} className={`${cssClass} capitalize`}>
      {value}
      {required && <span className="absolute text-red-500 ">*</span>}
    </label>
  );
}
