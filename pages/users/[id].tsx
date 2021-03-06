import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import UserCard from "../../components/user-card";
import Loader from "../../components/loader";
import AnimationsGrid from "../../components/animations-grid";
import ErrorPage from "../../components/error";
import { UserAnimations } from "../../queries/index";

const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(UserAnimations.query, {
    variables: { userId: id }, // default user // we can read user id from global context/gloabl states for production
  });

  if (loading) {
    return (
      <div className="flex items-center w-full text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <ErrorPage />
      </div>
    );
  }

  if (true) {
    return (
      <>
        <Head>
          <title>Proifle {id}</title>
        </Head>
        <div className="absolute mt-36">
          {data.getAnimationByUserId.length ? (
            <>
              <UserCard />{" "}
              <div className="mt-10">
                <AnimationsGrid animations={data.getAnimationByUserId} />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <ErrorPage />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default Profile;
