import { useSearchParams } from "next/navigation";

const useGuideSubject = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");

  return {
    subject,
  };
};

export default useGuideSubject; 