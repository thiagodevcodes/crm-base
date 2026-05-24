interface HeaderTicketProps {
  title: string;
  totalItems: number;
  icon: React.ReactNode;
}

const InfoBox: React.FC<HeaderTicketProps> = ({ title, totalItems, icon }) => {
  return (
    <div className="mt-6 p-8 bg-slate-900 text-white rounded-4xl shadow flex items-center gap-1 flex-col">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-5xl font-bold">{totalItems}</h2>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default InfoBox;
