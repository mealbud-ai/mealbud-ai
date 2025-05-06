'use client';

import { useState, useEffect, useCallback, memo, FC, ReactNode } from 'react';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Textarea } from '@repo/ui/components/textarea';
import { ArrowRightIcon, Loader2Icon, CheckIcon } from 'lucide-react';
import { Progress } from '@repo/ui/components/progress';

interface MealDescriptionCardProps {
  step: number;
  onContinue: () => void;
}

interface AnalysisContentProps {
  step: number;
  isAnalyzing: boolean;
  progress: number;
}

interface AnalysisCardProps extends AnalysisContentProps {
  onAnalyze: () => void;
}

interface ResultsCardProps {
  step: number;
  onReset: () => void;
}

const MealDescriptionCard: FC<MealDescriptionCardProps> = memo(
  ({ step, onContinue }: MealDescriptionCardProps) => (
    <Card
      className={`p-4 border ${step >= 0 ? 'border bg-card' : 'bg-muted'} transition-all duration-300`}
    >
      <h3 className="font-medium mb-2 flex items-center">
        <span className="rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2">
          1
        </span>{' '}
        Describe Your Meal
      </h3>
      <Textarea
        value="Grilled chicken sandwich with avocado, lettuce, tomato and a side of sweet potato fries"
        className="min-h-[100px] mb-3 disabled:opacity-100"
        disabled={true}
      />
      <Button onClick={onContinue} disabled={step > 0}>
        Continue
      </Button>
    </Card>
  ),
);

MealDescriptionCard.displayName = 'MealDescriptionCard';

const AnalysisContent: FC<AnalysisContentProps> = memo(
  ({ step, isAnalyzing, progress }: AnalysisContentProps) => {
    if (step < 1) {
      return (
        <div className="text-center">
          <p>Waiting for meal description...</p>
        </div>
      );
    }

    if (isAnalyzing) {
      return (
        <div className="text-center w-full">
          <Loader2Icon className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-sm mb-2">Analyzing your meal...</p>
          <Progress value={progress} className="h-1.5 w-full" />
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="text-center">
          <p className="text-sm mb-4">Ready to analyze your meal</p>
          <ArrowRightIcon className="h-6 w-6 mx-auto" />
        </div>
      );
    }

    return (
      <div className="text-center">
        <CheckIcon className="h-8 w-8 mx-auto mb-2" />
        <p className="text-sm">Analysis complete!</p>
      </div>
    );
  },
);

AnalysisContent.displayName = 'AnalysisContent';

const AnalysisCard: FC<AnalysisCardProps> = memo(
  ({ step, isAnalyzing, progress, onAnalyze }: AnalysisCardProps) => (
    <Card
      className={`p-4 border ${step >= 1 ? 'border bg-card' : 'bg-muted opacity-50'} transition-all duration-300`}
    >
      <h3 className="font-medium mb-2 flex items-center">
        <span className="rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2">
          2
        </span>{' '}
        AI Analysis
      </h3>
      <div className="flex flex-col items-center justify-center min-h-[100px] mb-3">
        <AnalysisContent
          step={step}
          isAnalyzing={isAnalyzing}
          progress={progress}
        />
      </div>
      <Button
        onClick={onAnalyze}
        className="w-full"
        disabled={step !== 1 || isAnalyzing}
        aria-busy={isAnalyzing}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
      </Button>
    </Card>
  ),
);

AnalysisCard.displayName = 'AnalysisCard';

const ResultsCard: FC<ResultsCardProps> = memo(
  ({ step, onReset }: ResultsCardProps) => (
    <Card
      className={`p-4 border ${step >= 2 ? 'border bg-card' : 'bg-muted opacity-50'} transition-all duration-300`}
    >
      <h3 className="font-medium mb-2 flex items-center">
        <span className="rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2">
          3
        </span>{' '}
        Nutrition Results
      </h3>
      <div className="min-h-[100px] mb-3">
        {step < 2 ? (
          <div className="text-center h-full flex items-center justify-center">
            <p>Waiting for analysis...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Calories</span>
              <span className="font-medium">720 kcal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Protein</span>
              <span className="font-medium">38g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Carbs</span>
              <span className="font-medium">65g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Fat</span>
              <span className="font-medium">32g</span>
            </div>
          </div>
        )}
      </div>
      <Button onClick={onReset} className="w-full" disabled={step < 2}>
        Try Again
      </Button>
    </Card>
  ),
);

ResultsCard.displayName = 'ResultsCard';

export default function HeroAnimation(): ReactNode {
  const [step, setStep] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleContinue = useCallback((): void => {
    setStep(1);
  }, []);

  const handleAnalyze = useCallback((): void => {
    setIsAnalyzing(true);
    setProgress(0);
  }, []);

  const resetDemo = useCallback((): void => {
    setStep(0);
    setProgress(0);
    setIsAnalyzing(false);
  }, []);

  useEffect(() => {
    if (!isAnalyzing) return () => {};

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setStep(2);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <MealDescriptionCard step={step} onContinue={handleContinue} />
        <AnalysisCard
          step={step}
          isAnalyzing={isAnalyzing}
          progress={progress}
          onAnalyze={handleAnalyze}
        />
        <ResultsCard step={step} onReset={resetDemo} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm">
          Experience the power of AI-driven nutrition analysis.{' '}
          <br className="hidden md:inline" />
          This is a demo of Mealbud&apos;s capabilities, and we are excited to
          help you achieve your nutrition goals! (Mock data)
        </p>
      </div>
    </div>
  );
}
