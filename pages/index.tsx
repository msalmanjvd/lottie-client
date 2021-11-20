import type { NextPage } from "next";
import Head from "next/head";
import Client from "../libs/apollo";
import Loader from "./../components/loader";

import AnimationsGrid from "../components/animations-grid";
import Error from "./../components/error";
import { AllAnimations } from "../queries/index";
/**
 *
 * @returns all aniamtions and pass data inn component props
 */

export async function getServerSideProps() {
  const { loading, error, data } = await Client.query({
    query: AllAnimations.query,
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
      <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <Error message="Sometyhing went wrong!" />
      </div>
    );
  }

  return {
    props: {
      animations: data.getAllAnimations,
    },
  };
}

/**
 * DataTypes
 */
type Tag = {
  name: string;
};
type User = {
  id: string;
  firstName: string;
};
type Animation = {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: Date;
  tags: Array<Tag>;
  user: User;
};
type AnimationData = {
  animations: Array<Animation>;
};
const Home = ({ animations }: AnimationData): JSX.Element => {
  return (
    <>
      <Head>
        <title> Lottiefiles</title>
      </Head>
      <div className="absolute inset-0 p-0 m-0 w-screen sm:mt-40">
        <AnimationsGrid animations={animations} />
      </div>
    </>
  );
};

export default Home;
