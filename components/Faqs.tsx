import { Container } from "@/components/Container";

const faqs = [
  [
    {
      question: "What can I do with Spark Memos?",
      answer:
        "You can use it to capture you inspiration on the go! You can quickly jot down your thoughts, ideas, and creativity wherever you are. Or use it for later reading, journaling, or even organizing your day. The intuitive interface makes it easy to keep track of your insights and stay organized.",
    },
    {
      question: "What kind of memos can I create?",
      answer:
        "You can take down text memos, images, quotes, links, and even audio recordings. You can also organize your memos into collections to keep everything tidy.",
    },
  ],
  [
    {
      question: "Can I use Spark Memos offline?",
      answer:
        "Yes, you can use Spark Memos offline. You can create, edit, and delete memos without an internet connection. Your changes will be synced once you're back online.",
    },
    {
      question: "Where Spark Memos store my data?",
      answer:
        "Spark Memos stores your data in the local storage of your phone. You can also enable iCloud sync to keep your data across all your devices.",
    },
  ],
  [
    {
      question: "Is Spark Memos available on Android?",
      answer: "Spark Memos is currently available on iOS only.",
    },
    {
      question: "How do I get started?",
      answer:
        "You can download the app from the App Store then get started by creating your first memo.",
    },
  ],
];

export function Faqs() {
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
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-stone-600">
            If you have anything else you want to ask,{" "}
            <a
              href="mailto:spark@weelone.com"
              className="text-stone-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
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
