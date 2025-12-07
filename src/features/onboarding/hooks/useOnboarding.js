import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.js';
import { updateUserProfile } from '../../profile/api/userApi.js';
import { joinClub } from '../../club/api/clubApi.js';

const TOTAL_STEPS = 4;

/**
 * 온보딩 프로세스를 관리하는 커스텀 훅
 * @returns {object} { currentStep, onboardingData, updateStepData, handleNext, handleBack, handleComplete, loading, error }
 */
export default function useOnboarding() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    gender: '',
    university: '',
    club: null,
    personality: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 단계별 데이터 업데이트
  const updateStepData = (stepData) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  // 다음 단계로 이동
  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계: 온보딩 완료
      await handleComplete();
    }
  };

  // 이전 단계로 이동
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 온보딩 완료
  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      // 사용자 정보 업데이트
      const updateData = {
        name: onboardingData.name,
        gender: onboardingData.gender,
        university: onboardingData.university,
      };

      // 성격이 있으면 추가
      if (onboardingData.personality) {
        updateData.personality = onboardingData.personality;
      }

      // 사용자 정보 업데이트 API 호출
      await updateUserProfile(updateData);

      // 전역 상태 업데이트
      updateUser(updateData);

      // 동아리가 있으면 가입 처리
      if (onboardingData.club && onboardingData.club.id) {
        try {
          await joinClub(onboardingData.club.id);
        } catch (clubError) {
          console.error('동아리 가입 실패:', clubError);
          // 동아리 가입 실패해도 온보딩은 완료 처리
        }
      }

      // 온보딩 완료 후 홈으로 이동
      navigate('/');
    } catch (err) {
      console.error('온보딩 완료 실패:', err);
      setError(err);
      alert('온보딩을 완료하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    onboardingData,
    updateStepData,
    handleNext,
    handleBack,
    handleComplete,
    loading,
    error,
  };
}

