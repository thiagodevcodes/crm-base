type Props = {
  width: string;
  height: string;
};

export function Spinner({ width, height }: Props) {
  return (
    <div className="flex justify-center">
      <div
        className={`border-3 border-gray-300 border-t-blue-900 rounded-full animate-spin`}
        style={{ width: width, height: height }}
      ></div>
    </div>
  );
}
