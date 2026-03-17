import { Experience } from "@/modules/experiences/types/experiences";

type Props = {
  experiencies: Experience[];
};

export function Timeline({ experiencies }: Props) {
  return (
    <div className="relative border-l border-gray-600 ml-4">
      {experiencies.map((exp, index) => (
        <div key={index} className="mb-10 ml-6">
          {/* bolinha */}
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500"></span>

          {/* conteúdo */}
          <div className="bg-[#0f172a] pb-10">
            <span className="text-sm text-gray-400">{exp.period}</span>

            <h3 className="text-lg font-semibold">{exp.title}</h3>

            <p className="text-gray-300">{exp.description}</p>

            {exp.technologies && (
              <p className="text-sm text-blue-400 mt-1">
                Tecnologias: {exp.technologies}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
