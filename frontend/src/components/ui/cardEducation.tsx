import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

type EducationType = {
  period: string;
  title: string;
  institution: string;
};


type Props = {
  data: EducationType[];
};

export function CardEducation({ data }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
    {data.map((item, index) => (
        <div
        key={index}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition"
        >
        <FontAwesomeIcon icon={faGraduationCap} className="text-blue-500 text-3xl mb-4" />

        <h3 className="text-lg font-semibold">{item.title}</h3>

        <p className="text-gray-400">{item.institution}</p>

        <span className="text-sm text-gray-500">{item.period}</span>
        </div>
    ))}
    </div>
  );
}