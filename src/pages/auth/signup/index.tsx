import { useState } from 'react';

import { SignUpStep1, SignUpStep2 } from '@/features/auth';
import type { Step1Values } from '@/features/auth';

/* ───────────────────────────────────────────
   ROOT — orchestrates both steps
─────────────────────────────────────────── */
export default function SignUpPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Values>({ email: '', password: '' });

  if (step === 1) {
    return (
      <SignUpStep1
        onNext={(data) => {
          setStep1Data(data);
          setStep(2);
        }}
      />
    );
  }

  return <SignUpStep2 step1Data={step1Data} onBack={() => setStep(1)} />;
}
