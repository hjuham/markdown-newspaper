import Banner from "../components/Banner";
import Articles from "../components/Articles";

const FrontPage = () => {
  return (
    <>
      <Banner showLogin={true} />
      <Articles />
    </>
  );
};
export default FrontPage;
