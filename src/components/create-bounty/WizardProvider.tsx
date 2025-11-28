'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BountyFormData {
  title: string;
  category: string;
  tags: string[];
  description: string;
  rewardAmount: string;
  rewardToken: string;
  deadline: Date | undefined;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
}

interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  formData: BountyFormData;
  updateFormData: (data: Partial<BountyFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const INITIAL_DATA: BountyFormData = {
  title: '',
  category: '',
  tags: [],
  description: '',
  rewardAmount: '',
  rewardToken: 'ETH',
  deadline: undefined,
  difficulty: 'Beginner',
};

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BountyFormData>(INITIAL_DATA);
  const totalSteps = 4;

  const updateFormData = (data: Partial<BountyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isFirstStep = step === 1;
  const isLastStep = step === totalSteps;

  return (
    <WizardContext.Provider
      value={{
        step,
        setStep,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        isFirstStep,
        isLastStep,
        totalSteps,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
