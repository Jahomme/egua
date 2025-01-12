import Link from "next/link";
import { type Lesson, type UserProgress } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface LessonCardProps {
  lesson: Lesson & {
    exercises: { id: string }[];
    progress: UserProgress[];
  };
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const totalExercises = lesson.exercises.length;
  const completedExercises = lesson.progress.filter(p => p.completed).length;
  const isCompleted = completedExercises === totalExercises;

  return (
    <Card className={`
      shadow-lg hover:shadow-xl transition-shadow 
      dark:border-[#1E293B]/30 dark:hover:shadow-primary/5 backdrop-blur-sm
      ${isCompleted 
        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30" 
        : "bg-white dark:bg-[#111827]/50"
      }
    `}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <CardTitle className="text-2xl font-poppins dark:text-[#F1F5F9]">{lesson.title}</CardTitle>
          {isCompleted && (
            <span className="text-emerald-500 dark:text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg text-slate-600 dark:text-[#94A3B8]">{lesson.description}</p>
        
        <div className="space-y-4">
          {/* Barra de Progresso */}
          <div className="w-full bg-slate-100 dark:bg-[#1E293B] rounded-full h-4">
            <div
              className={`h-full rounded-full ${
                isCompleted 
                  ? "bg-emerald-500 dark:bg-emerald-400" 
                  : "bg-primary dark:bg-[#818CF8]"
              }`}
              style={{ width: `${(completedExercises / totalExercises) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-lg ${
              isCompleted 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-slate-600 dark:text-[#94A3B8]"
            }`}>
              {completedExercises} de {totalExercises} exercícios completos
            </span>
            <Link href={`/lesson/${lesson.id}`}>
              <Button 
                size="lg" 
                className={`text-lg px-6 ${
                  isCompleted
                    ? "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    : "bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5]"
                } dark:text-white`}
              >
                {isCompleted ? "Revisar" : "Continuar"} →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 