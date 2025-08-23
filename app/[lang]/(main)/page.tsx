import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { getDictionary, Language } from "@/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict} />
      <PrimaryFeatures dict={dict} />
      <SecondaryFeatures dict={dict} />
      <CallToAction dict={dict} />
      <Reviews dict={dict} />
      <Pricing dict={dict} />
      <Faqs dict={dict} />
    </>
  );
}
