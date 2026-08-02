import FutureFeatureCard from "../../shared/future-feature-card/FutureFeatureCard"

function FutureFeaturesCards() {
  return (
    <>
    <section className="mt-3 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <FutureFeatureCard nomeFeat="Busca por Frases" />
      <FutureFeatureCard nomeFeat="Categorias Temáticas" />
    </section>
    </>
  )
}
export default FutureFeaturesCards