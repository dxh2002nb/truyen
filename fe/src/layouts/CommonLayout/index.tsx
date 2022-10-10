import Footer from '../../components/Footer';
import Header from '../../components/Header';

function CommonLayout({ children }: any) {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}

export default CommonLayout;
