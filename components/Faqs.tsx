import { Container } from "@/components/Container";
import { Dictionary } from "@/dictionaries";

export function Faqs({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-stone-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-stone-900"
          >
            {dict.homeSections.faq.title}
          </h2>
          <p className="mt-2 text-lg text-stone-600">
            {dict.homeSections.faq.description}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {dict.homeSections.faq.items.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-stone-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-stone-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
