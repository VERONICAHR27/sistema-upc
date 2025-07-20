import Navbar from '@/components/Navbar';
import ImageCarousel from '@/components/ImageCarousel';
import ProgramCards from '@/components/ProgramCards';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ImageCarousel />
        </div>
      </section>

      {/* Program Cards Section */}
      <ProgramCards />

      {/* Footer */}
      <Footer />
    </div>
  );
}
