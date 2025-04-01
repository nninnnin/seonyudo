import Loading from "@/shared/components/Loading";
import { useOverlay } from "@toss/use-overlay";

const useLoadingOverlay = () => {
  const overlay = useOverlay();

  return {
    openLoadingOverlay: (message: string) => {
      overlay.open(() => (
        <Loading message={message} />
      ));
    },
  };
};

export default useLoadingOverlay;
