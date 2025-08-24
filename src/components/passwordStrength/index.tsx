export default function PasswordStrength({
  score,
  maxScore,
}: {
  score: number;
  maxScore: number;
}) {
  const percentage = (score / maxScore) * 100;

  let color = "bg-green-500";

  if (percentage <= 25) color = "bg-red-500";
  else if (percentage <= 50) color = "bg-orange-500";
  else if (percentage <= 75) color = "bg-yellow-500";
  else color = "bg-green-500";

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: maxScore }, (_, index) => (
        <div
          key={index}
          className={`h-1 w-6 rounded-full ${
            index < score ? color : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
