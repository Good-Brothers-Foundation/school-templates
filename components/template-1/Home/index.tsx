import Gallery from "./gallery";
import AboutSection from "./about-us";
import Admission from "./admission";
import Features from "./features";
import Hero from "./hero";
import Methodology from "./methodology";
import ProgramsSection from "./programs";
import Stats from "./stats";
import Teachers from "./teachers";
import Testimonials from "./testimonials";
import WhyChooseUs from "./why-choose-us";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <AboutSection />
      <ProgramsSection />
      <WhyChooseUs/>
      <Methodology />
      <Gallery />
      <Teachers />
      <Admission />
      <Testimonials />
    </>
  );
};

export default Home;
