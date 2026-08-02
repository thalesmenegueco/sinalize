function FutureFeatureCard({ nomeFeat }: { nomeFeat: string }) {
  return (
    <div className="opacity-60">
      <div className="border-2 border-dashed border-[#9ca3af] rounded-xl p-8 text-center flex flex-col justify-center items-center h-32 bg-[#ffffff]">
        <span className="text-[#6b7280] font-medium">Em breve: {nomeFeat}</span>
      </div>
    </div>
  )
}
export default FutureFeatureCard