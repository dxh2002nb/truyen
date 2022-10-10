import type { ReactElement } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return <div className=""></div>;
};

Home.getLayout = (page: ReactElement) => {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Home;
