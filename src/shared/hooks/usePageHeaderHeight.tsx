import useElementHeight from "@/shared/hooks/useElementHeight";
import { PAGE_HEADER_POSITION_TOP } from "@/shared/components/Logo";

const PAGE_HEADER_MARGIN_Y =
  PAGE_HEADER_POSITION_TOP * 2;

const usePageHeaderHeight = () => {
  const { elementHeight: pageHeaderHeight } =
    useElementHeight("page-header");

  return {
    pageHeaderHeight:
      pageHeaderHeight + PAGE_HEADER_MARGIN_Y,
  };
};

export default usePageHeaderHeight;
