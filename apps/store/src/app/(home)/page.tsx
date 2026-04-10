import BestsellerSection from "./_components/BestsellerSection";
import CategoriesSection from "./_components/CategoriesSection";
import InspirationSection from "./_components/InspirationSection";
import MainBanner from "./_components/MainBanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <MainBanner />
      <CategoriesSection />
      <BestsellerSection />
      <InspirationSection />
    </div>
  );
}
