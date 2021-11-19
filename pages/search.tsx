import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Loader from "./../components/loader";

import AnimationsGrid from "../components/animations-grid";
import Error from "./../components/error";

import { SearchAnimations } from "../queries/index";

function AnimationSearch({}): JSX.Element {
  /**
   * Get tag search term from query paramters
   */
  const router = useRouter();
  const { tag } = router.query;

  const { loading, error, data } = useQuery(SearchAnimations.query, {
    variables: { tag: tag },
  });
  /**
   * @loader => waits for query to return results
   */
  if (loading) {
    return (
      <div className="flex items-center w-full text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <Loader />
      </div>
    );
  }
  /**
   * @Error => returns error page if error occurs
   */
  if (error) {
    return (
      <div className="absolute flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <Error />
      </div>
    );
  }
  /**
   * @Data => shows data => send data return by request as props to grid component
   */
  if (data) {
    return (
      <div className="absolute mt-32 h-screen w-screen -inset-x-0 z-1  sm:left-0  p-5 bg-gray-100 my-50   ">
        {data.getAnimationByTag ? (
          <>
            <AnimationsGrid animations={data.getAnimationByTag} />
          </>
        ) : (
          <>
            {" "}
            <div className=" absolute  w-screen inset-0 flex  flex-wrap text-center items-center justify-center h-86 text-bold text-black mt-32 ">
              <Error message="No data with this tag!" />
            </div>
          </>
        )}
      </div>
    );
  }
  /**
   * @In case default return => returns error for corner cases plus typescript checking for JSX.element
   */
  return (
    <>
      <div className="absolute flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <Error />
      </div>
    </>
  );
}
export default AnimationSearch;
