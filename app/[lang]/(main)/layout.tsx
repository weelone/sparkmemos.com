import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary, Language } from "@/dictionaries";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict} />
      <main className="flex-auto">{children}</main>
      <Footer dict={dict} />
    </>
  );
}
