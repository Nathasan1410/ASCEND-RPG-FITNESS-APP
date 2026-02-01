"use client";

import { useState } from "react";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { BasicInfoStep } from "@/components/onboarding/BasicInfoStep";
import { AssessmentStep } from "@/components/onboarding/AssessmentStep";
import { ClassSelectStep } from "@/components/onboarding/ClassSelectStep";
import { EquipmentStep } from "@/components/onboarding/EquipmentStep";
import { OnboardingData } from "@/types/schemas";
import { completeOnboarding } from "@/server/actions/profile-actions";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<Partial<OnboardingData>>({
    equipment: [],
  });

  const handleUpdate = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await completeOnboarding(data as OnboardingData);
      toast.success("Welcome to the System, Hunter.");
    } catch (error) {
      toast.error("System Failure: Could not save profile.");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-system-panel border border-system-border rounded-lg shadow-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
        <div className="w-16 h-16 border-t-2 border-r-2 border-system-cyan rounded-tr-xl" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 opacity-20 pointer-events-none">
        <div className="w-16 h-16 border-b-2 border-l-2 border-system-cyan rounded-bl-xl" />
      </div>

      <StepProgress currentStep={step} totalSteps={4} />

      <div className="min-h-[400px]">
        {step === 1 && (
          <BasicInfoStep data={data} onUpdate={handleUpdate} onNext={handleNext} />
        )}
        {step === 2 && (
          <AssessmentStep 
            data={data} 
            onUpdate={handleUpdate} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {step === 3 && (
          <ClassSelectStep 
            data={data} 
            onUpdate={handleUpdate} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {step === 4 && (
          <EquipmentStep 
            data={data} 
            onUpdate={handleUpdate} 
            onSubmit={handleSubmit} 
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
