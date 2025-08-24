import getPasswordStrength from "@/utils/getPasswordStrength.ts";

export default function PasswordStrength({ password }: { password: string }) {
  const { score, maxScore, reasons } = getPasswordStrength(password);

  const reason = reasons.length > 0 ? reasons[0] : null;

  const percentage = (score / maxScore) * 100;

  let color = "bg-green-500";

  if (percentage <= 25) color = "bg-red-500";
  else if (percentage <= 50) color = "bg-orange-500";
  else if (percentage <= 75) color = "bg-yellow-500";
  else color = "bg-green-500";

  return (
    <div className="flex gap-1 items-center justify-end absolute bottom-[-1.2rem] right-0 ">
      {reason && <div className="text-xs text-red-600 mr-1">{reason}</div>}
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
