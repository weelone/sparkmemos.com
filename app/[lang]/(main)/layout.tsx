import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary, Language } from "@/dictionaries";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <Header dict={dict} />
      <main className="flex-auto">{children}</main>
      <Footer dict={dict} />
    </>
  );
}
