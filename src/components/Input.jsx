const Input = () => {
  return (
    <section className=" my-6 ">
      <div className="flex justify-center">
        <textarea
          class=" bg-zinc-800 h-[200px] w-full border-2 border-pur  rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-neon resize-y"
          placeholder="Enter text here..."
        ></textarea>
      </div>
    </section>
  )
}

export default Input
